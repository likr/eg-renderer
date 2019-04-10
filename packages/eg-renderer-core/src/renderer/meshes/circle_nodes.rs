use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{LayoutData, Mesh, VertexData};
use web_sys::{WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject};

const CIRCLE_NODE_ATTRIBUTES: usize = 32;

const CIRCLE_NODE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in float aAlpha0;
layout(location = 1) in float aAlpha1;
layout(location = 2) in vec2 aPosition0;
layout(location = 3) in vec2 aPosition1;
layout(location = 4) in vec4 aColor0;
layout(location = 5) in vec4 aColor1;
layout(location = 6) in vec2 aCenterPosition0;
layout(location = 7) in vec2 aCenterPosition1;
layout(location = 8) in vec2 aSize0;
layout(location = 9) in vec2 aSize1;
layout(location = 10) in vec4 aStrokeColor0;
layout(location = 11) in vec4 aStrokeColor1;
layout(location = 12) in float aStrokeWidth0;
layout(location = 13) in float aStrokeWidth1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vPosition;
out vec4 vColor;
out vec2 vCenterPosition;
out vec2 vSize;
out vec4 vStrokeColor;
out float vStrokeWidth;

void main() {
  float alpha = r * aAlpha1 + (1.0 - r) * aAlpha0;
  vPosition = r * aPosition1 + (1.0 - r) * aPosition0;
  vec4 mvPosition = uMVMatrix * vec4(vPosition, 1.0, 1.0);
  gl_Position = uPMatrix * mvPosition;
  vColor = r * aColor1 + (1.0 - r) * aColor0;
  vColor.a *= alpha;
  vCenterPosition = r * aCenterPosition1 + (1.0 - r) * aCenterPosition0;
  vSize = r * aSize1 + (1.0 - r) * aSize0;
  vStrokeColor = r * aStrokeColor1 + (1.0 - r) * aStrokeColor0;
  vStrokeColor.a *= alpha;
  vStrokeWidth = r * aStrokeWidth1 + (1.0 - r) * aStrokeWidth0;
}
"#;

const CIRCLE_NODE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
in vec4 vStrokeColor;
in float vStrokeWidth;
out vec4 oFragColor;
void main() {
  vec2 v1 = 2.0 * (vPosition - vCenterPosition) / (vSize + vStrokeWidth);
  if (dot(v1, v1) > 1.0) {
    discard;
  }
  vec2 v2 = 2.0 * (vPosition - vCenterPosition) / (vSize - vStrokeWidth);
  if (dot(v2, v2) > 1.0) {
    oFragColor = vStrokeColor;
  } else {
    oFragColor = vColor;
  }
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
    let alpha0_location = gl.get_attrib_location(program, "aAlpha0");
    let alpha1_location = gl.get_attrib_location(program, "aAlpha1");
    let position0_location = gl.get_attrib_location(program, "aPosition0");
    let position1_location = gl.get_attrib_location(program, "aPosition1");
    let color0_location = gl.get_attrib_location(program, "aColor0");
    let color1_location = gl.get_attrib_location(program, "aColor1");
    let center_position0_location = gl.get_attrib_location(program, "aCenterPosition0");
    let center_position1_location = gl.get_attrib_location(program, "aCenterPosition1");
    let size0_location = gl.get_attrib_location(program, "aSize0");
    let size1_location = gl.get_attrib_location(program, "aSize1");
    let stroke_color0_location = gl.get_attrib_location(program, "aStrokeColor0");
    let stroke_color1_location = gl.get_attrib_location(program, "aStrokeColor1");
    let stroke_width0_location = gl.get_attrib_location(program, "aStrokeWidth0");
    let stroke_width1_location = gl.get_attrib_location(program, "aStrokeWidth1");
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    gl.bind_buffer(WebGl2RenderingContext::ARRAY_BUFFER, Some(&vertex_buffer));
    gl.bind_buffer(
        WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
        Some(&element_buffer),
    );
    gl.enable_vertex_attrib_array(alpha0_location as u32);
    gl.enable_vertex_attrib_array(alpha1_location as u32);
    gl.enable_vertex_attrib_array(position0_location as u32);
    gl.enable_vertex_attrib_array(position1_location as u32);
    gl.enable_vertex_attrib_array(color0_location as u32);
    gl.enable_vertex_attrib_array(color1_location as u32);
    gl.enable_vertex_attrib_array(center_position0_location as u32);
    gl.enable_vertex_attrib_array(center_position1_location as u32);
    gl.enable_vertex_attrib_array(size0_location as u32);
    gl.enable_vertex_attrib_array(size1_location as u32);
    gl.enable_vertex_attrib_array(stroke_color0_location as u32);
    gl.enable_vertex_attrib_array(stroke_color1_location as u32);
    gl.enable_vertex_attrib_array(stroke_width0_location as u32);
    gl.enable_vertex_attrib_array(stroke_width1_location as u32);
    gl.vertex_attrib_pointer_with_i32(
        alpha0_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        alpha1_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        4,
    );
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        8,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        16,
    );
    gl.vertex_attrib_pointer_with_i32(
        color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        24,
    );
    gl.vertex_attrib_pointer_with_i32(
        color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        40,
    );
    gl.vertex_attrib_pointer_with_i32(
        center_position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        56,
    );
    gl.vertex_attrib_pointer_with_i32(
        center_position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        64,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        72,
    );
    gl.vertex_attrib_pointer_with_i32(
        size1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        80,
    );
    gl.vertex_attrib_pointer_with_i32(
        stroke_color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        88,
    );
    gl.vertex_attrib_pointer_with_i32(
        stroke_color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        104,
    );
    gl.vertex_attrib_pointer_with_i32(
        stroke_width0_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        120,
    );
    gl.vertex_attrib_pointer_with_i32(
        stroke_width1_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        128,
        124,
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
        self.data.resize(4 * CIRCLE_NODE_ATTRIBUTES * n, 0.);
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u16>,
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
        self.data.resize(6 * n, 0);
        for i in 0..n {
            self.data[6 * i] = (4 * i) as u16;
            self.data[6 * i + 1] = (4 * i + 1) as u16;
            self.data[6 * i + 2] = (4 * i + 2) as u16;
            self.data[6 * i + 3] = (4 * i + 1) as u16;
            self.data[6 * i + 4] = (4 * i + 2) as u16;
            self.data[6 * i + 5] = (4 * i + 3) as u16;
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

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 0)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 1)
    }

    fn set_current_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 2)
    }

    fn set_current_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 3)
    }

    fn set_next_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 4)
    }

    fn set_next_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 5)
    }

    fn set_current_fill_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 6)
    }

    fn set_current_fill_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 7)
    }

    fn set_current_fill_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 8)
    }

    fn set_current_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 9)
    }

    fn set_next_fill_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 10)
    }

    fn set_next_fill_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 11)
    }

    fn set_next_fill_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 12)
    }

    fn set_next_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 13)
    }

    fn set_current_center_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 14)
    }

    fn set_current_center_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 15)
    }

    fn set_next_center_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 16)
    }

    fn set_next_center_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 17)
    }

    fn set_current_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 18)
    }

    fn set_current_height(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 19)
    }

    fn set_next_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 20)
    }

    fn set_next_height(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 21)
    }

    fn set_current_stroke_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 22)
    }

    fn set_current_stroke_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 23)
    }

    fn set_current_stroke_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 24)
    }

    fn set_current_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 25)
    }

    fn set_next_stroke_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 26)
    }

    fn set_next_stroke_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 27)
    }

    fn set_next_stroke_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 28)
    }

    fn set_next_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 29)
    }

    fn set_current_stroke_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 30)
    }

    fn set_next_stroke_width(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 31)
    }

    fn set_item(
        &mut self,
        index: usize,
        current: &VertexData,
        next: &VertexData,
        a0: f32,
        a1: f32,
    ) -> Result<(), String> {
        let current_x = [
            current.x - (current.width + current.strokeWidth) / 2.,
            current.x + (current.width + current.strokeWidth) / 2.,
            current.x - (current.width + current.strokeWidth) / 2.,
            current.x + (current.width + current.strokeWidth) / 2.,
        ];
        let current_y = [
            current.y - (current.height + current.strokeWidth) / 2.,
            current.y - (current.height + current.strokeWidth) / 2.,
            current.y + (current.height + current.strokeWidth) / 2.,
            current.y + (current.height + current.strokeWidth) / 2.,
        ];
        let next_x = [
            next.x - (next.width + next.strokeWidth) / 2.,
            next.x + (next.width + next.strokeWidth) / 2.,
            next.x - (next.width + next.strokeWidth) / 2.,
            next.x + (next.width + next.strokeWidth) / 2.,
        ];
        let next_y = [
            next.y - (next.height + next.strokeWidth) / 2.,
            next.y - (next.height + next.strokeWidth) / 2.,
            next.y + (next.height + next.strokeWidth) / 2.,
            next.y + (next.height + next.strokeWidth) / 2.,
        ];
        for i in 0..4 {
            self.set_current_alpha(index * 4 + i, a0)?;
            self.set_next_alpha(index * 4 + i, a1)?;
            self.set_current_x(index * 4 + i, current_x[i] as f32)?;
            self.set_current_y(index * 4 + i, current_y[i] as f32)?;
            self.set_next_x(index * 4 + i, next_x[i] as f32)?;
            self.set_next_y(index * 4 + i, next_y[i] as f32)?;
            self.set_current_fill_r(index * 4 + i, (current.fillColor.r / 255.) as f32)?;
            self.set_current_fill_g(index * 4 + i, (current.fillColor.g / 255.) as f32)?;
            self.set_current_fill_b(index * 4 + i, (current.fillColor.b / 255.) as f32)?;
            self.set_current_fill_alpha(index * 4 + i, current.fillColor.opacity as f32)?;
            self.set_next_fill_r(index * 4 + i, (next.fillColor.r / 255.) as f32)?;
            self.set_next_fill_g(index * 4 + i, (next.fillColor.g / 255.) as f32)?;
            self.set_next_fill_b(index * 4 + i, (next.fillColor.b / 255.) as f32)?;
            self.set_next_fill_alpha(index * 4 + i, next.fillColor.opacity as f32)?;
            self.set_current_center_x(index * 4 + i, current.x as f32)?;
            self.set_current_center_y(index * 4 + i, current.y as f32)?;
            self.set_next_center_x(index * 4 + i, next.x as f32)?;
            self.set_next_center_y(index * 4 + i, next.y as f32)?;
            self.set_current_width(index * 4 + i, current.width as f32)?;
            self.set_current_height(index * 4 + i, current.height as f32)?;
            self.set_next_width(index * 4 + i, next.width as f32)?;
            self.set_next_height(index * 4 + i, next.height as f32)?;
            self.set_current_stroke_r(index * 4 + i, (current.strokeColor.r / 255.) as f32)?;
            self.set_current_stroke_g(index * 4 + i, (current.strokeColor.g / 255.) as f32)?;
            self.set_current_stroke_b(index * 4 + i, (current.strokeColor.b / 255.) as f32)?;
            self.set_current_stroke_alpha(index * 4 + i, current.strokeColor.opacity as f32)?;
            self.set_next_stroke_r(index * 4 + i, (next.strokeColor.r / 255.) as f32)?;
            self.set_next_stroke_g(index * 4 + i, (next.strokeColor.g / 255.) as f32)?;
            self.set_next_stroke_b(index * 4 + i, (next.strokeColor.b / 255.) as f32)?;
            self.set_next_stroke_alpha(index * 4 + i, next.strokeColor.opacity as f32)?;
            self.set_current_stroke_width(index * 4 + i, current.strokeWidth as f32)?;
            self.set_next_stroke_width(index * 4 + i, next.strokeWidth as f32)?;
        }
        Ok(())
    }
}

impl Mesh for CircleNodes {
    fn mode(&self) -> u32 {
        WebGl2RenderingContext::TRIANGLES
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

    fn update(&mut self, gl: &WebGl2RenderingContext, layout: &LayoutData) -> Result<(), String> {
        let n =
            layout.enter.vertices.len() + layout.update.vertices.len() + layout.exit.vertices.len();
        self.resize(n);

        let mut offset = 0;
        for node in &layout.enter.vertices {
            self.set_item(offset, node, node, 0., 1.)?;
            offset += 1;
        }
        for node in &layout.update.vertices {
            self.set_item(offset, &node.current, &node.next, 1., 1.)?;
            offset += 1
        }
        for node in &layout.exit.vertices {
            self.set_item(offset, node, node, 1., 0.)?;
            offset += 1;
        }

        gl.bind_buffer(
            WebGl2RenderingContext::ARRAY_BUFFER,
            Some(&self.vertices.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.vertices.data.as_ptr() as *const u8,
                self.vertices.data.len() * 4,
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );
        gl.bind_buffer(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            Some(&self.elements.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.elements.data.as_ptr() as *const u8,
                self.elements.data.len() * 2,
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );

        Ok(())
    }
}
