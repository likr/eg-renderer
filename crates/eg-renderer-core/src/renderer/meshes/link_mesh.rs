use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{LINK_FRAGMENT_SHADER_SOURCE, LINK_VERTEX_SHADER_SOURCE};
use super::{init_vertex_array, EdgeData, LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum LinkType {
    Line,
}

impl ToString for LinkType {
    fn to_string(&self) -> String {
        match self {
            LinkType::Line => "line".into(),
        }
    }
}

fn create_link_shader_program(gl: &GL) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, LINK_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LINK_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn insert_instance_item(
    data: &mut Vec<f32>,
    current: &EdgeData,
    next: &EdgeData,
    current_p1: &[f64; 2],
    current_p2: &[f64; 2],
    next_p1: &[f64; 2],
    next_p2: &[f64; 2],
    a0: f32,
    a1: f32,
) {
    data.push(current_p1[0] as f32);
    data.push(current_p1[1] as f32);
    data.push(next_p1[0] as f32);
    data.push(next_p1[1] as f32);
    data.push(current_p2[0] as f32);
    data.push(current_p2[1] as f32);
    data.push(next_p2[0] as f32);
    data.push(next_p2[1] as f32);
    data.push(current.stroke_width as f32);
    data.push(next.stroke_width as f32);
    data.push(a0);
    data.push(a1);
    data.push((current.stroke_color.r / 255.) as f32);
    data.push((current.stroke_color.g / 255.) as f32);
    data.push((current.stroke_color.b / 255.) as f32);
    data.push(current.stroke_color.opacity as f32);
    data.push((next.stroke_color.r / 255.) as f32);
    data.push((next.stroke_color.g / 255.) as f32);
    data.push((next.stroke_color.b / 255.) as f32);
    data.push(next.stroke_color.opacity as f32);
}

fn create_instance_data(layout: &LayoutData, target_link_type: &LinkType) -> Vec<f32> {
    let target_link_type = target_link_type.to_string();
    let mut data = vec![];
    for link in &layout.enter.edges {
        if link.shape == target_link_type {
            for i in 1..link.points.len() {
                insert_instance_item(
                    &mut data,
                    link,
                    link,
                    &link.points[i - 1],
                    &link.points[i],
                    &link.points[i - 1],
                    &link.points[i],
                    0.,
                    1.,
                );
            }
        }
    }
    for link in &layout.update.edges {
        if link.next.shape == target_link_type {
            for i in 1..link.next.points.len() {
                insert_instance_item(
                    &mut data,
                    &link.current,
                    &link.next,
                    &link.current.points[i - 1],
                    &link.current.points[i],
                    &link.next.points[i - 1],
                    &link.next.points[i],
                    1.,
                    1.,
                );
            }
        }
    }
    for link in &layout.exit.edges {
        if link.shape == target_link_type {
            for i in 1..link.points.len() {
                insert_instance_item(
                    &mut data,
                    link,
                    link,
                    &link.points[i - 1],
                    &link.points[i],
                    &link.points[i - 1],
                    &link.points[i],
                    1.,
                    0.,
                );
            }
        }
    }
    data
}

pub struct LinkMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    instance_count: usize,
}

impl LinkMeshGeometry {
    fn new(
        gl: &GL,
        program: &WebGlProgram,
        link_type: &LinkType,
        layout: &LayoutData,
    ) -> Result<LinkMeshGeometry, JsValue> {
        let vertex_data = vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
        let element_data = vec![0, 1, 2, 3];
        let instance_data = create_instance_data(layout, link_type);

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

        let vao = init_vertex_array(
            gl,
            &vertex_data,
            &instance_data,
            &element_data,
            &[(position_location, 2)],
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
        )?;
        Ok(LinkMeshGeometry {
            vao,
            program: program.clone(),
            instance_count: instance_data.len() / 20,
        })
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
        Some(self.instance_count as i32)
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
        let geometry = LinkMeshGeometry::new(gl, &self.program, &self.link_type, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
