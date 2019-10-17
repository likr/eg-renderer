use super::shape_mesh::{
    create_shape_shader_program, insert_instance_item, ShapeMeshGeometry, ShapeType,
};
use super::{LayoutData, Mesh, MeshGeometry};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram};

fn create_instance_data(layout: &LayoutData, target_shape_type: &ShapeType) -> Vec<f32> {
    let target_shape_type = target_shape_type.to_string();
    let mut data = vec![];
    for shape in &layout.enter.groups {
        if shape.shape == target_shape_type {
            insert_instance_item(&mut data, shape, shape, 0., 1.);
        }
    }
    for shape in &layout.update.groups {
        if shape.next.shape == target_shape_type {
            insert_instance_item(&mut data, &shape.current, &shape.next, 1., 1.);
        }
    }
    for shape in &layout.exit.groups {
        if shape.shape == target_shape_type {
            insert_instance_item(&mut data, shape, shape, 1., 0.);
        }
    }
    data
}

pub struct GroupMesh {
    program: WebGlProgram,
    group_type: ShapeType,
}

impl GroupMesh {
    pub fn new(gl: &GL, group_type: ShapeType) -> Result<GroupMesh, JsValue> {
        let program = create_shape_shader_program(gl, &group_type)?;
        Ok(GroupMesh {
            program,
            group_type,
        })
    }
}

impl Mesh for GroupMesh {
    fn update(
        &self,
        gl: &GL,
        layout: &LayoutData,
        geometries: &mut Vec<Box<dyn MeshGeometry>>,
    ) -> Result<(), JsValue> {
        let instance_data = create_instance_data(layout, &self.group_type);
        let geometry = ShapeMeshGeometry::new(gl, &self.program, &instance_data)?;
        geometries.push(Box::new(geometry));
        Ok(())
    }
}
