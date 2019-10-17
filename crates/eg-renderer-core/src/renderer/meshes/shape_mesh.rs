use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::shaders::{
    CIRCLE_SHAPE_FRAGMENT_SHADER_SOURCE, RECTANGLE_SHAPE_FRAGMENT_SHADER_SOURCE,
    SHAPE_VERTEX_SHADER_SOURCE,
};
use super::{init_vertex_array_with_instances, MeshGeometry, ShapeData};
use wasm_bindgen::prelude::*;
use web_sys::{WebGl2RenderingContext as GL, WebGlProgram, WebGlVertexArrayObject};

#[derive(Clone)]
pub enum ShapeType {
    Circle,
    Rectangle,
}

impl ToString for ShapeType {
    fn to_string(&self) -> String {
        match self {
            ShapeType::Circle => "circle".into(),
            ShapeType::Rectangle => "rect".into(),
        }
    }
}

pub fn create_shape_shader_program(
    gl: &GL,
    shape_type: &ShapeType,
) -> Result<WebGlProgram, JsValue> {
    let vertex_shader = init_vertex_shader(gl, SHAPE_VERTEX_SHADER_SOURCE)?;
    let fragment_shader_source = if let ShapeType::Circle = shape_type {
        CIRCLE_SHAPE_FRAGMENT_SHADER_SOURCE
    } else {
        RECTANGLE_SHAPE_FRAGMENT_SHADER_SOURCE
    };
    let fragment_shader = init_fragment_shader(gl, fragment_shader_source)?;
    init_program(gl, vertex_shader, fragment_shader)
}

pub struct ShapeMeshGeometry {
    vao: WebGlVertexArrayObject,
    program: WebGlProgram,
    instance_count: usize,
}

pub fn insert_instance_item<T: ShapeData>(
    data: &mut Vec<f32>,
    current: &T,
    next: &T,
    a0: f32,
    a1: f32,
) {
    data.push(a0);
    data.push(a1);
    data.push(current.fill_color_r());
    data.push(current.fill_color_g());
    data.push(current.fill_color_b());
    data.push(current.fill_color_opacity());
    data.push(next.fill_color_r());
    data.push(next.fill_color_g());
    data.push(next.fill_color_b());
    data.push(next.fill_color_opacity());
    data.push(current.x());
    data.push(current.y());
    data.push(next.x());
    data.push(next.y());
    data.push(current.width());
    data.push(current.height());
    data.push(next.width());
    data.push(next.height());
    data.push(current.stroke_color_r());
    data.push(current.stroke_color_g());
    data.push(current.stroke_color_b());
    data.push(current.stroke_color_opacity());
    data.push(next.stroke_color_r());
    data.push(next.stroke_color_g());
    data.push(next.stroke_color_b());
    data.push(next.stroke_color_opacity());
    data.push(current.stroke_width());
    data.push(next.stroke_width());
}

impl ShapeMeshGeometry {
    pub fn new(
        gl: &GL,
        program: &WebGlProgram,
        instance_data: &Vec<f32>,
    ) -> Result<ShapeMeshGeometry, JsValue> {
        let vertex_data = vec![-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
        let element_data = vec![0, 1, 2, 3];

        let position_location = gl.get_attrib_location(program, "aPosition") as u32;
        let alpha0_location = gl.get_attrib_location(program, "aAlpha0") as u32;
        let alpha1_location = gl.get_attrib_location(program, "aAlpha1") as u32;
        let color0_location = gl.get_attrib_location(program, "aColor0") as u32;
        let color1_location = gl.get_attrib_location(program, "aColor1") as u32;
        let center_position0_location = gl.get_attrib_location(program, "aCenterPosition0") as u32;
        let center_position1_location = gl.get_attrib_location(program, "aCenterPosition1") as u32;
        let size0_location = gl.get_attrib_location(program, "aSize0") as u32;
        let size1_location = gl.get_attrib_location(program, "aSize1") as u32;
        let stroke_color0_location = gl.get_attrib_location(program, "aStrokeColor0") as u32;
        let stroke_color1_location = gl.get_attrib_location(program, "aStrokeColor1") as u32;
        let stroke_width0_location = gl.get_attrib_location(program, "aStrokeWidth0") as u32;
        let stroke_width1_location = gl.get_attrib_location(program, "aStrokeWidth1") as u32;

        let vao = init_vertex_array_with_instances(
            gl,
            &vertex_data,
            &instance_data,
            &element_data,
            &[(position_location, 2)],
            &[
                (alpha0_location, 1),
                (alpha1_location, 1),
                (color0_location, 4),
                (color1_location, 4),
                (center_position0_location, 2),
                (center_position1_location, 2),
                (size0_location, 2),
                (size1_location, 2),
                (stroke_color0_location, 4),
                (stroke_color1_location, 4),
                (stroke_width0_location, 1),
                (stroke_width1_location, 1),
            ],
        )?;
        Ok(ShapeMeshGeometry {
            vao,
            program: program.clone(),
            instance_count: instance_data.len() / 28,
        })
    }
}

impl MeshGeometry for ShapeMeshGeometry {
    fn mode(&self) -> u32 {
        GL::TRIANGLE_STRIP
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn vao(&self) -> &WebGlVertexArrayObject {
        &self.vao
    }

    fn size(&self) -> i32 {
        4
    }

    fn instance_count(&self) -> Option<i32> {
        Some(self.instance_count as i32)
    }
}
