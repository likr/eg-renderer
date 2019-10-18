use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{LABEL_FRAGMENT_SHADER_SOURCE, LABEL_VERTEX_SHADER_SOURCE};
use super::{init_vertex_array, LabelData, LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    CanvasRenderingContext2d, HtmlCanvasElement, WebGl2RenderingContext, WebGlProgram,
    WebGlTexture, WebGlVertexArrayObject,
};

fn create_text_image(
    text: &String,
    scale: f32,
    margin: f32,
    label_font_size: f32,
    label_font_family: &String,
    label_fill_color_r: f32,
    label_fill_color_g: f32,
    label_fill_color_b: f32,
    label_stroke_color_r: f32,
    label_stroke_color_g: f32,
    label_stroke_color_b: f32,
    label_stroke_width: f32,
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

    ctx.set_font(&format!(
        "{}px {}",
        label_font_size * scale,
        label_font_family
    ));
    ctx.set_text_align("center");
    ctx.set_text_baseline("middle");
    ctx.set_line_width((label_stroke_width * scale) as f64);
    let bbox = ctx.measure_text(&text)?;

    canvas.set_width(((bbox.width() as f32 + margin) * scale) as u32);
    canvas.set_height(((label_font_size + margin) * scale) as u32);

    ctx.set_font(&format!(
        "{}px {}",
        label_font_size * scale,
        label_font_family
    ));
    ctx.set_text_align("center");
    ctx.set_text_baseline("middle");
    ctx.set_line_width((label_stroke_width * scale) as f64);
    ctx.set_fill_style(
        &format!(
            "rgb({},{},{})",
            label_fill_color_r, label_fill_color_g, label_fill_color_b
        )
        .into(),
    );
    ctx.set_stroke_style(
        &format!(
            "rgb({},{},{})",
            label_stroke_color_r, label_stroke_color_g, label_stroke_color_b
        )
        .into(),
    );

    ctx.fill_text(
        &text,
        (canvas.width() / 2) as f64,
        (canvas.height() / 2) as f64,
    )?;
    Ok(canvas)
}

fn create_label_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, LABEL_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LABEL_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn create_texture(
    gl: &WebGl2RenderingContext,
    canvas: &HtmlCanvasElement,
) -> Result<WebGlTexture, JsValue> {
    let texture = gl.create_texture().ok_or("failed")?;
    gl.bind_texture(WebGl2RenderingContext::TEXTURE_2D, Some(&texture));
    gl.tex_image_2d_with_u32_and_u32_and_html_canvas_element(
        WebGl2RenderingContext::TEXTURE_2D,
        0,
        WebGl2RenderingContext::RGBA as i32,
        WebGl2RenderingContext::RGBA,
        WebGl2RenderingContext::UNSIGNED_BYTE,
        &canvas,
    )?;
    gl.generate_mipmap(WebGl2RenderingContext::TEXTURE_2D);
    gl.bind_texture(WebGl2RenderingContext::TEXTURE_2D, None);
    Ok(texture)
}

fn create_vertex_data<T: LabelData>(
    current: &T,
    next: &T,
    canvas: &HtmlCanvasElement,
    scale: f32,
    a0: f32,
    a1: f32,
) -> Vec<f32> {
    let width = canvas.width() as f32 / scale;
    let height = canvas.height() as f32 / scale;
    vec![
        0.0,
        1.0,
        (current.x() - width / 2.) as f32,
        (current.y() + height / 2.) as f32,
        (next.x() - width / 2.) as f32,
        (next.y() + height / 2.) as f32,
        a0,
        a1,
        1.0,
        1.0,
        (current.x() + width / 2.) as f32,
        (current.y() + height / 2.) as f32,
        (next.x() + width / 2.) as f32,
        (next.y() + height / 2.) as f32,
        a0,
        a1,
        0.0,
        0.0,
        (current.x() - width / 2.) as f32,
        (current.y() - height / 2.) as f32,
        (next.x() - width / 2.) as f32,
        (next.y() - height / 2.) as f32,
        a0,
        a1,
        1.0,
        0.0,
        (current.x() + width / 2.) as f32,
        (current.y() - height / 2.) as f32,
        (next.x() + width / 2.) as f32,
        (next.y() - height / 2.) as f32,
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
        gl: &WebGl2RenderingContext,
        program: &WebGlProgram,
        current: &T,
        next: &T,
        a0: f32,
        a1: f32,
    ) -> Result<LabelMeshGeometry, JsValue> {
        let scale = 2.0;
        let canvas = create_text_image(
            &next.text(),
            scale,
            1.0,
            next.font_size(),
            &next.font_family(),
            next.fill_color_r(),
            next.fill_color_g(),
            next.fill_color_b(),
            next.stroke_color_r(),
            next.stroke_color_g(),
            next.stroke_color_b(),
            next.stroke_width(),
        )?;
        let texture = create_texture(gl, &canvas)?;

        let vertex_data = create_vertex_data(current, next, &canvas, scale, a0, a1);
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
        WebGl2RenderingContext::TRIANGLE_STRIP
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
    pub fn new(gl: &WebGl2RenderingContext) -> Result<LabelMesh, JsValue> {
        let program = create_label_shader_program(gl)?;
        Ok(LabelMesh { program })
    }
}

impl Mesh for LabelMesh {
    fn update(
        &self,
        gl: &WebGl2RenderingContext,
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
