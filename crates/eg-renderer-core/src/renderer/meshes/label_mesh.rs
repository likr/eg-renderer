use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{LABEL_FRAGMENT_SHADER_SOURCE, LABEL_VERTEX_SHADER_SOURCE};
use super::{init_vertex_array, LabelData, LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    CanvasRenderingContext2d, HtmlCanvasElement, WebGl2RenderingContext as GL, WebGlProgram,
    WebGlTexture, WebGlVertexArrayObject,
};

enum TextAlign {
    Left,
    Right,
    Center,
}

impl TextAlign {
    fn new(name: &String) -> TextAlign {
        if name == &String::from("left") {
            return TextAlign::Left;
        }
        if name == &String::from("right") {
            return TextAlign::Right;
        }
        if name == &String::from("start") {
            return TextAlign::Left;
        }
        if name == &String::from("end") {
            return TextAlign::Right;
        }
        TextAlign::Center
    }
}

enum DxBase {
    Left,
    Right,
    Center,
}

impl DxBase {
    fn new(name: &String) -> DxBase {
        if name == &String::from("left") {
            return DxBase::Left;
        }
        if name == &String::from("right") {
            return DxBase::Right;
        }
        DxBase::Center
    }
}

enum DyBase {
    Top,
    Bottom,
    Middle,
}

impl DyBase {
    fn new(name: &String) -> DyBase {
        if name == &String::from("top") {
            return DyBase::Top;
        }
        if name == &String::from("bottom") {
            return DyBase::Bottom;
        }
        DyBase::Middle
    }
}

fn create_text_image(
    text: &String,
    scale: f32,
    margin: f32,
    label_font_size: f32,
    label_font_family: &String,
    label_fill_color_r: f32,
    label_fill_color_g: f32,
    label_fill_color_b: f32,
    label_fill_color_opacity: f32,
    label_stroke_color_r: f32,
    label_stroke_color_g: f32,
    label_stroke_color_b: f32,
    label_stroke_color_opacity: f32,
    label_stroke_width: f32,
    label_text_align: &String,
) -> Result<HtmlCanvasElement, JsValue> {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let canvas = document
        .create_element("canvas")?
        .dyn_into::<HtmlCanvasElement>()?;

    let ctx = canvas
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;

    let lines = text.split('\n').collect::<Vec<_>>();

    let mut canvas_width = 0.;
    for line in lines.iter() {
        ctx.set_font(&format!(
            "{}px {}",
            label_font_size * scale,
            label_font_family
        ));
        ctx.set_line_width((label_stroke_width * scale) as f64);
        let bbox = ctx.measure_text(&line)?;
        let w = bbox.width() as f32 + 2. * margin;
        if w > canvas_width {
            canvas_width = w;
        }
    }

    let line_height = label_font_size * scale;
    let canvas_width = canvas_width;
    let canvas_height = line_height * lines.len() as f32 + 2. * margin;
    canvas.set_width(canvas_width as u32);
    canvas.set_height(canvas_height as u32);

    let label_text_align = TextAlign::new(&label_text_align);

    ctx.set_font(&format!(
        "{}px {}",
        label_font_size * scale,
        label_font_family
    ));
    match label_text_align {
        TextAlign::Left => ctx.set_text_align("left"),
        TextAlign::Right => ctx.set_text_align("right"),
        TextAlign::Center => ctx.set_text_align("center"),
    };
    ctx.set_text_baseline(&"middle");
    ctx.set_line_width((label_stroke_width * scale) as f64);
    ctx.set_fill_style(
        &format!(
            "rgba({},{},{},{})",
            label_fill_color_r, label_fill_color_g, label_fill_color_b, label_fill_color_opacity
        )
        .into(),
    );
    ctx.set_stroke_style(
        &format!(
            "rgba({},{},{},{})",
            label_stroke_color_r,
            label_stroke_color_g,
            label_stroke_color_b,
            label_stroke_color_opacity
        )
        .into(),
    );

    let x = match label_text_align {
        TextAlign::Left => margin,
        TextAlign::Right => canvas_width - margin,
        TextAlign::Center => canvas_width / 2.,
    } as f64;
    let mut offset = margin;
    for line in lines {
        let y = (offset + line_height / 2.0) as f64;
        if label_stroke_width > 0. {
            ctx.stroke_text(&line, x, y)?;
        }
        ctx.fill_text(&line, x, y)?;
        offset += line_height;
    }

    Ok(canvas)
}

fn create_label_shader_program(gl: &GL) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, LABEL_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LABEL_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn create_texture(gl: &GL, canvas: &HtmlCanvasElement) -> Result<WebGlTexture, JsValue> {
    let texture = gl.create_texture().ok_or("failed")?;
    gl.bind_texture(GL::TEXTURE_2D, Some(&texture));
    gl.tex_image_2d_with_u32_and_u32_and_html_canvas_element(
        GL::TEXTURE_2D,
        0,
        GL::RGBA as i32,
        GL::RGBA,
        GL::UNSIGNED_BYTE,
        &canvas,
    )?;
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_S, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_T, GL::CLAMP_TO_EDGE as i32);

    gl.generate_mipmap(GL::TEXTURE_2D);
    gl.bind_texture(GL::TEXTURE_2D, None);
    Ok(texture)
}

fn create_vertex_data<T: LabelData>(
    current: &T,
    next: &T,
    canvas: &HtmlCanvasElement,
    scale: f32,
    margin: f32,
    a0: f32,
    a1: f32,
) -> Vec<f32> {
    let original_width = (canvas.width() as f32 - 2. * margin) / scale;
    let original_height = (canvas.height() as f32 - 2. * margin) / scale;
    let x_offset = match DxBase::new(&next.dx_base()) {
        DxBase::Left => original_width / 2.,
        DxBase::Right => -original_width / 2.,
        DxBase::Center => 0.,
    };
    let y_offset = match DyBase::new(&next.dy_base()) {
        DyBase::Top => original_height / 2.,
        DyBase::Bottom => -original_height / 2.,
        DyBase::Middle => 0.,
    };
    vec![
        0.0,
        1.0,
        (current.x() + x_offset - original_width / 2.) as f32,
        (current.y() + y_offset + original_height / 2.) as f32,
        (next.x() + x_offset - original_width / 2.) as f32,
        (next.y() + y_offset + original_height / 2.) as f32,
        a0,
        a1,
        1.0,
        1.0,
        (current.x() + x_offset + original_width / 2.) as f32,
        (current.y() + y_offset + original_height / 2.) as f32,
        (next.x() + x_offset + original_width / 2.) as f32,
        (next.y() + y_offset + original_height / 2.) as f32,
        a0,
        a1,
        0.0,
        0.0,
        (current.x() + x_offset - original_width / 2.) as f32,
        (current.y() + y_offset - original_height / 2.) as f32,
        (next.x() + x_offset - original_width / 2.) as f32,
        (next.y() + y_offset - original_height / 2.) as f32,
        a0,
        a1,
        1.0,
        0.0,
        (current.x() + x_offset + original_width / 2.) as f32,
        (current.y() + y_offset - original_height / 2.) as f32,
        (next.x() + x_offset + original_width / 2.) as f32,
        (next.y() + y_offset - original_height / 2.) as f32,
        a0,
        a1,
    ]
}

pub struct LabelMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    texture: WebGlTexture,
}

impl LabelMeshGeometry {
    fn new<T: LabelData>(
        gl: &GL,
        program: &WebGlProgram,
        current: &T,
        next: &T,
        a0: f32,
        a1: f32,
    ) -> Result<LabelMeshGeometry, JsValue> {
        let scale = 16.;
        let margin = 8.;
        let canvas = create_text_image(
            &next.text(),
            scale,
            margin,
            next.font_size(),
            &next.font_family(),
            next.fill_color_r(),
            next.fill_color_g(),
            next.fill_color_b(),
            next.fill_color_opacity(),
            next.stroke_color_r(),
            next.stroke_color_g(),
            next.stroke_color_b(),
            next.stroke_color_opacity(),
            next.stroke_width(),
            next.text_align(),
        )?;
        let texture = create_texture(gl, &canvas)?;

        let vertex_data = create_vertex_data(current, next, &canvas, scale, margin, a0, a1);
        let element_data = vec![0, 1, 2, 3];

        let texture_coord_location = gl.get_attrib_location(program, "aTextureCoord") as u32;
        let position0_location = gl.get_attrib_location(program, "aPosition0") as u32;
        let position1_location = gl.get_attrib_location(program, "aPosition1") as u32;
        let alpha0_location = gl.get_attrib_location(program, "aAlpha0") as u32;
        let alpha1_location = gl.get_attrib_location(program, "aAlpha1") as u32;

        let vao = init_vertex_array(
            gl,
            &vertex_data,
            &element_data,
            &[
                (texture_coord_location, 2),
                (position0_location, 2),
                (position1_location, 2),
                (alpha0_location, 1),
                (alpha1_location, 1),
            ],
        )?;
        Ok(LabelMeshGeometry {
            vao,
            program: program.clone(),
            texture,
        })
    }
}

impl MeshGeometry for LabelMeshGeometry {
    fn mode(&self) -> u32 {
        GL::TRIANGLE_STRIP
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn vao(&self) -> &WebGlVertexArrayObject {
        &self.vao
    }

    fn size(&self) -> i32 {
        4
    }

    fn texture(&self) -> Option<&WebGlTexture> {
        Some(&self.texture)
    }
}

pub struct LabelMesh {
    program: WebGlProgram,
}

impl LabelMesh {
    pub fn new(gl: &GL) -> Result<LabelMesh, JsValue> {
        let program = create_label_shader_program(gl)?;
        Ok(LabelMesh { program })
    }
}

impl Mesh for LabelMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<dyn MeshGeometry>>,
    ) -> Result<(), JsValue> {
        for node in &layout.enter.nodes {
            if node.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, node, node, 0.0, 1.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for link in &layout.enter.links {
            if link.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, link, link, 0.0, 1.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for group in &layout.enter.groups {
            if group.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, group, group, 0.0, 1.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for node in &layout.update.nodes {
            if node.next.label.len() > 0 {
                let geometry =
                    LabelMeshGeometry::new(gl, &self.program, &node.current, &node.next, 1.0, 1.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for link in &layout.update.links {
            if link.next.label.len() > 0 {
                let geometry =
                    LabelMeshGeometry::new(gl, &self.program, &link.current, &link.next, 1.0, 1.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for group in &layout.update.groups {
            if group.next.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(
                    gl,
                    &self.program,
                    &group.current,
                    &group.next,
                    1.0,
                    1.0,
                )?;
                geometries.push(Box::new(geometry));
            }
        }
        for node in &layout.exit.nodes {
            if node.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, node, node, 1.0, 0.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for link in &layout.exit.links {
            if link.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, link, link, 1.0, 0.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        for group in &layout.exit.groups {
            if group.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, &self.program, group, group, 1.0, 0.0)?;
                geometries.push(Box::new(geometry));
            }
        }
        Ok(())
    }
}
