use super::shape_mesh::{
    create_shape_shader_program, insert_instance_item, ShapeMeshGeometry, ShapeType,
};
use super::{LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram};

fn create_instance_data(layout: &LayoutData, target_shape_type: &ShapeType) -> Vec<f32> {
    let target_shape_type = target_shape_type.to_string();
    let mut data = vec![];
    for shape in &layout.enter.nodes {
        if shape.shape == target_shape_type {
            insert_instance_item(&mut data, shape, shape, 0., 1.);
        }
    }
    for shape in &layout.update.nodes {
        if shape.next.shape == target_shape_type {
            insert_instance_item(&mut data, &shape.current, &shape.next, 1., 1.);
        }
    }
    for shape in &layout.exit.nodes {
        if shape.shape == target_shape_type {
            insert_instance_item(&mut data, shape, shape, 1., 0.);
        }
    }
    data
}

pub struct NodeMesh {
    program: WebGlProgram,
    node_type: ShapeType,
}

impl NodeMesh {
    pub fn new(gl: &GL, node_type: ShapeType) -> Result<NodeMesh, JsValue> {
        let program = create_shape_shader_program(gl, &node_type)?;
        Ok(NodeMesh { program, node_type })
    }
}

impl Mesh for NodeMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<dyn MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let instance_data = create_instance_data(layout, &self.node_type);
        let geometry = ShapeMeshGeometry::new(gl, &self.program, &instance_data)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
