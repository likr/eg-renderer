use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext, WebGlProgram, WebGlShader};

fn init_shader(
    gl: &WebGl2RenderingContext,
    shader_type: u32,
    source: &str,
) -> Result<WebGlShader, JsValue> {
    let shader = gl
        .create_shader(shader_type)
        .ok_or("Unable to create shader object")?;
    gl.shader_source(&shader, source);
    gl.compile_shader(&shader);

    if gl
        .get_shader_parameter(&shader, WebGl2RenderingContext::COMPILE_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(shader)
    } else {
        Err(gl
            .get_shader_info_log(&shader)
            .unwrap_or(String::from("Unknown error creating shader"))
            .into())
    }
}

pub fn init_vertex_shader(
    gl: &WebGl2RenderingContext,
    source: &str,
) -> Result<WebGlShader, JsValue> {
    init_shader(gl, WebGl2RenderingContext::VERTEX_SHADER, source)
}

pub fn init_fragment_shader(
    gl: &WebGl2RenderingContext,
    source: &str,
) -> Result<WebGlShader, JsValue> {
    init_shader(gl, WebGl2RenderingContext::FRAGMENT_SHADER, source)
}

pub fn init_program(
    gl: &WebGl2RenderingContext,
    vertex_shader: WebGlShader,
    fragment_shader: WebGlShader,
) -> Result<WebGlProgram, JsValue> {
    let program = gl
        .create_program()
        .ok_or_else(|| String::from("Unable to create shader object"))?;

    gl.attach_shader(&program, &vertex_shader);
    gl.attach_shader(&program, &fragment_shader);
    gl.link_program(&program);

    if gl
        .get_program_parameter(&program, WebGl2RenderingContext::LINK_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(program)
    } else {
        Err(gl
            .get_program_info_log(&program)
            .unwrap_or(String::from("Unknown error creating program object"))
            .into())
    }
}
