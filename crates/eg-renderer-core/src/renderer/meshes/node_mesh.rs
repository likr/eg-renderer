use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{LayoutData, Mesh, MeshGeometry, VertexData};
use wasm_bindgen::prelude::*;
use web_sys::{
    WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlTexture, WebGlVertexArrayObject,
};

#[derive(Clone)]
pub enum NodeType {
    Circle,
    Rectangle,
}

const NODE_ATTRIBUTES: usize = 32;

const NODE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
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
uniform vec2 uResolution;
out vec2 vPosition;
out vec4 vColor;
out vec2 vCenterPosition;
out vec2 vSize;
out vec4 vStrokeColor;
out float vStrokeWidth;
out float vPixelWidth;

void main() {
    float alpha = mix(aAlpha0, aAlpha1, r);
    vPosition = mix(aPosition0, aPosition1, r);
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vSize = mix(aSize0, aSize1, r);
    vStrokeColor = mix(aStrokeColor0, aStrokeColor1, r);
    vStrokeColor.a *= alpha;
    vStrokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    vec4 tmp = inverse(uPMatrix * uMVMatrix) * (2.0 / uResolution.x * vec4(1.0, 0.0, 0.0, 1.0));
    vPixelWidth = (tmp.x - tmp.y) * 1.0;
}
"#;

const CIRCLE_NODE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision highp float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
in vec4 vStrokeColor;
in float vStrokeWidth;
in float vPixelWidth;
out vec4 oFragColor;

float calcR(vec2 size, float theta) {
    vec2 tmp = vec2(1.0 / size.x, tan(theta) / size.y);
    float x = sqrt(1.0 / dot(tmp, tmp));
    float y = x * tan(theta);
    vec2 v = vec2(x, y);
    return sqrt(dot(v, v));
}

void main() {
    vec2 pos = vPosition - vCenterPosition;
    float theta = atan(pos.y, pos.x);
    float outerR = calcR((vSize + vStrokeWidth) / 2.0, theta);
    float innerR = calcR((vSize - vStrokeWidth) / 2.0, theta);
    float d = sqrt(dot(pos, pos));

    if (d > outerR) {
        discard;
    } else if (d > innerR) {
        oFragColor = vStrokeColor;
    } else {
        oFragColor = vColor;
    }

    // if (d > (outerR + innerR) / 2.0) {
    //     vec4 c = vStrokeColor;
    //     c.a = 0.0;
    //     oFragColor = mix(vStrokeColor, c, smoothstep(0.0, vPixelWidth, d - outerR));
    // } else {
    //     oFragColor = mix(vColor, vStrokeColor, smoothstep(0.0, vPixelWidth, d - innerR));
    // }
}
"#;

const RECTANGLE_NODE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
in vec4 vStrokeColor;
in float vStrokeWidth;
out vec4 oFragColor;
void main() {
    vec2 v = abs(vPosition - vCenterPosition) - (vSize - vStrokeWidth) / 2.0;
    if (v.x > 0.0 || v.y > 0.0) {
        oFragColor = vStrokeColor;
    } else {
        oFragColor = vColor;
    }
}
"#;

fn create_node_shader_program(
    gl: &WebGl2RenderingContext,
    node_type: &NodeType,
) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, NODE_VERTEX_SHADER_SOURCE)?;
    let fragment_shader_source = if let NodeType::Circle = node_type {
        CIRCLE_NODE_FRAGMENT_SHADER_SOURCE
    } else {
        RECTANGLE_NODE_FRAGMENT_SHADER_SOURCE
    };
    let fragment_shader = init_fragment_shader(gl, fragment_shader_source)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn init_vertex_array(
    gl: &WebGl2RenderingContext,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, JsValue> {
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
    fn new(gl: &WebGl2RenderingContext) -> Result<VertexBuffer, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let obj = VertexBuffer { buffer, data };
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(4 * NODE_ATTRIBUTES * n, 0.);
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    fn new(gl: &WebGl2RenderingContext) -> Result<ElementBuffer, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let obj = ElementBuffer { buffer, data };
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(6 * n, 0);
        for i in 0..n {
            self.data[6 * i] = (4 * i) as u32;
            self.data[6 * i + 1] = (4 * i + 1) as u32;
            self.data[6 * i + 2] = (4 * i + 2) as u32;
            self.data[6 * i + 3] = (4 * i + 1) as u32;
            self.data[6 * i + 4] = (4 * i + 2) as u32;
            self.data[6 * i + 5] = (4 * i + 3) as u32;
        }
    }
}

pub struct NodeMeshGeometry {
    vertices: VertexBuffer,
    elements: ElementBuffer,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    node_type: NodeType,
}

impl NodeMeshGeometry {
    fn new(
        gl: &WebGl2RenderingContext,
        program: WebGlProgram,
        node_type: NodeType,
    ) -> Result<NodeMeshGeometry, JsValue> {
        let vertices = VertexBuffer::new(gl)?;
        let elements = ElementBuffer::new(gl)?;
        let vao = init_vertex_array(gl, &program, &vertices.buffer, &elements.buffer)?;
        Ok(NodeMeshGeometry {
            vertices,
            elements,
            vao,
            program,
            node_type,
        })
    }

    pub fn resize(&mut self, n: usize) {
        self.vertices.resize(n);
        self.elements.resize(n);
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), JsValue> {
        let e = self
            .vertices
            .data
            .get_mut(NODE_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: {}", index))?;
        *e = value;
        Ok(())
    }

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 0)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 1)
    }

    fn set_current_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 2)
    }

    fn set_current_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 3)
    }

    fn set_next_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 4)
    }

    fn set_next_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 5)
    }

    fn set_current_fill_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 6)
    }

    fn set_current_fill_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 7)
    }

    fn set_current_fill_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 8)
    }

    fn set_current_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 9)
    }

    fn set_next_fill_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 10)
    }

    fn set_next_fill_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 11)
    }

    fn set_next_fill_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 12)
    }

    fn set_next_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 13)
    }

    fn set_current_center_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 14)
    }

    fn set_current_center_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 15)
    }

    fn set_next_center_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 16)
    }

    fn set_next_center_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 17)
    }

    fn set_current_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 18)
    }

    fn set_current_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 19)
    }

    fn set_next_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 20)
    }

    fn set_next_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 21)
    }

    fn set_current_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 22)
    }

    fn set_current_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 23)
    }

    fn set_current_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 24)
    }

    fn set_current_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 25)
    }

    fn set_next_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 26)
    }

    fn set_next_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 27)
    }

    fn set_next_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 28)
    }

    fn set_next_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 29)
    }

    fn set_current_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 30)
    }

    fn set_next_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 31)
    }

    fn set_item(
        &mut self,
        index: usize,
        current: &VertexData,
        next: &VertexData,
        a0: f32,
        a1: f32,
    ) -> Result<(), JsValue> {
        let current_x = [
            current.x - (current.width + current.stroke_width) / 2.,
            current.x + (current.width + current.stroke_width) / 2.,
            current.x - (current.width + current.stroke_width) / 2.,
            current.x + (current.width + current.stroke_width) / 2.,
        ];
        let current_y = [
            current.y - (current.height + current.stroke_width) / 2.,
            current.y - (current.height + current.stroke_width) / 2.,
            current.y + (current.height + current.stroke_width) / 2.,
            current.y + (current.height + current.stroke_width) / 2.,
        ];
        let next_x = [
            next.x - (next.width + next.stroke_width) / 2.,
            next.x + (next.width + next.stroke_width) / 2.,
            next.x - (next.width + next.stroke_width) / 2.,
            next.x + (next.width + next.stroke_width) / 2.,
        ];
        let next_y = [
            next.y - (next.height + next.stroke_width) / 2.,
            next.y - (next.height + next.stroke_width) / 2.,
            next.y + (next.height + next.stroke_width) / 2.,
            next.y + (next.height + next.stroke_width) / 2.,
        ];
        for i in 0..4 {
            self.set_current_alpha(index * 4 + i, a0)?;
            self.set_next_alpha(index * 4 + i, a1)?;
            self.set_current_x(index * 4 + i, current_x[i] as f32)?;
            self.set_current_y(index * 4 + i, current_y[i] as f32)?;
            self.set_next_x(index * 4 + i, next_x[i] as f32)?;
            self.set_next_y(index * 4 + i, next_y[i] as f32)?;
            self.set_current_fill_r(index * 4 + i, (current.fill_color.r / 255.) as f32)?;
            self.set_current_fill_g(index * 4 + i, (current.fill_color.g / 255.) as f32)?;
            self.set_current_fill_b(index * 4 + i, (current.fill_color.b / 255.) as f32)?;
            self.set_current_fill_alpha(index * 4 + i, current.fill_color.opacity as f32)?;
            self.set_next_fill_r(index * 4 + i, (next.fill_color.r / 255.) as f32)?;
            self.set_next_fill_g(index * 4 + i, (next.fill_color.g / 255.) as f32)?;
            self.set_next_fill_b(index * 4 + i, (next.fill_color.b / 255.) as f32)?;
            self.set_next_fill_alpha(index * 4 + i, next.fill_color.opacity as f32)?;
            self.set_current_center_x(index * 4 + i, current.x as f32)?;
            self.set_current_center_y(index * 4 + i, current.y as f32)?;
            self.set_next_center_x(index * 4 + i, next.x as f32)?;
            self.set_next_center_y(index * 4 + i, next.y as f32)?;
            self.set_current_width(index * 4 + i, current.width as f32)?;
            self.set_current_height(index * 4 + i, current.height as f32)?;
            self.set_next_width(index * 4 + i, next.width as f32)?;
            self.set_next_height(index * 4 + i, next.height as f32)?;
            self.set_current_stroke_r(index * 4 + i, (current.stroke_color.r / 255.) as f32)?;
            self.set_current_stroke_g(index * 4 + i, (current.stroke_color.g / 255.) as f32)?;
            self.set_current_stroke_b(index * 4 + i, (current.stroke_color.b / 255.) as f32)?;
            self.set_current_stroke_alpha(index * 4 + i, current.stroke_color.opacity as f32)?;
            self.set_next_stroke_r(index * 4 + i, (next.stroke_color.r / 255.) as f32)?;
            self.set_next_stroke_g(index * 4 + i, (next.stroke_color.g / 255.) as f32)?;
            self.set_next_stroke_b(index * 4 + i, (next.stroke_color.b / 255.) as f32)?;
            self.set_next_stroke_alpha(index * 4 + i, next.stroke_color.opacity as f32)?;
            self.set_current_stroke_width(index * 4 + i, current.stroke_width as f32)?;
            self.set_next_stroke_width(index * 4 + i, next.stroke_width as f32)?;
        }
        Ok(())
    }

    fn is_same_node_type(&self, s: &String) -> bool {
        match self.node_type {
            NodeType::Circle => s == "circle",
            NodeType::Rectangle => s == "rect",
        }
    }

    fn update(&mut self, gl: &WebGl2RenderingContext, layout: &LayoutData) -> Result<(), JsValue> {
        let mut n = 0;
        for node in &layout.enter.vertices {
            if self.is_same_node_type(&node.shape) {
                n += 1;
            }
        }
        for node in &layout.update.vertices {
            if self.is_same_node_type(&node.next.shape) {
                n += 1;
            }
        }
        for node in &layout.exit.vertices {
            if self.is_same_node_type(&node.shape) {
                n += 1;
            }
        }
        self.resize(n);

        let mut offset = 0;
        for node in &layout.enter.vertices {
            if self.is_same_node_type(&node.shape) {
                self.set_item(offset, node, node, 0., 1.)?;
                offset += 1;
            }
        }
        for node in &layout.update.vertices {
            if self.is_same_node_type(&node.next.shape) {
                self.set_item(offset, &node.current, &node.next, 1., 1.)?;
                offset += 1
            }
        }
        for node in &layout.exit.vertices {
            if self.is_same_node_type(&node.shape) {
                self.set_item(offset, node, node, 1., 0.)?;
                offset += 1;
            }
        }

        gl.bind_buffer(
            WebGl2RenderingContext::ARRAY_BUFFER,
            Some(&self.vertices.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.vertices.data.as_ptr() as *const u8,
                self.vertices.data.len() * std::mem::size_of::<f32>(),
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
                self.elements.data.len() * std::mem::size_of::<u32>(),
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

impl MeshGeometry for NodeMeshGeometry {
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

pub struct NodeMesh {
    program: WebGlProgram,
    node_type: NodeType,
}

impl NodeMesh {
    pub fn new(gl: &WebGl2RenderingContext, node_type: NodeType) -> Result<NodeMesh, JsValue> {
        let program = create_node_shader_program(gl, &node_type)?;
        Ok(NodeMesh { program, node_type })
    }
}

impl Mesh for NodeMesh {
    fn update(
        &self,
        gl: &WebGl2RenderingContext,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let mut geometry = NodeMeshGeometry::new(gl, self.program.clone(), self.node_type.clone())?;
        geometry.update(gl, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
