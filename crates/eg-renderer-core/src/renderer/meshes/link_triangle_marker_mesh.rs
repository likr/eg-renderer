use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{
    LINK_TRIANGLE_MARKER_FRAGMENT_SHADER_SOURCE, LINK_TRIANGLE_MARKER_VERTEX_SHADER_SOURCE,
};
use super::{init_vertex_array, EdgeData, LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlVertexArrayObject};

fn create_shader_program(gl: &GL) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, LINK_TRIANGLE_MARKER_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LINK_TRIANGLE_MARKER_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

pub struct LinkTriangleMarkerMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    instance_count: usize,
}

fn add_marker(
    data: &mut Vec<f32>,
    current: &EdgeData,
    next: &EdgeData,
    a0: f32,
    a1: f32,
    marker_x0: f32,
    marker_y0: f32,
    marker_x1: f32,
    marker_y1: f32,
    marker_from_x0: f32,
    marker_from_y0: f32,
    marker_from_x1: f32,
    marker_from_y1: f32,
    marker_size0: f32,
    marker_size1: f32,
) {
    data.push(marker_x0);
    data.push(marker_y0);
    data.push(marker_x1);
    data.push(marker_y1);
    data.push(marker_from_x0);
    data.push(marker_from_y0);
    data.push(marker_from_x1);
    data.push(marker_from_y1);
    data.push((marker_size0 * 2.0 / 3.0) as f32);
    data.push((marker_size1 * 2.0 / 3.0) as f32);
    data.push(a0 as f32);
    data.push(a1 as f32);
    data.push((current.stroke_color.r / 255.) as f32);
    data.push((current.stroke_color.g / 255.) as f32);
    data.push((current.stroke_color.b / 255.) as f32);
    data.push(current.stroke_color.opacity as f32);
    data.push((next.stroke_color.r / 255.) as f32);
    data.push((next.stroke_color.g / 255.) as f32);
    data.push((next.stroke_color.b / 255.) as f32);
    data.push(next.stroke_color.opacity as f32);
}

fn add_source_marker(data: &mut Vec<f32>, current: &EdgeData, next: &EdgeData, a0: f32, a1: f32) {
    add_marker(
        data,
        current,
        next,
        a0,
        a1,
        current.points[0][0] as f32,
        current.points[0][1] as f32,
        next.points[0][0] as f32,
        next.points[0][1] as f32,
        current.points[1][0] as f32,
        current.points[1][1] as f32,
        next.points[1][0] as f32,
        next.points[1][1] as f32,
        current.source_marker_size as f32,
        next.source_marker_size as f32,
    );
}

fn add_target_marker(data: &mut Vec<f32>, current: &EdgeData, next: &EdgeData, a0: f32, a1: f32) {
    add_marker(
        data,
        current,
        next,
        a0,
        a1,
        current.points[current.points.len() - 1][0] as f32,
        current.points[current.points.len() - 1][1] as f32,
        next.points[next.points.len() - 1][0] as f32,
        next.points[next.points.len() - 1][1] as f32,
        current.points[current.points.len() - 2][0] as f32,
        current.points[current.points.len() - 2][1] as f32,
        next.points[next.points.len() - 2][0] as f32,
        next.points[next.points.len() - 2][1] as f32,
        current.target_marker_size as f32,
        next.target_marker_size as f32,
    );
}

fn create_instance_data(layout: &LayoutData) -> Vec<f32> {
    let mut data = vec![];
    for edge in &layout.enter.edges {
        if edge.source_marker_shape == "triangle" {
            add_source_marker(&mut data, edge, edge, 0.0, 1.0);
        }
        if edge.target_marker_shape == "triangle" {
            add_target_marker(&mut data, edge, edge, 0.0, 1.0);
        }
    }
    for update in &layout.update.edges {
        let current = &update.current;
        let next = &update.next;
        if next.source_marker_shape == "triangle" {
            add_source_marker(&mut data, &current, &next, 1.0, 1.0);
        }
        if next.target_marker_shape == "triangle" {
            add_target_marker(&mut data, &current, &next, 1.0, 1.0);
        }
    }
    for edge in &layout.exit.edges {
        if edge.source_marker_shape == "triangle" {
            add_source_marker(&mut data, edge, edge, 1.0, 0.0);
        }
        if edge.target_marker_shape == "triangle" {
            add_target_marker(&mut data, edge, edge, 1.0, 0.0);
        }
    }
    data
}

impl LinkTriangleMarkerMeshGeometry {
    fn new(
        gl: &GL,
        program: &WebGlProgram,
        layout: &LayoutData,
    ) -> Result<LinkTriangleMarkerMeshGeometry, JsValue> {
        let t = std::f32::consts::PI * 2. / 3.;
        let vertex_data = vec![1.0, 0.0, t.cos(), t.sin(), (-t).cos(), (-t).sin()];
        let element_data = vec![0, 1, 2];
        let instance_data = create_instance_data(layout);

        let position_location = gl.get_attrib_location(program, "aPosition") as u32;
        let center_position0_location = gl.get_attrib_location(program, "aCenterPosition0") as u32;
        let center_position1_location = gl.get_attrib_location(program, "aCenterPosition1") as u32;
        let from_position0_location = gl.get_attrib_location(program, "aFromPosition0") as u32;
        let from_position1_location = gl.get_attrib_location(program, "aFromPosition1") as u32;
        let radius0_location = gl.get_attrib_location(program, "aRadius0") as u32;
        let radius1_location = gl.get_attrib_location(program, "aRadius1") as u32;
        let alpha0_location = gl.get_attrib_location(program, "aAlpha0") as u32;
        let alpha1_location = gl.get_attrib_location(program, "aAlpha1") as u32;
        let color0_location = gl.get_attrib_location(program, "aColor0") as u32;
        let color1_location = gl.get_attrib_location(program, "aColor1") as u32;

        let vao = init_vertex_array(
            gl,
            &vertex_data,
            &instance_data,
            &element_data,
            &[(position_location, 2)],
            &[
                (center_position0_location, 2),
                (center_position1_location, 2),
                (from_position0_location, 2),
                (from_position1_location, 2),
                (radius0_location, 1),
                (radius1_location, 1),
                (alpha0_location, 1),
                (alpha1_location, 1),
                (color0_location, 4),
                (color1_location, 4),
            ],
        )?;

        Ok(LinkTriangleMarkerMeshGeometry {
            vao,
            program: program.clone(),
            instance_count: instance_data.len() / 20,
        })
    }
}

impl MeshGeometry for LinkTriangleMarkerMeshGeometry {
    fn mode(&self) -> u32 {
        GL::TRIANGLES
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn vao(&self) -> &WebGlVertexArrayObject {
        &self.vao
    }

    fn size(&self) -> i32 {
        3
    }

    fn instance_count(&self) -> Option<i32> {
        Some(self.instance_count as i32)
    }
}

pub struct LinkTriangleMarkerMesh {
    program: WebGlProgram,
}

impl LinkTriangleMarkerMesh {
    pub fn new(gl: &GL) -> Result<LinkTriangleMarkerMesh, JsValue> {
        let program = create_shader_program(gl)?;
        Ok(LinkTriangleMarkerMesh { program })
    }
}

impl Mesh for LinkTriangleMarkerMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let geometry = LinkTriangleMarkerMeshGeometry::new(gl, &self.program, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
