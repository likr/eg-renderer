use wasm_bindgen::prelude::*;
use web_sys::{
    WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram, WebGlTexture, WebGlVertexArrayObject,
};

#[derive(Serialize, Deserialize)]
pub struct ColorData {
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub opacity: f64,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VertexData {
    pub u: String,
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
    #[serde(rename = "type")]
    pub shape: String,
    pub fill_color: ColorData,
    pub stroke_color: ColorData,
    pub stroke_width: f64,
    pub label: String,
    pub label_fill_color: ColorData,
    pub label_stroke_color: ColorData,
    pub label_stroke_width: f64,
    pub label_font_size: f64,
    pub label_font_family: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EdgeData {
    pub u: String,
    pub v: String,
    pub points: Vec<[f64; 2]>,
    #[serde(rename = "type")]
    pub shape: String,
    pub stroke_color: ColorData,
    pub stroke_width: f64,
    pub source_marker_shape: String,
    pub source_marker_size: f64,
    pub target_marker_shape: String,
    pub target_marker_size: f64,
    pub label: String,
    pub label_fill_color: ColorData,
    pub label_stroke_color: ColorData,
    pub label_stroke_width: f64,
    pub label_font_size: f64,
    pub label_font_family: String,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateItem<T> {
    pub current: T,
    pub next: T,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateData {
    pub vertices: Vec<UpdateItem<VertexData>>,
    pub edges: Vec<UpdateItem<EdgeData>>,
}

#[derive(Serialize, Deserialize)]
pub struct EnterData {
    pub vertices: Vec<VertexData>,
    pub edges: Vec<EdgeData>,
}

#[derive(Serialize, Deserialize)]
pub struct ExitData {
    pub vertices: Vec<VertexData>,
    pub edges: Vec<EdgeData>,
}

#[derive(Serialize, Deserialize)]
pub struct LayoutData {
    pub update: UpdateData,
    pub enter: EnterData,
    pub exit: ExitData,
}

pub trait MeshGeometry {
    fn mode(&self) -> u32;
    fn program(&self) -> &WebGlProgram;
    fn vao(&self) -> &WebGlVertexArrayObject;
    fn size(&self) -> i32;

    fn texture(&self) -> Option<&WebGlTexture> {
        None
    }

    fn instance_count(&self) -> Option<i32> {
        None
    }
}

pub trait Mesh {
    fn update(
        &self,
        gl: &GL,
        graph: &LayoutData,
        geometries: &mut Vec<Box<MeshGeometry>>,
    ) -> Result<(), JsValue>;
}

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
