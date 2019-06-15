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
use web_sys::{WebGl2RenderingContext, WebGlBuffer};

pub struct VertexBuffer {
    buffer: WebGlBuffer,
    data: Vec<f32>,
}

impl VertexBuffer {
    pub fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<VertexBuffer, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let mut data = Vec::new();
        data.resize(n, 0.0);
        let obj = VertexBuffer { buffer, data };
        Ok(obj)
    }
}

pub struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    pub fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<ElementBuffer, JsValue> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let mut data = Vec::new();
        data.resize(n, 0);
        let obj = ElementBuffer { buffer, data };
        Ok(obj)
    }
}
