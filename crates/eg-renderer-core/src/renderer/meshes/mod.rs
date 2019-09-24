mod label_mesh;
mod link_marker_mesh;
mod link_mesh;
mod mesh;
mod node_mesh;
mod program;

pub use label_mesh::*;
pub use link_marker_mesh::*;
pub use link_mesh::*;
pub use mesh::*;
pub use node_mesh::*;

use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlBuffer};

pub fn register_vertex_attributes(gl: &GL, attributes: &[(u32, i32)]) {
    let stride = attributes.iter().map(|&(_, size)| 4 * size).sum();
    let mut offset = 0;
    for &(loc, size) in attributes {
        gl.enable_vertex_attrib_array(loc);
        gl.vertex_attrib_pointer_with_i32(loc, size, GL::FLOAT, false, stride, offset);
        offset += 4 * size;
    }
}

pub fn register_vertex_attributes_with_divisor(gl: &GL, attributes: &[(u32, i32)]) {
    let stride = attributes.iter().map(|&(_, size)| 4 * size).sum();
    let mut offset = 0;
    for &(loc, size) in attributes {
        gl.enable_vertex_attrib_array(loc);
        gl.vertex_attrib_pointer_with_i32(loc, size, GL::FLOAT, false, stride, offset);
        gl.vertex_attrib_divisor(loc, 1);
        offset += 4 * size;
    }
}

pub struct Buffer<T> {
    pub buffer: WebGlBuffer,
    pub data: Vec<T>,
}

impl<T> Buffer<T> {
    pub fn new(gl: &GL, data: Vec<T>) -> Result<Buffer<T>, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        Ok(Buffer { buffer, data })
    }
}
