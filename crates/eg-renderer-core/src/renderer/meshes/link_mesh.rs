use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{
    ARC_LINK_VERTEX_SHADER_SOURCE, LINK_FRAGMENT_SHADER_SOURCE, STRAIGHT_LINK_VERTEX_SHADER_SOURCE,
};
use super::{init_vertex_array_with_instances, EdgeData, LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum LinkType {
    Arc,
    Line,
}

impl ToString for LinkType {
    fn to_string(&self) -> String {
        match self {
            LinkType::Arc => "arc".into(),
            LinkType::Line => "line".into(),
        }
    }
}

fn create_link_shader_program(gl: &GL, link_type: &LinkType) -> Result<WebGlProgram, JsValue> {
    let vertex_shader_source = match link_type {
        LinkType::Arc => ARC_LINK_VERTEX_SHADER_SOURCE,
        LinkType::Line => STRAIGHT_LINK_VERTEX_SHADER_SOURCE,
    };
    let vertex_shader = init_vertex_shader(gl, vertex_shader_source)?;
    let fragment_shader = init_fragment_shader(gl, LINK_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn insert_instance_item(
    data: &mut Vec<f32>,
    current: &EdgeData,
    next: &EdgeData,
    current_p1: &[f32; 2],
    current_p2: &[f32; 2],
    next_p1: &[f32; 2],
    next_p2: &[f32; 2],
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

fn create_instance_data(layout: &LayoutData, target_link_type: &LinkType) -> (usize, Vec<f32>) {
    let target_link_type = target_link_type.to_string();
    let mut data = vec![];
    let mut count = 0;
    for link in &layout.enter.edges {
        if link.shape == target_link_type {
            for i in 1..link.points.len() {
                count += 1;
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
                count += 1;
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
                count += 1;
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
    (count, data)
}

fn create_template_mesh(link_type: &LinkType) -> (Vec<f32>, Vec<u32>) {
    match link_type {
        LinkType::Arc => {
            let div = 32;
            let mut vertex_data = vec![0.; (div + 1) * 4];
            let mut element_data = vec![0u32; (div + 1) * 2];
            for i in 0..div + 1 {
                let t = (i + div) as f32 * std::f32::consts::PI / div as f32;
                vertex_data[4 * i] = t.cos();
                vertex_data[4 * i + 1] = t.sin();
                vertex_data[4 * i + 2] = t.cos();
                vertex_data[4 * i + 3] = t.sin();
                element_data[2 * i] = (2 * i) as u32;
                element_data[2 * i + 1] = (2 * i + 1) as u32;
            }
            (vertex_data, element_data)
        }
        LinkType::Line => (
            vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5],
            vec![0, 1, 2, 3],
        ),
    }
}

pub struct LinkMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    element_count: usize,
    instance_count: usize,
}

impl LinkMeshGeometry {
    fn new(
        gl: &GL,
        program: &WebGlProgram,
        link_type: &LinkType,
        layout: &LayoutData,
    ) -> Result<LinkMeshGeometry, JsValue> {
        let (vertex_data, element_data) = create_template_mesh(link_type);
        let (instance_count, instance_data) = create_instance_data(layout, link_type);

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

        let vao = init_vertex_array_with_instances(
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
            element_count: element_data.len(),
            instance_count,
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
        self.element_count as i32
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
        let program = create_link_shader_program(gl, &link_type)?;
        Ok(LinkMesh { program, link_type })
    }
}

impl Mesh for LinkMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<dyn MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let geometry = LinkMeshGeometry::new(gl, &self.program, &self.link_type, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
