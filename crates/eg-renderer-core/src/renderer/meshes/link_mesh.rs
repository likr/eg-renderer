use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{
    register_vertex_attributes, register_vertex_attributes_with_divisor, Buffer, EdgeData,
    LayoutData, Mesh, MeshGeometry,
};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum LinkType {
    Line,
}

const LINK_INSTANCE_ATTRIBUTES: usize = 20;

const LINK_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aPosition10;
layout(location = 2) in vec2 aPosition11;
layout(location = 3) in vec2 aPosition20;
layout(location = 4) in vec2 aPosition21;
layout(location = 5) in float aStrokeWidth0;
layout(location = 6) in float aStrokeWidth1;
layout(location = 7) in float aAlpha0;
layout(location = 8) in float aAlpha1;
layout(location = 9) in vec4 aColor0;
layout(location = 10) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;

void main() {
    vec2 position1 = mix(aPosition10, aPosition11, r);
    vec2 position2 = mix(aPosition20, aPosition21, r);
    vec2 centerPosition = (position1 + position2) / 2.0;
    vec2 diff = position2 - position1;
    float t = atan(diff.y, diff.x);

    float strokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    vec2 size = vec2(strokeWidth);
    size.x += length(diff);
    vec2 pos = aPosition * size;
    float x = pos.x * cos(t) - pos.y * sin(t) + centerPosition.x;
    float y = pos.x * sin(t) + pos.y * cos(t) + centerPosition.y;
    gl_Position = uPMatrix * uMVMatrix * vec4(x, y, 1.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

const LINK_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;
void main() {
    oFragColor = vColor;
}
"#;

fn create_link_shader_program(gl: &GL) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, LINK_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LINK_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn init_vertex_array(
    gl: &GL,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
    instance_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, JsValue> {
    let position_location = gl.get_attrib_location(program, "aPosition") as u32;
    let position10_location = gl.get_attrib_location(program, "aPosition10") as u32;
    let position11_location = gl.get_attrib_location(program, "aPosition11") as u32;
    let position20_location = gl.get_attrib_location(program, "aPosition20") as u32;
    let position21_location = gl.get_attrib_location(program, "aPosition21") as u32;
    let stroke_width0_location = gl.get_attrib_location(program, "aStrokeWidth0") as u32;
    let stroke_width1_location = gl.get_attrib_location(program, "aStrokeWidth1") as u32;
    let alpha0_location = gl.get_attrib_location(program, "aAlpha0") as u32;
    let alpha1_location = gl.get_attrib_location(program, "aAlpha1") as u32;
    let color0_location = gl.get_attrib_location(program, "aColor0") as u32;
    let color1_location = gl.get_attrib_location(program, "aColor1") as u32;

    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));

    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&vertex_buffer));
    register_vertex_attributes(gl, &[(position_location, 2)]);

    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&instance_buffer));
    register_vertex_attributes_with_divisor(
        gl,
        &[
            (position10_location, 2),
            (position11_location, 2),
            (position20_location, 2),
            (position21_location, 2),
            (stroke_width0_location, 1),
            (stroke_width1_location, 1),
            (alpha0_location, 1),
            (alpha1_location, 1),
            (color0_location, 4),
            (color1_location, 4),
        ],
    );

    gl.bind_buffer(GL::ELEMENT_ARRAY_BUFFER, Some(&element_buffer));

    gl.bind_vertex_array(None);

    Ok(array)
}

pub struct LinkMeshGeometry {
    vertices: Buffer<f32>,
    elements: Buffer<u32>,
    instances: Buffer<f32>,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    link_type: LinkType,
}

impl LinkMeshGeometry {
    fn new(
        gl: &GL,
        program: WebGlProgram,
        link_type: LinkType,
    ) -> Result<LinkMeshGeometry, JsValue> {
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
        Ok(LinkMeshGeometry {
            vertices,
            elements,
            instances,
            vao,
            program,
            link_type,
        })
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), JsValue> {
        let e = self
            .instances
            .data
            .get_mut(LINK_INSTANCE_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: ({}, {})", index, offset))?;
        *e = value;
        Ok(())
    }

    fn set_current_x1(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 0)
    }

    fn set_current_y1(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 1)
    }

    fn set_next_x1(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 2)
    }

    fn set_next_y1(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 3)
    }

    fn set_current_x2(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 4)
    }

    fn set_current_y2(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 5)
    }

    fn set_next_x2(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 6)
    }

    fn set_next_y2(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 7)
    }

    fn set_current_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 8)
    }

    fn set_next_stroke_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 9)
    }

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 10)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 11)
    }

    fn set_current_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 12)
    }

    fn set_current_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 13)
    }

    fn set_current_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 14)
    }

    fn set_current_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 15)
    }

    fn set_next_stroke_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 16)
    }

    fn set_next_stroke_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 17)
    }

    fn set_next_stroke_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 18)
    }

    fn set_next_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 19)
    }

    fn set_item(
        &mut self,
        index: usize,
        current: &EdgeData,
        next: &EdgeData,
        current_p1: &[f64; 2],
        current_p2: &[f64; 2],
        next_p1: &[f64; 2],
        next_p2: &[f64; 2],
        a0: f32,
        a1: f32,
    ) -> Result<(), JsValue> {
        self.set_current_x1(index, current_p1[0] as f32)?;
        self.set_current_y1(index, current_p1[1] as f32)?;
        self.set_next_x1(index, next_p1[0] as f32)?;
        self.set_next_y1(index, next_p1[1] as f32)?;
        self.set_current_x2(index, current_p2[0] as f32)?;
        self.set_current_y2(index, current_p2[1] as f32)?;
        self.set_next_x2(index, next_p2[0] as f32)?;
        self.set_next_y2(index, next_p2[1] as f32)?;
        self.set_current_stroke_width(index, current.stroke_width as f32)?;
        self.set_next_stroke_width(index, next.stroke_width as f32)?;
        self.set_current_alpha(index, a0)?;
        self.set_next_alpha(index, a1)?;
        self.set_current_stroke_r(index, (current.stroke_color.r / 255.) as f32)?;
        self.set_current_stroke_g(index, (current.stroke_color.g / 255.) as f32)?;
        self.set_current_stroke_b(index, (current.stroke_color.b / 255.) as f32)?;
        self.set_current_stroke_alpha(index, current.stroke_color.opacity as f32)?;
        self.set_next_stroke_r(index, (next.stroke_color.r / 255.) as f32)?;
        self.set_next_stroke_g(index, (next.stroke_color.g / 255.) as f32)?;
        self.set_next_stroke_b(index, (next.stroke_color.b / 255.) as f32)?;
        self.set_next_stroke_alpha(index, next.stroke_color.opacity as f32)?;
        Ok(())
    }

    fn is_same_link_type(&self, s: &String) -> bool {
        match self.link_type {
            LinkType::Line => s == "line",
        }
    }

    fn update(&mut self, gl: &GL, layout: &LayoutData) -> Result<(), JsValue> {
        let mut n = 0;
        for link in &layout.enter.edges {
            if self.is_same_link_type(&link.shape) {
                n += link.points.len() - 1
            }
        }
        for link in &layout.update.edges {
            if self.is_same_link_type(&link.next.shape) {
                n += link.next.points.len() - 1
            }
        }
        for link in &layout.exit.edges {
            if self.is_same_link_type(&link.shape) {
                n += link.points.len() - 1
            }
        }
        self.instances.data.resize(n * LINK_INSTANCE_ATTRIBUTES, 0.);

        let mut offset = 0;
        for link in &layout.enter.edges {
            if self.is_same_link_type(&link.shape) {
                for i in 1..link.points.len() {
                    self.set_item(
                        offset,
                        link,
                        link,
                        &link.points[i - 1],
                        &link.points[i],
                        &link.points[i - 1],
                        &link.points[i],
                        0.,
                        1.,
                    )?;
                    offset += 1;
                }
            }
        }
        for link in &layout.update.edges {
            if self.is_same_link_type(&link.next.shape) {
                for i in 1..link.next.points.len() {
                    self.set_item(
                        offset,
                        &link.current,
                        &link.next,
                        &link.current.points[i - 1],
                        &link.current.points[i],
                        &link.next.points[i - 1],
                        &link.next.points[i],
                        1.,
                        1.,
                    )?;
                    offset += 1;
                }
            }
        }
        for link in &layout.exit.edges {
            if self.is_same_link_type(&link.shape) {
                for i in 1..link.points.len() {
                    self.set_item(
                        offset,
                        link,
                        link,
                        &link.points[i - 1],
                        &link.points[i],
                        &link.points[i - 1],
                        &link.points[i],
                        1.,
                        0.,
                    )?;
                    offset += 1;
                }
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

impl MeshGeometry for LinkMeshGeometry {
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
        Some((self.instances.data.len() / LINK_INSTANCE_ATTRIBUTES) as i32)
    }
}

pub struct LinkMesh {
    program: WebGlProgram,
    link_type: LinkType,
}

impl LinkMesh {
    pub fn new(gl: &GL, link_type: LinkType) -> Result<LinkMesh, JsValue> {
        let program = create_link_shader_program(gl)?;
        Ok(LinkMesh { program, link_type })
    }
}

impl Mesh for LinkMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let mut geometry = LinkMeshGeometry::new(gl, self.program.clone(), self.link_type.clone())?;
        geometry.update(gl, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
