use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{LayoutData, Mesh, VertexData};
use web_sys::{WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject};

const CIRCLE_NODE_ATTRIBUTES: usize = 18;

const CIRCLE_NODE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec3 aPosition0;
layout(location = 1) in vec3 aPosition1;
layout(location = 2) in vec4 aColor0;
layout(location = 3) in vec4 aColor1;
layout(location = 4) in vec2 aSize0;
layout(location = 5) in vec2 aSize1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;
void main() {
  vec4 mvPosition = uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0);
  gl_PointSize = aSize0.x * uMVMatrix[0][0];
  gl_Position = uPMatrix * mvPosition;
  vColor = r * aColor1 + (1.0 - r) * aColor0;
}
"#;

const CIRCLE_NODE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;
void main() {
  vec3 n;
  n.xy = gl_PointCoord * 2.0 - 1.0;
  n.z = 1.0 - dot( n.xy, n.xy );
  if (n.z < 0.0) {
    discard;
  }
  oFragColor = vColor;
}
"#;

fn create_node_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, String> {
    let vertex_shader = init_vertex_shader(gl, CIRCLE_NODE_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, CIRCLE_NODE_FRAGMENT_SHADER_SOURCE)?;
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
    let color0_location = gl.get_attrib_location(program, "aColor0");
    let color1_location = gl.get_attrib_location(program, "aColor1");
    let size0_location = gl.get_attrib_location(program, "aSize0");
    let size1_location = gl.get_attrib_location(program, "aSize1");
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
    gl.enable_vertex_attrib_array(color0_location as u32);
    gl.enable_vertex_attrib_array(color1_location as u32);
    gl.enable_vertex_attrib_array(size0_location as u32);
    gl.enable_vertex_attrib_array(size1_location as u32);
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        3,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        3,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        12,
    );
    gl.vertex_attrib_pointer_with_i32(
        color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        24,
    );
    gl.vertex_attrib_pointer_with_i32(
        color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        40,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        56,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        64,
    );
    Ok(array)
}

struct VertexBuffer {
    buffer: WebGlBuffer,
    data: Vec<f32>,
}

impl VertexBuffer {
    fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<VertexBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let mut obj = VertexBuffer { buffer, data };
        obj.resize(n);
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(CIRCLE_NODE_ATTRIBUTES * n, 0.);
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<ElementBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let mut obj = ElementBuffer { buffer, data };
        obj.resize(n);
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(n, 0);
        for i in 0..n {
            self.data[i] = i as u32;
        }
    }
}

pub struct CircleNodes {
    program: WebGlProgram,
    vertices: VertexBuffer,
    elements: ElementBuffer,
    geometry: WebGlVertexArrayObject,
}

impl CircleNodes {
    pub fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<CircleNodes, String> {
        let vertices = VertexBuffer::new(gl, n)?;
        let elements = ElementBuffer::new(gl, n)?;
        let program = create_node_shader_program(gl)?;
        let geometry = init_vertex_array(gl, &program, &vertices.buffer, &elements.buffer)?;
        Ok(CircleNodes {
            vertices,
            elements,
            program,
            geometry,
        })
    }

    pub fn resize(&mut self, n: usize) {
        self.vertices.resize(n);
        self.elements.resize(n);
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), String> {
        let e = self
            .vertices
            .data
            .get_mut(CIRCLE_NODE_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: {}", index))?;
        *e = value;
        Ok(())
    }

    fn set_current_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 0)
    }

    fn set_current_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 1)
    }

    fn set_current_z(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 2)
    }

    fn set_next_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 3)
    }

    fn set_next_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 4)
    }

    fn set_next_z(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 5)
    }

    fn set_current_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 6)
    }

    fn set_current_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 7)
    }

    fn set_current_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 8)
    }

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 9)
    }

    fn set_next_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 10)
    }

    fn set_next_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 11)
    }

    fn set_next_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 12)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 13)
    }

    fn set_current_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 14)
    }

    fn set_current_height(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 15)
    }

    fn set_next_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 16)
    }

    fn set_next_height(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 17)
    }

    fn set_item(
        &mut self,
        index: usize,
        current: &VertexData,
        next: &VertexData,
        a0: f32,
        a1: f32,
    ) -> Result<(), String> {
        self.set_current_x(index, current.x as f32)?;
        self.set_current_y(index, current.y as f32)?;
        self.set_current_z(index, 0.)?;
        self.set_next_x(index, next.x as f32)?;
        self.set_next_y(index, next.y as f32)?;
        self.set_next_z(index, 0.)?;
        self.set_current_r(index, (current.fillColor.r / 255.) as f32)?;
        self.set_current_g(index, (current.fillColor.g / 255.) as f32)?;
        self.set_current_b(index, (current.fillColor.b / 255.) as f32)?;
        self.set_current_alpha(index, a0)?;
        self.set_next_r(index, (next.fillColor.r / 255.) as f32)?;
        self.set_next_g(index, (next.fillColor.g / 255.) as f32)?;
        self.set_next_b(index, (next.fillColor.b / 255.) as f32)?;
        self.set_next_alpha(index, a1)?;
        self.set_current_width(index, current.width as f32)?;
        self.set_current_height(index, current.height as f32)?;
        self.set_next_width(index, next.width as f32)?;
        self.set_next_height(index, next.height as f32)?;
        Ok(())
    }
}

impl Mesh for CircleNodes {
    fn mode(&self) -> u32 {
        WebGl2RenderingContext::POINTS
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn geometry(&self) -> &WebGlVertexArrayObject {
        &self.geometry
    }

    fn size(&self) -> i32 {
        self.elements.data.len() as i32
    }

    fn update(&mut self, layout: &LayoutData) -> Result<(), String> {
        let n =
            layout.enter.vertices.len() + layout.update.vertices.len() + layout.exit.vertices.len();
        self.resize(n);

        let mut offset = 0;
        for node in &layout.enter.vertices {
            self.set_item(offset, node, node, 0., 1.)?;
            offset += 1;
        }
        for node in &layout.update.vertices {
            self.set_item(
                offset,
                &node.current,
                &node.next,
                node.current.fillColor.alpha as f32,
                node.next.fillColor.alpha as f32,
            )?;
            offset += 1
        }
        for node in &layout.exit.vertices {
            self.set_item(offset, node, node, 1., 0.)?;
            offset += 1;
        }

        Ok(())
    }
}
