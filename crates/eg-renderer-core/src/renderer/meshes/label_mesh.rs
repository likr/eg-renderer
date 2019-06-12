use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{LayoutData, Mesh, MeshGeometry, VertexData};
use web_sys::{
    WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlTexture, WebGlVertexArrayObject,
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
  // oFragColor = smpColor;
  oFragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
"#;

fn create_label_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, String> {
    let vertex_shader = init_vertex_shader(gl, LABEL_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LABEL_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn init_vertex_array(
    gl: &WebGl2RenderingContext,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, String> {
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
    ) -> Result<VertexBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = vec![
            (current.x - (current.width + current.stroke_width) / 2.) as f32,
            (current.y - (current.height + current.stroke_width) / 2.) as f32,
            (next.x - (next.width + next.stroke_width) / 2.) as f32,
            (next.y - (next.height + next.stroke_width) / 2.) as f32,
            0.0,
            1.0,
            (current.x + (current.width + current.stroke_width) / 2.) as f32,
            (current.y - (current.height + current.stroke_width) / 2.) as f32,
            (next.x + (next.width + next.stroke_width) / 2.) as f32,
            (next.y - (next.height + next.stroke_width) / 2.) as f32,
            0.0,
            1.0,
            (current.x - (current.width + current.stroke_width) / 2.) as f32,
            (current.y + (current.height + current.stroke_width) / 2.) as f32,
            (next.x - (next.width + next.stroke_width) / 2.) as f32,
            (next.y + (next.height + next.stroke_width) / 2.) as f32,
            0.0,
            1.0,
            (current.x + (current.width + current.stroke_width) / 2.) as f32,
            (current.y + (current.height + current.stroke_width) / 2.) as f32,
            (next.x + (next.width + next.stroke_width) / 2.) as f32,
            (next.y + (next.height + next.stroke_width) / 2.) as f32,
            0.0,
            1.0,
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
    fn new(gl: &WebGl2RenderingContext) -> Result<ElementBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = vec![0 as u32, 1 as u32, 2 as u32, 1 as u32, 2 as u32, 3 as u32];
        let obj = ElementBuffer { buffer, data };
        Ok(obj)
    }
}

pub struct LabelMeshGeometry {
    _vertices: VertexBuffer,
    elements: ElementBuffer,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
}

impl LabelMeshGeometry {
    fn new(
        gl: &WebGl2RenderingContext,
        program: WebGlProgram,
        current: &VertexData,
        next: &VertexData,
    ) -> Result<LabelMeshGeometry, String> {
        let vertices = VertexBuffer::new(gl, current, next)?;
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
        None
    }
}

pub struct LabelMesh {
    program: WebGlProgram,
}

impl LabelMesh {
    pub fn new(gl: &WebGl2RenderingContext) -> Result<LabelMesh, String> {
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
    ) -> Result<(), String> {
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
