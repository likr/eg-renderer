mod label_mesh;
mod link_circle_marker_mesh;
mod link_mesh;
mod link_triangle_marker_mesh;
mod mesh;
mod node_mesh;
mod program;
mod shaders;

pub use label_mesh::*;
pub use link_circle_marker_mesh::*;
pub use link_mesh::*;
pub use link_triangle_marker_mesh::*;
pub use mesh::*;
pub use node_mesh::*;

use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlVertexArrayObject};

fn register_vertex_attributes(gl: &GL, attributes: &[(u32, i32)]) {
    let stride = attributes.iter().map(|&(_, size)| 4 * size).sum();
    let mut offset = 0;
    for &(loc, size) in attributes {
        gl.enable_vertex_attrib_array(loc);
        gl.vertex_attrib_pointer_with_i32(loc, size, GL::FLOAT, false, stride, offset);
        offset += 4 * size;
    }
}

fn register_vertex_attributes_with_divisor(gl: &GL, attributes: &[(u32, i32)]) {
    let stride = attributes.iter().map(|&(_, size)| 4 * size).sum();
    let mut offset = 0;
    for &(loc, size) in attributes {
        gl.enable_vertex_attrib_array(loc);
        gl.vertex_attrib_pointer_with_i32(loc, size, GL::FLOAT, false, stride, offset);
        gl.vertex_attrib_divisor(loc, 1);
        offset += 4 * size;
    }
}

fn register_vertex_buffer(
    gl: &GL,
    vertex_data: &Vec<f32>,
    vertex_attributes: &[(u32, i32)],
) -> Result<(), JsValue> {
    let vertex_buffer = gl.create_buffer().ok_or("failed to create buffer")?;
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&vertex_buffer));
    register_vertex_attributes(gl, vertex_attributes);
    let bytes = unsafe {
        std::slice::from_raw_parts(
            vertex_data.as_ptr() as *const u8,
            vertex_data.len() * std::mem::size_of::<f32>(),
        )
    };
    gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);
    Ok(())
}

fn register_instance_buffer(
    gl: &GL,
    instance_data: &Vec<f32>,
    instance_attributes: &[(u32, i32)],
) -> Result<(), JsValue> {
    let instance_buffer = gl.create_buffer().ok_or("failed to create buffer")?;
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&instance_buffer));
    register_vertex_attributes_with_divisor(gl, instance_attributes);
    let bytes = unsafe {
        std::slice::from_raw_parts(
            instance_data.as_ptr() as *const u8,
            instance_data.len() * std::mem::size_of::<f32>(),
        )
    };
    gl.buffer_data_with_u8_array(GL::ARRAY_BUFFER, bytes, GL::STATIC_DRAW);
    Ok(())
}

fn register_element_buffer(gl: &GL, element_data: &Vec<u32>) -> Result<(), JsValue> {
    let element_buffer = gl.create_buffer().ok_or("failed to create buffer")?;
    gl.bind_buffer(GL::ELEMENT_ARRAY_BUFFER, Some(&element_buffer));
    let bytes = unsafe {
        std::slice::from_raw_parts(
            element_data.as_ptr() as *const u8,
            element_data.len() * std::mem::size_of::<u32>(),
        )
    };
    gl.buffer_data_with_u8_array(GL::ELEMENT_ARRAY_BUFFER, bytes, GL::STATIC_DRAW);
    Ok(())
}

pub fn init_vertex_array_with_instances(
    gl: &GL,
    vertex_data: &Vec<f32>,
    instance_data: &Vec<f32>,
    element_data: &Vec<u32>,
    vertex_attributes: &[(u32, i32)],
    instance_attributes: &[(u32, i32)],
) -> Result<WebGlVertexArrayObject, JsValue> {
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    register_vertex_buffer(gl, vertex_data, vertex_attributes)?;
    register_instance_buffer(gl, instance_data, instance_attributes)?;
    register_element_buffer(gl, element_data)?;
    gl.bind_vertex_array(None);
    Ok(array)
}

pub fn init_vertex_array(
    gl: &GL,
    vertex_data: &Vec<f32>,
    element_data: &Vec<u32>,
    vertex_attributes: &[(u32, i32)],
) -> Result<WebGlVertexArrayObject, JsValue> {
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    register_vertex_buffer(gl, vertex_data, vertex_attributes)?;
    register_element_buffer(gl, element_data)?;
    gl.bind_vertex_array(None);
    Ok(array)
}
