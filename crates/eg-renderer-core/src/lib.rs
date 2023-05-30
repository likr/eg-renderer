#[macro_use]
extern crate serde_derive;

use js_sys::Function;
use wasm_bindgen::prelude::*;
use web_sys::window;

pub mod renderer;

#[wasm_bindgen(module = "/src/snippet.js")]
extern "C" {
  #[wasm_bindgen(js_name = "createCustomElement")]
  fn create_custom_element(create_handler: &Closure<dyn FnMut() -> EgRenderer>) -> Function;
}

#[wasm_bindgen]
pub struct EgRenderer {}

#[wasm_bindgen]
impl EgRenderer {
  pub fn new() -> EgRenderer {
    EgRenderer {}
  }
}

#[wasm_bindgen]
pub fn define() -> Result<(), JsValue> {
  let closure = Closure::wrap(Box::new(|| EgRenderer::new()) as Box<dyn FnMut() -> EgRenderer>);
  let element = create_custom_element(&closure);
  window()
    .unwrap()
    .custom_elements()
    .define(&"eg-renderer", &element)?;
  Ok(())
}
