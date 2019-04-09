use web_sys::{WebGlProgram, WebGlVertexArrayObject};

pub trait Mesh {
    fn mode(&self) -> u32;
    fn program(&self) -> &WebGlProgram;
    fn geometry(&self) -> &WebGlVertexArrayObject;
    fn size(&self) -> i32;
}
