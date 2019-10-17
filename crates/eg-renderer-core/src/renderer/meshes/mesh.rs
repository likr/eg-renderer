use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlTexture, WebGlVertexArrayObject};

#[derive(Serialize, Deserialize)]
pub struct ColorData {
    pub r: f32,
    pub g: f32,
    pub b: f32,
    pub opacity: f32,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeData {
    pub u: String,
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
    #[serde(rename = "type")]
    pub shape: String,
    pub fill_color: ColorData,
    pub stroke_color: ColorData,
    pub stroke_width: f32,
    pub label: String,
    pub label_fill_color: ColorData,
    pub label_stroke_color: ColorData,
    pub label_stroke_width: f32,
    pub label_font_size: f32,
    pub label_font_family: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EdgeData {
    pub u: String,
    pub v: String,
    pub points: Vec<[f32; 2]>,
    #[serde(rename = "type")]
    pub shape: String,
    pub stroke_color: ColorData,
    pub stroke_width: f32,
    pub source_marker_shape: String,
    pub source_marker_size: f32,
    pub target_marker_shape: String,
    pub target_marker_size: f32,
    pub label: String,
    pub label_fill_color: ColorData,
    pub label_stroke_color: ColorData,
    pub label_stroke_width: f32,
    pub label_font_size: f32,
    pub label_font_family: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GroupData {
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
    #[serde(rename = "type")]
    pub shape: String,
    pub fill_color: ColorData,
    pub stroke_color: ColorData,
    pub stroke_width: f32,
    pub label: String,
    pub label_fill_color: ColorData,
    pub label_stroke_color: ColorData,
    pub label_stroke_width: f32,
    pub label_font_size: f32,
    pub label_font_family: String,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateItem<T> {
    pub current: T,
    pub next: T,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateData {
    pub vertices: Vec<UpdateItem<NodeData>>,
    pub edges: Vec<UpdateItem<EdgeData>>,
    pub groups: Vec<UpdateItem<GroupData>>,
}

#[derive(Serialize, Deserialize)]
pub struct EnterData {
    pub vertices: Vec<NodeData>,
    pub edges: Vec<EdgeData>,
    pub groups: Vec<GroupData>,
}

#[derive(Serialize, Deserialize)]
pub struct ExitData {
    pub vertices: Vec<NodeData>,
    pub edges: Vec<EdgeData>,
    pub groups: Vec<GroupData>,
}

#[derive(Serialize, Deserialize)]
pub struct LayoutData {
    pub update: UpdateData,
    pub enter: EnterData,
    pub exit: ExitData,
}

pub trait ShapeData {
    fn fill_color_r(&self) -> f32;
    fn fill_color_g(&self) -> f32;
    fn fill_color_b(&self) -> f32;
    fn fill_color_opacity(&self) -> f32;
    fn x(&self) -> f32;
    fn y(&self) -> f32;
    fn width(&self) -> f32;
    fn height(&self) -> f32;
    fn stroke_color_r(&self) -> f32;
    fn stroke_color_g(&self) -> f32;
    fn stroke_color_b(&self) -> f32;
    fn stroke_color_opacity(&self) -> f32;
    fn stroke_width(&self) -> f32;
}

impl ShapeData for NodeData {
    fn fill_color_r(&self) -> f32 {
        self.fill_color.r / 255.
    }
    fn fill_color_g(&self) -> f32 {
        self.fill_color.g / 255.
    }
    fn fill_color_b(&self) -> f32 {
        self.fill_color.b / 255.
    }
    fn fill_color_opacity(&self) -> f32 {
        self.fill_color.opacity
    }
    fn x(&self) -> f32 {
        self.x
    }
    fn y(&self) -> f32 {
        self.y
    }
    fn width(&self) -> f32 {
        self.width
    }
    fn height(&self) -> f32 {
        self.height
    }
    fn stroke_color_r(&self) -> f32 {
        self.stroke_color.r / 255.
    }
    fn stroke_color_g(&self) -> f32 {
        self.stroke_color.g / 255.
    }
    fn stroke_color_b(&self) -> f32 {
        self.stroke_color.b / 255.
    }
    fn stroke_color_opacity(&self) -> f32 {
        self.stroke_color.opacity
    }
    fn stroke_width(&self) -> f32 {
        self.stroke_width
    }
}

impl ShapeData for GroupData {
    fn fill_color_r(&self) -> f32 {
        self.fill_color.r / 255.
    }
    fn fill_color_g(&self) -> f32 {
        self.fill_color.g / 255.
    }
    fn fill_color_b(&self) -> f32 {
        self.fill_color.b / 255.
    }
    fn fill_color_opacity(&self) -> f32 {
        self.fill_color.opacity
    }
    fn x(&self) -> f32 {
        self.x
    }
    fn y(&self) -> f32 {
        self.y
    }
    fn width(&self) -> f32 {
        self.width
    }
    fn height(&self) -> f32 {
        self.height
    }
    fn stroke_color_r(&self) -> f32 {
        self.stroke_color.r / 255.
    }
    fn stroke_color_g(&self) -> f32 {
        self.stroke_color.g / 255.
    }
    fn stroke_color_b(&self) -> f32 {
        self.stroke_color.b / 255.
    }
    fn stroke_color_opacity(&self) -> f32 {
        self.stroke_color.opacity
    }
    fn stroke_width(&self) -> f32 {
        self.stroke_width
    }
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
        geometries: &mut Vec<Box<dyn MeshGeometry>>,
    ) -> Result<(), JsValue>;
}
