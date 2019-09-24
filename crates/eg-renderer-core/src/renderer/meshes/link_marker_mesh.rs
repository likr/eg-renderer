use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{
    register_vertex_attributes, register_vertex_attributes_with_divisor, Buffer, EdgeData,
    LayoutData, Mesh, MeshGeometry,
};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject};

const LINK_MARKER_INSTANCE_ATTRIBUTES: usize = 16;

const VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aCenterPosition0;
layout(location = 2) in vec2 aCenterPosition1;
layout(location = 3) in float aRadius0;
layout(location = 4) in float aRadius1;
layout(location = 5) in float aAlpha0;
layout(location = 6) in float aAlpha1;
layout(location = 7) in vec4 aColor0;
layout(location = 8) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vPosition;
out vec2 vCenterPosition;
out float vRadius;
out vec4 vColor;

void main() {
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vRadius = mix(aRadius0, aRadius1, r);
    vPosition = aPosition * vRadius * 2.0 + vCenterPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

const FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec2 vCenterPosition;
in float vRadius;
in vec4 vColor;
out vec4 oFragColor;

void main() {
    vec2 pos = vPosition - vCenterPosition;
    float d = sqrt(dot(pos, pos));

    if (d > vRadius) {
        discard;
    } else {
        oFragColor = vColor;
    }
}
"#;

fn create_shader_program(gl: &GL) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

pub struct LinkCircleMarkerMeshGeometry {
    instances: Buffer<f32>,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
}

fn init_vertex_array(
    gl: &GL,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
    instance_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, JsValue> {
    let position_location = gl.get_attrib_location(program, "aPosition") as u32;
    let center_position0_location = gl.get_attrib_location(program, "aCenterPosition0") as u32;
    let center_position1_location = gl.get_attrib_location(program, "aCenterPosition1") as u32;
    let radius0_location = gl.get_attrib_location(program, "aRadius0") as u32;
    let radius1_location = gl.get_attrib_location(program, "aRadius1") as u32;
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
            (center_position0_location, 2),
            (center_position1_location, 2),
            (radius0_location, 1),
            (radius1_location, 1),
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

fn add_marker(
    instances: &mut Buffer<f32>,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
    marker_x0: f32,
    marker_y0: f32,
    marker_x1: f32,
    marker_y1: f32,
    marker_size0: f32,
    marker_size1: f32,
) {
    instances.data.push(marker_x0);
    instances.data.push(marker_y0);
    instances.data.push(marker_x1);
    instances.data.push(marker_y1);
    instances.data.push((marker_size0 / 2.0) as f32);
    instances.data.push((marker_size1 / 2.0) as f32);
    instances.data.push(a0 as f32);
    instances.data.push(a1 as f32);
    instances.data.push((current.stroke_color.r / 255.) as f32);
    instances.data.push((current.stroke_color.g / 255.) as f32);
    instances.data.push((current.stroke_color.b / 255.) as f32);
    instances.data.push(current.stroke_color.opacity as f32);
    instances.data.push((next.stroke_color.r / 255.) as f32);
    instances.data.push((next.stroke_color.g / 255.) as f32);
    instances.data.push((next.stroke_color.b / 255.) as f32);
    instances.data.push(next.stroke_color.opacity as f32);
}

fn add_source_marker(
    instances: &mut Buffer<f32>,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
) {
    add_marker(
        instances,
        current,
        next,
        a0,
        a1,
        current.points[0][0] as f32,
        current.points[0][1] as f32,
        next.points[0][0] as f32,
        next.points[0][1] as f32,
        current.source_marker_size as f32,
        next.source_marker_size as f32,
    );
}

fn add_target_marker(
    instances: &mut Buffer<f32>,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
) {
    add_marker(
        instances,
        current,
        next,
        a0,
        a1,
        current.points[current.points.len() - 1][0] as f32,
        current.points[current.points.len() - 1][1] as f32,
        next.points[next.points.len() - 1][0] as f32,
        next.points[next.points.len() - 1][1] as f32,
        current.target_marker_size as f32,
        next.target_marker_size as f32,
    );
}

impl LinkCircleMarkerMeshGeometry {
    fn new(
        gl: &GL,
        program: WebGlProgram,
        layout: &LayoutData,
    ) -> Result<LinkCircleMarkerMeshGeometry, JsValue> {
        let vertices: Buffer<f32> =
            Buffer::new(gl, vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5])?;
        let elements: Buffer<u32> = Buffer::new(gl, vec![0, 1, 2, 3])?;
        let mut instances = Buffer::new(gl, vec![])?;

        for edge in &layout.enter.edges {
            if edge.source_marker_shape == "circle" {
                add_source_marker(&mut instances, edge, edge, 0.0, 1.0);
            }
            if edge.target_marker_shape == "circle" {
                add_target_marker(&mut instances, edge, edge, 0.0, 1.0);
            }
        }
        for update in &layout.update.edges {
            let current = &update.current;
            let next = &update.next;
            if next.source_marker_shape == "circle" {
                add_source_marker(&mut instances, &current, &next, 1.0, 1.0);
            }
            if next.target_marker_shape == "circle" {
                add_target_marker(&mut instances, &current, &next, 1.0, 1.0);
            }
        }
        for edge in &layout.exit.edges {
            if edge.source_marker_shape == "circle" {
                add_source_marker(&mut instances, edge, edge, 1.0, 0.0);
            }
            if edge.target_marker_shape == "circle" {
                add_target_marker(&mut instances, edge, edge, 1.0, 0.0);
            }
        }

        let vao = init_vertex_array(
            gl,
            &program,
            &vertices.buffer,
            &elements.buffer,
            &instances.buffer,
        )?;

        gl.bind_buffer(GL::ARRAY_BUFFER, Some(&vertices.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                vertices.data.as_ptr() as *const u8,
                vertices.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        gl.bind_buffer(GL::ARRAY_BUFFER, Some(&instances.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                instances.data.as_ptr() as *const u8,
                instances.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        gl.bind_buffer(GL::ELEMENT_ARRAY_BUFFER, Some(&elements.buffer));
        let bytes = unsafe {
            std::slice::from_raw_parts(
                elements.data.as_ptr() as *const u8,
                elements.data.len() * std::mem::size_of::<u32>(),
            )
        };
        gl.buffer_data_with_u8_array(GL::ELEMENT_ARRAY_BUFFER, bytes, GL::STATIC_DRAW);

        Ok(LinkCircleMarkerMeshGeometry {
            instances,
            vao,
            program,
        })
    }
}

impl MeshGeometry for LinkCircleMarkerMeshGeometry {
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
        Some((self.instances.data.len() / LINK_MARKER_INSTANCE_ATTRIBUTES) as i32)
    }
}

pub struct LinkCircleMarkerMesh {
    program: WebGlProgram,
}

impl LinkCircleMarkerMesh {
    pub fn new(gl: &GL) -> Result<LinkCircleMarkerMesh, JsValue> {
        let program = create_shader_program(gl)?;
        Ok(LinkCircleMarkerMesh { program })
    }
}

impl Mesh for LinkCircleMarkerMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let geometry = LinkCircleMarkerMeshGeometry::new(gl, self.program.clone(), layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
