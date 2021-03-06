use super::meshes::{
    GroupMesh, LabelMesh, LayoutData, LinkCircleMarkerMesh, LinkMesh, LinkTriangleMarkerMesh,
    LinkType, Mesh, MeshGeometry, NodeMesh, ShapeType,
};
use cgmatrix::{identity, matmul, orthogonal_matrix, scale, translate, viewing_matrix, Matrix44};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, HtmlCanvasElement, WebGl2RenderingContext};

#[derive(Serialize, Deserialize)]
pub struct Transform {
    pub x: f32,
    pub y: f32,
    pub k: f32,
}

struct Context {
    width: i32,
    height: i32,
    mv_matrix: Matrix44,
    p_matrix: Matrix44,
    objects: Vec<Box<dyn Mesh>>,
    geometries: Vec<Box<dyn MeshGeometry>>,
}

impl Context {
    fn new(gl: &WebGl2RenderingContext) -> Result<Context, JsValue> {
        let circle_groups = GroupMesh::new(gl, ShapeType::Circle)?;
        let rectangle_groups = GroupMesh::new(gl, ShapeType::Rectangle)?;
        let arc_links = LinkMesh::new(gl, LinkType::Arc)?;
        let curve_links = LinkMesh::new(gl, LinkType::Curve)?;
        let line_links = LinkMesh::new(gl, LinkType::Line)?;
        let quadratic_links = LinkMesh::new(gl, LinkType::Quadratic)?;
        let link_circle_markers = LinkCircleMarkerMesh::new(gl)?;
        let link_triangle_markers = LinkTriangleMarkerMesh::new(gl)?;
        let circle_nodes = NodeMesh::new(gl, ShapeType::Circle)?;
        let rectangle_nodes = NodeMesh::new(gl, ShapeType::Rectangle)?;
        let node_labels = LabelMesh::new(gl)?;
        Ok(Context {
            width: 0,
            height: 0,
            mv_matrix: translate(0., 0., 0.),
            p_matrix: identity(),
            objects: vec![
                Box::new(circle_groups),
                Box::new(rectangle_groups),
                Box::new(arc_links),
                Box::new(curve_links),
                Box::new(line_links),
                Box::new(quadratic_links),
                Box::new(link_circle_markers),
                Box::new(link_triangle_markers),
                Box::new(circle_nodes),
                Box::new(rectangle_nodes),
                Box::new(node_labels),
            ],
            geometries: Vec::new(),
        })
    }
}

#[wasm_bindgen]
pub struct Renderer {
    context: Context,
    gl: WebGl2RenderingContext,
}

#[wasm_bindgen]
impl Renderer {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement) -> Result<Renderer, JsValue> {
        let mut options = HashMap::new();
        options.insert("antialias", true);
        let options = JsValue::from_serde(&options).unwrap();
        let gl = canvas
            .get_context_with_context_options("webgl2", &options)?
            .unwrap()
            .dyn_into::<WebGl2RenderingContext>()?;

        gl.clear_color(0., 0., 0., 0.);
        gl.blend_func_separate(
            WebGl2RenderingContext::SRC_ALPHA,
            WebGl2RenderingContext::ONE_MINUS_SRC_ALPHA,
            WebGl2RenderingContext::ONE,
            WebGl2RenderingContext::ONE_MINUS_SRC_ALPHA,
        );
        gl.enable(WebGl2RenderingContext::BLEND);
        gl.disable(WebGl2RenderingContext::DEPTH_TEST);

        let context = Context::new(&gl)?;
        Ok(Renderer { context, gl })
    }

    pub fn render(&self, r: f32) -> Result<(), JsValue> {
        let gl = &self.gl;
        gl.clear(WebGl2RenderingContext::COLOR_BUFFER_BIT);
        for geometry in &self.context.geometries {
            let program = geometry.program();
            gl.use_program(Some(program));
            if let Some(texture) = geometry.texture() {
                gl.bind_texture(WebGl2RenderingContext::TEXTURE_2D, Some(texture));
                let image_location = gl
                    .get_uniform_location(program, "image")
                    .ok_or("failed to get uniform location of image")?;
                gl.uniform1i(Some(&image_location), 0);
            }
            let mv_location = gl
                .get_uniform_location(program, "uMVMatrix")
                .ok_or("failed to get uniform location of uMVMatrix")?;
            gl.uniform_matrix4fv_with_f32_array(Some(&mv_location), false, &self.context.mv_matrix);
            let p_location = gl
                .get_uniform_location(program, "uPMatrix")
                .ok_or("failed to get uniform location of uPMatrix")?;
            gl.uniform_matrix4fv_with_f32_array(Some(&p_location), false, &self.context.p_matrix);
            let r_location = gl
                .get_uniform_location(program, "r")
                .ok_or("failed to get uniform location of r")?;
            gl.uniform1f(Some(&r_location), r);
            if let Some(resolution_location) = gl.get_uniform_location(program, "uResolution") {
                gl.uniform2f(
                    Some(&resolution_location),
                    self.context.width as f32,
                    self.context.height as f32,
                );
            }
            gl.bind_vertex_array(Some(geometry.vao()));
            if let Some(instance_count) = geometry.instance_count() {
                gl.draw_elements_instanced_with_i32(
                    geometry.mode(),
                    geometry.size(),
                    WebGl2RenderingContext::UNSIGNED_INT,
                    0,
                    instance_count,
                );
            } else {
                gl.draw_elements_with_i32(
                    geometry.mode(),
                    geometry.size(),
                    WebGl2RenderingContext::UNSIGNED_INT,
                    0,
                );
            }
            gl.bind_vertex_array(None);
        }
        Ok(())
    }

    pub fn update(&mut self, layout: JsValue) -> Result<(), JsValue> {
        let mut geometries = Vec::new();
        let layout: LayoutData = layout.into_serde().map_err(|e| format!("{}", e))?;
        for object in self.context.objects.iter_mut() {
            object.update(&self.gl, &layout, &mut geometries)?;
        }
        self.context.geometries = geometries;
        Ok(())
    }

    pub fn transform(&mut self, transform: JsValue) -> Result<(), JsValue> {
        let t: Transform = transform.into_serde().map_err(|e| format!("{}", e))?;
        let m_matrix = matmul(
            scale(t.k, t.k, 1.),
            matmul(translate(t.x, t.y, 0.), translate(10., 10., 0.)),
        );
        self.context.mv_matrix = matmul(
            viewing_matrix([0., 0., 1.], [0., 1., 0.], [0., 0., 0.]),
            m_matrix,
        );
        Ok(())
    }

    pub fn resize(&mut self, width: f32, height: f32) -> Result<(), JsValue> {
        let device_pixel_ratio = window().ok_or("failed to get window")?.device_pixel_ratio();
        self.context.width = (width * device_pixel_ratio as f32) as i32;
        self.context.height = (height * device_pixel_ratio as f32) as i32;
        self.gl
            .viewport(0, 0, self.context.width, self.context.height);
        let left = 0.;
        let right = width - 1.;
        let top = 0.;
        let bottom = height - 1.;
        let near = -10.;
        let far = 10.;
        self.context.p_matrix = orthogonal_matrix(left, right, top, bottom, near, far);
        Ok(())
    }
}
