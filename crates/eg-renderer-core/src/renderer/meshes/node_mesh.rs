use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{
    register_vertex_attributes, register_vertex_attributes_with_divisor, Buffer, LayoutData, Mesh,
    MeshGeometry, VertexData,
};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum NodeType {
    Circle,
    Rectangle,
}

const NODE_INSTANCE_ATTRIBUTES: usize = 28;

const NODE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aAlpha0;
layout(location = 2) in float aAlpha1;
layout(location = 3) in vec4 aColor0;
layout(location = 4) in vec4 aColor1;
layout(location = 5) in vec2 aCenterPosition0;
layout(location = 6) in vec2 aCenterPosition1;
layout(location = 7) in vec2 aSize0;
layout(location = 8) in vec2 aSize1;
layout(location = 9) in vec4 aStrokeColor0;
layout(location = 10) in vec4 aStrokeColor1;
layout(location = 11) in float aStrokeWidth0;
layout(location = 12) in float aStrokeWidth1;
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
    vStrokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    vSize = mix(aSize0, aSize1, r);
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vPosition = aPosition * (vSize + vStrokeWidth) + vCenterPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;

    vStrokeColor = mix(aStrokeColor0, aStrokeColor1, r);
    vStrokeColor.a *= alpha;
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

fn create_node_shader_program(gl: &GL, node_type: &NodeType) -> Result<WebGlProgram, JsValue> {
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
    gl: &GL,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
    instances_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, JsValue> {
    let position_location = gl.get_attrib_location(program, "aPosition") as u32;
    let alpha0_location = gl.get_attrib_location(program, "aAlpha0") as u32;
    let alpha1_location = gl.get_attrib_location(program, "aAlpha1") as u32;
    let color0_location = gl.get_attrib_location(program, "aColor0") as u32;
    let color1_location = gl.get_attrib_location(program, "aColor1") as u32;
    let center_position0_location = gl.get_attrib_location(program, "aCenterPosition0") as u32;
    let center_position1_location = gl.get_attrib_location(program, "aCenterPosition1") as u32;
    let size0_location = gl.get_attrib_location(program, "aSize0") as u32;
    let size1_location = gl.get_attrib_location(program, "aSize1") as u32;
    let stroke_color0_location = gl.get_attrib_location(program, "aStrokeColor0") as u32;
    let stroke_color1_location = gl.get_attrib_location(program, "aStrokeColor1") as u32;
    let stroke_width0_location = gl.get_attrib_location(program, "aStrokeWidth0") as u32;
    let stroke_width1_location = gl.get_attrib_location(program, "aStrokeWidth1") as u32;

    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));

    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&vertex_buffer));
    register_vertex_attributes(gl, &[(position_location, 2)]);

    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&instances_buffer));
    register_vertex_attributes_with_divisor(
        gl,
        &[
            (alpha0_location, 1),
            (alpha1_location, 1),
            (color0_location, 4),
            (color1_location, 4),
            (center_position0_location, 2),
            (center_position1_location, 2),
            (size0_location, 2),
            (size1_location, 2),
            (stroke_color0_location, 4),
            (stroke_color1_location, 4),
            (stroke_width0_location, 1),
            (stroke_width1_location, 1),
        ],
    );

    gl.bind_buffer(GL::ELEMENT_ARRAY_BUFFER, Some(&element_buffer));

    gl.bind_vertex_array(None);

    Ok(array)
}

pub struct NodeMeshGeometry {
    vertices: Buffer<f32>,
    elements: Buffer<u32>,
    instances: Buffer<f32>,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    node_type: NodeType,
}

impl NodeMeshGeometry {
    fn new(
        gl: &GL,
        program: WebGlProgram,
        node_type: NodeType,
    ) -> Result<NodeMeshGeometry, JsValue> {
        let vertices = Buffer::new(gl, vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5])?;
        let elements = Buffer::new(gl, vec![0, 1, 2, 3])?;
        let instances = Buffer::new(gl, vec![])?;
        let vao = init_vertex_array(
            gl,
            &program,
            &vertices.buffer,
            &elements.buffer,
            &instances.buffer,
        )?;
        Ok(NodeMeshGeometry {
            vertices,
            elements,
            instances,
            vao,
            program,
            node_type,
        })
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), JsValue> {
        let e = self
            .instances
            .data
            .get_mut(NODE_INSTANCE_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: ({}, {})", index, offset))?;
        *e = value;
        Ok(())
    }

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 0)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 1)
    }

    fn set_current_fill_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 2)
    }

    fn set_current_fill_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 3)
    }

    fn set_current_fill_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 4)
    }

    fn set_current_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 5)
    }

    fn set_next_fill_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 6)
    }

    fn set_next_fill_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 7)
    }

    fn set_next_fill_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 8)
    }

    fn set_next_fill_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 9)
    }

    fn set_current_center_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 10)
    }

    fn set_current_center_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 11)
    }

    fn set_next_center_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 12)
    }

    fn set_next_center_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 13)
    }

    fn set_current_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 14)
    }

    fn set_current_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 15)
    }

    fn set_next_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 16)
    }

    fn set_next_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 17)
    }

    fn set_current_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 18)
    }

    fn set_current_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 19)
    }

    fn set_current_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 20)
    }

    fn set_current_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 21)
    }

    fn set_next_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 22)
    }

    fn set_next_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 23)
    }

    fn set_next_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 24)
    }

    fn set_next_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 25)
    }

    fn set_current_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 26)
    }

    fn set_next_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 27)
    }

    fn set_item(
        &mut self,
        index: usize,
        current: &VertexData,
        next: &VertexData,
        a0: f32,
        a1: f32,
    ) -> Result<(), JsValue> {
        self.set_current_alpha(index, a0)?;
        self.set_next_alpha(index, a1)?;
        self.set_current_fill_r(index, (current.fill_color.r / 255.) as f32)?;
        self.set_current_fill_g(index, (current.fill_color.g / 255.) as f32)?;
        self.set_current_fill_b(index, (current.fill_color.b / 255.) as f32)?;
        self.set_current_fill_alpha(index, current.fill_color.opacity as f32)?;
        self.set_next_fill_r(index, (next.fill_color.r / 255.) as f32)?;
        self.set_next_fill_g(index, (next.fill_color.g / 255.) as f32)?;
        self.set_next_fill_b(index, (next.fill_color.b / 255.) as f32)?;
        self.set_next_fill_alpha(index, next.fill_color.opacity as f32)?;
        self.set_current_center_x(index, current.x as f32)?;
        self.set_current_center_y(index, current.y as f32)?;
        self.set_next_center_x(index, next.x as f32)?;
        self.set_next_center_y(index, next.y as f32)?;
        self.set_current_width(index, current.width as f32)?;
        self.set_current_height(index, current.height as f32)?;
        self.set_next_width(index, next.width as f32)?;
        self.set_next_height(index, next.height as f32)?;
        self.set_current_stroke_r(index, (current.stroke_color.r / 255.) as f32)?;
        self.set_current_stroke_g(index, (current.stroke_color.g / 255.) as f32)?;
        self.set_current_stroke_b(index, (current.stroke_color.b / 255.) as f32)?;
        self.set_current_stroke_alpha(index, current.stroke_color.opacity as f32)?;
        self.set_next_stroke_r(index, (next.stroke_color.r / 255.) as f32)?;
        self.set_next_stroke_g(index, (next.stroke_color.g / 255.) as f32)?;
        self.set_next_stroke_b(index, (next.stroke_color.b / 255.) as f32)?;
        self.set_next_stroke_alpha(index, next.stroke_color.opacity as f32)?;
        self.set_current_stroke_width(index, current.stroke_width as f32)?;
        self.set_next_stroke_width(index, next.stroke_width as f32)?;
        Ok(())
    }

    fn is_same_node_type(&self, s: &String) -> bool {
        match self.node_type {
            NodeType::Circle => s == "circle",
            NodeType::Rectangle => s == "rect",
        }
    }

    fn update(&mut self, gl: &GL, layout: &LayoutData) -> Result<(), JsValue> {
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
        self.instances.data.resize(NODE_INSTANCE_ATTRIBUTES * n, 0.);

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

        gl.bind_buffer(GL::ARRAY_BUFFER, Some(&self.vertices.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.vertices.data.as_ptr() as *const u8,
                self.vertices.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        gl.bind_buffer(GL::ARRAY_BUFFER, Some(&self.instances.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.instances.data.as_ptr() as *const u8,
                self.instances.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        gl.bind_buffer(GL::ELEMENT_ARRAY_BUFFER, Some(&self.elements.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.elements.data.as_ptr() as *const u8,
                self.elements.data.len() * std::mem::size_of::<u32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ELEMENT_ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        Ok(())
    }
}

impl MeshGeometry for NodeMeshGeometry {
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

    fn instance_count(&self) -> Option<i32> {
        Some((self.instances.data.len() / NODE_INSTANCE_ATTRIBUTES) as i32)
    }
}

pub struct NodeMesh {
    program: WebGlProgram,
    node_type: NodeType,
}

impl NodeMesh {
    pub fn new(gl: &GL, node_type: NodeType) -> Result<NodeMesh, JsValue> {
        let program = create_node_shader_program(gl, &node_type)?;
        Ok(NodeMesh { program, node_type })
    }
}

impl Mesh for NodeMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let mut geometry = NodeMeshGeometry::new(gl, self.program.clone(), self.node_type.clone())?;
        geometry.update(gl, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
