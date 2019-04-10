use web_sys::{WebGlProgram, WebGlVertexArrayObject};

#[derive(Serialize, Deserialize)]
pub struct ColorData {
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub alpha: f64,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct VertexData {
    pub u: String,
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
    // pub type: String,
    pub fillColor: ColorData,
    pub strokeColor: ColorData,
    pub strokeWidth: f64,
    pub label: String,
    pub labelFillColor: ColorData,
    pub labelStrokeColor: ColorData,
    pub labelStrokeWidth: f64,
    pub labelFontSize: f64,
    pub labelFontFamily: String,
}

#[derive(Serialize, Deserialize)]
pub struct VertexUpdateData {
    pub current: VertexData,
    pub next: VertexData,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateData {
    pub vertices: Vec<VertexUpdateData>,
}

#[derive(Serialize, Deserialize)]
pub struct EnterData {
    pub vertices: Vec<VertexData>,
}

#[derive(Serialize, Deserialize)]
pub struct ExitData {
    pub vertices: Vec<VertexData>,
}

#[derive(Serialize, Deserialize)]
pub struct LayoutData {
    pub update: UpdateData,
    pub enter: EnterData,
    pub exit: ExitData,
}

pub trait Mesh {
    fn mode(&self) -> u32;
    fn program(&self) -> &WebGlProgram;
    fn geometry(&self) -> &WebGlVertexArrayObject;
    fn size(&self) -> i32;
    fn update(&mut self, graph: &LayoutData) -> Result<(), String>;
}
