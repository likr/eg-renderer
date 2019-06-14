use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{ColorData, LayoutData, Mesh, MeshGeometry, VertexData};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    CanvasRenderingContext2d, HtmlCanvasElement, WebGl2RenderingContext, WebGlBuffer, WebGlProgram,
    WebGlTexture, WebGlVertexArrayObject,
};

const LABEL_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition0;
layout(location = 1) in vec2 aPosition1;
layout(location = 2) in vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vTextureCoord;
void main() {
  vTextureCoord = aTextureCoord;
  gl_Position = uPMatrix * uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 0.0, 1.0);
}
"#;

const LABEL_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
uniform sampler2D image;
in vec2 vTextureCoord;
out vec4 oFragColor;
void main() {
  vec4 smpColor = texture(image, vTextureCoord);
  oFragColor = smpColor;
}
"#;

fn create_text_image(
    text: &String,
    scale: f64,
    margin: f64,
    label_font_size: f64,
    label_font_family: &String,
    label_fill_color: &ColorData,
    label_stroke_color: &ColorData,
    label_stroke_width: f64,
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
    ctx.set_line_width(label_stroke_width * scale);
    let bbox = ctx.measure_text(&text)?;

    canvas.set_width(((bbox.width() + margin) * scale) as u32);
    canvas.set_height(((label_font_size + margin) * scale) as u32);

    ctx.set_font(&format!(
        "{}px {}",
        label_font_size * scale,
        label_font_family
    ));
    ctx.set_text_align("center");
    ctx.set_text_baseline("middle");
    ctx.set_line_width(label_stroke_width * scale);
    ctx.set_fill_style(
        &format!(
            "rgb({},{},{})",
            label_fill_color.r, label_fill_color.g, label_fill_color.b
        )
        .into(),
    );
    ctx.set_stroke_style(
        &format!(
            "rgb({},{},{})",
            label_stroke_color.r, label_stroke_color.g, label_stroke_color.b
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

fn init_vertex_array(
    gl: &WebGl2RenderingContext,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, JsValue> {
    let position0_location = gl.get_attrib_location(program, "aPosition0");
    let position1_location = gl.get_attrib_location(program, "aPosition1");
    let texture_coord_location = gl.get_attrib_location(program, "aTextureCoord");
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    gl.bind_buffer(WebGl2RenderingContext::ARRAY_BUFFER, Some(&vertex_buffer));
    gl.bind_buffer(
        WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
        Some(&element_buffer),
    );
    gl.enable_vertex_attrib_array(position0_location as u32);
    gl.enable_vertex_attrib_array(position1_location as u32);
    gl.enable_vertex_attrib_array(texture_coord_location as u32);
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        24,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        24,
        8,
    );
    gl.vertex_attrib_pointer_with_i32(
        texture_coord_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        24,
        16,
    );
    Ok(array)
}

struct VertexBuffer {
    buffer: WebGlBuffer,
    data: Vec<f32>,
}

impl VertexBuffer {
    fn new(
        gl: &WebGl2RenderingContext,
        current: &VertexData,
        next: &VertexData,
        canvas: &HtmlCanvasElement,
        scale: f64,
    ) -> Result<VertexBuffer, JsValue> {
        let width = canvas.width() as f64 / scale;
        let height = canvas.height() as f64 / scale;
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = vec![
            (current.x - width / 2.) as f32,
            (current.y + height / 2.) as f32,
            (next.x - width / 2.) as f32,
            (next.y + height / 2.) as f32,
            0.0,
            1.0,
            (current.x + width / 2.) as f32,
            (current.y + height / 2.) as f32,
            (next.x + width / 2.) as f32,
            (next.y + height / 2.) as f32,
            1.0,
            1.0,
            (current.x - width / 2.) as f32,
            (current.y - height / 2.) as f32,
            (next.x - width / 2.) as f32,
            (next.y - height / 2.) as f32,
            0.0,
            0.0,
            (current.x + width / 2.) as f32,
            (current.y - height / 2.) as f32,
            (next.x + width / 2.) as f32,
            (next.y - height / 2.) as f32,
            1.0,
            0.0,
        ];
        let obj = VertexBuffer { buffer, data };
        Ok(obj)
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    fn new(gl: &WebGl2RenderingContext) -> Result<ElementBuffer, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = vec![0 as u32, 1 as u32, 2 as u32, 3 as u32, 2 as u32, 1 as u32];
        let obj = ElementBuffer { buffer, data };
        Ok(obj)
    }
}

pub struct LabelMeshGeometry {
    _vertices: VertexBuffer,
    elements: ElementBuffer,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    texture: WebGlTexture,
}

impl LabelMeshGeometry {
    fn new(
        gl: &WebGl2RenderingContext,
        program: WebGlProgram,
        current: &VertexData,
        next: &VertexData,
    ) -> Result<LabelMeshGeometry, JsValue> {
        let scale = 10.0;
        let canvas = create_text_image(
            &next.label,
            scale,
            1.0,
            next.label_font_size,
            &next.label_font_family,
            &next.label_fill_color,
            &next.label_stroke_color,
            next.label_stroke_width,
        )?;
        let texture = create_texture(gl, &canvas)?;
        let vertices = VertexBuffer::new(gl, current, next, &canvas, scale)?;
        let elements = ElementBuffer::new(gl)?;
        let vao = init_vertex_array(gl, &program, &vertices.buffer, &elements.buffer)?;
        gl.bind_buffer(WebGl2RenderingContext::ARRAY_BUFFER, Some(&vertices.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                vertices.data.as_ptr() as *const u8,
                vertices.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );
        gl.bind_buffer(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            Some(&elements.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                elements.data.as_ptr() as *const u8,
                elements.data.len() * std::mem::size_of::<u32>(),
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );
        Ok(LabelMeshGeometry {
            _vertices: vertices,
            elements,
            vao,
            program,
            texture,
        })
    }
}

impl MeshGeometry for LabelMeshGeometry {
    fn mode(&self) -> u32 {
        WebGl2RenderingContext::TRIANGLES
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn vao(&self) -> &WebGlVertexArrayObject {
        &self.vao
    }

    fn size(&self) -> i32 {
        self.elements.data.len() as i32
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
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        for node in &layout.enter.vertices {
            if node.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, self.program.clone(), &node, &node)?;
                geometries.push(Box::new(geometry));
            }
        }
        for node in &layout.update.vertices {
            if node.next.label.len() > 0 {
                let geometry =
                    LabelMeshGeometry::new(gl, self.program.clone(), &node.current, &node.next)?;
                geometries.push(Box::new(geometry));
            }
        }
        for node in &layout.exit.vertices {
            if node.label.len() > 0 {
                let geometry = LabelMeshGeometry::new(gl, self.program.clone(), &node, &node)?;
                geometries.push(Box::new(geometry));
            }
        }
        Ok(())
    }
}
