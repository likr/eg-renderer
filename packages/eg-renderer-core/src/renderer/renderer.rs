use super::matrix::{identity, translate, Matrix44};
use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    HtmlCanvasElement, WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlVertexArrayObject,
};

const NODE_ATTRIBUTES: usize = 18;

const NODE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec3 aPosition0;
layout(location = 1) in vec3 aPosition1;
layout(location = 2) in vec4 aColor0;
layout(location = 3) in vec4 aColor1;
layout(location = 4) in vec2 aSize0;
layout(location = 5) in vec2 aSize1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;
void main() {
  vec4 mvPosition = uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0);
  gl_PointSize = aSize0.x * uMVMatrix[0][0];
  gl_Position = uPMatrix * mvPosition;
  vColor = r * aColor1 + (1.0 - r) * aColor0;
}
"#;

const NODE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;
void main() {
  vec3 n;
  n.xy = gl_PointCoord * 2.0 - 1.0;
  n.z = 1.0 - dot( n.xy, n.xy );
  if (n.z < 0.0) {
    discard;
  }
  oFragColor = vColor;
}
"#;

fn create_node_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, String> {
    let vertex_shader = init_vertex_shader(gl, NODE_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, NODE_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn init_vertex_array(
    gl: &WebGl2RenderingContext,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, String> {
    let position0_location = gl.get_attrib_location(program, "aPosition0");
    let position1_location = gl.get_attrib_location(program, "aPosition1");
    let color0_location = gl.get_attrib_location(program, "aColor0");
    let color1_location = gl.get_attrib_location(program, "aColor1");
    let size0_location = gl.get_attrib_location(program, "aSize0");
    let size1_location = gl.get_attrib_location(program, "aSize1");
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    gl.bind_buffer(WebGl2RenderingContext::ARRAY_BUFFER, Some(&vertex_buffer));
    gl.bind_buffer(
        WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
        Some(&element_buffer),
    );
    gl.enable_vertex_attrib_array(position0_location as u32);
    gl.enable_vertex_attrib_array(position1_location as u32);
    gl.enable_vertex_attrib_array(color0_location as u32);
    gl.enable_vertex_attrib_array(color1_location as u32);
    gl.enable_vertex_attrib_array(size0_location as u32);
    gl.enable_vertex_attrib_array(size1_location as u32);
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        3,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        3,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        12,
    );
    gl.vertex_attrib_pointer_with_i32(
        color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        24,
    );
    gl.vertex_attrib_pointer_with_i32(
        color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        40,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        56,
    );
    gl.vertex_attrib_pointer_with_i32(
        size0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        72,
        64,
    );
    Ok(array)
}

struct VertexBuffer {
    buffer: WebGlBuffer,
    data: Vec<f32>,
}

impl VertexBuffer {
    fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<VertexBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let mut obj = VertexBuffer { buffer, data };
        obj.resize(n);
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(NODE_ATTRIBUTES * n, 0.);
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<ElementBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let mut obj = ElementBuffer { buffer, data };
        obj.resize(n);
        Ok(obj)
    }

    fn resize(&mut self, n: usize) {
        self.data.resize(n, 0);
        for i in 0..n {
            self.data[i] = i as u32;
        }
    }
}

#[wasm_bindgen]
pub struct NodeArray {
    mode: u32,
    program: WebGlProgram,
    vertices: VertexBuffer,
    elements: ElementBuffer,
    geometry: WebGlVertexArrayObject,
}

#[wasm_bindgen]
impl NodeArray {
    fn new(gl: &WebGl2RenderingContext, n: usize) -> Result<NodeArray, String> {
        let vertices = VertexBuffer::new(gl, n)?;
        let elements = ElementBuffer::new(gl, n)?;
        let program = create_node_shader_program(gl)?;
        let geometry = init_vertex_array(gl, &program, &vertices.buffer, &elements.buffer)?;
        Ok(NodeArray {
            mode: WebGl2RenderingContext::POINTS,
            vertices,
            elements,
            program,
            geometry,
        })
    }

    pub fn resize(&mut self, n: usize) {
        self.vertices.resize(n);
        self.elements.resize(n);
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), JsValue> {
        let e = self
            .vertices
            .data
            .get_mut(NODE_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: {}", index))?;
        *e = value;
        Ok(())
    }

    #[wasm_bindgen(js_name = setPrevX)]
    pub fn set_prev_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 0)
    }

    #[wasm_bindgen(js_name = setPrevY)]
    pub fn set_prev_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 1)
    }

    #[wasm_bindgen(js_name = setPrevZ)]
    pub fn set_prev_z(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 2)
    }

    #[wasm_bindgen(js_name = setNextX)]
    pub fn set_next_x(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 3)
    }

    #[wasm_bindgen(js_name = setNextY)]
    pub fn set_next_y(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 4)
    }

    #[wasm_bindgen(js_name = setNextZ)]
    pub fn set_next_z(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 5)
    }

    #[wasm_bindgen(js_name = setPrevR)]
    pub fn set_prev_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 6)
    }

    #[wasm_bindgen(js_name = setPrevG)]
    pub fn set_prev_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 7)
    }

    #[wasm_bindgen(js_name = setPrevB)]
    pub fn set_prev_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 8)
    }

    #[wasm_bindgen(js_name = setPrevAlpha)]
    pub fn set_prev_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 9)
    }

    #[wasm_bindgen(js_name = setNextR)]
    pub fn set_next_r(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 10)
    }

    #[wasm_bindgen(js_name = setNextG)]
    pub fn set_next_g(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 11)
    }

    #[wasm_bindgen(js_name = setNextB)]
    pub fn set_next_b(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 12)
    }

    #[wasm_bindgen(js_name = setNextAlpha)]
    pub fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 13)
    }

    #[wasm_bindgen(js_name = setPrevWidth)]
    pub fn set_prev_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 14)
    }

    #[wasm_bindgen(js_name = setPrevHeight)]
    pub fn set_prev_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 15)
    }

    #[wasm_bindgen(js_name = setNextWidth)]
    pub fn set_next_width(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 16)
    }

    #[wasm_bindgen(js_name = setNextHeight)]
    pub fn set_next_height(&mut self, index: usize, value: f32) -> Result<(), JsValue> {
        self.set_value(index, value, 17)
    }
}

struct Context {
    mv_matrix: Matrix44,
    p_matrix: Matrix44,
    nodes: NodeArray,
}

impl Context {
    fn new(gl: &WebGl2RenderingContext) -> Result<Context, String> {
        let nodes = NodeArray::new(gl, 0)?;
        Ok(Context {
            mv_matrix: translate(0., 0., 0.),
            p_matrix: identity(),
            nodes,
        })
    }
}

#[wasm_bindgen]
pub struct Renderer {
    canvas: HtmlCanvasElement,
    context: Context,
    gl: WebGl2RenderingContext,
}

#[wasm_bindgen]
impl Renderer {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement) -> Result<Renderer, JsValue> {
        let gl = canvas
            .get_context("webgl")?
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
        Ok(Renderer {
            canvas,
            context,
            gl,
        })
    }

    pub fn render(&self) -> Result<(), JsValue> {
        let gl = &self.gl;
        gl.clear(WebGl2RenderingContext::COLOR_BUFFER_BIT);
        let obj = &self.context.nodes;
        gl.use_program(Some(&obj.program));
        let mv_location = gl
            .get_uniform_location(&obj.program, "uMV_matrix")
            .ok_or("failed to get uniform location")?;
        gl.uniform_matrix4fv_with_f32_array(Some(&mv_location), false, &self.context.mv_matrix);
        let p_location = gl
            .get_uniform_location(&obj.program, "uP_matrix")
            .ok_or("failed to get uniform location")?;
        gl.uniform_matrix4fv_with_f32_array(Some(&p_location), false, &self.context.p_matrix);
        let r_location = gl
            .get_uniform_location(&obj.program, "r")
            .ok_or("failed to get uniform location")?;
        gl.uniform1f(Some(&r_location), 1.0);
        gl.bind_vertex_array(Some(&obj.geometry));
        gl.draw_elements_with_i32(
            obj.mode,
            obj.elements.data.len() as i32,
            WebGl2RenderingContext::UNSIGNED_SHORT,
            0,
        );
        gl.bind_vertex_array(None);
        Ok(())
    }

    pub fn bind() {}

    pub fn transform() {}

    pub fn resize() {}
}
