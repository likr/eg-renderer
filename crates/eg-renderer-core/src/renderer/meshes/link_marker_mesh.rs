use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{EdgeData, ElementBuffer, LayoutData, Mesh, MeshGeometry, VertexBuffer};
use wasm_bindgen::prelude::*;
use web_sys::{
    WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlTexture, WebGlVertexArrayObject,
};

const VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
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
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vPosition;
out vec4 vColor;
out vec2 vCenterPosition;
out vec2 vSize;

void main() {
    float alpha = mix(aAlpha0, aAlpha1, r);
    vPosition = mix(aPosition0, aPosition1, r);
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vSize = mix(aSize0, aSize1, r);
}
"#;

const FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision highp float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
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
    float r = calcR(vSize / 2.0, theta);
    float d = sqrt(dot(pos, pos));

    if (d > r) {
        discard;
    } else {
        oFragColor = vColor;
    }
}
"#;

fn create_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

pub struct LinkCircleMarkerMeshGeometry {
    size: usize,
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
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
    gl.vertex_attrib_pointer_with_i32(
        alpha0_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        alpha1_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        4,
    );
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        8,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        16,
    );
    gl.vertex_attrib_pointer_with_i32(
        color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        24,
    );
    gl.vertex_attrib_pointer_with_i32(
        color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        40,
    );
    gl.vertex_attrib_pointer_with_i32(
        center_position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        56,
    );
    gl.vertex_attrib_pointer_with_i32(
        center_position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        64,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        72,
    );
    gl.vertex_attrib_pointer_with_i32(
        size1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        88,
        80,
    );
    Ok(array)
}

fn add_marker(
    vertices: &mut VertexBuffer,
    elements: &mut ElementBuffer,
    offset: usize,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
    marker_x0: f32,
    marker_x1: f32,
    marker_y0: f32,
    marker_y1: f32,
    marker_size0: f32,
    marker_size1: f32,
) {
    let marker_r0 = marker_size0 / 2.0;
    let marker_r1 = marker_size1 / 2.0;
    let current_x = [
        marker_x0 - marker_r0,
        marker_x0 + marker_r0,
        marker_x0 - marker_r0,
        marker_x0 + marker_r0,
    ];
    let current_y = [
        marker_y0 - marker_r0,
        marker_y0 - marker_r0,
        marker_y0 + marker_r0,
        marker_y0 + marker_r0,
    ];
    let next_x = [
        marker_x1 - marker_r1,
        marker_x1 + marker_r1,
        marker_x1 - marker_r1,
        marker_x1 + marker_r1,
    ];
    let next_y = [
        marker_y1 - marker_r1,
        marker_y1 - marker_r1,
        marker_y1 + marker_r1,
        marker_y1 + marker_r1,
    ];
    for i in 0..4 {
        vertices.data.push(a0 as f32);
        vertices.data.push(a1 as f32);
        vertices.data.push(current_x[i] as f32);
        vertices.data.push(current_y[i] as f32);
        vertices.data.push(next_x[i] as f32);
        vertices.data.push(next_y[i] as f32);
        vertices.data.push((current.stroke_color.r / 255.) as f32);
        vertices.data.push((current.stroke_color.g / 255.) as f32);
        vertices.data.push((current.stroke_color.b / 255.) as f32);
        vertices.data.push(current.stroke_color.opacity as f32);
        vertices.data.push((next.stroke_color.r / 255.) as f32);
        vertices.data.push((next.stroke_color.g / 255.) as f32);
        vertices.data.push((next.stroke_color.b / 255.) as f32);
        vertices.data.push(next.stroke_color.opacity as f32);
        vertices.data.push(marker_x0);
        vertices.data.push(marker_y0);
        vertices.data.push(marker_x1);
        vertices.data.push(marker_y1);
        vertices.data.push(marker_size0);
        vertices.data.push(marker_size0);
        vertices.data.push(marker_size1);
        vertices.data.push(marker_size1);
    }
    elements.data.push((4 * offset) as u32);
    elements.data.push((4 * offset + 1) as u32);
    elements.data.push((4 * offset + 2) as u32);
    elements.data.push((4 * offset + 1) as u32);
    elements.data.push((4 * offset + 2) as u32);
    elements.data.push((4 * offset + 3) as u32);
}

fn add_source_marker(
    vertices: &mut VertexBuffer,
    elements: &mut ElementBuffer,
    offset: usize,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
) {
    add_marker(
        vertices,
        elements,
        offset,
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
    vertices: &mut VertexBuffer,
    elements: &mut ElementBuffer,
    offset: usize,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
) {
    add_marker(
        vertices,
        elements,
        offset,
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
        gl: &WebGl2RenderingContext,
        program: WebGlProgram,
        layout: &LayoutData,
    ) -> Result<LinkCircleMarkerMeshGeometry, JsValue> {
        let mut vertices = VertexBuffer::new(gl, 0)?;
        let mut elements = ElementBuffer::new(gl, 0)?;

        let mut offset = 0;
        for edge in &layout.enter.edges {
            if edge.source_marker_shape == "circle" {
                add_source_marker(&mut vertices, &mut elements, offset, edge, edge, 0.0, 1.0);
                offset += 1;
            }
            if edge.target_marker_shape == "circle" {
                add_target_marker(&mut vertices, &mut elements, offset, edge, edge, 0.0, 1.0);
                offset += 1;
            }
        }
        for update in &layout.update.edges {
            let current = &update.current;
            let next = &update.next;
            if next.source_marker_shape == "circle" {
                add_source_marker(
                    &mut vertices,
                    &mut elements,
                    offset,
                    &current,
                    &next,
                    1.0,
                    1.0,
                );
                offset += 1;
            }
            if next.target_marker_shape == "circle" {
                add_target_marker(
                    &mut vertices,
                    &mut elements,
                    offset,
                    &current,
                    &next,
                    1.0,
                    1.0,
                );
                offset += 1;
            }
        }
        for edge in &layout.exit.edges {
            if edge.source_marker_shape == "circle" {
                add_source_marker(&mut vertices, &mut elements, offset, edge, edge, 1.0, 0.0);
                offset += 1;
            }
            if edge.target_marker_shape == "circle" {
                add_target_marker(&mut vertices, &mut elements, offset, edge, edge, 1.0, 0.0);
                offset += 1;
            }
        }

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

        Ok(LinkCircleMarkerMeshGeometry {
            size: elements.data.len(),
            vao,
            program,
        })
    }
}

impl MeshGeometry for LinkCircleMarkerMeshGeometry {
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
        self.size as i32
    }

    fn texture(&self) -> Option<&WebGlTexture> {
        None
    }
}

pub struct LinkCircleMarkerMesh {
    program: WebGlProgram,
}

impl LinkCircleMarkerMesh {
    pub fn new(gl: &WebGl2RenderingContext) -> Result<LinkCircleMarkerMesh, JsValue> {
        let program = create_shader_program(gl)?;
        Ok(LinkCircleMarkerMesh { program })
    }
}

impl Mesh for LinkCircleMarkerMesh {
    fn update(
        &self,
        gl: &WebGl2RenderingContext,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let geometry = LinkCircleMarkerMeshGeometry::new(gl, self.program.clone(), layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
