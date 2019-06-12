use super::program::{init_fragment_shader, init_program, init_vertex_shader};
use super::{EdgeData, LayoutData, Mesh, MeshGeometry};
use web_sys::{
    WebGl2RenderingContext, WebGlBuffer, WebGlProgram, WebGlTexture, WebGlVertexArrayObject,
};

#[derive(Clone)]
pub enum LinkType {
    Line,
}

const LINK_ATTRIBUTES: usize = 14;

const LINK_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es

layout(location = 0) in float aAlpha0;
layout(location = 1) in float aAlpha1;
layout(location = 2) in vec2 aPosition0;
layout(location = 3) in vec2 aPosition1;
layout(location = 4) in vec4 aColor0;
layout(location = 5) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;

void main() {
    float alpha = r * aAlpha1 + (1.0 - r) * aAlpha0;
    vColor = r * aColor1 + (1.0 - r) * aColor0;
    vColor.a *= alpha;
    gl_Position = uPMatrix * uMVMatrix * vec4(r * aPosition1 + (1.0 - r) * aPosition0, 1.0, 1.0);
}
"#;

const LINK_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;
void main() {
    oFragColor = vColor;
}
"#;

fn create_link_shader_program(gl: &WebGl2RenderingContext) -> Result<WebGlProgram, String> {
    let vertex_shader = init_vertex_shader(gl, LINK_VERTEX_SHADER_SOURCE)?;
    let fragment_shader = init_fragment_shader(gl, LINK_FRAGMENT_SHADER_SOURCE)?;
    init_program(gl, vertex_shader, fragment_shader)
}

fn init_vertex_array(
    gl: &WebGl2RenderingContext,
    program: &WebGlProgram,
    vertex_buffer: &WebGlBuffer,
    element_buffer: &WebGlBuffer,
) -> Result<WebGlVertexArrayObject, String> {
    let alpha0_location = gl.get_attrib_location(program, "aAlpha0");
    let alpha1_location = gl.get_attrib_location(program, "aAlpha1");
    let position0_location = gl.get_attrib_location(program, "aPosition0");
    let position1_location = gl.get_attrib_location(program, "aPosition1");
    let color0_location = gl.get_attrib_location(program, "aColor0");
    let color1_location = gl.get_attrib_location(program, "aColor1");
    let array = gl
        .create_vertex_array()
        .ok_or("failed to create vertex array")?;
    gl.bind_vertex_array(Some(&array));
    gl.bind_buffer(WebGl2RenderingContext::ARRAY_BUFFER, Some(&vertex_buffer));
    gl.bind_buffer(
        WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
        Some(&element_buffer),
    );
    gl.enable_vertex_attrib_array(alpha0_location as u32);
    gl.enable_vertex_attrib_array(alpha1_location as u32);
    gl.enable_vertex_attrib_array(position0_location as u32);
    gl.enable_vertex_attrib_array(position1_location as u32);
    gl.enable_vertex_attrib_array(color0_location as u32);
    gl.enable_vertex_attrib_array(color1_location as u32);
    gl.vertex_attrib_pointer_with_i32(
        alpha0_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        0,
    );
    gl.vertex_attrib_pointer_with_i32(
        alpha1_location as u32,
        1,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        4,
    );
    gl.vertex_attrib_pointer_with_i32(
        position0_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        8,
    );
    gl.vertex_attrib_pointer_with_i32(
        position1_location as u32,
        2,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        16,
    );
    gl.vertex_attrib_pointer_with_i32(
        color0_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        24,
    );
    gl.vertex_attrib_pointer_with_i32(
        color1_location as u32,
        4,
        WebGl2RenderingContext::FLOAT,
        false,
        56,
        40,
    );
    Ok(array)
}

struct VertexBuffer {
    buffer: WebGlBuffer,
    data: Vec<f32>,
}

impl VertexBuffer {
    fn new(gl: &WebGl2RenderingContext) -> Result<VertexBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let obj = VertexBuffer { buffer, data };
        Ok(obj)
    }
}

struct ElementBuffer {
    buffer: WebGlBuffer,
    data: Vec<u32>,
}

impl ElementBuffer {
    fn new(gl: &WebGl2RenderingContext) -> Result<ElementBuffer, String> {
        let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
        let data = Vec::new();
        let obj = ElementBuffer { buffer, data };
        Ok(obj)
    }
}

fn line_geometry(points: &Vec<[f64; 2]>, width: f64) -> Vec<[f32; 2]> {
    let pi = std::f32::consts::PI;
    let sqrt2 = (2.0 as f32).sqrt();
    let mut result = Vec::with_capacity(points.len() * 2);
    {
        let p1x = points[0][0] as f32;
        let p1y = points[0][1] as f32;
        let p2x = points[1][0] as f32;
        let p2y = points[1][1] as f32;
        let theta1 = (p2y - p1y).atan2(p2x - p1x);
        result.push([
            (width as f32) / sqrt2 * (theta1 + 3. * pi / 4.).cos() + p1x,
            (width as f32) / sqrt2 * (theta1 + 3. * pi / 4.).sin() + p1y,
        ]);
        result.push([
            (width as f32) / sqrt2 * (theta1 - 3. * pi / 4.).cos() + p1x,
            (width as f32) / sqrt2 * (theta1 - 3. * pi / 4.).sin() + p1y,
        ]);
    }
    for j in 1..(points.len() - 1) {
        let p1x = points[j - 1][0] as f32;
        let p1y = points[j - 1][1] as f32;
        let p2x = points[j][0] as f32;
        let p2y = points[j][1] as f32;
        let p3x = points[j + 1][0] as f32;
        let p3y = points[j + 1][1] as f32;
        let theta1 = (p2y - p1y).atan2(p2x - p1x);
        let theta2 = (p3y - p2y).atan2(p3x - p2x);
        result.push([
            (width as f32) / ((theta1 - theta2) / 2.).cos() / 2.
                * ((theta1 + theta2 + pi) / 2.).cos()
                + p2x,
            (width as f32) / ((theta1 - theta2) / 2.).cos() / 2.
                * ((theta1 + theta2 + pi) / 2.).sin()
                + p2y,
        ]);
        result.push([
            (width as f32) / ((theta1 - theta2) / 2.).cos() / 2.
                * ((theta1 + theta2 - pi) / 2.).cos()
                + p2x,
            (width as f32) / ((theta1 - theta2) / 2.).cos() / 2.
                * ((theta1 + theta2 - pi) / 2.).sin()
                + p2y,
        ]);
    }
    {
        let p2x = points[points.len() - 2][0] as f32;
        let p2y = points[points.len() - 2][1] as f32;
        let p3x = points[points.len() - 1][0] as f32;
        let p3y = points[points.len() - 1][1] as f32;
        let theta2 = (p3y - p2y).atan2(p3x - p2x);
        result.push([
            (width as f32) / sqrt2 * (theta2 + pi / 4.).cos() + p3x,
            (width as f32) / sqrt2 * (theta2 + pi / 4.).sin() + p3y,
        ]);
        result.push([
            (width as f32) / sqrt2 * (theta2 - pi / 4.).cos() + p3x,
            (width as f32) / sqrt2 * (theta2 - pi / 4.).sin() + p3y,
        ]);
    }
    result
}

pub struct LinkMeshGeometry {
    link_type: LinkType,
    vertices: VertexBuffer,
    elements: ElementBuffer,
    vao: WebGlVertexArrayObject,
}

impl LinkMeshGeometry {
    fn new(
        gl: &WebGl2RenderingContext,
        program: &WebGlProgram,
        link_type: LinkType,
    ) -> Result<LinkMeshGeometry, String> {
        let vertices = VertexBuffer::new(gl)?;
        let elements = ElementBuffer::new(gl)?;
        let vao = init_vertex_array(gl, &program, &vertices.buffer, &elements.buffer)?;
        Ok(LinkMeshGeometry {
            link_type,
            vertices,
            elements,
            vao,
        })
    }

    fn set_value(&mut self, index: usize, value: f32, offset: usize) -> Result<(), String> {
        let e = self
            .vertices
            .data
            .get_mut(LINK_ATTRIBUTES * index + offset)
            .ok_or(format!("Index out of bounds: ({}, {})", index, offset))?;
        *e = value;
        Ok(())
    }

    fn set_current_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 0)
    }

    fn set_next_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 1)
    }

    fn set_current_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 2)
    }

    fn set_current_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 3)
    }

    fn set_next_x(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 4)
    }

    fn set_next_y(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 5)
    }

    fn set_current_stroke_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 6)
    }

    fn set_current_stroke_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 7)
    }

    fn set_current_stroke_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 8)
    }

    fn set_current_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 9)
    }

    fn set_next_stroke_r(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 10)
    }

    fn set_next_stroke_g(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 11)
    }

    fn set_next_stroke_b(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 12)
    }

    fn set_next_stroke_alpha(&mut self, index: usize, value: f32) -> Result<(), String> {
        self.set_value(index, value, 13)
    }

    fn set_item(
        &mut self,
        vertex_offset_ref: &mut usize,
        element_offset_ref: &mut usize,
        current: &EdgeData,
        next: &EdgeData,
        a0: f32,
        a1: f32,
    ) -> Result<usize, String> {
        let vertex_offset = *vertex_offset_ref;
        let element_offset = *element_offset_ref;
        let current_points = line_geometry(&current.points, current.stroke_width);
        let next_points = line_geometry(&next.points, next.stroke_width);
        let n = current_points.len();
        for i in 0..n {
            self.set_current_alpha(vertex_offset + i, a0)?;
            self.set_next_alpha(vertex_offset + i, a1)?;
            self.set_current_x(vertex_offset + i, current_points[i][0])?;
            self.set_current_y(vertex_offset + i, current_points[i][1])?;
            self.set_next_x(vertex_offset + i, next_points[i][0])?;
            self.set_next_y(vertex_offset + i, next_points[i][1])?;
            self.set_current_stroke_r(vertex_offset + i, (current.stroke_color.r / 255.) as f32)?;
            self.set_current_stroke_g(vertex_offset + i, (current.stroke_color.g / 255.) as f32)?;
            self.set_current_stroke_b(vertex_offset + i, (current.stroke_color.b / 255.) as f32)?;
            self.set_current_stroke_alpha(vertex_offset + i, current.stroke_color.opacity as f32)?;
            self.set_next_stroke_r(vertex_offset + i, (next.stroke_color.r / 255.) as f32)?;
            self.set_next_stroke_g(vertex_offset + i, (next.stroke_color.g / 255.) as f32)?;
            self.set_next_stroke_b(vertex_offset + i, (next.stroke_color.b / 255.) as f32)?;
            self.set_next_stroke_alpha(vertex_offset + i, next.stroke_color.opacity as f32)?;
        }
        for i in 0..(next.points.len() - 1) {
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset) as u32;
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6 + 1)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset + 1) as u32;
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6 + 2)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset + 2) as u32;
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6 + 3)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset + 1) as u32;
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6 + 4)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset + 2) as u32;
            *(self
                .elements
                .data
                .get_mut((element_offset + i) * 6 + 5)
                .ok_or(format!(
                    "Element index out of bounds: {}",
                    element_offset + i
                ))?) = (i * 2 + vertex_offset + 3) as u32;
        }
        *vertex_offset_ref += n;
        *element_offset_ref += next.points.len() - 1;
        Ok(n)
    }

    fn is_same_link_type(&self, s: &String) -> bool {
        match self.link_type {
            LinkType::Line => s == "line",
        }
    }

    fn update(&mut self, gl: &WebGl2RenderingContext, layout: &LayoutData) -> Result<(), String> {
        let mut vertex_count = 0;
        let mut element_count = 0;
        for link in &layout.enter.edges {
            if self.is_same_link_type(&link.shape) {
                vertex_count += link.points.len() * 2;
                element_count += (link.points.len() - 1) * 6
            }
        }
        for link in &layout.update.edges {
            if self.is_same_link_type(&link.next.shape) {
                vertex_count += link.next.points.len() * 2;
                element_count += (link.next.points.len() - 1) * 6
            }
        }
        for link in &layout.exit.edges {
            if self.is_same_link_type(&link.shape) {
                vertex_count += link.points.len() * 2;
                element_count += (link.points.len() - 1) * 6
            }
        }
        self.vertices
            .data
            .resize(vertex_count * LINK_ATTRIBUTES, 0.);
        self.elements.data.resize(element_count, 0);

        let mut vertex_offset = 0;
        let mut element_offset = 0;
        for link in &layout.enter.edges {
            if self.is_same_link_type(&link.shape) {
                self.set_item(&mut vertex_offset, &mut element_offset, link, link, 0., 1.)?;
            }
        }
        for link in &layout.update.edges {
            if self.is_same_link_type(&link.next.shape) {
                self.set_item(
                    &mut vertex_offset,
                    &mut element_offset,
                    &link.current,
                    &link.next,
                    1.,
                    1.,
                )?;
            }
        }
        for link in &layout.exit.edges {
            if self.is_same_link_type(&link.shape) {
                self.set_item(&mut vertex_offset, &mut element_offset, link, link, 1., 0.)?;
            }
        }

        gl.bind_buffer(
            WebGl2RenderingContext::ARRAY_BUFFER,
            Some(&self.vertices.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.vertices.data.as_ptr() as *const u8,
                self.vertices.data.len() * std::mem::size_of::<f32>(),
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );
        gl.bind_buffer(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            Some(&self.elements.buffer),
        );
        let bytes = unsafe {
            std::slice::from_raw_parts(
                self.elements.data.as_ptr() as *const u8,
                self.elements.data.len() * std::mem::size_of::<u32>(),
            )
        };
        gl.buffer_data_with_u8_array(
            WebGl2RenderingContext::ELEMENT_ARRAY_BUFFER,
            bytes,
            WebGl2RenderingContext::STATIC_DRAW,
        );

        Ok(())
    }
}

impl MeshGeometry for LinkMeshGeometry {
    fn vao(&self) -> &WebGlVertexArrayObject {
        &self.vao
    }

    fn size(&self) -> i32 {
        self.elements.data.len() as i32
    }

    fn texture(&self) -> Option<&WebGlTexture> {
        None
    }
}

pub struct LinkMesh {
    program: WebGlProgram,
    geometries: Vec<Box<LinkMeshGeometry>>,
    link_type: LinkType,
}

impl LinkMesh {
    pub fn new(gl: &WebGl2RenderingContext, link_type: LinkType) -> Result<LinkMesh, String> {
        let program = create_link_shader_program(gl)?;
        Ok(LinkMesh {
            program,
            geometries: vec![],
            link_type,
        })
    }
}

impl Mesh for LinkMesh {
    fn mode(&self) -> u32 {
        WebGl2RenderingContext::TRIANGLES
    }

    fn program(&self) -> &WebGlProgram {
        &self.program
    }

    fn geometries(&self) -> &Vec<Box<MeshGeometry>> {
        unsafe { std::mem::transmute(&self.geometries) }
    }

    fn update(&mut self, gl: &WebGl2RenderingContext, layout: &LayoutData) -> Result<(), String> {
        let mut geometry = LinkMeshGeometry::new(gl, &self.program, self.link_type.clone())?;
        geometry.update(gl, layout);
        self.geometries.push(Box::new(geometry));
        Ok(())
    }
}
