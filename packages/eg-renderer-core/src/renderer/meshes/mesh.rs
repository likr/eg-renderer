use web_sys::{WebGl2RenderingContext, WebGlProgram, WebGlVertexArrayObject};

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
    fn update(&mut self, gl: &WebGl2RenderingContext, graph: &LayoutData) -> Result<(), String>;
}
