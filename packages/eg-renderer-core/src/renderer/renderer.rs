use super::meshes::{CircleNodes, LayoutData, Mesh};
use cgmatrix::{identity, matmul, orthogonal_matrix, translate, viewing_matrix, zeros, Matrix44};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, HtmlCanvasElement, WebGl2RenderingContext};

fn scale(sx: f32, sy: f32, sz: f32) -> Matrix44 {
    let mut matrix = zeros();
    matrix[0] = sx;
    matrix[5] = sy;
    matrix[10] = sz;
    matrix[15] = 1.;
    matrix
}

#[derive(Serialize, Deserialize)]
pub struct Transform {
    pub x: f32,
    pub y: f32,
    pub k: f32,
}

struct Context {
    mv_matrix: Matrix44,
    p_matrix: Matrix44,
    objects: Vec<Box<Mesh>>,
}

impl Context {
    fn new(gl: &WebGl2RenderingContext) -> Result<Context, String> {
        let nodes = CircleNodes::new(gl, 0)?;
        Ok(Context {
            mv_matrix: translate(0., 0., 0.),
            p_matrix: identity(),
            objects: vec![Box::new(nodes)],
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
        let gl = canvas
            .get_context("webgl2")?
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
        for object in &self.context.objects {
            let program = object.program();
            gl.use_program(Some(program));
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
            gl.bind_vertex_array(Some(object.geometry()));
            gl.draw_elements_with_i32(
                object.mode(),
                object.size(),
                WebGl2RenderingContext::UNSIGNED_SHORT,
                0,
            );
            gl.bind_vertex_array(None);
        }
        Ok(())
    }

    pub fn update(&mut self, layout: JsValue) -> Result<(), JsValue> {
        let layout: LayoutData = layout.into_serde().map_err(|e| format!("{}", e))?;
        for object in self.context.objects.iter_mut() {
            object.update(&self.gl, &layout)?;
        }
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
        self.gl.viewport(
            0,
            0,
            (width * device_pixel_ratio as f32) as i32,
            (height * device_pixel_ratio as f32) as i32,
        );
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
