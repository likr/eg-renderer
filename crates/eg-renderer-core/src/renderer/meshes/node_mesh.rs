use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{
    CIRCLE_NODE_FRAGMENT_SHADER_SOURCE, NODE_VERTEX_SHADER_SOURCE,
    RECTANGLE_NODE_FRAGMENT_SHADER_SOURCE,
};
use super::{init_vertex_array, LayoutData, Mesh, MeshGeometry, VertexData};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum NodeType {
    Circle,
    Rectangle,
}

impl ToString for NodeType {
    fn to_string(&self) -> String {
        match self {
            NodeType::Circle => "circle".into(),
            NodeType::Rectangle => "rect".into(),
        }
    }
}

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

pub struct NodeMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    instance_count: usize,
}

fn insert_instance_item(
    data: &mut Vec<f32>,
    current: &VertexData,
    next: &VertexData,
    a0: f32,
    a1: f32,
) {
    data.push(a0);
    data.push(a1);
    data.push((current.fill_color.r / 255.) as f32);
    data.push((current.fill_color.g / 255.) as f32);
    data.push((current.fill_color.b / 255.) as f32);
    data.push(current.fill_color.opacity as f32);
    data.push((next.fill_color.r / 255.) as f32);
    data.push((next.fill_color.g / 255.) as f32);
    data.push((next.fill_color.b / 255.) as f32);
    data.push(next.fill_color.opacity as f32);
    data.push(current.x as f32);
    data.push(current.y as f32);
    data.push(next.x as f32);
    data.push(next.y as f32);
    data.push(current.width as f32);
    data.push(current.height as f32);
    data.push(next.width as f32);
    data.push(next.height as f32);
    data.push((current.stroke_color.r / 255.) as f32);
    data.push((current.stroke_color.g / 255.) as f32);
    data.push((current.stroke_color.b / 255.) as f32);
    data.push(current.stroke_color.opacity as f32);
    data.push((next.stroke_color.r / 255.) as f32);
    data.push((next.stroke_color.g / 255.) as f32);
    data.push((next.stroke_color.b / 255.) as f32);
    data.push(next.stroke_color.opacity as f32);
    data.push(current.stroke_width as f32);
    data.push(next.stroke_width as f32);
}

fn create_instance_data(layout: &LayoutData, target_node_type: &NodeType) -> Vec<f32> {
    let target_node_type = target_node_type.to_string();
    let mut data = vec![];
    for node in &layout.enter.vertices {
        if node.shape == target_node_type {
            insert_instance_item(&mut data, node, node, 0., 1.);
        }
    }
    for node in &layout.update.vertices {
        if node.next.shape == target_node_type {
            insert_instance_item(&mut data, &node.current, &node.next, 1., 1.);
        }
    }
    for node in &layout.exit.vertices {
        if node.shape == target_node_type {
            insert_instance_item(&mut data, node, node, 1., 0.);
        }
    }
    data
}

impl NodeMeshGeometry {
    fn new(
        gl: &GL,
        program: &WebGlProgram,
        node_type: &NodeType,
        layout: &LayoutData,
    ) -> Result<NodeMeshGeometry, JsValue> {
        let vertex_data = vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
        let element_data = vec![0, 1, 2, 3];
        let instance_data = create_instance_data(layout, node_type);

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

        let vao = init_vertex_array(
            gl,
            &vertex_data,
            &instance_data,
            &element_data,
            &[(position_location, 2)],
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
        )?;
        Ok(NodeMeshGeometry {
            vao,
            program: program.clone(),
            instance_count: instance_data.len() / 28,
        })
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
        Some(self.instance_count as i32)
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
        let geometry = NodeMeshGeometry::new(gl, &self.program, &self.node_type, layout)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
