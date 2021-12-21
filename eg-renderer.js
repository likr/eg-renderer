/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"eg-renderer": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.wasm": function() {
/******/ 			return {
/******/ 				"./eg_renderer_core_bg.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_json_parse": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_json_parse"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_json_serialize": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_json_serialize"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_boolean_get": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_boolean_get"](p0i32);
/******/ 					},
/******/ 					"__wbg_instanceof_WebGl2RenderingContext_56ad96bfac3f5531": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_instanceof_WebGl2RenderingContext_56ad96bfac3f5531"](p0i32);
/******/ 					},
/******/ 					"__wbg_bindVertexArray_52b8b2f5fd93d81d": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_bindVertexArray_52b8b2f5fd93d81d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_bufferData_794d61d3c392fafd": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_bufferData_794d61d3c392fafd"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_createVertexArray_d59135c0a43c410b": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createVertexArray_d59135c0a43c410b"](p0i32);
/******/ 					},
/******/ 					"__wbg_drawElementsInstanced_c138e56b91de9ba4": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_drawElementsInstanced_c138e56b91de9ba4"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__wbg_texImage2D_153b2a8f02fceedd": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_texImage2D_153b2a8f02fceedd"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32);
/******/ 					},
/******/ 					"__wbg_uniformMatrix4fv_03d4a6800fd3537e": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_uniformMatrix4fv_03d4a6800fd3537e"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_vertexAttribDivisor_8d11db24ac277254": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_vertexAttribDivisor_8d11db24ac277254"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_attachShader_7faccaa7b5ac28a6": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_attachShader_7faccaa7b5ac28a6"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_bindBuffer_4ece833dd10cac2f": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_bindBuffer_4ece833dd10cac2f"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_bindTexture_9d8ed0fcd83eb0a9": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_bindTexture_9d8ed0fcd83eb0a9"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_blendFuncSeparate_1d03d2ee0347dd73": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_blendFuncSeparate_1d03d2ee0347dd73"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_clear_4ce66c813d66e77d": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_clear_4ce66c813d66e77d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_clearColor_71f96fd72a7646a6": function(p0i32,p1f32,p2f32,p3f32,p4f32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_clearColor_71f96fd72a7646a6"](p0i32,p1f32,p2f32,p3f32,p4f32);
/******/ 					},
/******/ 					"__wbg_compileShader_dd66d66a5a6481f3": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_compileShader_dd66d66a5a6481f3"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_createBuffer_5c5caa16032a81b7": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createBuffer_5c5caa16032a81b7"](p0i32);
/******/ 					},
/******/ 					"__wbg_createProgram_32d01a55e144b9fc": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createProgram_32d01a55e144b9fc"](p0i32);
/******/ 					},
/******/ 					"__wbg_createShader_6e8eed55567fe1a6": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createShader_6e8eed55567fe1a6"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_createTexture_8f31e7386e22fc37": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createTexture_8f31e7386e22fc37"](p0i32);
/******/ 					},
/******/ 					"__wbg_disable_b05e075ae54fa448": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_disable_b05e075ae54fa448"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_drawElements_a41bb53d39cd6297": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_drawElements_a41bb53d39cd6297"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_enable_766e546395da5a5d": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_enable_766e546395da5a5d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_enableVertexAttribArray_91da8d3cbe0c2bbd": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_enableVertexAttribArray_91da8d3cbe0c2bbd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_generateMipmap_75691e7b4b9a138a": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_generateMipmap_75691e7b4b9a138a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_getAttribLocation_5d304d390c7273f5": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getAttribLocation_5d304d390c7273f5"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_getProgramInfoLog_18c849a5fa54e7b1": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getProgramInfoLog_18c849a5fa54e7b1"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_getProgramParameter_80edd3cfbcf7cf1d": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getProgramParameter_80edd3cfbcf7cf1d"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_getShaderInfoLog_ba1de20c14b6fb63": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getShaderInfoLog_ba1de20c14b6fb63"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_getShaderParameter_264d9ab5c13ece4d": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getShaderParameter_264d9ab5c13ece4d"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_getUniformLocation_77b2d89291f84289": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getUniformLocation_77b2d89291f84289"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_linkProgram_b84796e37364e5c9": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_linkProgram_b84796e37364e5c9"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_shaderSource_18f45f93c05a8311": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_shaderSource_18f45f93c05a8311"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_texParameteri_c54aab65b2f8cf6d": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_texParameteri_c54aab65b2f8cf6d"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_uniform1f_a7858af9d2384350": function(p0i32,p1i32,p2f32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_uniform1f_a7858af9d2384350"](p0i32,p1i32,p2f32);
/******/ 					},
/******/ 					"__wbg_uniform1i_e287345af4468e22": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_uniform1i_e287345af4468e22"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_uniform2f_f8d8e7662e0e0eb6": function(p0i32,p1i32,p2f32,p3f32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_uniform2f_f8d8e7662e0e0eb6"](p0i32,p1i32,p2f32,p3f32);
/******/ 					},
/******/ 					"__wbg_useProgram_c2fdf4a953d1128a": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_useProgram_c2fdf4a953d1128a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_vertexAttribPointer_76d558694fe81cd7": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_vertexAttribPointer_76d558694fe81cd7"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32);
/******/ 					},
/******/ 					"__wbg_viewport_da0901eee69b9909": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_viewport_da0901eee69b9909"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_instanceof_Window_c4b70662a0d2c5ec": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_instanceof_Window_c4b70662a0d2c5ec"](p0i32);
/******/ 					},
/******/ 					"__wbg_document_1c64944725c0d81d": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_document_1c64944725c0d81d"](p0i32);
/******/ 					},
/******/ 					"__wbg_devicePixelRatio_d8c3852bb37f76bf": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_devicePixelRatio_d8c3852bb37f76bf"](p0i32);
/******/ 					},
/******/ 					"__wbg_createElement_86c152812a141a62": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_createElement_86c152812a141a62"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_instanceof_CanvasRenderingContext2d_3abbe7ec7af32cae": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_instanceof_CanvasRenderingContext2d_3abbe7ec7af32cae"](p0i32);
/******/ 					},
/******/ 					"__wbg_setstrokeStyle_947bd4c26c94673f": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setstrokeStyle_947bd4c26c94673f"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setfillStyle_528a6a267c863ae7": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setfillStyle_528a6a267c863ae7"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setlineWidth_3221b7818c00ed48": function(p0i32,p1f64) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setlineWidth_3221b7818c00ed48"](p0i32,p1f64);
/******/ 					},
/******/ 					"__wbg_setfont_884816cc1b46ae3f": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setfont_884816cc1b46ae3f"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextAlign_1891d6f4d7f9b9a3": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_settextAlign_1891d6f4d7f9b9a3"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextBaseline_3b90a2129ee3dead": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_settextBaseline_3b90a2129ee3dead"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_fillText_25221e9cc35a1850": function(p0i32,p1i32,p2i32,p3f64,p4f64) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_fillText_25221e9cc35a1850"](p0i32,p1i32,p2i32,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_measureText_646aac3696f5cad5": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_measureText_646aac3696f5cad5"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_strokeText_ac933a55116c976f": function(p0i32,p1i32,p2i32,p3f64,p4f64) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_strokeText_ac933a55116c976f"](p0i32,p1i32,p2i32,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_instanceof_HtmlCanvasElement_25d964a0dde6717e": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_instanceof_HtmlCanvasElement_25d964a0dde6717e"](p0i32);
/******/ 					},
/******/ 					"__wbg_width_555f63ab09ba7d3f": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_width_555f63ab09ba7d3f"](p0i32);
/******/ 					},
/******/ 					"__wbg_setwidth_c1a7061891b71f25": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setwidth_c1a7061891b71f25"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_height_7153faec70fbaf7b": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_height_7153faec70fbaf7b"](p0i32);
/******/ 					},
/******/ 					"__wbg_setheight_88894b05710ff752": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_setheight_88894b05710ff752"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_getContext_f701d0231ae22393": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getContext_f701d0231ae22393"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_getContext_3e21e21280a332fc": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_getContext_3e21e21280a332fc"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_width_4dd0ad3fb763f881": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_width_4dd0ad3fb763f881"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_be86524d73f67598": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_newnoargs_be86524d73f67598"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_888d259a5fefc347": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_call_888d259a5fefc347"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_self_c6fbdfc2918d5e58": function() {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_self_c6fbdfc2918d5e58"]();
/******/ 					},
/******/ 					"__wbg_window_baec038b5ab35c54": function() {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_window_baec038b5ab35c54"]();
/******/ 					},
/******/ 					"__wbg_globalThis_3f735a5746d41fbd": function() {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_globalThis_3f735a5746d41fbd"]();
/******/ 					},
/******/ 					"__wbg_global_1bc0b39582740e95": function() {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbg_global_1bc0b39582740e95"]();
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_rethrow": function(p0i32) {
/******/ 						return installedModules["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.js"].exports["__wbindgen_rethrow"](p0i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../../crates/eg-renderer-core/dist/bundler/eg_renderer_core_bg.wasm":"a8dd8fb4fa9e38486ca6"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eg-renderer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/d3-color/src/color.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/color.js ***!
  \*****************************************************************************/
/*! exports provided: Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Color\", function() { return Color; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"darker\", function() { return darker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"brighter\", function() { return brighter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return color; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbConvert\", function() { return rgbConvert; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgb\", function() { return rgb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rgb\", function() { return Rgb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hslConvert\", function() { return hslConvert; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hsl\", function() { return hsl; });\n/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ \"../../node_modules/d3-color/src/define.js\");\n\n\nfunction Color() {}\n\nvar darker = 0.7;\nvar brighter = 1 / darker;\n\nvar reI = \"\\\\s*([+-]?\\\\d+)\\\\s*\",\n    reN = \"\\\\s*([+-]?\\\\d*\\\\.?\\\\d+(?:[eE][+-]?\\\\d+)?)\\\\s*\",\n    reP = \"\\\\s*([+-]?\\\\d*\\\\.?\\\\d+(?:[eE][+-]?\\\\d+)?)%\\\\s*\",\n    reHex = /^#([0-9a-f]{3,8})$/,\n    reRgbInteger = new RegExp(\"^rgb\\\\(\" + [reI, reI, reI] + \"\\\\)$\"),\n    reRgbPercent = new RegExp(\"^rgb\\\\(\" + [reP, reP, reP] + \"\\\\)$\"),\n    reRgbaInteger = new RegExp(\"^rgba\\\\(\" + [reI, reI, reI, reN] + \"\\\\)$\"),\n    reRgbaPercent = new RegExp(\"^rgba\\\\(\" + [reP, reP, reP, reN] + \"\\\\)$\"),\n    reHslPercent = new RegExp(\"^hsl\\\\(\" + [reN, reP, reP] + \"\\\\)$\"),\n    reHslaPercent = new RegExp(\"^hsla\\\\(\" + [reN, reP, reP, reN] + \"\\\\)$\");\n\nvar named = {\n  aliceblue: 0xf0f8ff,\n  antiquewhite: 0xfaebd7,\n  aqua: 0x00ffff,\n  aquamarine: 0x7fffd4,\n  azure: 0xf0ffff,\n  beige: 0xf5f5dc,\n  bisque: 0xffe4c4,\n  black: 0x000000,\n  blanchedalmond: 0xffebcd,\n  blue: 0x0000ff,\n  blueviolet: 0x8a2be2,\n  brown: 0xa52a2a,\n  burlywood: 0xdeb887,\n  cadetblue: 0x5f9ea0,\n  chartreuse: 0x7fff00,\n  chocolate: 0xd2691e,\n  coral: 0xff7f50,\n  cornflowerblue: 0x6495ed,\n  cornsilk: 0xfff8dc,\n  crimson: 0xdc143c,\n  cyan: 0x00ffff,\n  darkblue: 0x00008b,\n  darkcyan: 0x008b8b,\n  darkgoldenrod: 0xb8860b,\n  darkgray: 0xa9a9a9,\n  darkgreen: 0x006400,\n  darkgrey: 0xa9a9a9,\n  darkkhaki: 0xbdb76b,\n  darkmagenta: 0x8b008b,\n  darkolivegreen: 0x556b2f,\n  darkorange: 0xff8c00,\n  darkorchid: 0x9932cc,\n  darkred: 0x8b0000,\n  darksalmon: 0xe9967a,\n  darkseagreen: 0x8fbc8f,\n  darkslateblue: 0x483d8b,\n  darkslategray: 0x2f4f4f,\n  darkslategrey: 0x2f4f4f,\n  darkturquoise: 0x00ced1,\n  darkviolet: 0x9400d3,\n  deeppink: 0xff1493,\n  deepskyblue: 0x00bfff,\n  dimgray: 0x696969,\n  dimgrey: 0x696969,\n  dodgerblue: 0x1e90ff,\n  firebrick: 0xb22222,\n  floralwhite: 0xfffaf0,\n  forestgreen: 0x228b22,\n  fuchsia: 0xff00ff,\n  gainsboro: 0xdcdcdc,\n  ghostwhite: 0xf8f8ff,\n  gold: 0xffd700,\n  goldenrod: 0xdaa520,\n  gray: 0x808080,\n  green: 0x008000,\n  greenyellow: 0xadff2f,\n  grey: 0x808080,\n  honeydew: 0xf0fff0,\n  hotpink: 0xff69b4,\n  indianred: 0xcd5c5c,\n  indigo: 0x4b0082,\n  ivory: 0xfffff0,\n  khaki: 0xf0e68c,\n  lavender: 0xe6e6fa,\n  lavenderblush: 0xfff0f5,\n  lawngreen: 0x7cfc00,\n  lemonchiffon: 0xfffacd,\n  lightblue: 0xadd8e6,\n  lightcoral: 0xf08080,\n  lightcyan: 0xe0ffff,\n  lightgoldenrodyellow: 0xfafad2,\n  lightgray: 0xd3d3d3,\n  lightgreen: 0x90ee90,\n  lightgrey: 0xd3d3d3,\n  lightpink: 0xffb6c1,\n  lightsalmon: 0xffa07a,\n  lightseagreen: 0x20b2aa,\n  lightskyblue: 0x87cefa,\n  lightslategray: 0x778899,\n  lightslategrey: 0x778899,\n  lightsteelblue: 0xb0c4de,\n  lightyellow: 0xffffe0,\n  lime: 0x00ff00,\n  limegreen: 0x32cd32,\n  linen: 0xfaf0e6,\n  magenta: 0xff00ff,\n  maroon: 0x800000,\n  mediumaquamarine: 0x66cdaa,\n  mediumblue: 0x0000cd,\n  mediumorchid: 0xba55d3,\n  mediumpurple: 0x9370db,\n  mediumseagreen: 0x3cb371,\n  mediumslateblue: 0x7b68ee,\n  mediumspringgreen: 0x00fa9a,\n  mediumturquoise: 0x48d1cc,\n  mediumvioletred: 0xc71585,\n  midnightblue: 0x191970,\n  mintcream: 0xf5fffa,\n  mistyrose: 0xffe4e1,\n  moccasin: 0xffe4b5,\n  navajowhite: 0xffdead,\n  navy: 0x000080,\n  oldlace: 0xfdf5e6,\n  olive: 0x808000,\n  olivedrab: 0x6b8e23,\n  orange: 0xffa500,\n  orangered: 0xff4500,\n  orchid: 0xda70d6,\n  palegoldenrod: 0xeee8aa,\n  palegreen: 0x98fb98,\n  paleturquoise: 0xafeeee,\n  palevioletred: 0xdb7093,\n  papayawhip: 0xffefd5,\n  peachpuff: 0xffdab9,\n  peru: 0xcd853f,\n  pink: 0xffc0cb,\n  plum: 0xdda0dd,\n  powderblue: 0xb0e0e6,\n  purple: 0x800080,\n  rebeccapurple: 0x663399,\n  red: 0xff0000,\n  rosybrown: 0xbc8f8f,\n  royalblue: 0x4169e1,\n  saddlebrown: 0x8b4513,\n  salmon: 0xfa8072,\n  sandybrown: 0xf4a460,\n  seagreen: 0x2e8b57,\n  seashell: 0xfff5ee,\n  sienna: 0xa0522d,\n  silver: 0xc0c0c0,\n  skyblue: 0x87ceeb,\n  slateblue: 0x6a5acd,\n  slategray: 0x708090,\n  slategrey: 0x708090,\n  snow: 0xfffafa,\n  springgreen: 0x00ff7f,\n  steelblue: 0x4682b4,\n  tan: 0xd2b48c,\n  teal: 0x008080,\n  thistle: 0xd8bfd8,\n  tomato: 0xff6347,\n  turquoise: 0x40e0d0,\n  violet: 0xee82ee,\n  wheat: 0xf5deb3,\n  white: 0xffffff,\n  whitesmoke: 0xf5f5f5,\n  yellow: 0xffff00,\n  yellowgreen: 0x9acd32\n};\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Color, color, {\n  copy: function(channels) {\n    return Object.assign(new this.constructor, this, channels);\n  },\n  displayable: function() {\n    return this.rgb().displayable();\n  },\n  hex: color_formatHex, // Deprecated! Use color.formatHex.\n  formatHex: color_formatHex,\n  formatHsl: color_formatHsl,\n  formatRgb: color_formatRgb,\n  toString: color_formatRgb\n});\n\nfunction color_formatHex() {\n  return this.rgb().formatHex();\n}\n\nfunction color_formatHsl() {\n  return hslConvert(this).formatHsl();\n}\n\nfunction color_formatRgb() {\n  return this.rgb().formatRgb();\n}\n\nfunction color(format) {\n  var m, l;\n  format = (format + \"\").trim().toLowerCase();\n  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000\n      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00\n      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000\n      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000\n      : null) // invalid hex\n      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)\n      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)\n      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)\n      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)\n      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)\n      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)\n      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins\n      : format === \"transparent\" ? new Rgb(NaN, NaN, NaN, 0)\n      : null;\n}\n\nfunction rgbn(n) {\n  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);\n}\n\nfunction rgba(r, g, b, a) {\n  if (a <= 0) r = g = b = NaN;\n  return new Rgb(r, g, b, a);\n}\n\nfunction rgbConvert(o) {\n  if (!(o instanceof Color)) o = color(o);\n  if (!o) return new Rgb;\n  o = o.rgb();\n  return new Rgb(o.r, o.g, o.b, o.opacity);\n}\n\nfunction rgb(r, g, b, opacity) {\n  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);\n}\n\nfunction Rgb(r, g, b, opacity) {\n  this.r = +r;\n  this.g = +g;\n  this.b = +b;\n  this.opacity = +opacity;\n}\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Rgb, rgb, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(Color, {\n  brighter: function(k) {\n    k = k == null ? brighter : Math.pow(brighter, k);\n    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);\n  },\n  darker: function(k) {\n    k = k == null ? darker : Math.pow(darker, k);\n    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);\n  },\n  rgb: function() {\n    return this;\n  },\n  displayable: function() {\n    return (-0.5 <= this.r && this.r < 255.5)\n        && (-0.5 <= this.g && this.g < 255.5)\n        && (-0.5 <= this.b && this.b < 255.5)\n        && (0 <= this.opacity && this.opacity <= 1);\n  },\n  hex: rgb_formatHex, // Deprecated! Use color.formatHex.\n  formatHex: rgb_formatHex,\n  formatRgb: rgb_formatRgb,\n  toString: rgb_formatRgb\n}));\n\nfunction rgb_formatHex() {\n  return \"#\" + hex(this.r) + hex(this.g) + hex(this.b);\n}\n\nfunction rgb_formatRgb() {\n  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));\n  return (a === 1 ? \"rgb(\" : \"rgba(\")\n      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + \", \"\n      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + \", \"\n      + Math.max(0, Math.min(255, Math.round(this.b) || 0))\n      + (a === 1 ? \")\" : \", \" + a + \")\");\n}\n\nfunction hex(value) {\n  value = Math.max(0, Math.min(255, Math.round(value) || 0));\n  return (value < 16 ? \"0\" : \"\") + value.toString(16);\n}\n\nfunction hsla(h, s, l, a) {\n  if (a <= 0) h = s = l = NaN;\n  else if (l <= 0 || l >= 1) h = s = NaN;\n  else if (s <= 0) h = NaN;\n  return new Hsl(h, s, l, a);\n}\n\nfunction hslConvert(o) {\n  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);\n  if (!(o instanceof Color)) o = color(o);\n  if (!o) return new Hsl;\n  if (o instanceof Hsl) return o;\n  o = o.rgb();\n  var r = o.r / 255,\n      g = o.g / 255,\n      b = o.b / 255,\n      min = Math.min(r, g, b),\n      max = Math.max(r, g, b),\n      h = NaN,\n      s = max - min,\n      l = (max + min) / 2;\n  if (s) {\n    if (r === max) h = (g - b) / s + (g < b) * 6;\n    else if (g === max) h = (b - r) / s + 2;\n    else h = (r - g) / s + 4;\n    s /= l < 0.5 ? max + min : 2 - max - min;\n    h *= 60;\n  } else {\n    s = l > 0 && l < 1 ? 0 : h;\n  }\n  return new Hsl(h, s, l, o.opacity);\n}\n\nfunction hsl(h, s, l, opacity) {\n  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);\n}\n\nfunction Hsl(h, s, l, opacity) {\n  this.h = +h;\n  this.s = +s;\n  this.l = +l;\n  this.opacity = +opacity;\n}\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Hsl, hsl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(Color, {\n  brighter: function(k) {\n    k = k == null ? brighter : Math.pow(brighter, k);\n    return new Hsl(this.h, this.s, this.l * k, this.opacity);\n  },\n  darker: function(k) {\n    k = k == null ? darker : Math.pow(darker, k);\n    return new Hsl(this.h, this.s, this.l * k, this.opacity);\n  },\n  rgb: function() {\n    var h = this.h % 360 + (this.h < 0) * 360,\n        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,\n        l = this.l,\n        m2 = l + (l < 0.5 ? l : 1 - l) * s,\n        m1 = 2 * l - m2;\n    return new Rgb(\n      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),\n      hsl2rgb(h, m1, m2),\n      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),\n      this.opacity\n    );\n  },\n  displayable: function() {\n    return (0 <= this.s && this.s <= 1 || isNaN(this.s))\n        && (0 <= this.l && this.l <= 1)\n        && (0 <= this.opacity && this.opacity <= 1);\n  },\n  formatHsl: function() {\n    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));\n    return (a === 1 ? \"hsl(\" : \"hsla(\")\n        + (this.h || 0) + \", \"\n        + (this.s || 0) * 100 + \"%, \"\n        + (this.l || 0) * 100 + \"%\"\n        + (a === 1 ? \")\" : \", \" + a + \")\");\n  }\n}));\n\n/* From FvD 13.37, CSS Color Module Level 3 */\nfunction hsl2rgb(h, m1, m2) {\n  return (h < 60 ? m1 + (m2 - m1) * h / 60\n      : h < 180 ? m2\n      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60\n      : m1) * 255;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/color.js?");

/***/ }),

/***/ "../../node_modules/d3-color/src/cubehelix.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/cubehelix.js ***!
  \*********************************************************************************/
/*! exports provided: default, Cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cubehelix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cubehelix\", function() { return Cubehelix; });\n/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ \"../../node_modules/d3-color/src/define.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-color/src/color.js\");\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ \"../../node_modules/d3-color/src/math.js\");\n\n\n\n\nvar A = -0.14861,\n    B = +1.78277,\n    C = -0.29227,\n    D = -0.90649,\n    E = +1.97294,\n    ED = E * D,\n    EB = E * B,\n    BC_DA = B * C - D * A;\n\nfunction cubehelixConvert(o) {\n  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);\n  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__[\"Rgb\"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"rgbConvert\"])(o);\n  var r = o.r / 255,\n      g = o.g / 255,\n      b = o.b / 255,\n      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),\n      bl = b - l,\n      k = (E * (g - l) - C * bl) / D,\n      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1\n      h = s ? Math.atan2(k, bl) * _math_js__WEBPACK_IMPORTED_MODULE_2__[\"rad2deg\"] - 120 : NaN;\n  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);\n}\n\nfunction cubehelix(h, s, l, opacity) {\n  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);\n}\n\nfunction Cubehelix(h, s, l, opacity) {\n  this.h = +h;\n  this.s = +s;\n  this.l = +l;\n  this.opacity = +opacity;\n}\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Cubehelix, cubehelix, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"Color\"], {\n  brighter: function(k) {\n    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__[\"brighter\"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"brighter\"], k);\n    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);\n  },\n  darker: function(k) {\n    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__[\"darker\"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"darker\"], k);\n    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);\n  },\n  rgb: function() {\n    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math_js__WEBPACK_IMPORTED_MODULE_2__[\"deg2rad\"],\n        l = +this.l,\n        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),\n        cosh = Math.cos(h),\n        sinh = Math.sin(h);\n    return new _color_js__WEBPACK_IMPORTED_MODULE_1__[\"Rgb\"](\n      255 * (l + a * (A * cosh + B * sinh)),\n      255 * (l + a * (C * cosh + D * sinh)),\n      255 * (l + a * (E * cosh)),\n      this.opacity\n    );\n  }\n}));\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/cubehelix.js?");

/***/ }),

/***/ "../../node_modules/d3-color/src/define.js":
/*!******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/define.js ***!
  \******************************************************************************/
/*! exports provided: default, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extend\", function() { return extend; });\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(constructor, factory, prototype) {\n  constructor.prototype = factory.prototype = prototype;\n  prototype.constructor = constructor;\n});\n\nfunction extend(parent, definition) {\n  var prototype = Object.create(parent.prototype);\n  for (var key in definition) prototype[key] = definition[key];\n  return prototype;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/define.js?");

/***/ }),

/***/ "../../node_modules/d3-color/src/index.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/index.js ***!
  \*****************************************************************************/
/*! exports provided: color, rgb, hsl, lab, hcl, lch, gray, cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-color/src/color.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"color\", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"rgb\", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__[\"rgb\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hsl\", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__[\"hsl\"]; });\n\n/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lab.js */ \"../../node_modules/d3-color/src/lab.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lab\", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hcl\", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__[\"hcl\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lch\", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__[\"lch\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"gray\", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__[\"gray\"]; });\n\n/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubehelix.js */ \"../../node_modules/d3-color/src/cubehelix.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cubehelix\", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-color/src/lab.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/lab.js ***!
  \***************************************************************************/
/*! exports provided: gray, default, Lab, lch, hcl, Hcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gray\", function() { return gray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return lab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Lab\", function() { return Lab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lch\", function() { return lch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hcl\", function() { return hcl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hcl\", function() { return Hcl; });\n/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ \"../../node_modules/d3-color/src/define.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-color/src/color.js\");\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ \"../../node_modules/d3-color/src/math.js\");\n\n\n\n\n// https://observablehq.com/@mbostock/lab-and-rgb\nvar K = 18,\n    Xn = 0.96422,\n    Yn = 1,\n    Zn = 0.82521,\n    t0 = 4 / 29,\n    t1 = 6 / 29,\n    t2 = 3 * t1 * t1,\n    t3 = t1 * t1 * t1;\n\nfunction labConvert(o) {\n  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);\n  if (o instanceof Hcl) return hcl2lab(o);\n  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__[\"Rgb\"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"rgbConvert\"])(o);\n  var r = rgb2lrgb(o.r),\n      g = rgb2lrgb(o.g),\n      b = rgb2lrgb(o.b),\n      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;\n  if (r === g && g === b) x = z = y; else {\n    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);\n    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);\n  }\n  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);\n}\n\nfunction gray(l, opacity) {\n  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);\n}\n\nfunction lab(l, a, b, opacity) {\n  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);\n}\n\nfunction Lab(l, a, b, opacity) {\n  this.l = +l;\n  this.a = +a;\n  this.b = +b;\n  this.opacity = +opacity;\n}\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Lab, lab, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"Color\"], {\n  brighter: function(k) {\n    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);\n  },\n  darker: function(k) {\n    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);\n  },\n  rgb: function() {\n    var y = (this.l + 16) / 116,\n        x = isNaN(this.a) ? y : y + this.a / 500,\n        z = isNaN(this.b) ? y : y - this.b / 200;\n    x = Xn * lab2xyz(x);\n    y = Yn * lab2xyz(y);\n    z = Zn * lab2xyz(z);\n    return new _color_js__WEBPACK_IMPORTED_MODULE_1__[\"Rgb\"](\n      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),\n      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),\n      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),\n      this.opacity\n    );\n  }\n}));\n\nfunction xyz2lab(t) {\n  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;\n}\n\nfunction lab2xyz(t) {\n  return t > t1 ? t * t * t : t2 * (t - t0);\n}\n\nfunction lrgb2rgb(x) {\n  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);\n}\n\nfunction rgb2lrgb(x) {\n  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);\n}\n\nfunction hclConvert(o) {\n  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);\n  if (!(o instanceof Lab)) o = labConvert(o);\n  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);\n  var h = Math.atan2(o.b, o.a) * _math_js__WEBPACK_IMPORTED_MODULE_2__[\"rad2deg\"];\n  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);\n}\n\nfunction lch(l, c, h, opacity) {\n  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);\n}\n\nfunction hcl(h, c, l, opacity) {\n  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);\n}\n\nfunction Hcl(h, c, l, opacity) {\n  this.h = +h;\n  this.c = +c;\n  this.l = +l;\n  this.opacity = +opacity;\n}\n\nfunction hcl2lab(o) {\n  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);\n  var h = o.h * _math_js__WEBPACK_IMPORTED_MODULE_2__[\"deg2rad\"];\n  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);\n}\n\nObject(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Hcl, hcl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__[\"extend\"])(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"Color\"], {\n  brighter: function(k) {\n    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);\n  },\n  darker: function(k) {\n    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);\n  },\n  rgb: function() {\n    return hcl2lab(this).rgb();\n  }\n}));\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/lab.js?");

/***/ }),

/***/ "../../node_modules/d3-color/src/math.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/math.js ***!
  \****************************************************************************/
/*! exports provided: deg2rad, rad2deg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deg2rad\", function() { return deg2rad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rad2deg\", function() { return rad2deg; });\nvar deg2rad = Math.PI / 180;\nvar rad2deg = 180 / Math.PI;\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-color/src/math.js?");

/***/ }),

/***/ "../../node_modules/d3-dispatch/src/dispatch.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-dispatch/src/dispatch.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar noop = {value: function() {}};\n\nfunction dispatch() {\n  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {\n    if (!(t = arguments[i] + \"\") || (t in _) || /[\\s.]/.test(t)) throw new Error(\"illegal type: \" + t);\n    _[t] = [];\n  }\n  return new Dispatch(_);\n}\n\nfunction Dispatch(_) {\n  this._ = _;\n}\n\nfunction parseTypenames(typenames, types) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    if (t && !types.hasOwnProperty(t)) throw new Error(\"unknown type: \" + t);\n    return {type: t, name: name};\n  });\n}\n\nDispatch.prototype = dispatch.prototype = {\n  constructor: Dispatch,\n  on: function(typename, callback) {\n    var _ = this._,\n        T = parseTypenames(typename + \"\", _),\n        t,\n        i = -1,\n        n = T.length;\n\n    // If no callback was specified, return the callback of the given type and name.\n    if (arguments.length < 2) {\n      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;\n      return;\n    }\n\n    // If a type was specified, set the callback for the given type and name.\n    // Otherwise, if a null callback was specified, remove callbacks of the given name.\n    if (callback != null && typeof callback !== \"function\") throw new Error(\"invalid callback: \" + callback);\n    while (++i < n) {\n      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);\n      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);\n    }\n\n    return this;\n  },\n  copy: function() {\n    var copy = {}, _ = this._;\n    for (var t in _) copy[t] = _[t].slice();\n    return new Dispatch(copy);\n  },\n  call: function(type, that) {\n    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  },\n  apply: function(type, that, args) {\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  }\n};\n\nfunction get(type, name) {\n  for (var i = 0, n = type.length, c; i < n; ++i) {\n    if ((c = type[i]).name === name) {\n      return c.value;\n    }\n  }\n}\n\nfunction set(type, name, callback) {\n  for (var i = 0, n = type.length; i < n; ++i) {\n    if (type[i].name === name) {\n      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));\n      break;\n    }\n  }\n  if (callback != null) type.push({name: name, value: callback});\n  return type;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dispatch);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-dispatch/src/dispatch.js?");

/***/ }),

/***/ "../../node_modules/d3-dispatch/src/index.js":
/*!********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-dispatch/src/index.js ***!
  \********************************************************************************/
/*! exports provided: dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispatch.js */ \"../../node_modules/d3-dispatch/src/dispatch.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dispatch\", function() { return _dispatch_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-dispatch/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/constant.js":
/*!*******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/constant.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return function() {\n    return x;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/constant.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/drag.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/drag.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ \"../../node_modules/d3-dispatch/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _nodrag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodrag.js */ \"../../node_modules/d3-drag/src/nodrag.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noevent.js */ \"../../node_modules/d3-drag/src/noevent.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constant.js */ \"../../node_modules/d3-drag/src/constant.js\");\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event.js */ \"../../node_modules/d3-drag/src/event.js\");\n\n\n\n\n\n\n\n// Ignore right-click, since that should open the context menu.\nfunction defaultFilter() {\n  return !d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].ctrlKey && !d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].button;\n}\n\nfunction defaultContainer() {\n  return this.parentNode;\n}\n\nfunction defaultSubject(d) {\n  return d == null ? {x: d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].x, y: d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].y} : d;\n}\n\nfunction defaultTouchable() {\n  return navigator.maxTouchPoints || (\"ontouchstart\" in this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var filter = defaultFilter,\n      container = defaultContainer,\n      subject = defaultSubject,\n      touchable = defaultTouchable,\n      gestures = {},\n      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__[\"dispatch\"])(\"start\", \"drag\", \"end\"),\n      active = 0,\n      mousedownx,\n      mousedowny,\n      mousemoving,\n      touchending,\n      clickDistance2 = 0;\n\n  function drag(selection) {\n    selection\n        .on(\"mousedown.drag\", mousedowned)\n      .filter(touchable)\n        .on(\"touchstart.drag\", touchstarted)\n        .on(\"touchmove.drag\", touchmoved)\n        .on(\"touchend.drag touchcancel.drag\", touchended)\n        .style(\"touch-action\", \"none\")\n        .style(\"-webkit-tap-highlight-color\", \"rgba(0,0,0,0)\");\n  }\n\n  function mousedowned() {\n    if (touchending || !filter.apply(this, arguments)) return;\n    var gesture = beforestart(\"mouse\", container.apply(this, arguments), d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"mouse\"], this, arguments);\n    if (!gesture) return;\n    Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"select\"])(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].view).on(\"mousemove.drag\", mousemoved, true).on(\"mouseup.drag\", mouseupped, true);\n    Object(_nodrag_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].view);\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"nopropagation\"])();\n    mousemoving = false;\n    mousedownx = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].clientX;\n    mousedowny = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].clientY;\n    gesture(\"start\");\n  }\n\n  function mousemoved() {\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    if (!mousemoving) {\n      var dx = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].clientX - mousedownx, dy = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].clientY - mousedowny;\n      mousemoving = dx * dx + dy * dy > clickDistance2;\n    }\n    gestures.mouse(\"drag\");\n  }\n\n  function mouseupped() {\n    Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"select\"])(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].view).on(\"mousemove.drag mouseup.drag\", null);\n    Object(_nodrag_js__WEBPACK_IMPORTED_MODULE_2__[\"yesdrag\"])(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].view, mousemoving);\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    gestures.mouse(\"end\");\n  }\n\n  function touchstarted() {\n    if (!filter.apply(this, arguments)) return;\n    var touches = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].changedTouches,\n        c = container.apply(this, arguments),\n        n = touches.length, i, gesture;\n\n    for (i = 0; i < n; ++i) {\n      if (gesture = beforestart(touches[i].identifier, c, d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"touch\"], this, arguments)) {\n        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"nopropagation\"])();\n        gesture(\"start\");\n      }\n    }\n  }\n\n  function touchmoved() {\n    var touches = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].changedTouches,\n        n = touches.length, i, gesture;\n\n    for (i = 0; i < n; ++i) {\n      if (gesture = gestures[touches[i].identifier]) {\n        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        gesture(\"drag\");\n      }\n    }\n  }\n\n  function touchended() {\n    var touches = d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].changedTouches,\n        n = touches.length, i, gesture;\n\n    if (touchending) clearTimeout(touchending);\n    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!\n    for (i = 0; i < n; ++i) {\n      if (gesture = gestures[touches[i].identifier]) {\n        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__[\"nopropagation\"])();\n        gesture(\"end\");\n      }\n    }\n  }\n\n  function beforestart(id, container, point, that, args) {\n    var p = point(container, id), s, dx, dy,\n        sublisteners = listeners.copy();\n\n    if (!Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"customEvent\"])(new _event_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](drag, \"beforestart\", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {\n      if ((d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"event\"].subject = s = subject.apply(that, args)) == null) return false;\n      dx = s.x - p[0] || 0;\n      dy = s.y - p[1] || 0;\n      return true;\n    })) return;\n\n    return function gesture(type) {\n      var p0 = p, n;\n      switch (type) {\n        case \"start\": gestures[id] = gesture, n = active++; break;\n        case \"end\": delete gestures[id], --active; // nobreak\n        case \"drag\": p = point(container, id), n = active; break;\n      }\n      Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"customEvent\"])(new _event_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);\n    };\n  }\n\n  drag.filter = function(_) {\n    return arguments.length ? (filter = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(!!_), drag) : filter;\n  };\n\n  drag.container = function(_) {\n    return arguments.length ? (container = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_), drag) : container;\n  };\n\n  drag.subject = function(_) {\n    return arguments.length ? (subject = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_), drag) : subject;\n  };\n\n  drag.touchable = function(_) {\n    return arguments.length ? (touchable = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(!!_), drag) : touchable;\n  };\n\n  drag.on = function() {\n    var value = listeners.on.apply(listeners, arguments);\n    return value === listeners ? drag : value;\n  };\n\n  drag.clickDistance = function(_) {\n    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);\n  };\n\n  return drag;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/drag.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/event.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/event.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DragEvent; });\nfunction DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {\n  this.target = target;\n  this.type = type;\n  this.subject = subject;\n  this.identifier = id;\n  this.active = active;\n  this.x = x;\n  this.y = y;\n  this.dx = dx;\n  this.dy = dy;\n  this._ = dispatch;\n}\n\nDragEvent.prototype.on = function() {\n  var value = this._.on.apply(this._, arguments);\n  return value === this._ ? this : value;\n};\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/event.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/index.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/index.js ***!
  \****************************************************************************/
/*! exports provided: drag, dragDisable, dragEnable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _drag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag.js */ \"../../node_modules/d3-drag/src/drag.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"drag\", function() { return _drag_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _nodrag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodrag.js */ \"../../node_modules/d3-drag/src/nodrag.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dragDisable\", function() { return _nodrag_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dragEnable\", function() { return _nodrag_js__WEBPACK_IMPORTED_MODULE_1__[\"yesdrag\"]; });\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/nodrag.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/nodrag.js ***!
  \*****************************************************************************/
/*! exports provided: default, yesdrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"yesdrag\", function() { return yesdrag; });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noevent.js */ \"../../node_modules/d3-drag/src/noevent.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(view) {\n  var root = view.document.documentElement,\n      selection = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"select\"])(view).on(\"dragstart.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], true);\n  if (\"onselectstart\" in root) {\n    selection.on(\"selectstart.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], true);\n  } else {\n    root.__noselect = root.style.MozUserSelect;\n    root.style.MozUserSelect = \"none\";\n  }\n});\n\nfunction yesdrag(view, noclick) {\n  var root = view.document.documentElement,\n      selection = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"select\"])(view).on(\"dragstart.drag\", null);\n  if (noclick) {\n    selection.on(\"click.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], true);\n    setTimeout(function() { selection.on(\"click.drag\", null); }, 0);\n  }\n  if (\"onselectstart\" in root) {\n    selection.on(\"selectstart.drag\", null);\n  } else {\n    root.style.MozUserSelect = root.__noselect;\n    delete root.__noselect;\n  }\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/nodrag.js?");

/***/ }),

/***/ "../../node_modules/d3-drag/src/noevent.js":
/*!******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/noevent.js ***!
  \******************************************************************************/
/*! exports provided: nopropagation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nopropagation\", function() { return nopropagation; });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n\n\nfunction nopropagation() {\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].stopImmediatePropagation();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].preventDefault();\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].stopImmediatePropagation();\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-drag/src/noevent.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/back.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/back.js ***!
  \***************************************************************************/
/*! exports provided: backIn, backOut, backInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backIn\", function() { return backIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backOut\", function() { return backOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backInOut\", function() { return backInOut; });\nvar overshoot = 1.70158;\n\nvar backIn = (function custom(s) {\n  s = +s;\n\n  function backIn(t) {\n    return (t = +t) * t * (s * (t - 1) + t);\n  }\n\n  backIn.overshoot = custom;\n\n  return backIn;\n})(overshoot);\n\nvar backOut = (function custom(s) {\n  s = +s;\n\n  function backOut(t) {\n    return --t * t * ((t + 1) * s + t) + 1;\n  }\n\n  backOut.overshoot = custom;\n\n  return backOut;\n})(overshoot);\n\nvar backInOut = (function custom(s) {\n  s = +s;\n\n  function backInOut(t) {\n    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;\n  }\n\n  backInOut.overshoot = custom;\n\n  return backInOut;\n})(overshoot);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/back.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/bounce.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/bounce.js ***!
  \*****************************************************************************/
/*! exports provided: bounceIn, bounceOut, bounceInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bounceIn\", function() { return bounceIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bounceOut\", function() { return bounceOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bounceInOut\", function() { return bounceInOut; });\nvar b1 = 4 / 11,\n    b2 = 6 / 11,\n    b3 = 8 / 11,\n    b4 = 3 / 4,\n    b5 = 9 / 11,\n    b6 = 10 / 11,\n    b7 = 15 / 16,\n    b8 = 21 / 22,\n    b9 = 63 / 64,\n    b0 = 1 / b1 / b1;\n\nfunction bounceIn(t) {\n  return 1 - bounceOut(1 - t);\n}\n\nfunction bounceOut(t) {\n  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;\n}\n\nfunction bounceInOut(t) {\n  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/bounce.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/circle.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/circle.js ***!
  \*****************************************************************************/
/*! exports provided: circleIn, circleOut, circleInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"circleIn\", function() { return circleIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"circleOut\", function() { return circleOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"circleInOut\", function() { return circleInOut; });\nfunction circleIn(t) {\n  return 1 - Math.sqrt(1 - t * t);\n}\n\nfunction circleOut(t) {\n  return Math.sqrt(1 - --t * t);\n}\n\nfunction circleInOut(t) {\n  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/circle.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/cubic.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/cubic.js ***!
  \****************************************************************************/
/*! exports provided: cubicIn, cubicOut, cubicInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicIn\", function() { return cubicIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicOut\", function() { return cubicOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicInOut\", function() { return cubicInOut; });\nfunction cubicIn(t) {\n  return t * t * t;\n}\n\nfunction cubicOut(t) {\n  return --t * t * t + 1;\n}\n\nfunction cubicInOut(t) {\n  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/cubic.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/elastic.js":
/*!******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/elastic.js ***!
  \******************************************************************************/
/*! exports provided: elasticIn, elasticOut, elasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elasticIn\", function() { return elasticIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elasticOut\", function() { return elasticOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elasticInOut\", function() { return elasticInOut; });\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ \"../../node_modules/d3-ease/src/math.js\");\n\n\nvar tau = 2 * Math.PI,\n    amplitude = 1,\n    period = 0.3;\n\nvar elasticIn = (function custom(a, p) {\n  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);\n\n  function elasticIn(t) {\n    return a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(-(--t)) * Math.sin((s - t) / p);\n  }\n\n  elasticIn.amplitude = function(a) { return custom(a, p * tau); };\n  elasticIn.period = function(p) { return custom(a, p); };\n\n  return elasticIn;\n})(amplitude, period);\n\nvar elasticOut = (function custom(a, p) {\n  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);\n\n  function elasticOut(t) {\n    return 1 - a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(t = +t) * Math.sin((t + s) / p);\n  }\n\n  elasticOut.amplitude = function(a) { return custom(a, p * tau); };\n  elasticOut.period = function(p) { return custom(a, p); };\n\n  return elasticOut;\n})(amplitude, period);\n\nvar elasticInOut = (function custom(a, p) {\n  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);\n\n  function elasticInOut(t) {\n    return ((t = t * 2 - 1) < 0\n        ? a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(-t) * Math.sin((s - t) / p)\n        : 2 - a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(t) * Math.sin((s + t) / p)) / 2;\n  }\n\n  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };\n  elasticInOut.period = function(p) { return custom(a, p); };\n\n  return elasticInOut;\n})(amplitude, period);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/elastic.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/exp.js":
/*!**************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/exp.js ***!
  \**************************************************************************/
/*! exports provided: expIn, expOut, expInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"expIn\", function() { return expIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"expOut\", function() { return expOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"expInOut\", function() { return expInOut; });\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ \"../../node_modules/d3-ease/src/math.js\");\n\n\nfunction expIn(t) {\n  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(1 - +t);\n}\n\nfunction expOut(t) {\n  return 1 - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(t);\n}\n\nfunction expInOut(t) {\n  return ((t *= 2) <= 1 ? Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(1 - t) : 2 - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__[\"tpmt\"])(t - 1)) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/exp.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/index.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/index.js ***!
  \****************************************************************************/
/*! exports provided: easeLinear, easeQuad, easeQuadIn, easeQuadOut, easeQuadInOut, easeCubic, easeCubicIn, easeCubicOut, easeCubicInOut, easePoly, easePolyIn, easePolyOut, easePolyInOut, easeSin, easeSinIn, easeSinOut, easeSinInOut, easeExp, easeExpIn, easeExpOut, easeExpInOut, easeCircle, easeCircleIn, easeCircleOut, easeCircleInOut, easeBounce, easeBounceIn, easeBounceOut, easeBounceInOut, easeBack, easeBackIn, easeBackOut, easeBackInOut, easeElastic, easeElasticIn, easeElasticOut, easeElasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _linear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear.js */ \"../../node_modules/d3-ease/src/linear.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeLinear\", function() { return _linear_js__WEBPACK_IMPORTED_MODULE_0__[\"linear\"]; });\n\n/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quad.js */ \"../../node_modules/d3-ease/src/quad.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeQuad\", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__[\"quadInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeQuadIn\", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__[\"quadIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeQuadOut\", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__[\"quadOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeQuadInOut\", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__[\"quadInOut\"]; });\n\n/* harmony import */ var _cubic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubic.js */ \"../../node_modules/d3-ease/src/cubic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCubic\", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__[\"cubicInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCubicIn\", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__[\"cubicIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCubicOut\", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__[\"cubicOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCubicInOut\", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__[\"cubicInOut\"]; });\n\n/* harmony import */ var _poly_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./poly.js */ \"../../node_modules/d3-ease/src/poly.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easePoly\", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__[\"polyInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easePolyIn\", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__[\"polyIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easePolyOut\", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__[\"polyOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easePolyInOut\", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__[\"polyInOut\"]; });\n\n/* harmony import */ var _sin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sin.js */ \"../../node_modules/d3-ease/src/sin.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeSin\", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__[\"sinInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeSinIn\", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__[\"sinIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeSinOut\", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__[\"sinOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeSinInOut\", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__[\"sinInOut\"]; });\n\n/* harmony import */ var _exp_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exp.js */ \"../../node_modules/d3-ease/src/exp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeExp\", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__[\"expInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeExpIn\", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__[\"expIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeExpOut\", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__[\"expOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeExpInOut\", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__[\"expInOut\"]; });\n\n/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./circle.js */ \"../../node_modules/d3-ease/src/circle.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCircle\", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__[\"circleInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCircleIn\", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__[\"circleIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCircleOut\", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__[\"circleOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeCircleInOut\", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__[\"circleInOut\"]; });\n\n/* harmony import */ var _bounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bounce.js */ \"../../node_modules/d3-ease/src/bounce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBounce\", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__[\"bounceOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBounceIn\", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__[\"bounceIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBounceOut\", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__[\"bounceOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBounceInOut\", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__[\"bounceInOut\"]; });\n\n/* harmony import */ var _back_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./back.js */ \"../../node_modules/d3-ease/src/back.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBack\", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__[\"backInOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBackIn\", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__[\"backIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBackOut\", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__[\"backOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeBackInOut\", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__[\"backInOut\"]; });\n\n/* harmony import */ var _elastic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./elastic.js */ \"../../node_modules/d3-ease/src/elastic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeElastic\", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__[\"elasticOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeElasticIn\", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__[\"elasticIn\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeElasticOut\", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__[\"elasticOut\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"easeElasticInOut\", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__[\"elasticInOut\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/linear.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/linear.js ***!
  \*****************************************************************************/
/*! exports provided: linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\nfunction linear(t) {\n  return +t;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/linear.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/math.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/math.js ***!
  \***************************************************************************/
/*! exports provided: tpmt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tpmt\", function() { return tpmt; });\n// tpmt is two power minus ten times t scaled to [0,1]\nfunction tpmt(x) {\n  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/math.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/poly.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/poly.js ***!
  \***************************************************************************/
/*! exports provided: polyIn, polyOut, polyInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyIn\", function() { return polyIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyOut\", function() { return polyOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyInOut\", function() { return polyInOut; });\nvar exponent = 3;\n\nvar polyIn = (function custom(e) {\n  e = +e;\n\n  function polyIn(t) {\n    return Math.pow(t, e);\n  }\n\n  polyIn.exponent = custom;\n\n  return polyIn;\n})(exponent);\n\nvar polyOut = (function custom(e) {\n  e = +e;\n\n  function polyOut(t) {\n    return 1 - Math.pow(1 - t, e);\n  }\n\n  polyOut.exponent = custom;\n\n  return polyOut;\n})(exponent);\n\nvar polyInOut = (function custom(e) {\n  e = +e;\n\n  function polyInOut(t) {\n    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;\n  }\n\n  polyInOut.exponent = custom;\n\n  return polyInOut;\n})(exponent);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/poly.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/quad.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/quad.js ***!
  \***************************************************************************/
/*! exports provided: quadIn, quadOut, quadInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"quadIn\", function() { return quadIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"quadOut\", function() { return quadOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"quadInOut\", function() { return quadInOut; });\nfunction quadIn(t) {\n  return t * t;\n}\n\nfunction quadOut(t) {\n  return t * (2 - t);\n}\n\nfunction quadInOut(t) {\n  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/quad.js?");

/***/ }),

/***/ "../../node_modules/d3-ease/src/sin.js":
/*!**************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/sin.js ***!
  \**************************************************************************/
/*! exports provided: sinIn, sinOut, sinInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sinIn\", function() { return sinIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sinOut\", function() { return sinOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sinInOut\", function() { return sinInOut; });\nvar pi = Math.PI,\n    halfPi = pi / 2;\n\nfunction sinIn(t) {\n  return (+t === 1) ? 1 : 1 - Math.cos(t * halfPi);\n}\n\nfunction sinOut(t) {\n  return Math.sin(t * halfPi);\n}\n\nfunction sinInOut(t) {\n  return (1 - Math.cos(pi * t)) / 2;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-ease/src/sin.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/array.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/array.js ***!
  \***********************************************************************************/
/*! exports provided: default, genericArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"genericArray\", function() { return genericArray; });\n/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ \"../../node_modules/d3-interpolate/src/value.js\");\n/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberArray.js */ \"../../node_modules/d3-interpolate/src/numberArray.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  return (Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_1__[\"isNumberArray\"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] : genericArray)(a, b);\n});\n\nfunction genericArray(a, b) {\n  var nb = b ? b.length : 0,\n      na = a ? Math.min(nb, a.length) : 0,\n      x = new Array(na),\n      c = new Array(nb),\n      i;\n\n  for (i = 0; i < na; ++i) x[i] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a[i], b[i]);\n  for (; i < nb; ++i) c[i] = b[i];\n\n  return function(t) {\n    for (i = 0; i < na; ++i) c[i] = x[i](t);\n    return c;\n  };\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/array.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/basis.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/basis.js ***!
  \***********************************************************************************/
/*! exports provided: basis, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"basis\", function() { return basis; });\nfunction basis(t1, v0, v1, v2, v3) {\n  var t2 = t1 * t1, t3 = t2 * t1;\n  return ((1 - 3 * t1 + 3 * t2 - t3) * v0\n      + (4 - 6 * t2 + 3 * t3) * v1\n      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2\n      + t3 * v3) / 6;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(values) {\n  var n = values.length - 1;\n  return function(t) {\n    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),\n        v1 = values[i],\n        v2 = values[i + 1],\n        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,\n        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;\n    return basis((t - i / n) * n, v0, v1, v2, v3);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/basis.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/basisClosed.js":
/*!*****************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/basisClosed.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ \"../../node_modules/d3-interpolate/src/basis.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(values) {\n  var n = values.length;\n  return function(t) {\n    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),\n        v0 = values[(i + n - 1) % n],\n        v1 = values[i % n],\n        v2 = values[(i + 1) % n],\n        v3 = values[(i + 2) % n];\n    return Object(_basis_js__WEBPACK_IMPORTED_MODULE_0__[\"basis\"])((t - i / n) * n, v0, v1, v2, v3);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/basisClosed.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/color.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/color.js ***!
  \***********************************************************************************/
/*! exports provided: hue, gamma, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hue\", function() { return hue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gamma\", function() { return gamma; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return nogamma; });\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"../../node_modules/d3-interpolate/src/constant.js\");\n\n\nfunction linear(a, d) {\n  return function(t) {\n    return a + t * d;\n  };\n}\n\nfunction exponential(a, b, y) {\n  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {\n    return Math.pow(a + t * b, y);\n  };\n}\n\nfunction hue(a, b) {\n  var d = b - a;\n  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(isNaN(a) ? b : a);\n}\n\nfunction gamma(y) {\n  return (y = +y) === 1 ? nogamma : function(a, b) {\n    return b - a ? exponential(a, b, y) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(isNaN(a) ? b : a);\n  };\n}\n\nfunction nogamma(a, b) {\n  var d = b - a;\n  return d ? linear(a, d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(isNaN(a) ? b : a);\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/color.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/constant.js":
/*!**************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/constant.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return function() {\n    return x;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/constant.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/cubehelix.js":
/*!***************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/cubehelix.js ***!
  \***************************************************************************************/
/*! exports provided: default, cubehelixLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubehelixLong\", function() { return cubehelixLong; });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n\nfunction cubehelix(hue) {\n  return (function cubehelixGamma(y) {\n    y = +y;\n\n    function cubehelix(start, end) {\n      var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"cubehelix\"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"cubehelix\"])(end)).h),\n          s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.s, end.s),\n          l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.l, end.l),\n          opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.opacity, end.opacity);\n      return function(t) {\n        start.h = h(t);\n        start.s = s(t);\n        start.l = l(Math.pow(t, y));\n        start.opacity = opacity(t);\n        return start + \"\";\n      };\n    }\n\n    cubehelix.gamma = cubehelixGamma;\n\n    return cubehelix;\n  })(1);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"hue\"]));\nvar cubehelixLong = cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/cubehelix.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/date.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/date.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var d = new Date;\n  return a = +a, b = +b, function(t) {\n    return d.setTime(a * (1 - t) + b * t), d;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/date.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/discrete.js":
/*!**************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/discrete.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(range) {\n  var n = range.length;\n  return function(t) {\n    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/discrete.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/hcl.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hcl.js ***!
  \*********************************************************************************/
/*! exports provided: default, hclLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hclLong\", function() { return hclLong; });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n\nfunction hcl(hue) {\n  return function(start, end) {\n    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"hcl\"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"hcl\"])(end)).h),\n        c = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.c, end.c),\n        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.l, end.l),\n        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.opacity, end.opacity);\n    return function(t) {\n      start.h = h(t);\n      start.c = c(t);\n      start.l = l(t);\n      start.opacity = opacity(t);\n      return start + \"\";\n    };\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"hue\"]));\nvar hclLong = hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hcl.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/hsl.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hsl.js ***!
  \*********************************************************************************/
/*! exports provided: default, hslLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hslLong\", function() { return hslLong; });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n\nfunction hsl(hue) {\n  return function(start, end) {\n    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"hsl\"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"hsl\"])(end)).h),\n        s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.s, end.s),\n        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.l, end.l),\n        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.opacity, end.opacity);\n    return function(t) {\n      start.h = h(t);\n      start.s = s(t);\n      start.l = l(t);\n      start.opacity = opacity(t);\n      return start + \"\";\n    };\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"hue\"]));\nvar hslLong = hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hsl.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/hue.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hue.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var i = Object(_color_js__WEBPACK_IMPORTED_MODULE_0__[\"hue\"])(+a, +b);\n  return function(t) {\n    var x = i(t);\n    return x - 360 * Math.floor(x / 360);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/hue.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/index.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/index.js ***!
  \***********************************************************************************/
/*! exports provided: interpolate, interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateDate, interpolateDiscrete, interpolateHue, interpolateNumber, interpolateNumberArray, interpolateObject, interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateHsl, interpolateHslLong, interpolateLab, interpolateHcl, interpolateHclLong, interpolateCubehelix, interpolateCubehelixLong, piecewise, quantize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ \"../../node_modules/d3-interpolate/src/value.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolate\", function() { return _value_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ \"../../node_modules/d3-interpolate/src/array.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateArray\", function() { return _array_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ \"../../node_modules/d3-interpolate/src/basis.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateBasis\", function() { return _basis_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ \"../../node_modules/d3-interpolate/src/basisClosed.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateBasisClosed\", function() { return _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date.js */ \"../../node_modules/d3-interpolate/src/date.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateDate\", function() { return _date_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _discrete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discrete.js */ \"../../node_modules/d3-interpolate/src/discrete.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateDiscrete\", function() { return _discrete_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _hue_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hue.js */ \"../../node_modules/d3-interpolate/src/hue.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateHue\", function() { return _hue_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number.js */ \"../../node_modules/d3-interpolate/src/number.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateNumber\", function() { return _number_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ \"../../node_modules/d3-interpolate/src/numberArray.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateNumberArray\", function() { return _numberArray_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./object.js */ \"../../node_modules/d3-interpolate/src/object.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateObject\", function() { return _object_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./round.js */ \"../../node_modules/d3-interpolate/src/round.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateRound\", function() { return _round_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./string.js */ \"../../node_modules/d3-interpolate/src/string.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateString\", function() { return _string_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _transform_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transform/index.js */ \"../../node_modules/d3-interpolate/src/transform/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateTransformCss\", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__[\"interpolateTransformCss\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateTransformSvg\", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__[\"interpolateTransformSvg\"]; });\n\n/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./zoom.js */ \"../../node_modules/d3-interpolate/src/zoom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateZoom\", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rgb.js */ \"../../node_modules/d3-interpolate/src/rgb.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateRgb\", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateRgbBasis\", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__[\"rgbBasis\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateRgbBasisClosed\", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__[\"rgbBasisClosed\"]; });\n\n/* harmony import */ var _hsl_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./hsl.js */ \"../../node_modules/d3-interpolate/src/hsl.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateHsl\", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateHslLong\", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__[\"hslLong\"]; });\n\n/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lab.js */ \"../../node_modules/d3-interpolate/src/lab.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateLab\", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _hcl_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hcl.js */ \"../../node_modules/d3-interpolate/src/hcl.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateHcl\", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateHclLong\", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__[\"hclLong\"]; });\n\n/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cubehelix.js */ \"../../node_modules/d3-interpolate/src/cubehelix.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateCubehelix\", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interpolateCubehelixLong\", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__[\"cubehelixLong\"]; });\n\n/* harmony import */ var _piecewise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./piecewise.js */ \"../../node_modules/d3-interpolate/src/piecewise.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"piecewise\", function() { return _piecewise_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]; });\n\n/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./quantize.js */ \"../../node_modules/d3-interpolate/src/quantize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"quantize\", function() { return _quantize_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/lab.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/lab.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return lab; });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n\nfunction lab(start, end) {\n  var l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"lab\"])(start)).l, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"lab\"])(end)).l),\n      a = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.a, end.a),\n      b = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.b, end.b),\n      opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(start.opacity, end.opacity);\n  return function(t) {\n    start.l = l(t);\n    start.a = a(t);\n    start.b = b(t);\n    start.opacity = opacity(t);\n    return start + \"\";\n  };\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/lab.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/number.js":
/*!************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/number.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  return a = +a, b = +b, function(t) {\n    return a * (1 - t) + b * t;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/number.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/numberArray.js":
/*!*****************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/numberArray.js ***!
  \*****************************************************************************************/
/*! exports provided: default, isNumberArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isNumberArray\", function() { return isNumberArray; });\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  if (!b) b = [];\n  var n = a ? Math.min(b.length, a.length) : 0,\n      c = b.slice(),\n      i;\n  return function(t) {\n    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;\n    return c;\n  };\n});\n\nfunction isNumberArray(x) {\n  return ArrayBuffer.isView(x) && !(x instanceof DataView);\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/numberArray.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/object.js":
/*!************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/object.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ \"../../node_modules/d3-interpolate/src/value.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var i = {},\n      c = {},\n      k;\n\n  if (a === null || typeof a !== \"object\") a = {};\n  if (b === null || typeof b !== \"object\") b = {};\n\n  for (k in b) {\n    if (k in a) {\n      i[k] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a[k], b[k]);\n    } else {\n      c[k] = b[k];\n    }\n  }\n\n  return function(t) {\n    for (k in i) c[k] = i[k](t);\n    return c;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/object.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/piecewise.js":
/*!***************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/piecewise.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return piecewise; });\nfunction piecewise(interpolate, values) {\n  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);\n  while (i < n) I[i] = interpolate(v, v = values[++i]);\n  return function(t) {\n    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));\n    return I[i](t - i);\n  };\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/piecewise.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/quantize.js":
/*!**************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/quantize.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(interpolator, n) {\n  var samples = new Array(n);\n  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));\n  return samples;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/quantize.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/rgb.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/rgb.js ***!
  \*********************************************************************************/
/*! exports provided: default, rgbBasis, rgbBasisClosed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbBasis\", function() { return rgbBasis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbBasisClosed\", function() { return rgbBasisClosed; });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basis.js */ \"../../node_modules/d3-interpolate/src/basis.js\");\n/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basisClosed.js */ \"../../node_modules/d3-interpolate/src/basisClosed.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color.js */ \"../../node_modules/d3-interpolate/src/color.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function rgbGamma(y) {\n  var color = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__[\"gamma\"])(y);\n\n  function rgb(start, end) {\n    var r = color((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"rgb\"])(start)).r, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"rgb\"])(end)).r),\n        g = color(start.g, end.g),\n        b = color(start.b, end.b),\n        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(start.opacity, end.opacity);\n    return function(t) {\n      start.r = r(t);\n      start.g = g(t);\n      start.b = b(t);\n      start.opacity = opacity(t);\n      return start + \"\";\n    };\n  }\n\n  rgb.gamma = rgbGamma;\n\n  return rgb;\n})(1));\n\nfunction rgbSpline(spline) {\n  return function(colors) {\n    var n = colors.length,\n        r = new Array(n),\n        g = new Array(n),\n        b = new Array(n),\n        i, color;\n    for (i = 0; i < n; ++i) {\n      color = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"rgb\"])(colors[i]);\n      r[i] = color.r || 0;\n      g[i] = color.g || 0;\n      b[i] = color.b || 0;\n    }\n    r = spline(r);\n    g = spline(g);\n    b = spline(b);\n    color.opacity = 1;\n    return function(t) {\n      color.r = r(t);\n      color.g = g(t);\n      color.b = b(t);\n      return color + \"\";\n    };\n  };\n}\n\nvar rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/rgb.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/round.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/round.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  return a = +a, b = +b, function(t) {\n    return Math.round(a * (1 - t) + b * t);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/round.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/string.js":
/*!************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/string.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ \"../../node_modules/d3-interpolate/src/number.js\");\n\n\nvar reA = /[-+]?(?:\\d+\\.?\\d*|\\.?\\d+)(?:[eE][-+]?\\d+)?/g,\n    reB = new RegExp(reA.source, \"g\");\n\nfunction zero(b) {\n  return function() {\n    return b;\n  };\n}\n\nfunction one(b) {\n  return function(t) {\n    return b(t) + \"\";\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b\n      am, // current match in a\n      bm, // current match in b\n      bs, // string preceding current number in b, if any\n      i = -1, // index in s\n      s = [], // string constants and placeholders\n      q = []; // number interpolators\n\n  // Coerce inputs to strings.\n  a = a + \"\", b = b + \"\";\n\n  // Interpolate pairs of numbers in a & b.\n  while ((am = reA.exec(a))\n      && (bm = reB.exec(b))) {\n    if ((bs = bm.index) > bi) { // a string precedes the next number in b\n      bs = b.slice(bi, bs);\n      if (s[i]) s[i] += bs; // coalesce with previous string\n      else s[++i] = bs;\n    }\n    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match\n      if (s[i]) s[i] += bm; // coalesce with previous string\n      else s[++i] = bm;\n    } else { // interpolate non-matching numbers\n      s[++i] = null;\n      q.push({i: i, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(am, bm)});\n    }\n    bi = reB.lastIndex;\n  }\n\n  // Add remains of b.\n  if (bi < b.length) {\n    bs = b.slice(bi);\n    if (s[i]) s[i] += bs; // coalesce with previous string\n    else s[++i] = bs;\n  }\n\n  // Special optimization for only a single match.\n  // Otherwise, interpolate each of the numbers and rejoin the string.\n  return s.length < 2 ? (q[0]\n      ? one(q[0].x)\n      : zero(b))\n      : (b = q.length, function(t) {\n          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);\n          return s.join(\"\");\n        });\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/string.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/transform/decompose.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/decompose.js ***!
  \*************************************************************************************************/
/*! exports provided: identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"identity\", function() { return identity; });\nvar degrees = 180 / Math.PI;\n\nvar identity = {\n  translateX: 0,\n  translateY: 0,\n  rotate: 0,\n  skewX: 0,\n  scaleX: 1,\n  scaleY: 1\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b, c, d, e, f) {\n  var scaleX, scaleY, skewX;\n  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;\n  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;\n  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;\n  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;\n  return {\n    translateX: e,\n    translateY: f,\n    rotate: Math.atan2(b, a) * degrees,\n    skewX: Math.atan(skewX) * degrees,\n    scaleX: scaleX,\n    scaleY: scaleY\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/decompose.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/transform/index.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/index.js ***!
  \*********************************************************************************************/
/*! exports provided: interpolateTransformCss, interpolateTransformSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateTransformCss\", function() { return interpolateTransformCss; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateTransformSvg\", function() { return interpolateTransformSvg; });\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ \"../../node_modules/d3-interpolate/src/number.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ \"../../node_modules/d3-interpolate/src/transform/parse.js\");\n\n\n\nfunction interpolateTransform(parse, pxComma, pxParen, degParen) {\n\n  function pop(s) {\n    return s.length ? s.pop() + \" \" : \"\";\n  }\n\n  function translate(xa, ya, xb, yb, s, q) {\n    if (xa !== xb || ya !== yb) {\n      var i = s.push(\"translate(\", null, pxComma, null, pxParen);\n      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(ya, yb)});\n    } else if (xb || yb) {\n      s.push(\"translate(\" + xb + pxComma + yb + pxParen);\n    }\n  }\n\n  function rotate(a, b, s, q) {\n    if (a !== b) {\n      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path\n      q.push({i: s.push(pop(s) + \"rotate(\", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a, b)});\n    } else if (b) {\n      s.push(pop(s) + \"rotate(\" + b + degParen);\n    }\n  }\n\n  function skewX(a, b, s, q) {\n    if (a !== b) {\n      q.push({i: s.push(pop(s) + \"skewX(\", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a, b)});\n    } else if (b) {\n      s.push(pop(s) + \"skewX(\" + b + degParen);\n    }\n  }\n\n  function scale(xa, ya, xb, yb, s, q) {\n    if (xa !== xb || ya !== yb) {\n      var i = s.push(pop(s) + \"scale(\", null, \",\", null, \")\");\n      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(ya, yb)});\n    } else if (xb !== 1 || yb !== 1) {\n      s.push(pop(s) + \"scale(\" + xb + \",\" + yb + \")\");\n    }\n  }\n\n  return function(a, b) {\n    var s = [], // string constants and placeholders\n        q = []; // number interpolators\n    a = parse(a), b = parse(b);\n    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);\n    rotate(a.rotate, b.rotate, s, q);\n    skewX(a.skewX, b.skewX, s, q);\n    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);\n    a = b = null; // gc\n    return function(t) {\n      var i = -1, n = q.length, o;\n      while (++i < n) s[(o = q[i]).i] = o.x(t);\n      return s.join(\"\");\n    };\n  };\n}\n\nvar interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__[\"parseCss\"], \"px, \", \"px)\", \"deg)\");\nvar interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__[\"parseSvg\"], \", \", \")\", \")\");\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/index.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/transform/parse.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/parse.js ***!
  \*********************************************************************************************/
/*! exports provided: parseCss, parseSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseCss\", function() { return parseCss; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseSvg\", function() { return parseSvg; });\n/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ \"../../node_modules/d3-interpolate/src/transform/decompose.js\");\n\n\nvar cssNode,\n    cssRoot,\n    cssView,\n    svgNode;\n\nfunction parseCss(value) {\n  if (value === \"none\") return _decompose_js__WEBPACK_IMPORTED_MODULE_0__[\"identity\"];\n  if (!cssNode) cssNode = document.createElement(\"DIV\"), cssRoot = document.documentElement, cssView = document.defaultView;\n  cssNode.style.transform = value;\n  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue(\"transform\");\n  cssRoot.removeChild(cssNode);\n  value = value.slice(7, -1).split(\",\");\n  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);\n}\n\nfunction parseSvg(value) {\n  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__[\"identity\"];\n  if (!svgNode) svgNode = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\");\n  svgNode.setAttribute(\"transform\", value);\n  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__[\"identity\"];\n  value = value.matrix;\n  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value.a, value.b, value.c, value.d, value.e, value.f);\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/transform/parse.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/value.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/value.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb.js */ \"../../node_modules/d3-interpolate/src/rgb.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ \"../../node_modules/d3-interpolate/src/array.js\");\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date.js */ \"../../node_modules/d3-interpolate/src/date.js\");\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ \"../../node_modules/d3-interpolate/src/number.js\");\n/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object.js */ \"../../node_modules/d3-interpolate/src/object.js\");\n/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ \"../../node_modules/d3-interpolate/src/string.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constant.js */ \"../../node_modules/d3-interpolate/src/constant.js\");\n/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ \"../../node_modules/d3-interpolate/src/numberArray.js\");\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var t = typeof b, c;\n  return b == null || t === \"boolean\" ? Object(_constant_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(b)\n      : (t === \"number\" ? _number_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n      : t === \"string\" ? ((c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"color\"])(b)) ? (b = c, _rgb_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) : _string_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])\n      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__[\"color\"] ? _rgb_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n      : b instanceof Date ? _date_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n      : Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_8__[\"isNumberArray\"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n      : Array.isArray(b) ? _array_js__WEBPACK_IMPORTED_MODULE_2__[\"genericArray\"]\n      : typeof b.valueOf !== \"function\" && typeof b.toString !== \"function\" || isNaN(b) ? _object_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n      : _number_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(a, b);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/value.js?");

/***/ }),

/***/ "../../node_modules/d3-interpolate/src/zoom.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/zoom.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar rho = Math.SQRT2,\n    rho2 = 2,\n    rho4 = 4,\n    epsilon2 = 1e-12;\n\nfunction cosh(x) {\n  return ((x = Math.exp(x)) + 1 / x) / 2;\n}\n\nfunction sinh(x) {\n  return ((x = Math.exp(x)) - 1 / x) / 2;\n}\n\nfunction tanh(x) {\n  return ((x = Math.exp(2 * x)) - 1) / (x + 1);\n}\n\n// p0 = [ux0, uy0, w0]\n// p1 = [ux1, uy1, w1]\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(p0, p1) {\n  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],\n      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],\n      dx = ux1 - ux0,\n      dy = uy1 - uy0,\n      d2 = dx * dx + dy * dy,\n      i,\n      S;\n\n  // Special case for u0 ≅ u1.\n  if (d2 < epsilon2) {\n    S = Math.log(w1 / w0) / rho;\n    i = function(t) {\n      return [\n        ux0 + t * dx,\n        uy0 + t * dy,\n        w0 * Math.exp(rho * t * S)\n      ];\n    }\n  }\n\n  // General case.\n  else {\n    var d1 = Math.sqrt(d2),\n        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),\n        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),\n        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),\n        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);\n    S = (r1 - r0) / rho;\n    i = function(t) {\n      var s = t * S,\n          coshr0 = cosh(r0),\n          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));\n      return [\n        ux0 + u * dx,\n        uy0 + u * dy,\n        w0 * coshr0 / cosh(rho * s + r0)\n      ];\n    }\n  }\n\n  i.duration = S * 1000;\n\n  return i;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-interpolate/src/zoom.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/constant.js":
/*!************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/constant.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return function() {\n    return x;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/constant.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/create.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/create.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creator */ \"../../node_modules/d3-selection/src/creator.js\");\n/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select */ \"../../node_modules/d3-selection/src/select.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  return Object(_select__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_creator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name).call(document.documentElement));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/create.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/creator.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/creator.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _namespace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespace */ \"../../node_modules/d3-selection/src/namespace.js\");\n/* harmony import */ var _namespaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespaces */ \"../../node_modules/d3-selection/src/namespaces.js\");\n\n\n\nfunction creatorInherit(name) {\n  return function() {\n    var document = this.ownerDocument,\n        uri = this.namespaceURI;\n    return uri === _namespaces__WEBPACK_IMPORTED_MODULE_1__[\"xhtml\"] && document.documentElement.namespaceURI === _namespaces__WEBPACK_IMPORTED_MODULE_1__[\"xhtml\"]\n        ? document.createElement(name)\n        : document.createElementNS(uri, name);\n  };\n}\n\nfunction creatorFixed(fullname) {\n  return function() {\n    return this.ownerDocument.createElementNS(fullname.space, fullname.local);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  var fullname = Object(_namespace__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n  return (fullname.local\n      ? creatorFixed\n      : creatorInherit)(fullname);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/creator.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/index.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/index.js ***!
  \*********************************************************************************/
/*! exports provided: create, creator, local, matcher, mouse, namespace, namespaces, clientPoint, select, selectAll, selection, selector, selectorAll, style, touch, touches, window, event, customEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create */ \"../../node_modules/d3-selection/src/create.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return _create__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creator */ \"../../node_modules/d3-selection/src/creator.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"creator\", function() { return _creator__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _local__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local */ \"../../node_modules/d3-selection/src/local.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"local\", function() { return _local__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _matcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./matcher */ \"../../node_modules/d3-selection/src/matcher.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"matcher\", function() { return _matcher__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _mouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mouse */ \"../../node_modules/d3-selection/src/mouse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mouse\", function() { return _mouse__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _namespace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./namespace */ \"../../node_modules/d3-selection/src/namespace.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"namespace\", function() { return _namespace__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _namespaces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./namespaces */ \"../../node_modules/d3-selection/src/namespaces.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"namespaces\", function() { return _namespaces__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./point */ \"../../node_modules/d3-selection/src/point.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clientPoint\", function() { return _point__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select */ \"../../node_modules/d3-selection/src/select.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"select\", function() { return _select__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _selectAll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./selectAll */ \"../../node_modules/d3-selection/src/selectAll.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"selectAll\", function() { return _selectAll__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _selection_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./selection/index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"selection\", function() { return _selection_index__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./selector */ \"../../node_modules/d3-selection/src/selector.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"selector\", function() { return _selector__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _selectorAll__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selectorAll */ \"../../node_modules/d3-selection/src/selectorAll.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"selectorAll\", function() { return _selectorAll__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _selection_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./selection/style */ \"../../node_modules/d3-selection/src/selection/style.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"style\", function() { return _selection_style__WEBPACK_IMPORTED_MODULE_13__[\"styleValue\"]; });\n\n/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./touch */ \"../../node_modules/d3-selection/src/touch.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"touch\", function() { return _touch__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _touches__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./touches */ \"../../node_modules/d3-selection/src/touches.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"touches\", function() { return _touches__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./window */ \"../../node_modules/d3-selection/src/window.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"window\", function() { return _window__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _selection_on__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./selection/on */ \"../../node_modules/d3-selection/src/selection/on.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _selection_on__WEBPACK_IMPORTED_MODULE_17__[\"event\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"customEvent\", function() { return _selection_on__WEBPACK_IMPORTED_MODULE_17__[\"customEvent\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/local.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/local.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return local; });\nvar nextId = 0;\n\nfunction local() {\n  return new Local;\n}\n\nfunction Local() {\n  this._ = \"@\" + (++nextId).toString(36);\n}\n\nLocal.prototype = local.prototype = {\n  constructor: Local,\n  get: function(node) {\n    var id = this._;\n    while (!(id in node)) if (!(node = node.parentNode)) return;\n    return node[id];\n  },\n  set: function(node, value) {\n    return node[this._] = value;\n  },\n  remove: function(node) {\n    return this._ in node && delete node[this._];\n  },\n  toString: function() {\n    return this._;\n  }\n};\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/local.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/matcher.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/matcher.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selector) {\n  return function() {\n    return this.matches(selector);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/matcher.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/mouse.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/mouse.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sourceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent */ \"../../node_modules/d3-selection/src/sourceEvent.js\");\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ \"../../node_modules/d3-selection/src/point.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node) {\n  var event = Object(_sourceEvent__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  if (event.changedTouches) event = event.changedTouches[0];\n  return Object(_point__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(node, event);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/mouse.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/namespace.js":
/*!*************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/namespace.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _namespaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces */ \"../../node_modules/d3-selection/src/namespaces.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  var prefix = name += \"\", i = prefix.indexOf(\":\");\n  if (i >= 0 && (prefix = name.slice(0, i)) !== \"xmlns\") name = name.slice(i + 1);\n  return _namespaces__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hasOwnProperty(prefix) ? {space: _namespaces__WEBPACK_IMPORTED_MODULE_0__[\"default\"][prefix], local: name} : name;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/namespace.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/namespaces.js":
/*!**************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/namespaces.js ***!
  \**************************************************************************************/
/*! exports provided: xhtml, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"xhtml\", function() { return xhtml; });\nvar xhtml = \"http://www.w3.org/1999/xhtml\";\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  svg: \"http://www.w3.org/2000/svg\",\n  xhtml: xhtml,\n  xlink: \"http://www.w3.org/1999/xlink\",\n  xml: \"http://www.w3.org/XML/1998/namespace\",\n  xmlns: \"http://www.w3.org/2000/xmlns/\"\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/namespaces.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/point.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/point.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, event) {\n  var svg = node.ownerSVGElement || node;\n\n  if (svg.createSVGPoint) {\n    var point = svg.createSVGPoint();\n    point.x = event.clientX, point.y = event.clientY;\n    point = point.matrixTransform(node.getScreenCTM().inverse());\n    return [point.x, point.y];\n  }\n\n  var rect = node.getBoundingClientRect();\n  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/point.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/select.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/select.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _selection_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selector) {\n  return typeof selector === \"string\"\n      ? new _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"]([[document.querySelector(selector)]], [document.documentElement])\n      : new _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"]([[selector]], _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"root\"]);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/select.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selectAll.js":
/*!*************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selectAll.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _selection_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selector) {\n  return typeof selector === \"string\"\n      ? new _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"]([document.querySelectorAll(selector)], [document.documentElement])\n      : new _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"]([selector == null ? [] : selector], _selection_index__WEBPACK_IMPORTED_MODULE_0__[\"root\"]);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selectAll.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/append.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/append.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator */ \"../../node_modules/d3-selection/src/creator.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  var create = typeof name === \"function\" ? name : Object(_creator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n  return this.select(function() {\n    return this.appendChild(create.apply(this, arguments));\n  });\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/append.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/attr.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/attr.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _namespace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace */ \"../../node_modules/d3-selection/src/namespace.js\");\n\n\nfunction attrRemove(name) {\n  return function() {\n    this.removeAttribute(name);\n  };\n}\n\nfunction attrRemoveNS(fullname) {\n  return function() {\n    this.removeAttributeNS(fullname.space, fullname.local);\n  };\n}\n\nfunction attrConstant(name, value) {\n  return function() {\n    this.setAttribute(name, value);\n  };\n}\n\nfunction attrConstantNS(fullname, value) {\n  return function() {\n    this.setAttributeNS(fullname.space, fullname.local, value);\n  };\n}\n\nfunction attrFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttribute(name);\n    else this.setAttribute(name, v);\n  };\n}\n\nfunction attrFunctionNS(fullname, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);\n    else this.setAttributeNS(fullname.space, fullname.local, v);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  var fullname = Object(_namespace__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n\n  if (arguments.length < 2) {\n    var node = this.node();\n    return fullname.local\n        ? node.getAttributeNS(fullname.space, fullname.local)\n        : node.getAttribute(fullname);\n  }\n\n  return this.each((value == null\n      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === \"function\"\n      ? (fullname.local ? attrFunctionNS : attrFunction)\n      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/attr.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/call.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/call.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var callback = arguments[0];\n  arguments[0] = this;\n  callback.apply(null, arguments);\n  return this;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/call.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/classed.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/classed.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction classArray(string) {\n  return string.trim().split(/^|\\s+/);\n}\n\nfunction classList(node) {\n  return node.classList || new ClassList(node);\n}\n\nfunction ClassList(node) {\n  this._node = node;\n  this._names = classArray(node.getAttribute(\"class\") || \"\");\n}\n\nClassList.prototype = {\n  add: function(name) {\n    var i = this._names.indexOf(name);\n    if (i < 0) {\n      this._names.push(name);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  remove: function(name) {\n    var i = this._names.indexOf(name);\n    if (i >= 0) {\n      this._names.splice(i, 1);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  contains: function(name) {\n    return this._names.indexOf(name) >= 0;\n  }\n};\n\nfunction classedAdd(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.add(names[i]);\n}\n\nfunction classedRemove(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.remove(names[i]);\n}\n\nfunction classedTrue(names) {\n  return function() {\n    classedAdd(this, names);\n  };\n}\n\nfunction classedFalse(names) {\n  return function() {\n    classedRemove(this, names);\n  };\n}\n\nfunction classedFunction(names, value) {\n  return function() {\n    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  var names = classArray(name + \"\");\n\n  if (arguments.length < 2) {\n    var list = classList(this.node()), i = -1, n = names.length;\n    while (++i < n) if (!list.contains(names[i])) return false;\n    return true;\n  }\n\n  return this.each((typeof value === \"function\"\n      ? classedFunction : value\n      ? classedTrue\n      : classedFalse)(names, value));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/classed.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/clone.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/clone.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction selection_cloneShallow() {\n  var clone = this.cloneNode(false), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\nfunction selection_cloneDeep() {\n  var clone = this.cloneNode(true), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(deep) {\n  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/clone.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/data.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/data.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _enter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enter */ \"../../node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ \"../../node_modules/d3-selection/src/constant.js\");\n\n\n\n\nvar keyPrefix = \"$\"; // Protect against keys like “__proto__”.\n\nfunction bindIndex(parent, group, enter, update, exit, data) {\n  var i = 0,\n      node,\n      groupLength = group.length,\n      dataLength = data.length;\n\n  // Put any non-null nodes that fit into update.\n  // Put any null nodes into enter.\n  // Put any remaining data into enter.\n  for (; i < dataLength; ++i) {\n    if (node = group[i]) {\n      node.__data__ = data[i];\n      update[i] = node;\n    } else {\n      enter[i] = new _enter__WEBPACK_IMPORTED_MODULE_1__[\"EnterNode\"](parent, data[i]);\n    }\n  }\n\n  // Put any non-null nodes that don’t fit into exit.\n  for (; i < groupLength; ++i) {\n    if (node = group[i]) {\n      exit[i] = node;\n    }\n  }\n}\n\nfunction bindKey(parent, group, enter, update, exit, data, key) {\n  var i,\n      node,\n      nodeByKeyValue = {},\n      groupLength = group.length,\n      dataLength = data.length,\n      keyValues = new Array(groupLength),\n      keyValue;\n\n  // Compute the key for each node.\n  // If multiple nodes have the same key, the duplicates are added to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if (node = group[i]) {\n      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);\n      if (keyValue in nodeByKeyValue) {\n        exit[i] = node;\n      } else {\n        nodeByKeyValue[keyValue] = node;\n      }\n    }\n  }\n\n  // Compute the key for each datum.\n  // If there a node associated with this key, join and add it to update.\n  // If there is not (or the key is a duplicate), add it to enter.\n  for (i = 0; i < dataLength; ++i) {\n    keyValue = keyPrefix + key.call(parent, data[i], i, data);\n    if (node = nodeByKeyValue[keyValue]) {\n      update[i] = node;\n      node.__data__ = data[i];\n      nodeByKeyValue[keyValue] = null;\n    } else {\n      enter[i] = new _enter__WEBPACK_IMPORTED_MODULE_1__[\"EnterNode\"](parent, data[i]);\n    }\n  }\n\n  // Add any remaining nodes that were not bound to data to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {\n      exit[i] = node;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value, key) {\n  if (!value) {\n    data = new Array(this.size()), j = -1;\n    this.each(function(d) { data[++j] = d; });\n    return data;\n  }\n\n  var bind = key ? bindKey : bindIndex,\n      parents = this._parents,\n      groups = this._groups;\n\n  if (typeof value !== \"function\") value = Object(_constant__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value);\n\n  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {\n    var parent = parents[j],\n        group = groups[j],\n        groupLength = group.length,\n        data = value.call(parent, parent && parent.__data__, j, parents),\n        dataLength = data.length,\n        enterGroup = enter[j] = new Array(dataLength),\n        updateGroup = update[j] = new Array(dataLength),\n        exitGroup = exit[j] = new Array(groupLength);\n\n    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);\n\n    // Now connect the enter nodes to their following update node, such that\n    // appendChild can insert the materialized enter node before this node,\n    // rather than at the end of the parent node.\n    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {\n      if (previous = enterGroup[i0]) {\n        if (i0 >= i1) i1 = i0 + 1;\n        while (!(next = updateGroup[i1]) && ++i1 < dataLength);\n        previous._next = next || null;\n      }\n    }\n  }\n\n  update = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](update, parents);\n  update._enter = enter;\n  update._exit = exit;\n  return update;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/data.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/datum.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/datum.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  return arguments.length\n      ? this.property(\"__data__\", value)\n      : this.node().__data__;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/datum.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/dispatch.js":
/*!**********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/dispatch.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window */ \"../../node_modules/d3-selection/src/window.js\");\n\n\nfunction dispatchEvent(node, type, params) {\n  var window = Object(_window__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(node),\n      event = window.CustomEvent;\n\n  if (typeof event === \"function\") {\n    event = new event(type, params);\n  } else {\n    event = window.document.createEvent(\"Event\");\n    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;\n    else event.initEvent(type, false, false);\n  }\n\n  node.dispatchEvent(event);\n}\n\nfunction dispatchConstant(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params);\n  };\n}\n\nfunction dispatchFunction(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params.apply(this, arguments));\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(type, params) {\n  return this.each((typeof params === \"function\"\n      ? dispatchFunction\n      : dispatchConstant)(type, params));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/dispatch.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/each.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/each.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(callback) {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {\n      if (node = group[i]) callback.call(node, node.__data__, i, group);\n    }\n  }\n\n  return this;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/each.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/empty.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/empty.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return !this.node();\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/empty.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/enter.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/enter.js ***!
  \*******************************************************************************************/
/*! exports provided: default, EnterNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EnterNode\", function() { return EnterNode; });\n/* harmony import */ var _sparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sparse */ \"../../node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return new _index__WEBPACK_IMPORTED_MODULE_1__[\"Selection\"](this._enter || this._groups.map(_sparse__WEBPACK_IMPORTED_MODULE_0__[\"default\"]), this._parents);\n});\n\nfunction EnterNode(parent, datum) {\n  this.ownerDocument = parent.ownerDocument;\n  this.namespaceURI = parent.namespaceURI;\n  this._next = null;\n  this._parent = parent;\n  this.__data__ = datum;\n}\n\nEnterNode.prototype = {\n  constructor: EnterNode,\n  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },\n  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },\n  querySelector: function(selector) { return this._parent.querySelector(selector); },\n  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }\n};\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/enter.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/exit.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/exit.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sparse */ \"../../node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return new _index__WEBPACK_IMPORTED_MODULE_1__[\"Selection\"](this._exit || this._groups.map(_sparse__WEBPACK_IMPORTED_MODULE_0__[\"default\"]), this._parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/exit.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/filter.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/filter.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _matcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../matcher */ \"../../node_modules/d3-selection/src/matcher.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(match) {\n  if (typeof match !== \"function\") match = Object(_matcher__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(match);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {\n      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {\n        subgroup.push(node);\n      }\n    }\n  }\n\n  return new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](subgroups, this._parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/filter.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/html.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/html.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction htmlRemove() {\n  this.innerHTML = \"\";\n}\n\nfunction htmlConstant(value) {\n  return function() {\n    this.innerHTML = value;\n  };\n}\n\nfunction htmlFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.innerHTML = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? htmlRemove : (typeof value === \"function\"\n          ? htmlFunction\n          : htmlConstant)(value))\n      : this.node().innerHTML;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/html.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/index.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/index.js ***!
  \*******************************************************************************************/
/*! exports provided: root, Selection, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"root\", function() { return root; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Selection\", function() { return Selection; });\n/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select */ \"../../node_modules/d3-selection/src/selection/select.js\");\n/* harmony import */ var _selectAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll */ \"../../node_modules/d3-selection/src/selection/selectAll.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter */ \"../../node_modules/d3-selection/src/selection/filter.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ \"../../node_modules/d3-selection/src/selection/data.js\");\n/* harmony import */ var _enter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enter */ \"../../node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _exit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exit */ \"../../node_modules/d3-selection/src/selection/exit.js\");\n/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./join */ \"../../node_modules/d3-selection/src/selection/join.js\");\n/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./merge */ \"../../node_modules/d3-selection/src/selection/merge.js\");\n/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./order */ \"../../node_modules/d3-selection/src/selection/order.js\");\n/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sort */ \"../../node_modules/d3-selection/src/selection/sort.js\");\n/* harmony import */ var _call__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./call */ \"../../node_modules/d3-selection/src/selection/call.js\");\n/* harmony import */ var _nodes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nodes */ \"../../node_modules/d3-selection/src/selection/nodes.js\");\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node */ \"../../node_modules/d3-selection/src/selection/node.js\");\n/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./size */ \"../../node_modules/d3-selection/src/selection/size.js\");\n/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./empty */ \"../../node_modules/d3-selection/src/selection/empty.js\");\n/* harmony import */ var _each__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./each */ \"../../node_modules/d3-selection/src/selection/each.js\");\n/* harmony import */ var _attr__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./attr */ \"../../node_modules/d3-selection/src/selection/attr.js\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./style */ \"../../node_modules/d3-selection/src/selection/style.js\");\n/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./property */ \"../../node_modules/d3-selection/src/selection/property.js\");\n/* harmony import */ var _classed__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./classed */ \"../../node_modules/d3-selection/src/selection/classed.js\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./text */ \"../../node_modules/d3-selection/src/selection/text.js\");\n/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./html */ \"../../node_modules/d3-selection/src/selection/html.js\");\n/* harmony import */ var _raise__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./raise */ \"../../node_modules/d3-selection/src/selection/raise.js\");\n/* harmony import */ var _lower__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lower */ \"../../node_modules/d3-selection/src/selection/lower.js\");\n/* harmony import */ var _append__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./append */ \"../../node_modules/d3-selection/src/selection/append.js\");\n/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./insert */ \"../../node_modules/d3-selection/src/selection/insert.js\");\n/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./remove */ \"../../node_modules/d3-selection/src/selection/remove.js\");\n/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./clone */ \"../../node_modules/d3-selection/src/selection/clone.js\");\n/* harmony import */ var _datum__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./datum */ \"../../node_modules/d3-selection/src/selection/datum.js\");\n/* harmony import */ var _on__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./on */ \"../../node_modules/d3-selection/src/selection/on.js\");\n/* harmony import */ var _dispatch__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./dispatch */ \"../../node_modules/d3-selection/src/selection/dispatch.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar root = [null];\n\nfunction Selection(groups, parents) {\n  this._groups = groups;\n  this._parents = parents;\n}\n\nfunction selection() {\n  return new Selection([[document.documentElement]], root);\n}\n\nSelection.prototype = selection.prototype = {\n  constructor: Selection,\n  select: _select__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  selectAll: _selectAll__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  filter: _filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  data: _data__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  enter: _enter__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  exit: _exit__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  join: _join__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  merge: _merge__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  order: _order__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  sort: _sort__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  call: _call__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  nodes: _nodes__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  node: _node__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  size: _size__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  empty: _empty__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  each: _each__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  attr: _attr__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  style: _style__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  property: _property__WEBPACK_IMPORTED_MODULE_18__[\"default\"],\n  classed: _classed__WEBPACK_IMPORTED_MODULE_19__[\"default\"],\n  text: _text__WEBPACK_IMPORTED_MODULE_20__[\"default\"],\n  html: _html__WEBPACK_IMPORTED_MODULE_21__[\"default\"],\n  raise: _raise__WEBPACK_IMPORTED_MODULE_22__[\"default\"],\n  lower: _lower__WEBPACK_IMPORTED_MODULE_23__[\"default\"],\n  append: _append__WEBPACK_IMPORTED_MODULE_24__[\"default\"],\n  insert: _insert__WEBPACK_IMPORTED_MODULE_25__[\"default\"],\n  remove: _remove__WEBPACK_IMPORTED_MODULE_26__[\"default\"],\n  clone: _clone__WEBPACK_IMPORTED_MODULE_27__[\"default\"],\n  datum: _datum__WEBPACK_IMPORTED_MODULE_28__[\"default\"],\n  on: _on__WEBPACK_IMPORTED_MODULE_29__[\"default\"],\n  dispatch: _dispatch__WEBPACK_IMPORTED_MODULE_30__[\"default\"]\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (selection);\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/index.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/insert.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/insert.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator */ \"../../node_modules/d3-selection/src/creator.js\");\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector */ \"../../node_modules/d3-selection/src/selector.js\");\n\n\n\nfunction constantNull() {\n  return null;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, before) {\n  var create = typeof name === \"function\" ? name : Object(_creator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name),\n      select = before == null ? constantNull : typeof before === \"function\" ? before : Object(_selector__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(before);\n  return this.select(function() {\n    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);\n  });\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/insert.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/join.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/join.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(onenter, onupdate, onexit) {\n  var enter = this.enter(), update = this, exit = this.exit();\n  enter = typeof onenter === \"function\" ? onenter(enter) : enter.append(onenter + \"\");\n  if (onupdate != null) update = onupdate(update);\n  if (onexit == null) exit.remove(); else onexit(exit);\n  return enter && update ? enter.merge(update).order() : update;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/join.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/lower.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/lower.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction lower() {\n  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return this.each(lower);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/lower.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/merge.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/merge.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selection) {\n\n  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {\n    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group0[i] || group1[i]) {\n        merge[i] = node;\n      }\n    }\n  }\n\n  for (; j < m0; ++j) {\n    merges[j] = groups0[j];\n  }\n\n  return new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](merges, this._parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/merge.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/node.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/node.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {\n      var node = group[i];\n      if (node) return node;\n    }\n  }\n\n  return null;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/node.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/nodes.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/nodes.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var nodes = new Array(this.size()), i = -1;\n  this.each(function() { nodes[++i] = this; });\n  return nodes;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/nodes.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/on.js":
/*!****************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/on.js ***!
  \****************************************************************************************/
/*! exports provided: event, default, customEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return event; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"customEvent\", function() { return customEvent; });\nvar filterEvents = {};\n\nvar event = null;\n\nif (typeof document !== \"undefined\") {\n  var element = document.documentElement;\n  if (!(\"onmouseenter\" in element)) {\n    filterEvents = {mouseenter: \"mouseover\", mouseleave: \"mouseout\"};\n  }\n}\n\nfunction filterContextListener(listener, index, group) {\n  listener = contextListener(listener, index, group);\n  return function(event) {\n    var related = event.relatedTarget;\n    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {\n      listener.call(this, event);\n    }\n  };\n}\n\nfunction contextListener(listener, index, group) {\n  return function(event1) {\n    var event0 = event; // Events can be reentrant (e.g., focus).\n    event = event1;\n    try {\n      listener.call(this, this.__data__, index, group);\n    } finally {\n      event = event0;\n    }\n  };\n}\n\nfunction parseTypenames(typenames) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    return {type: t, name: name};\n  });\n}\n\nfunction onRemove(typename) {\n  return function() {\n    var on = this.__on;\n    if (!on) return;\n    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {\n      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.capture);\n      } else {\n        on[++i] = o;\n      }\n    }\n    if (++i) on.length = i;\n    else delete this.__on;\n  };\n}\n\nfunction onAdd(typename, value, capture) {\n  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;\n  return function(d, i, group) {\n    var on = this.__on, o, listener = wrap(value, i, group);\n    if (on) for (var j = 0, m = on.length; j < m; ++j) {\n      if ((o = on[j]).type === typename.type && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.capture);\n        this.addEventListener(o.type, o.listener = listener, o.capture = capture);\n        o.value = value;\n        return;\n      }\n    }\n    this.addEventListener(typename.type, listener, capture);\n    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};\n    if (!on) this.__on = [o];\n    else on.push(o);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(typename, value, capture) {\n  var typenames = parseTypenames(typename + \"\"), i, n = typenames.length, t;\n\n  if (arguments.length < 2) {\n    var on = this.node().__on;\n    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {\n      for (i = 0, o = on[j]; i < n; ++i) {\n        if ((t = typenames[i]).type === o.type && t.name === o.name) {\n          return o.value;\n        }\n      }\n    }\n    return;\n  }\n\n  on = value ? onAdd : onRemove;\n  if (capture == null) capture = false;\n  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));\n  return this;\n});\n\nfunction customEvent(event1, listener, that, args) {\n  var event0 = event;\n  event1.sourceEvent = event;\n  event = event1;\n  try {\n    return listener.apply(that, args);\n  } finally {\n    event = event0;\n  }\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/on.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/order.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/order.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n\n  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {\n    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {\n      if (node = group[i]) {\n        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);\n        next = node;\n      }\n    }\n  }\n\n  return this;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/order.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/property.js":
/*!**********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/property.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction propertyRemove(name) {\n  return function() {\n    delete this[name];\n  };\n}\n\nfunction propertyConstant(name, value) {\n  return function() {\n    this[name] = value;\n  };\n}\n\nfunction propertyFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) delete this[name];\n    else this[name] = v;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  return arguments.length > 1\n      ? this.each((value == null\n          ? propertyRemove : typeof value === \"function\"\n          ? propertyFunction\n          : propertyConstant)(name, value))\n      : this.node()[name];\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/property.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/raise.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/raise.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction raise() {\n  if (this.nextSibling) this.parentNode.appendChild(this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return this.each(raise);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/raise.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/remove.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/remove.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction remove() {\n  var parent = this.parentNode;\n  if (parent) parent.removeChild(this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return this.each(remove);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/remove.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/select.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/select.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector */ \"../../node_modules/d3-selection/src/selector.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(select) {\n  if (typeof select !== \"function\") select = Object(_selector__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {\n      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {\n        if (\"__data__\" in node) subnode.__data__ = node.__data__;\n        subgroup[i] = subnode;\n      }\n    }\n  }\n\n  return new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](subgroups, this._parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/select.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/selectAll.js":
/*!***********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/selectAll.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _selectorAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectorAll */ \"../../node_modules/d3-selection/src/selectorAll.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(select) {\n  if (typeof select !== \"function\") select = Object(_selectorAll__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        subgroups.push(select.call(node, node.__data__, i, group));\n        parents.push(node);\n      }\n    }\n  }\n\n  return new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](subgroups, parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/selectAll.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/size.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/size.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var size = 0;\n  this.each(function() { ++size; });\n  return size;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/size.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/sort.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/sort.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"../../node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(compare) {\n  if (!compare) compare = ascending;\n\n  function compareNode(a, b) {\n    return a && b ? compare(a.__data__, b.__data__) : !a - !b;\n  }\n\n  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        sortgroup[i] = node;\n      }\n    }\n    sortgroup.sort(compareNode);\n  }\n\n  return new _index__WEBPACK_IMPORTED_MODULE_0__[\"Selection\"](sortgroups, this._parents).order();\n});\n\nfunction ascending(a, b) {\n  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/sort.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/sparse.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/sparse.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(update) {\n  return new Array(update.length);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/sparse.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/style.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/style.js ***!
  \*******************************************************************************************/
/*! exports provided: default, styleValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styleValue\", function() { return styleValue; });\n/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window */ \"../../node_modules/d3-selection/src/window.js\");\n\n\nfunction styleRemove(name) {\n  return function() {\n    this.style.removeProperty(name);\n  };\n}\n\nfunction styleConstant(name, value, priority) {\n  return function() {\n    this.style.setProperty(name, value, priority);\n  };\n}\n\nfunction styleFunction(name, value, priority) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.style.removeProperty(name);\n    else this.style.setProperty(name, v, priority);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value, priority) {\n  return arguments.length > 1\n      ? this.each((value == null\n            ? styleRemove : typeof value === \"function\"\n            ? styleFunction\n            : styleConstant)(name, value, priority == null ? \"\" : priority))\n      : styleValue(this.node(), name);\n});\n\nfunction styleValue(node, name) {\n  return node.style.getPropertyValue(name)\n      || Object(_window__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(node).getComputedStyle(node, null).getPropertyValue(name);\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/style.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selection/text.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/text.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction textRemove() {\n  this.textContent = \"\";\n}\n\nfunction textConstant(value) {\n  return function() {\n    this.textContent = value;\n  };\n}\n\nfunction textFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.textContent = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? textRemove : (typeof value === \"function\"\n          ? textFunction\n          : textConstant)(value))\n      : this.node().textContent;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selection/text.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selector.js":
/*!************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selector.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction none() {}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selector) {\n  return selector == null ? none : function() {\n    return this.querySelector(selector);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selector.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/selectorAll.js":
/*!***************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selectorAll.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction empty() {\n  return [];\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(selector) {\n  return selector == null ? empty : function() {\n    return this.querySelectorAll(selector);\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/selectorAll.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/sourceEvent.js":
/*!***************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/sourceEvent.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _selection_on__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/on */ \"../../node_modules/d3-selection/src/selection/on.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var current = _selection_on__WEBPACK_IMPORTED_MODULE_0__[\"event\"], source;\n  while (source = current.sourceEvent) current = source;\n  return current;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/sourceEvent.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/touch.js":
/*!*********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/touch.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sourceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent */ \"../../node_modules/d3-selection/src/sourceEvent.js\");\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ \"../../node_modules/d3-selection/src/point.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, touches, identifier) {\n  if (arguments.length < 3) identifier = touches, touches = Object(_sourceEvent__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().changedTouches;\n\n  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {\n    if ((touch = touches[i]).identifier === identifier) {\n      return Object(_point__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(node, touch);\n    }\n  }\n\n  return null;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/touch.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/touches.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/touches.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sourceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent */ \"../../node_modules/d3-selection/src/sourceEvent.js\");\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ \"../../node_modules/d3-selection/src/point.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, touches) {\n  if (touches == null) touches = Object(_sourceEvent__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().touches;\n\n  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {\n    points[i] = Object(_point__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(node, touches[i]);\n  }\n\n  return points;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/touches.js?");

/***/ }),

/***/ "../../node_modules/d3-selection/src/window.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/window.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node) {\n  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node\n      || (node.document && node) // node is a Window\n      || node.defaultView; // node is a Document\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-selection/src/window.js?");

/***/ }),

/***/ "../../node_modules/d3-timer/src/index.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/index.js ***!
  \*****************************************************************************/
/*! exports provided: now, timer, timerFlush, timeout, interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"../../node_modules/d3-timer/src/timer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"now\", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"now\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timer\", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"timer\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timerFlush\", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"timerFlush\"]; });\n\n/* harmony import */ var _timeout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeout.js */ \"../../node_modules/d3-timer/src/timeout.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timeout\", function() { return _timeout_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _interval_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interval.js */ \"../../node_modules/d3-timer/src/interval.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interval\", function() { return _interval_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-timer/src/interval.js":
/*!********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/interval.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"../../node_modules/d3-timer/src/timer.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(callback, delay, time) {\n  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"Timer\"], total = delay;\n  if (delay == null) return t.restart(callback, delay, time), t;\n  delay = +delay, time = time == null ? Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__[\"now\"])() : +time;\n  t.restart(function tick(elapsed) {\n    elapsed += total;\n    t.restart(tick, total += delay, time);\n    callback(elapsed);\n  }, delay, time);\n  return t;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/interval.js?");

/***/ }),

/***/ "../../node_modules/d3-timer/src/timeout.js":
/*!*******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/timeout.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"../../node_modules/d3-timer/src/timer.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(callback, delay, time) {\n  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"Timer\"];\n  delay = delay == null ? 0 : +delay;\n  t.restart(function(elapsed) {\n    t.stop();\n    callback(elapsed + delay);\n  }, delay, time);\n  return t;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/timeout.js?");

/***/ }),

/***/ "../../node_modules/d3-timer/src/timer.js":
/*!*****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/timer.js ***!
  \*****************************************************************************/
/*! exports provided: now, Timer, timer, timerFlush */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"now\", function() { return now; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timer\", function() { return timer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timerFlush\", function() { return timerFlush; });\nvar frame = 0, // is an animation frame pending?\n    timeout = 0, // is a timeout pending?\n    interval = 0, // are any timers active?\n    pokeDelay = 1000, // how frequently we check for clock skew\n    taskHead,\n    taskTail,\n    clockLast = 0,\n    clockNow = 0,\n    clockSkew = 0,\n    clock = typeof performance === \"object\" && performance.now ? performance : Date,\n    setFrame = typeof window === \"object\" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };\n\nfunction now() {\n  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);\n}\n\nfunction clearNow() {\n  clockNow = 0;\n}\n\nfunction Timer() {\n  this._call =\n  this._time =\n  this._next = null;\n}\n\nTimer.prototype = timer.prototype = {\n  constructor: Timer,\n  restart: function(callback, delay, time) {\n    if (typeof callback !== \"function\") throw new TypeError(\"callback is not a function\");\n    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);\n    if (!this._next && taskTail !== this) {\n      if (taskTail) taskTail._next = this;\n      else taskHead = this;\n      taskTail = this;\n    }\n    this._call = callback;\n    this._time = time;\n    sleep();\n  },\n  stop: function() {\n    if (this._call) {\n      this._call = null;\n      this._time = Infinity;\n      sleep();\n    }\n  }\n};\n\nfunction timer(callback, delay, time) {\n  var t = new Timer;\n  t.restart(callback, delay, time);\n  return t;\n}\n\nfunction timerFlush() {\n  now(); // Get the current time, if not already set.\n  ++frame; // Pretend we’ve set an alarm, if we haven’t already.\n  var t = taskHead, e;\n  while (t) {\n    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);\n    t = t._next;\n  }\n  --frame;\n}\n\nfunction wake() {\n  clockNow = (clockLast = clock.now()) + clockSkew;\n  frame = timeout = 0;\n  try {\n    timerFlush();\n  } finally {\n    frame = 0;\n    nap();\n    clockNow = 0;\n  }\n}\n\nfunction poke() {\n  var now = clock.now(), delay = now - clockLast;\n  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;\n}\n\nfunction nap() {\n  var t0, t1 = taskHead, t2, time = Infinity;\n  while (t1) {\n    if (t1._call) {\n      if (time > t1._time) time = t1._time;\n      t0 = t1, t1 = t1._next;\n    } else {\n      t2 = t1._next, t1._next = null;\n      t1 = t0 ? t0._next = t2 : taskHead = t2;\n    }\n  }\n  taskTail = t0;\n  sleep(time);\n}\n\nfunction sleep(time) {\n  if (frame) return; // Soonest alarm already set, or will be.\n  if (timeout) timeout = clearTimeout(timeout);\n  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.\n  if (delay > 24) {\n    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);\n    if (interval) interval = clearInterval(interval);\n  } else {\n    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);\n    frame = 1, setFrame(wake);\n  }\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-timer/src/timer.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/active.js":
/*!***********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/active.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\nvar root = [null];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, name) {\n  var schedules = node.__transition,\n      schedule,\n      i;\n\n  if (schedules) {\n    name = name == null ? null : name + \"\";\n    for (i in schedules) {\n      if ((schedule = schedules[i]).state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__[\"SCHEDULED\"] && schedule.name === name) {\n        return new _transition_index_js__WEBPACK_IMPORTED_MODULE_0__[\"Transition\"]([[node]], root, name, +i);\n      }\n    }\n  }\n\n  return null;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/active.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/index.js":
/*!**********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/index.js ***!
  \**********************************************************************************/
/*! exports provided: transition, active, interrupt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ \"../../node_modules/d3-transition/src/selection/index.js\");\n/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"transition\", function() { return _transition_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _active_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./active.js */ \"../../node_modules/d3-transition/src/active.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"active\", function() { return _active_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interrupt.js */ \"../../node_modules/d3-transition/src/interrupt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"interrupt\", function() { return _interrupt_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/interrupt.js":
/*!**************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/interrupt.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, name) {\n  var schedules = node.__transition,\n      schedule,\n      active,\n      empty = true,\n      i;\n\n  if (!schedules) return;\n\n  name = name == null ? null : name + \"\";\n\n  for (i in schedules) {\n    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }\n    active = schedule.state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"STARTING\"] && schedule.state < _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"ENDING\"];\n    schedule.state = _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"ENDED\"];\n    schedule.timer.stop();\n    schedule.on.call(active ? \"interrupt\" : \"cancel\", node, node.__data__, schedule.index, schedule.group);\n    delete schedules[i];\n  }\n\n  if (empty) delete node.__transition;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/interrupt.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/selection/index.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/index.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ \"../../node_modules/d3-transition/src/selection/interrupt.js\");\n/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition.js */ \"../../node_modules/d3-transition/src/selection/transition.js\");\n\n\n\n\nd3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selection\"].prototype.interrupt = _interrupt_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nd3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selection\"].prototype.transition = _transition_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/index.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/selection/interrupt.js":
/*!************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/interrupt.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interrupt.js */ \"../../node_modules/d3-transition/src/interrupt.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  return this.each(function() {\n    Object(_interrupt_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, name);\n  });\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/interrupt.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/selection/transition.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/transition.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transition/index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transition/schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-ease */ \"../../node_modules/d3-ease/src/index.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-timer */ \"../../node_modules/d3-timer/src/index.js\");\n\n\n\n\n\nvar defaultTiming = {\n  time: null, // Set on use.\n  delay: 0,\n  duration: 250,\n  ease: d3_ease__WEBPACK_IMPORTED_MODULE_2__[\"easeCubicInOut\"]\n};\n\nfunction inherit(node, id) {\n  var timing;\n  while (!(timing = node.__transition) || !(timing = timing[id])) {\n    if (!(node = node.parentNode)) {\n      return defaultTiming.time = Object(d3_timer__WEBPACK_IMPORTED_MODULE_3__[\"now\"])(), defaultTiming;\n    }\n  }\n  return timing;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name) {\n  var id,\n      timing;\n\n  if (name instanceof _transition_index_js__WEBPACK_IMPORTED_MODULE_0__[\"Transition\"]) {\n    id = name._id, name = name._name;\n  } else {\n    id = Object(_transition_index_js__WEBPACK_IMPORTED_MODULE_0__[\"newId\"])(), (timing = defaultTiming).time = Object(d3_timer__WEBPACK_IMPORTED_MODULE_3__[\"now\"])(), name = name == null ? null : name + \"\";\n  }\n\n  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        Object(_transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(node, name, id, i, group, timing || inherit(node, id));\n      }\n    }\n  }\n\n  return new _transition_index_js__WEBPACK_IMPORTED_MODULE_0__[\"Transition\"](groups, this._parents, name, id);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/selection/transition.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/attr.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/attr.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ \"../../node_modules/d3-interpolate/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tween.js */ \"../../node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolate.js */ \"../../node_modules/d3-transition/src/transition/interpolate.js\");\n\n\n\n\n\nfunction attrRemove(name) {\n  return function() {\n    this.removeAttribute(name);\n  };\n}\n\nfunction attrRemoveNS(fullname) {\n  return function() {\n    this.removeAttributeNS(fullname.space, fullname.local);\n  };\n}\n\nfunction attrConstant(name, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = this.getAttribute(name);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction attrConstantNS(fullname, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = this.getAttributeNS(fullname.space, fullname.local);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction attrFunction(name, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0, value1 = value(this), string1;\n    if (value1 == null) return void this.removeAttribute(name);\n    string0 = this.getAttribute(name);\n    string1 = value1 + \"\";\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\nfunction attrFunctionNS(fullname, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0, value1 = value(this), string1;\n    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);\n    string0 = this.getAttributeNS(fullname.space, fullname.local);\n    string1 = value1 + \"\";\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  var fullname = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"namespace\"])(name), i = fullname === \"transform\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__[\"interpolateTransformSvg\"] : _interpolate_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n  return this.attrTween(name, typeof value === \"function\"\n      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, Object(_tween_js__WEBPACK_IMPORTED_MODULE_2__[\"tweenValue\"])(this, \"attr.\" + name, value))\n      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)\n      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/attr.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/attrTween.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/attrTween.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n\n\nfunction attrInterpolate(name, i) {\n  return function(t) {\n    this.setAttribute(name, i.call(this, t));\n  };\n}\n\nfunction attrInterpolateNS(fullname, i) {\n  return function(t) {\n    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));\n  };\n}\n\nfunction attrTweenNS(fullname, value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\nfunction attrTween(name, value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  var key = \"attr.\" + name;\n  if (arguments.length < 2) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  var fullname = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"namespace\"])(name);\n  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/attrTween.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/delay.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/delay.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction delayFunction(id, value) {\n  return function() {\n    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"])(this, id).delay = +value.apply(this, arguments);\n  };\n}\n\nfunction delayConstant(id, value) {\n  return value = +value, function() {\n    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"])(this, id).delay = value;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each((typeof value === \"function\"\n          ? delayFunction\n          : delayConstant)(id, value))\n      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.node(), id).delay;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/delay.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/duration.js":
/*!************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/duration.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction durationFunction(id, value) {\n  return function() {\n    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id).duration = +value.apply(this, arguments);\n  };\n}\n\nfunction durationConstant(id, value) {\n  return value = +value, function() {\n    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id).duration = value;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each((typeof value === \"function\"\n          ? durationFunction\n          : durationConstant)(id, value))\n      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.node(), id).duration;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/duration.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/ease.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/ease.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction easeConstant(id, value) {\n  if (typeof value !== \"function\") throw new Error;\n  return function() {\n    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id).ease = value;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each(easeConstant(id, value))\n      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.node(), id).ease;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/ease.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/end.js":
/*!*******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/end.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var on0, on1, that = this, id = that._id, size = that.size();\n  return new Promise(function(resolve, reject) {\n    var cancel = {value: reject},\n        end = {value: function() { if (--size === 0) resolve(); }};\n\n    that.each(function() {\n      var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id),\n          on = schedule.on;\n\n      // If this node shared a dispatch with the previous node,\n      // just assign the updated shared dispatch and we’re done!\n      // Otherwise, copy-on-write.\n      if (on !== on0) {\n        on1 = (on0 = on).copy();\n        on1._.cancel.push(cancel);\n        on1._.interrupt.push(cancel);\n        on1._.end.push(end);\n      }\n\n      schedule.on = on1;\n    });\n  });\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/end.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/filter.js":
/*!**********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/filter.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(match) {\n  if (typeof match !== \"function\") match = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"matcher\"])(match);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {\n      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {\n        subgroup.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__[\"Transition\"](subgroups, this._parents, this._name, this._id);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/filter.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/index.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/index.js ***!
  \*********************************************************************************************/
/*! exports provided: Transition, default, newId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Transition\", function() { return Transition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return transition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newId\", function() { return newId; });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attr.js */ \"../../node_modules/d3-transition/src/transition/attr.js\");\n/* harmony import */ var _attrTween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attrTween.js */ \"../../node_modules/d3-transition/src/transition/attrTween.js\");\n/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delay.js */ \"../../node_modules/d3-transition/src/transition/delay.js\");\n/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./duration.js */ \"../../node_modules/d3-transition/src/transition/duration.js\");\n/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ease.js */ \"../../node_modules/d3-transition/src/transition/ease.js\");\n/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filter.js */ \"../../node_modules/d3-transition/src/transition/filter.js\");\n/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./merge.js */ \"../../node_modules/d3-transition/src/transition/merge.js\");\n/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./on.js */ \"../../node_modules/d3-transition/src/transition/on.js\");\n/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./remove.js */ \"../../node_modules/d3-transition/src/transition/remove.js\");\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./select.js */ \"../../node_modules/d3-transition/src/transition/select.js\");\n/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./selectAll.js */ \"../../node_modules/d3-transition/src/transition/selectAll.js\");\n/* harmony import */ var _selection_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selection.js */ \"../../node_modules/d3-transition/src/transition/selection.js\");\n/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style.js */ \"../../node_modules/d3-transition/src/transition/style.js\");\n/* harmony import */ var _styleTween_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./styleTween.js */ \"../../node_modules/d3-transition/src/transition/styleTween.js\");\n/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./text.js */ \"../../node_modules/d3-transition/src/transition/text.js\");\n/* harmony import */ var _textTween_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./textTween.js */ \"../../node_modules/d3-transition/src/transition/textTween.js\");\n/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./transition.js */ \"../../node_modules/d3-transition/src/transition/transition.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tween.js */ \"../../node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _end_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./end.js */ \"../../node_modules/d3-transition/src/transition/end.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar id = 0;\n\nfunction Transition(groups, parents, name, id) {\n  this._groups = groups;\n  this._parents = parents;\n  this._name = name;\n  this._id = id;\n}\n\nfunction transition(name) {\n  return Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selection\"])().transition(name);\n}\n\nfunction newId() {\n  return ++id;\n}\n\nvar selection_prototype = d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selection\"].prototype;\n\nTransition.prototype = transition.prototype = {\n  constructor: Transition,\n  select: _select_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  filter: _filter_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  merge: _merge_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  selection: _selection_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  transition: _transition_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  call: selection_prototype.call,\n  nodes: selection_prototype.nodes,\n  node: selection_prototype.node,\n  size: selection_prototype.size,\n  empty: selection_prototype.empty,\n  each: selection_prototype.each,\n  on: _on_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  attr: _attr_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  attrTween: _attrTween_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  style: _style_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  styleTween: _styleTween_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  text: _text_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  textTween: _textTween_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  remove: _remove_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  tween: _tween_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"],\n  delay: _delay_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  duration: _duration_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  ease: _ease_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  end: _end_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]\n};\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/index.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/interpolate.js":
/*!***************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/interpolate.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ \"../../node_modules/d3-interpolate/src/index.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(a, b) {\n  var c;\n  return (typeof b === \"number\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__[\"interpolateNumber\"]\n      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__[\"color\"] ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__[\"interpolateRgb\"]\n      : (c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__[\"color\"])(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_1__[\"interpolateRgb\"])\n      : d3_interpolate__WEBPACK_IMPORTED_MODULE_1__[\"interpolateString\"])(a, b);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/interpolate.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/merge.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/merge.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(transition) {\n  if (transition._id !== this._id) throw new Error;\n\n  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {\n    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group0[i] || group1[i]) {\n        merge[i] = node;\n      }\n    }\n  }\n\n  for (; j < m0; ++j) {\n    merges[j] = groups0[j];\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__[\"Transition\"](merges, this._parents, this._name, this._id);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/merge.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/on.js":
/*!******************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/on.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction start(name) {\n  return (name + \"\").trim().split(/^|\\s+/).every(function(t) {\n    var i = t.indexOf(\".\");\n    if (i >= 0) t = t.slice(0, i);\n    return !t || t === \"start\";\n  });\n}\n\nfunction onFunction(id, name, listener) {\n  var on0, on1, sit = start(name) ? _schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"] : _schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"];\n  return function() {\n    var schedule = sit(this, id),\n        on = schedule.on;\n\n    // If this node shared a dispatch with the previous node,\n    // just assign the updated shared dispatch and we’re done!\n    // Otherwise, copy-on-write.\n    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);\n\n    schedule.on = on1;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, listener) {\n  var id = this._id;\n\n  return arguments.length < 2\n      ? Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.node(), id).on.on(name)\n      : this.each(onFunction(id, name, listener));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/on.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/remove.js":
/*!**********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/remove.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction removeFunction(id) {\n  return function() {\n    var parent = this.parentNode;\n    for (var i in this.__transition) if (+i !== id) return;\n    if (parent) parent.removeChild(this);\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return this.on(\"end.remove\", removeFunction(this._id));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/remove.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/schedule.js":
/*!************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/schedule.js ***!
  \************************************************************************************************/
/*! exports provided: CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED, default, init, set, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CREATED\", function() { return CREATED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SCHEDULED\", function() { return SCHEDULED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STARTING\", function() { return STARTING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STARTED\", function() { return STARTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RUNNING\", function() { return RUNNING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ENDING\", function() { return ENDING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ENDED\", function() { return ENDED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ \"../../node_modules/d3-dispatch/src/index.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ \"../../node_modules/d3-timer/src/index.js\");\n\n\n\nvar emptyOn = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__[\"dispatch\"])(\"start\", \"end\", \"cancel\", \"interrupt\");\nvar emptyTween = [];\n\nvar CREATED = 0;\nvar SCHEDULED = 1;\nvar STARTING = 2;\nvar STARTED = 3;\nvar RUNNING = 4;\nvar ENDING = 5;\nvar ENDED = 6;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(node, name, id, index, group, timing) {\n  var schedules = node.__transition;\n  if (!schedules) node.__transition = {};\n  else if (id in schedules) return;\n  create(node, id, {\n    name: name,\n    index: index, // For context during callback.\n    group: group, // For context during callback.\n    on: emptyOn,\n    tween: emptyTween,\n    time: timing.time,\n    delay: timing.delay,\n    duration: timing.duration,\n    ease: timing.ease,\n    timer: null,\n    state: CREATED\n  });\n});\n\nfunction init(node, id) {\n  var schedule = get(node, id);\n  if (schedule.state > CREATED) throw new Error(\"too late; already scheduled\");\n  return schedule;\n}\n\nfunction set(node, id) {\n  var schedule = get(node, id);\n  if (schedule.state > STARTED) throw new Error(\"too late; already running\");\n  return schedule;\n}\n\nfunction get(node, id) {\n  var schedule = node.__transition;\n  if (!schedule || !(schedule = schedule[id])) throw new Error(\"transition not found\");\n  return schedule;\n}\n\nfunction create(node, id, self) {\n  var schedules = node.__transition,\n      tween;\n\n  // Initialize the self timer when the transition is created.\n  // Note the actual delay is not known until the first callback!\n  schedules[id] = self;\n  self.timer = Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__[\"timer\"])(schedule, 0, self.time);\n\n  function schedule(elapsed) {\n    self.state = SCHEDULED;\n    self.timer.restart(start, self.delay, self.time);\n\n    // If the elapsed delay is less than our first sleep, start immediately.\n    if (self.delay <= elapsed) start(elapsed - self.delay);\n  }\n\n  function start(elapsed) {\n    var i, j, n, o;\n\n    // If the state is not SCHEDULED, then we previously errored on start.\n    if (self.state !== SCHEDULED) return stop();\n\n    for (i in schedules) {\n      o = schedules[i];\n      if (o.name !== self.name) continue;\n\n      // While this element already has a starting transition during this frame,\n      // defer starting an interrupting transition until that transition has a\n      // chance to tick (and possibly end); see d3/d3-transition#54!\n      if (o.state === STARTED) return Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__[\"timeout\"])(start);\n\n      // Interrupt the active transition, if any.\n      if (o.state === RUNNING) {\n        o.state = ENDED;\n        o.timer.stop();\n        o.on.call(\"interrupt\", node, node.__data__, o.index, o.group);\n        delete schedules[i];\n      }\n\n      // Cancel any pre-empted transitions.\n      else if (+i < id) {\n        o.state = ENDED;\n        o.timer.stop();\n        o.on.call(\"cancel\", node, node.__data__, o.index, o.group);\n        delete schedules[i];\n      }\n    }\n\n    // Defer the first tick to end of the current frame; see d3/d3#1576.\n    // Note the transition may be canceled after start and before the first tick!\n    // Note this must be scheduled before the start event; see d3/d3-transition#16!\n    // Assuming this is successful, subsequent callbacks go straight to tick.\n    Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__[\"timeout\"])(function() {\n      if (self.state === STARTED) {\n        self.state = RUNNING;\n        self.timer.restart(tick, self.delay, self.time);\n        tick(elapsed);\n      }\n    });\n\n    // Dispatch the start event.\n    // Note this must be done before the tween are initialized.\n    self.state = STARTING;\n    self.on.call(\"start\", node, node.__data__, self.index, self.group);\n    if (self.state !== STARTING) return; // interrupted\n    self.state = STARTED;\n\n    // Initialize the tween, deleting null tween.\n    tween = new Array(n = self.tween.length);\n    for (i = 0, j = -1; i < n; ++i) {\n      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {\n        tween[++j] = o;\n      }\n    }\n    tween.length = j + 1;\n  }\n\n  function tick(elapsed) {\n    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),\n        i = -1,\n        n = tween.length;\n\n    while (++i < n) {\n      tween[i].call(node, t);\n    }\n\n    // Dispatch the end event.\n    if (self.state === ENDING) {\n      self.on.call(\"end\", node, node.__data__, self.index, self.group);\n      stop();\n    }\n  }\n\n  function stop() {\n    self.state = ENDED;\n    self.timer.stop();\n    delete schedules[id];\n    for (var i in schedules) return; // eslint-disable-line no-unused-vars\n    delete node.__transition;\n  }\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/schedule.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/select.js":
/*!**********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/select.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(select) {\n  var name = this._name,\n      id = this._id;\n\n  if (typeof select !== \"function\") select = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selector\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {\n      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {\n        if (\"__data__\" in node) subnode.__data__ = node.__data__;\n        subgroup[i] = subnode;\n        Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(subgroup[i], name, id, i, subgroup, Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__[\"get\"])(node, id));\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__[\"Transition\"](subgroups, this._parents, name, id);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/select.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/selectAll.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/selectAll.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(select) {\n  var name = this._name,\n      id = this._id;\n\n  if (typeof select !== \"function\") select = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selectorAll\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        for (var children = select.call(node, node.__data__, i, group), child, inherit = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__[\"get\"])(node, id), k = 0, l = children.length; k < l; ++k) {\n          if (child = children[k]) {\n            Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(child, name, id, k, children, inherit);\n          }\n        }\n        subgroups.push(children);\n        parents.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__[\"Transition\"](subgroups, parents, name, id);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/selectAll.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/selection.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/selection.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n\n\nvar Selection = d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"selection\"].prototype.constructor;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  return new Selection(this._groups, this._parents);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/selection.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/style.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/style.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ \"../../node_modules/d3-interpolate/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tween.js */ \"../../node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interpolate.js */ \"../../node_modules/d3-transition/src/transition/interpolate.js\");\n\n\n\n\n\n\nfunction styleNull(name, interpolate) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"style\"])(this, name),\n        string1 = (this.style.removeProperty(name), Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"style\"])(this, name));\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, string10 = string1);\n  };\n}\n\nfunction styleRemove(name) {\n  return function() {\n    this.style.removeProperty(name);\n  };\n}\n\nfunction styleConstant(name, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"style\"])(this, name);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction styleFunction(name, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"style\"])(this, name),\n        value1 = value(this),\n        string1 = value1 + \"\";\n    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__[\"style\"])(this, name));\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\nfunction styleMaybeRemove(id, name) {\n  var on0, on1, listener0, key = \"style.\" + name, event = \"end.\" + key, remove;\n  return function() {\n    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__[\"set\"])(this, id),\n        on = schedule.on,\n        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;\n\n    // If this node shared a dispatch with the previous node,\n    // just assign the updated shared dispatch and we’re done!\n    // Otherwise, copy-on-write.\n    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);\n\n    schedule.on = on1;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value, priority) {\n  var i = (name += \"\") === \"transform\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__[\"interpolateTransformCss\"] : _interpolate_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n  return value == null ? this\n      .styleTween(name, styleNull(name, i))\n      .on(\"end.style.\" + name, styleRemove(name))\n    : typeof value === \"function\" ? this\n      .styleTween(name, styleFunction(name, i, Object(_tween_js__WEBPACK_IMPORTED_MODULE_3__[\"tweenValue\"])(this, \"style.\" + name, value)))\n      .each(styleMaybeRemove(this._id, name))\n    : this\n      .styleTween(name, styleConstant(name, i, value), priority)\n      .on(\"end.style.\" + name, null);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/style.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/styleTween.js":
/*!**************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/styleTween.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction styleInterpolate(name, i, priority) {\n  return function(t) {\n    this.style.setProperty(name, i.call(this, t), priority);\n  };\n}\n\nfunction styleTween(name, value, priority) {\n  var t, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);\n    return t;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value, priority) {\n  var key = \"style.\" + (name += \"\");\n  if (arguments.length < 2) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  return this.tween(key, styleTween(name, value, priority == null ? \"\" : priority));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/styleTween.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/text.js":
/*!********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/text.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween.js */ \"../../node_modules/d3-transition/src/transition/tween.js\");\n\n\nfunction textConstant(value) {\n  return function() {\n    this.textContent = value;\n  };\n}\n\nfunction textFunction(value) {\n  return function() {\n    var value1 = value(this);\n    this.textContent = value1 == null ? \"\" : value1;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  return this.tween(\"text\", typeof value === \"function\"\n      ? textFunction(Object(_tween_js__WEBPACK_IMPORTED_MODULE_0__[\"tweenValue\"])(this, \"text\", value))\n      : textConstant(value == null ? \"\" : value + \"\"));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/text.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/textTween.js":
/*!*************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/textTween.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction textInterpolate(i) {\n  return function(t) {\n    this.textContent = i.call(this, t);\n  };\n}\n\nfunction textTween(value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(value) {\n  var key = \"text\";\n  if (arguments.length < 1) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  return this.tween(key, textTween(value));\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/textTween.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/transition.js":
/*!**************************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/transition.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"../../node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var name = this._name,\n      id0 = this._id,\n      id1 = Object(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"newId\"])();\n\n  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        var inherit = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_1__[\"get\"])(node, id0);\n        Object(_schedule_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(node, name, id1, i, group, {\n          time: inherit.time + inherit.delay + inherit.duration,\n          delay: 0,\n          duration: inherit.duration,\n          ease: inherit.ease\n        });\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__[\"Transition\"](groups, this._parents, name, id1);\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/transition.js?");

/***/ }),

/***/ "../../node_modules/d3-transition/src/transition/tween.js":
/*!*********************************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/tween.js ***!
  \*********************************************************************************************/
/*! exports provided: default, tweenValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tweenValue\", function() { return tweenValue; });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"../../node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction tweenRemove(id, name) {\n  var tween0, tween1;\n  return function() {\n    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id),\n        tween = schedule.tween;\n\n    // If this node shared tween with the previous node,\n    // just assign the updated shared tween and we’re done!\n    // Otherwise, copy-on-write.\n    if (tween !== tween0) {\n      tween1 = tween0 = tween;\n      for (var i = 0, n = tween1.length; i < n; ++i) {\n        if (tween1[i].name === name) {\n          tween1 = tween1.slice();\n          tween1.splice(i, 1);\n          break;\n        }\n      }\n    }\n\n    schedule.tween = tween1;\n  };\n}\n\nfunction tweenFunction(id, name, value) {\n  var tween0, tween1;\n  if (typeof value !== \"function\") throw new Error;\n  return function() {\n    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id),\n        tween = schedule.tween;\n\n    // If this node shared tween with the previous node,\n    // just assign the updated shared tween and we’re done!\n    // Otherwise, copy-on-write.\n    if (tween !== tween0) {\n      tween1 = (tween0 = tween).slice();\n      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {\n        if (tween1[i].name === name) {\n          tween1[i] = t;\n          break;\n        }\n      }\n      if (i === n) tween1.push(t);\n    }\n\n    schedule.tween = tween1;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, value) {\n  var id = this._id;\n\n  name += \"\";\n\n  if (arguments.length < 2) {\n    var tween = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.node(), id).tween;\n    for (var i = 0, n = tween.length, t; i < n; ++i) {\n      if ((t = tween[i]).name === name) {\n        return t.value;\n      }\n    }\n    return null;\n  }\n\n  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));\n});\n\nfunction tweenValue(transition, name, value) {\n  var id = transition._id;\n\n  transition.each(function() {\n    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this, id);\n    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);\n  });\n\n  return function(node) {\n    return Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(node, id).value[name];\n  };\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-transition/src/transition/tween.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/constant.js":
/*!*******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/constant.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(x) {\n  return function() {\n    return x;\n  };\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/constant.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/event.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/event.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ZoomEvent; });\nfunction ZoomEvent(target, type, transform) {\n  this.target = target;\n  this.type = type;\n  this.transform = transform;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/event.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/index.js":
/*!****************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/index.js ***!
  \****************************************************************************/
/*! exports provided: zoom, zoomTransform, zoomIdentity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ \"../../node_modules/d3-zoom/src/zoom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zoom\", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../../node_modules/d3-zoom/src/transform.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zoomTransform\", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zoomIdentity\", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__[\"identity\"]; });\n\n\n\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/index.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/noevent.js":
/*!******************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/noevent.js ***!
  \******************************************************************************/
/*! exports provided: nopropagation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nopropagation\", function() { return nopropagation; });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n\n\nfunction nopropagation() {\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].stopImmediatePropagation();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].preventDefault();\n  d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].stopImmediatePropagation();\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/noevent.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/transform.js":
/*!********************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/transform.js ***!
  \********************************************************************************/
/*! exports provided: Transform, identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Transform\", function() { return Transform; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"identity\", function() { return identity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return transform; });\nfunction Transform(k, x, y) {\n  this.k = k;\n  this.x = x;\n  this.y = y;\n}\n\nTransform.prototype = {\n  constructor: Transform,\n  scale: function(k) {\n    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);\n  },\n  translate: function(x, y) {\n    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);\n  },\n  apply: function(point) {\n    return [point[0] * this.k + this.x, point[1] * this.k + this.y];\n  },\n  applyX: function(x) {\n    return x * this.k + this.x;\n  },\n  applyY: function(y) {\n    return y * this.k + this.y;\n  },\n  invert: function(location) {\n    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];\n  },\n  invertX: function(x) {\n    return (x - this.x) / this.k;\n  },\n  invertY: function(y) {\n    return (y - this.y) / this.k;\n  },\n  rescaleX: function(x) {\n    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));\n  },\n  rescaleY: function(y) {\n    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));\n  },\n  toString: function() {\n    return \"translate(\" + this.x + \",\" + this.y + \") scale(\" + this.k + \")\";\n  }\n};\n\nvar identity = new Transform(1, 0, 0);\n\ntransform.prototype = Transform.prototype;\n\nfunction transform(node) {\n  while (!node.__zoom) if (!(node = node.parentNode)) return identity;\n  return node.__zoom;\n}\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/transform.js?");

/***/ }),

/***/ "../../node_modules/d3-zoom/src/zoom.js":
/*!***************************************************************************!*\
  !*** /Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/zoom.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ \"../../node_modules/d3-dispatch/src/index.js\");\n/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-drag */ \"../../node_modules/d3-drag/src/index.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ \"../../node_modules/d3-interpolate/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-transition */ \"../../node_modules/d3-transition/src/index.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constant.js */ \"../../node_modules/d3-zoom/src/constant.js\");\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event.js */ \"../../node_modules/d3-zoom/src/event.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transform.js */ \"../../node_modules/d3-zoom/src/transform.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./noevent.js */ \"../../node_modules/d3-zoom/src/noevent.js\");\n\n\n\n\n\n\n\n\n\n\n// Ignore right-click, since that should open the context menu.\nfunction defaultFilter() {\n  return !d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].ctrlKey && !d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].button;\n}\n\nfunction defaultExtent() {\n  var e = this;\n  if (e instanceof SVGElement) {\n    e = e.ownerSVGElement || e;\n    if (e.hasAttribute(\"viewBox\")) {\n      e = e.viewBox.baseVal;\n      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];\n    }\n    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];\n  }\n  return [[0, 0], [e.clientWidth, e.clientHeight]];\n}\n\nfunction defaultTransform() {\n  return this.__zoom || _transform_js__WEBPACK_IMPORTED_MODULE_7__[\"identity\"];\n}\n\nfunction defaultWheelDelta() {\n  return -d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].deltaY * (d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].deltaMode === 1 ? 0.05 : d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].deltaMode ? 1 : 0.002);\n}\n\nfunction defaultTouchable() {\n  return navigator.maxTouchPoints || (\"ontouchstart\" in this);\n}\n\nfunction defaultConstrain(transform, extent, translateExtent) {\n  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],\n      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],\n      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],\n      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];\n  return transform.translate(\n    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),\n    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)\n  );\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  var filter = defaultFilter,\n      extent = defaultExtent,\n      constrain = defaultConstrain,\n      wheelDelta = defaultWheelDelta,\n      touchable = defaultTouchable,\n      scaleExtent = [0, Infinity],\n      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],\n      duration = 250,\n      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_2__[\"interpolateZoom\"],\n      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__[\"dispatch\"])(\"start\", \"zoom\", \"end\"),\n      touchstarting,\n      touchending,\n      touchDelay = 500,\n      wheelDelay = 150,\n      clickDistance2 = 0;\n\n  function zoom(selection) {\n    selection\n        .property(\"__zoom\", defaultTransform)\n        .on(\"wheel.zoom\", wheeled)\n        .on(\"mousedown.zoom\", mousedowned)\n        .on(\"dblclick.zoom\", dblclicked)\n      .filter(touchable)\n        .on(\"touchstart.zoom\", touchstarted)\n        .on(\"touchmove.zoom\", touchmoved)\n        .on(\"touchend.zoom touchcancel.zoom\", touchended)\n        .style(\"touch-action\", \"none\")\n        .style(\"-webkit-tap-highlight-color\", \"rgba(0,0,0,0)\");\n  }\n\n  zoom.transform = function(collection, transform, point) {\n    var selection = collection.selection ? collection.selection() : collection;\n    selection.property(\"__zoom\", defaultTransform);\n    if (collection !== selection) {\n      schedule(collection, transform, point);\n    } else {\n      selection.interrupt().each(function() {\n        gesture(this, arguments)\n            .start()\n            .zoom(null, typeof transform === \"function\" ? transform.apply(this, arguments) : transform)\n            .end();\n      });\n    }\n  };\n\n  zoom.scaleBy = function(selection, k, p) {\n    zoom.scaleTo(selection, function() {\n      var k0 = this.__zoom.k,\n          k1 = typeof k === \"function\" ? k.apply(this, arguments) : k;\n      return k0 * k1;\n    }, p);\n  };\n\n  zoom.scaleTo = function(selection, k, p) {\n    zoom.transform(selection, function() {\n      var e = extent.apply(this, arguments),\n          t0 = this.__zoom,\n          p0 = p == null ? centroid(e) : typeof p === \"function\" ? p.apply(this, arguments) : p,\n          p1 = t0.invert(p0),\n          k1 = typeof k === \"function\" ? k.apply(this, arguments) : k;\n      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);\n    }, p);\n  };\n\n  zoom.translateBy = function(selection, x, y) {\n    zoom.transform(selection, function() {\n      return constrain(this.__zoom.translate(\n        typeof x === \"function\" ? x.apply(this, arguments) : x,\n        typeof y === \"function\" ? y.apply(this, arguments) : y\n      ), extent.apply(this, arguments), translateExtent);\n    });\n  };\n\n  zoom.translateTo = function(selection, x, y, p) {\n    zoom.transform(selection, function() {\n      var e = extent.apply(this, arguments),\n          t = this.__zoom,\n          p0 = p == null ? centroid(e) : typeof p === \"function\" ? p.apply(this, arguments) : p;\n      return constrain(_transform_js__WEBPACK_IMPORTED_MODULE_7__[\"identity\"].translate(p0[0], p0[1]).scale(t.k).translate(\n        typeof x === \"function\" ? -x.apply(this, arguments) : -x,\n        typeof y === \"function\" ? -y.apply(this, arguments) : -y\n      ), e, translateExtent);\n    }, p);\n  };\n\n  function scale(transform, k) {\n    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));\n    return k === transform.k ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__[\"Transform\"](k, transform.x, transform.y);\n  }\n\n  function translate(transform, p0, p1) {\n    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;\n    return x === transform.x && y === transform.y ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__[\"Transform\"](transform.k, x, y);\n  }\n\n  function centroid(extent) {\n    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];\n  }\n\n  function schedule(transition, transform, point) {\n    transition\n        .on(\"start.zoom\", function() { gesture(this, arguments).start(); })\n        .on(\"interrupt.zoom end.zoom\", function() { gesture(this, arguments).end(); })\n        .tween(\"zoom\", function() {\n          var that = this,\n              args = arguments,\n              g = gesture(that, args),\n              e = extent.apply(that, args),\n              p = point == null ? centroid(e) : typeof point === \"function\" ? point.apply(that, args) : point,\n              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),\n              a = that.__zoom,\n              b = typeof transform === \"function\" ? transform.apply(that, args) : transform,\n              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));\n          return function(t) {\n            if (t === 1) t = b; // Avoid rounding error on end.\n            else { var l = i(t), k = w / l[2]; t = new _transform_js__WEBPACK_IMPORTED_MODULE_7__[\"Transform\"](k, p[0] - l[0] * k, p[1] - l[1] * k); }\n            g.zoom(null, t);\n          };\n        });\n  }\n\n  function gesture(that, args, clean) {\n    return (!clean && that.__zooming) || new Gesture(that, args);\n  }\n\n  function Gesture(that, args) {\n    this.that = that;\n    this.args = args;\n    this.active = 0;\n    this.extent = extent.apply(that, args);\n    this.taps = 0;\n  }\n\n  Gesture.prototype = {\n    start: function() {\n      if (++this.active === 1) {\n        this.that.__zooming = this;\n        this.emit(\"start\");\n      }\n      return this;\n    },\n    zoom: function(key, transform) {\n      if (this.mouse && key !== \"mouse\") this.mouse[1] = transform.invert(this.mouse[0]);\n      if (this.touch0 && key !== \"touch\") this.touch0[1] = transform.invert(this.touch0[0]);\n      if (this.touch1 && key !== \"touch\") this.touch1[1] = transform.invert(this.touch1[0]);\n      this.that.__zoom = transform;\n      this.emit(\"zoom\");\n      return this;\n    },\n    end: function() {\n      if (--this.active === 0) {\n        delete this.that.__zooming;\n        this.emit(\"end\");\n      }\n      return this;\n    },\n    emit: function(type) {\n      Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"customEvent\"])(new _event_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);\n    }\n  };\n\n  function wheeled() {\n    if (!filter.apply(this, arguments)) return;\n    var g = gesture(this, arguments),\n        t = this.__zoom,\n        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),\n        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"mouse\"])(this);\n\n    // If the mouse is in the same location as before, reuse it.\n    // If there were recent wheel events, reset the wheel idle timeout.\n    if (g.wheel) {\n      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {\n        g.mouse[1] = t.invert(g.mouse[0] = p);\n      }\n      clearTimeout(g.wheel);\n    }\n\n    // If this wheel event won’t trigger a transform change, ignore it.\n    else if (t.k === k) return;\n\n    // Otherwise, capture the mouse point and location at the start.\n    else {\n      g.mouse = [p, t.invert(p)];\n      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__[\"interrupt\"])(this);\n      g.start();\n    }\n\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n    g.wheel = setTimeout(wheelidled, wheelDelay);\n    g.zoom(\"mouse\", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));\n\n    function wheelidled() {\n      g.wheel = null;\n      g.end();\n    }\n  }\n\n  function mousedowned() {\n    if (touchending || !filter.apply(this, arguments)) return;\n    var g = gesture(this, arguments, true),\n        v = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"select\"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].view).on(\"mousemove.zoom\", mousemoved, true).on(\"mouseup.zoom\", mouseupped, true),\n        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"mouse\"])(this),\n        x0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].clientX,\n        y0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].clientY;\n\n    Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__[\"dragDisable\"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].view);\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"nopropagation\"])();\n    g.mouse = [p, this.__zoom.invert(p)];\n    Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__[\"interrupt\"])(this);\n    g.start();\n\n    function mousemoved() {\n      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n      if (!g.moved) {\n        var dx = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].clientX - x0, dy = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].clientY - y0;\n        g.moved = dx * dx + dy * dy > clickDistance2;\n      }\n      g.zoom(\"mouse\", constrain(translate(g.that.__zoom, g.mouse[0] = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"mouse\"])(g.that), g.mouse[1]), g.extent, translateExtent));\n    }\n\n    function mouseupped() {\n      v.on(\"mousemove.zoom mouseup.zoom\", null);\n      Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__[\"dragEnable\"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].view, g.moved);\n      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n      g.end();\n    }\n  }\n\n  function dblclicked() {\n    if (!filter.apply(this, arguments)) return;\n    var t0 = this.__zoom,\n        p0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"mouse\"])(this),\n        p1 = t0.invert(p0),\n        k1 = t0.k * (d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].shiftKey ? 0.5 : 2),\n        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);\n\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n    if (duration > 0) Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"select\"])(this).transition().duration(duration).call(schedule, t1, p0);\n    else Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"select\"])(this).call(zoom.transform, t1);\n  }\n\n  function touchstarted() {\n    if (!filter.apply(this, arguments)) return;\n    var touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].touches,\n        n = touches.length,\n        g = gesture(this, arguments, d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].changedTouches.length === n),\n        started, i, t, p;\n\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"nopropagation\"])();\n    for (i = 0; i < n; ++i) {\n      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"touch\"])(this, touches, t.identifier);\n      p = [p, this.__zoom.invert(p), t.identifier];\n      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;\n      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;\n    }\n\n    if (touchstarting) touchstarting = clearTimeout(touchstarting);\n\n    if (started) {\n      if (g.taps < 2) touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);\n      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__[\"interrupt\"])(this);\n      g.start();\n    }\n  }\n\n  function touchmoved() {\n    if (!this.__zooming) return;\n    var g = gesture(this, arguments),\n        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].changedTouches,\n        n = touches.length, i, t, p, l;\n\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n    if (touchstarting) touchstarting = clearTimeout(touchstarting);\n    g.taps = 0;\n    for (i = 0; i < n; ++i) {\n      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"touch\"])(this, touches, t.identifier);\n      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;\n      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;\n    }\n    t = g.that.__zoom;\n    if (g.touch1) {\n      var p0 = g.touch0[0], l0 = g.touch0[1],\n          p1 = g.touch1[0], l1 = g.touch1[1],\n          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,\n          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;\n      t = scale(t, Math.sqrt(dp / dl));\n      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];\n      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];\n    }\n    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];\n    else return;\n    g.zoom(\"touch\", constrain(translate(t, p, l), g.extent, translateExtent));\n  }\n\n  function touchended() {\n    if (!this.__zooming) return;\n    var g = gesture(this, arguments),\n        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"event\"].changedTouches,\n        n = touches.length, i, t;\n\n    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__[\"nopropagation\"])();\n    if (touchending) clearTimeout(touchending);\n    touchending = setTimeout(function() { touchending = null; }, touchDelay);\n    for (i = 0; i < n; ++i) {\n      t = touches[i];\n      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;\n      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;\n    }\n    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;\n    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);\n    else {\n      g.end();\n      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.\n      if (g.taps === 2) {\n        var p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__[\"select\"])(this).on(\"dblclick.zoom\");\n        if (p) p.apply(this, arguments);\n      }\n    }\n  }\n\n  zoom.wheelDelta = function(_) {\n    return arguments.length ? (wheelDelta = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(+_), zoom) : wheelDelta;\n  };\n\n  zoom.filter = function(_) {\n    return arguments.length ? (filter = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(!!_), zoom) : filter;\n  };\n\n  zoom.touchable = function(_) {\n    return arguments.length ? (touchable = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(!!_), zoom) : touchable;\n  };\n\n  zoom.extent = function(_) {\n    return arguments.length ? (extent = typeof _ === \"function\" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;\n  };\n\n  zoom.scaleExtent = function(_) {\n    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];\n  };\n\n  zoom.translateExtent = function(_) {\n    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];\n  };\n\n  zoom.constrain = function(_) {\n    return arguments.length ? (constrain = _, zoom) : constrain;\n  };\n\n  zoom.duration = function(_) {\n    return arguments.length ? (duration = +_, zoom) : duration;\n  };\n\n  zoom.interpolate = function(_) {\n    return arguments.length ? (interpolate = _, zoom) : interpolate;\n  };\n\n  zoom.on = function() {\n    var value = listeners.on.apply(listeners, arguments);\n    return value === listeners ? zoom : value;\n  };\n\n  zoom.clickDistance = function(_) {\n    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);\n  };\n\n  return zoom;\n});\n\n\n//# sourceURL=webpack:////Users/yosukeonoue/src/eg-renderer/node_modules/d3-zoom/src/zoom.js?");

/***/ }),

/***/ "../eg-renderer/src/centering.js":
/*!***************************************!*\
  !*** ../eg-renderer/src/centering.js ***!
  \***************************************/
/*! exports provided: layoutRect, centerTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"layoutRect\", function() { return layoutRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"centerTransform\", function() { return centerTransform; });\nconst layoutRect = (items) => {\n  if (items.length === 0) {\n    return {\n      left: 0,\n      top: 0,\n      layoutWidth: 0,\n      layoutHeight: 0,\n    };\n  }\n  items = Array.from(items.values());\n  const left = Math.min(...items.map(({ x, width }) => x - width / 2));\n  const right = Math.max(...items.map(({ x, width }) => x + width / 2));\n  const top = Math.min(...items.map(({ y, height }) => y - height / 2));\n  const bottom = Math.max(...items.map(({ y, height }) => y + height / 2));\n  return {\n    left: left,\n    top: top,\n    layoutWidth: right - left,\n    layoutHeight: bottom - top,\n  };\n};\n\nconst centerTransform = (\n  lWidth,\n  lHeight,\n  left,\n  top,\n  cWidth,\n  cHeight,\n  margin\n) => {\n  if (lWidth === 0 || lHeight === 0) {\n    return {\n      x: 0,\n      y: 0,\n      k: 1,\n    };\n  }\n  const aWidth = cWidth - 2 * margin;\n  const aHeight = cHeight - 2 * margin;\n  const hScale = aWidth / lWidth;\n  const vScale = aHeight / lHeight;\n  const scale = Math.min(hScale, vScale);\n  const x = hScale < vScale ? 0 : (aWidth - lWidth * scale) / 2;\n  const y = vScale < hScale ? 0 : (aHeight - lHeight * scale) / 2;\n  return { x, y, k: scale };\n};\n\n\n//# sourceURL=webpack:///../eg-renderer/src/centering.js?");

/***/ }),

/***/ "../eg-renderer/src/device-pixel-ratio.js":
/*!************************************************!*\
  !*** ../eg-renderer/src/device-pixel-ratio.js ***!
  \************************************************/
/*! exports provided: devicePixelRatio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"devicePixelRatio\", function() { return devicePixelRatio; });\nconst devicePixelRatio = () => {\n  return window.devicePixelRatio || 1.0;\n};\n\n\n//# sourceURL=webpack:///../eg-renderer/src/device-pixel-ratio.js?");

/***/ }),

/***/ "../eg-renderer/src/eg-renderer-element.js":
/*!*************************************************!*\
  !*** ../eg-renderer/src/eg-renderer-element.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-ease */ \"../../node_modules/d3-ease/src/index.js\");\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ \"../../node_modules/d3-color/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-zoom */ \"../../node_modules/d3-zoom/src/index.js\");\n/* harmony import */ var _centering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centering */ \"../eg-renderer/src/centering.js\");\n/* harmony import */ var _interpolate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interpolate */ \"../eg-renderer/src/interpolate.js\");\n/* harmony import */ var _device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./device-pixel-ratio */ \"../eg-renderer/src/device-pixel-ratio.js\");\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./zoom */ \"../eg-renderer/src/zoom.js\");\n/* harmony import */ var _marker_point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./marker-point */ \"../eg-renderer/src/marker-point.js\");\n\n\n\n\n\n\n\n\n\n\nconst get = (...args) => {\n  let d = args[0];\n  const key = args[1];\n  const attrs = key.split(\".\");\n  for (const attr of attrs) {\n    if (!(attr in d)) {\n      if (args.length === 2) {\n        throw new Error(`Object doesn't have an attribute ${key}`);\n      }\n      return args[2];\n    }\n    d = d[attr];\n  }\n  return d;\n};\n\nconst privates = new WeakMap();\n\nconst setWidth = (e, width) => {\n  const p = privates.get(e);\n  p.canvas.width = width * Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n  p.canvas.style.width = `${width}px`;\n  if (p.renderer) {\n    p.renderer.resize(e.width, e.height);\n  }\n};\n\nconst setHeight = (e, height) => {\n  const p = privates.get(e);\n  p.canvas.height = height * Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n  p.canvas.style.height = `${height}px`;\n  if (p.renderer) {\n    p.renderer.resize(e.width, e.height);\n  }\n};\n\nconst getter = (element, attributeName, defaultValue) => {\n  if (!element.hasAttribute(attributeName)) {\n    return defaultValue;\n  }\n  return element.getAttribute(attributeName);\n};\n\nconst includes = (v, x, y) => {\n  if (v.type === \"circle\") {\n    const xa = (2 * (x - v.x)) / v.width;\n    const yb = (2 * (y - v.y)) / v.height;\n    return xa * xa + yb * yb <= 1;\n  }\n  return (\n    v.x - v.width / 2 <= x &&\n    x <= v.x + v.width / 2 &&\n    v.y - v.height / 2 <= y &&\n    y <= v.y + v.height / 2\n  );\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((Renderer) => {\n  return class EgRendererElement extends window.HTMLElement {\n    static get observedAttributes() {\n      return [\n        \"src\",\n        \"width\",\n        \"height\",\n        \"graph-groups-property\",\n        \"graph-nodes-property\",\n        \"graph-links-property\",\n        \"group-id-property\",\n        \"group-x-property\",\n        \"group-y-property\",\n        \"group-width-property\",\n        \"group-height-property\",\n        \"group-type-property\",\n        \"group-visibility-property\",\n        \"group-fill-color-property\",\n        \"group-fill-opacity-property\",\n        \"group-stroke-color-property\",\n        \"group-stroke-opacity-property\",\n        \"group-stroke-width-property\",\n        \"group-label-property\",\n        \"group-label-dx-property\",\n        \"group-label-dy-property\",\n        \"group-label-dx-base-property\",\n        \"group-label-dy-base-property\",\n        \"group-label-fill-color-property\",\n        \"group-label-fill-opacity-property\",\n        \"group-label-stroke-color-property\",\n        \"group-label-stroke-opacity-property\",\n        \"group-label-stroke-width-property\",\n        \"group-label-font-size-property\",\n        \"group-label-font-family-property\",\n        \"group-label-text-align-property\",\n        \"node-id-property\",\n        \"node-x-property\",\n        \"node-y-property\",\n        \"node-width-property\",\n        \"node-height-property\",\n        \"node-type-property\",\n        \"node-visibility-property\",\n        \"node-fill-color-property\",\n        \"node-fill-opacity-property\",\n        \"node-stroke-color-property\",\n        \"node-stroke-opacity-property\",\n        \"node-stroke-width-property\",\n        \"node-label-property\",\n        \"node-label-dx-property\",\n        \"node-label-dy-property\",\n        \"node-label-dx-base-property\",\n        \"node-label-dy-base-property\",\n        \"node-label-fill-color-property\",\n        \"node-label-fill-opacity-property\",\n        \"node-label-stroke-color-property\",\n        \"node-label-stroke-opacity-property\",\n        \"node-label-stroke-width-property\",\n        \"node-label-font-size-property\",\n        \"node-label-font-family-property\",\n        \"node-label-text-align-property\",\n        \"link-source-property\",\n        \"link-target-property\",\n        \"link-stroke-color-property\",\n        \"link-stroke-opacity-property\",\n        \"link-stroke-width-property\",\n        \"link-visibility-property\",\n        \"link-source-marker-shape-property\",\n        \"link-source-marker-size-property\",\n        \"link-target-marker-shape-property\",\n        \"link-target-marker-size-property\",\n        \"link-label-property\",\n        \"link-label-dx-property\",\n        \"link-label-dy-property\",\n        \"link-label-dx-base-property\",\n        \"link-label-dy-base-property\",\n        \"link-label-fill-color-property\",\n        \"link-label-fill-opacity-property\",\n        \"link-label-stroke-color-property\",\n        \"link-label-stroke-opacity-property\",\n        \"link-label-stroke-width-property\",\n        \"link-label-font-size-property\",\n        \"link-label-font-family-property\",\n        \"link-label-text-align-property\",\n        \"default-group-x\",\n        \"default-group-y\",\n        \"default-group-width\",\n        \"default-group-height\",\n        \"default-group-type\",\n        \"default-group-visibility\",\n        \"default-group-fill-color\",\n        \"default-group-fill-opacity\",\n        \"default-group-stroke-color\",\n        \"default-group-stroke-opacity\",\n        \"default-group-stroke-width\",\n        \"default-group-label\",\n        \"default-group-label-dx\",\n        \"default-group-label-dy\",\n        \"default-group-label-dx-base\",\n        \"default-group-label-dy-base\",\n        \"default-group-label-fill-color\",\n        \"default-group-label-fill-opacity\",\n        \"default-group-label-stroke-color\",\n        \"default-group-label-stroke-opacity\",\n        \"default-group-label-stroke-width\",\n        \"default-group-label-font-size\",\n        \"default-group-label-font-family\",\n        \"default-group-label-text-align\",\n        \"default-node-x\",\n        \"default-node-y\",\n        \"default-node-width\",\n        \"default-node-height\",\n        \"default-node-type\",\n        \"default-node-visibility\",\n        \"default-node-fill-color\",\n        \"default-node-fill-opacity\",\n        \"default-node-stroke-color\",\n        \"default-node-stroke-opacity\",\n        \"default-node-stroke-width\",\n        \"default-node-label\",\n        \"default-node-label-dx\",\n        \"default-node-label-dy\",\n        \"default-node-label-dx-base\",\n        \"default-node-label-dy-base\",\n        \"default-node-label-fill-color\",\n        \"default-node-label-fill-opacity\",\n        \"default-node-label-stroke-color\",\n        \"default-node-label-stroke-opacity\",\n        \"default-node-label-stroke-width\",\n        \"default-node-label-font-size\",\n        \"default-node-label-font-family\",\n        \"default-node-label-text-align\",\n        \"default-link-stroke-color\",\n        \"default-link-stroke-opacity\",\n        \"default-link-stroke-width\",\n        \"default-link-visibility\",\n        \"default-link-source-marker-shape\",\n        \"default-link-source-marker-size\",\n        \"default-link-target-marker-shape\",\n        \"default-link-target-marker-size\",\n        \"default-link-label\",\n        \"default-link-label-dx\",\n        \"default-link-label-dy\",\n        \"default-link-label-dx-base\",\n        \"default-link-label-dy-base\",\n        \"default-link-label-fill-color\",\n        \"default-link-label-fill-opacity\",\n        \"default-link-label-stroke-color\",\n        \"default-link-label-stroke-opacity\",\n        \"default-link-label-stroke-width\",\n        \"default-link-label-font-size\",\n        \"default-link-label-font-family\",\n        \"default-link-label-text-align\",\n      ];\n    }\n\n    constructor() {\n      super();\n      const canvas = document.createElement(\"canvas\");\n      const p = {\n        invalidate: false,\n        invalidatePositions: false,\n        originalData: null,\n        canvas,\n        data: {\n          groupIds: [],\n          groups: new Map(),\n          vertexIds: [],\n          vertices: new Map(),\n          edgeIds: [],\n          edges: new Map(),\n        },\n        transform: {\n          x: 0,\n          y: 0,\n          k: 1,\n        },\n        currentRegion: null,\n        layout: {\n          update: {\n            groups: [],\n            vertices: [],\n            edges: [],\n          },\n          enter: {\n            groups: [],\n            vertices: [],\n            edges: [],\n          },\n          exit: {\n            groups: [],\n            vertices: [],\n            edges: [],\n          },\n        },\n        margin: 10,\n        layoutTime: 0,\n        ease: d3_ease__WEBPACK_IMPORTED_MODULE_0__[\"easeCubic\"],\n        stop: false,\n      };\n\n      p.zoom = Object(_zoom__WEBPACK_IMPORTED_MODULE_7__[\"zoom\"])(this, p);\n      privates.set(this, p);\n\n      Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__[\"select\"])(p.canvas).call(p.zoom).on(\"dblclick.zoom\", null);\n\n      p.canvas.addEventListener(\"mousemove\", (event) => {\n        if (event.region) {\n          const obj = JSON.parse(event.region);\n          if (p.currentRegion == null) {\n            if (obj.id) {\n              const { id } = obj;\n              this.dispatchEvent(\n                new window.CustomEvent(\"nodemouseenter\", {\n                  detail: { id },\n                })\n              );\n            } else if (obj.source && obj.target) {\n              const { source, target } = obj;\n              this.dispatchEvent(\n                new window.CustomEvent(\"linkmouseenter\", {\n                  detail: { source, target },\n                })\n              );\n            }\n          }\n          p.currentRegion = obj;\n        } else {\n          if (p.currentRegion) {\n            const obj = p.currentRegion;\n            if (obj.id) {\n              const { id } = obj;\n              this.dispatchEvent(\n                new window.CustomEvent(\"nodemouseleave\", {\n                  detail: { id },\n                })\n              );\n            } else if (obj.source && obj.target) {\n              const { source, target } = obj;\n              this.dispatchEvent(\n                new window.CustomEvent(\"linkmouseleave\", {\n                  detail: { source, target },\n                })\n              );\n            }\n          }\n          p.currentRegion = null;\n        }\n        if (this.canDragNode && event.region) {\n          const obj = JSON.parse(event.region);\n          if (obj.id) {\n            p.canvas.style.cursor = \"pointer\";\n          }\n        } else if (this.canZoom) {\n          p.canvas.style.cursor = \"move\";\n        } else {\n          p.canvas.style.cursor = \"default\";\n        }\n      });\n\n      const events = [\"click\", \"dblclick\", \"contextmenu\"];\n      for (const name of events) {\n        p.canvas.addEventListener(name, (event) => {\n          const id = this.findNode(event.offsetX, event.offsetY);\n          if (id) {\n            if (name === \"contextmenu\") {\n              event.preventDefault();\n            }\n            this.dispatchEvent(\n              new window.CustomEvent(`node${name}`, {\n                detail: { id },\n              })\n            );\n          }\n        });\n      }\n    }\n\n    connectedCallback() {\n      const p = privates.get(this);\n      this.appendChild(p.canvas);\n\n      const render = () => {\n        if (p.stop) {\n          return;\n        }\n        if (p.invalidate && p.originalData) {\n          this.update(!p.invalidatePositions);\n        }\n        p.invalidate = false;\n        p.invalidatePositions = false;\n        const now = new Date();\n        const transitionDuration = this.transitionDuration;\n        const t = Math.min(\n          1,\n          now > p.layoutTime\n            ? (now - p.layoutTime) / transitionDuration\n            : 1 / transitionDuration\n        );\n        const r = p.ease(t);\n        p.renderer.enableLinkEvents = this.enableLinkEvents;\n        p.renderer.render(r);\n        window.requestAnimationFrame(render);\n      };\n\n      p.renderer = new Renderer(p.canvas, p.layout, p.transform);\n      this.invalidate();\n      p.renderer.resize(this.width, this.height);\n      render();\n    }\n\n    disconnectedCallback() {\n      const p = privates.get(this);\n      p.stop = true;\n    }\n\n    attributeChangedCallback(attr, oldValue, newValue) {\n      switch (attr) {\n        case \"src\":\n          window\n            .fetch(newValue)\n            .then((response) => response.json())\n            .then((data) => {\n              this.dispatchEvent(\n                new window.CustomEvent(\"datafetchend\", { detail: data })\n              );\n              this.load(data);\n            });\n          break;\n        case \"width\":\n          setWidth(this, newValue);\n          break;\n        case \"height\":\n          setHeight(this, newValue);\n          break;\n        default:\n          this.invalidate();\n      }\n    }\n\n    center() {\n      const { canvas, data, margin, zoom } = privates.get(this);\n      const items = [].concat(\n        Array.from(data.vertices.values()),\n        Array.from(data.groups.values())\n      );\n      const { layoutWidth, layoutHeight, left, top } = Object(_centering__WEBPACK_IMPORTED_MODULE_4__[\"layoutRect\"])(items);\n      const canvasWidth = canvas.width / Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n      const canvasHeight = canvas.height / Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n      const { x, y, k } = Object(_centering__WEBPACK_IMPORTED_MODULE_4__[\"centerTransform\"])(\n        layoutWidth,\n        layoutHeight,\n        left,\n        top,\n        canvasWidth,\n        canvasHeight,\n        margin\n      );\n      zoom.transform(\n        Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__[\"select\"])(canvas),\n        d3_zoom__WEBPACK_IMPORTED_MODULE_3__[\"zoomIdentity\"].translate(x, y).scale(k).translate(-left, -top)\n      );\n      return this;\n    }\n\n    focus(x, y) {\n      const { canvas, data, margin, zoom } = privates.get(this);\n      const items = [].concat(\n        Array.from(data.vertices.values()),\n        Array.from(data.groups.values())\n      );\n      const { layoutWidth, layoutHeight, left, top } = Object(_centering__WEBPACK_IMPORTED_MODULE_4__[\"layoutRect\"])(items);\n      const canvasWidth = canvas.width / Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n      const canvasHeight = canvas.height / Object(_device_pixel_ratio__WEBPACK_IMPORTED_MODULE_6__[\"devicePixelRatio\"])();\n      const { k } = Object(_centering__WEBPACK_IMPORTED_MODULE_4__[\"centerTransform\"])(\n        layoutWidth,\n        layoutHeight,\n        left,\n        top,\n        canvasWidth,\n        canvasHeight,\n        margin\n      );\n      zoom.transform(\n        Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__[\"select\"])(canvas),\n        d3_zoom__WEBPACK_IMPORTED_MODULE_3__[\"zoomIdentity\"].translate(x, y).scale(k).translate(-left, -top)\n      );\n      return this;\n    }\n\n    load(data) {\n      privates.get(this).originalData = data;\n      return this.update();\n    }\n\n    update(preservePositions = false) {\n      const p = privates.get(this);\n      p.prevData = p.data;\n      const data = p.originalData;\n      const groups = Array.from(get(data, this.graphGroupsProperty, []))\n        .filter((group) =>\n          get(group, this.groupVisibilityProperty, this.defaultGroupVisibility)\n        )\n        .map((group, i) => {\n          const fillColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(group, this.groupFillColorProperty, this.defaultGroupFillColor)\n          );\n          fillColor.opacity = +get(\n            group,\n            this.groupFillOpacityProperty,\n            this.defaultGroupFillOpacity\n          );\n          const strokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              group,\n              this.groupStrokeColorProperty,\n              this.defaultGroupStrokeColor\n            )\n          );\n          strokeColor.opacity = +get(\n            group,\n            this.groupStrokeOpacityProperty,\n            this.defaultGroupStrokeOpacity\n          );\n          const labelFillColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              group,\n              this.groupLabelFillColorProperty,\n              this.defaultGroupLabelFillColor\n            )\n          );\n          labelFillColor.opacity = +get(\n            group,\n            this.groupLabelFillOpacityProperty,\n            this.defaultGroupLabelFillOpacity\n          );\n          const labelStrokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              group,\n              this.groupLabelStrokeColorProperty,\n              this.defaultGroupLabelStrokeColor\n            )\n          );\n          labelStrokeColor.opacity = +get(\n            group,\n            this.groupLabelStrokeOpacityProperty,\n            this.defaultGroupLabelStrokeOpacity\n          );\n          const g = (\n            this.groupIdProperty === \"$index\"\n              ? i\n              : get(group, this.groupIdProperty)\n          ).toString();\n          return {\n            g,\n            x:\n              preservePositions && p.prevData.groups.has(g)\n                ? p.prevData.groups.get(g).x\n                : +get(group, this.groupXProperty, this.defaultGroupX),\n            y:\n              preservePositions && p.prevData.groups.has(g)\n                ? p.prevData.groups.get(g).y\n                : +get(group, this.groupYProperty, this.defaultGroupY),\n            width: +get(group, this.groupWidthProperty, this.defaultGroupWidth),\n            height: +get(\n              group,\n              this.groupHeightProperty,\n              this.defaultGroupHeight\n            ),\n            type: get(group, this.groupTypeProperty, this.defaultGroupType),\n            fillColor,\n            strokeColor,\n            strokeWidth: +get(\n              group,\n              this.groupStrokeWidthProperty,\n              this.defaultGroupStrokeWidth\n            ),\n            label: get(group, this.groupLabelProperty, this.defaultGroupLabel),\n            labelDx: +get(\n              group,\n              this.groupLabelDxProperty,\n              this.defaultGroupLabelDx\n            ),\n            labelDy: +get(\n              group,\n              this.groupLabelDyProperty,\n              this.defaultGroupLabelDy\n            ),\n            labelDxBase: get(\n              group,\n              this.groupLabelDxBaseProperty,\n              this.defaultGroupLabelDxBase\n            ),\n            labelDyBase: get(\n              group,\n              this.groupLabelDyBaseProperty,\n              this.defaultGroupLabelDyBase\n            ),\n            labelFillColor,\n            labelStrokeColor,\n            labelStrokeWidth: +get(\n              group,\n              this.groupLabelStrokeWidthProperty,\n              this.defaultGroupLabelStrokeWidth\n            ),\n            labelFontSize: +get(\n              group,\n              this.groupLabelFontSizeProperty,\n              this.defaultGroupLabelFontSize\n            ),\n            labelFontFamily: get(\n              group,\n              this.groupLabelFontFamilyProperty,\n              this.defaultGroupLabelFontFamily\n            ),\n            labelTextAlign: get(\n              group,\n              this.groupLabelTextAlignProperty,\n              this.defaultGroupLabelTextAlign\n            ),\n            d: group,\n          };\n        });\n      const vertices = Array.from(get(data, this.graphNodesProperty))\n        .filter((node) =>\n          get(node, this.nodeVisibilityProperty, this.defaultNodeVisibility)\n        )\n        .map((node, i) => {\n          const fillColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(node, this.nodeFillColorProperty, this.defaultNodeFillColor)\n          );\n          fillColor.opacity = +get(\n            node,\n            this.nodeFillOpacityProperty,\n            this.defaultNodeFillOpacity\n          );\n          const strokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(node, this.nodeStrokeColorProperty, this.defaultNodeStrokeColor)\n          );\n          strokeColor.opacity = +get(\n            node,\n            this.nodeStrokeOpacityProperty,\n            this.defaultNodeStrokeOpacity\n          );\n          const labelFillColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              node,\n              this.nodeLabelFillColorProperty,\n              this.defaultNodeLabelFillColor\n            )\n          );\n          labelFillColor.opacity = +get(\n            node,\n            this.nodeLabelFillOpacityProperty,\n            this.defaultNodeLabelFillOpacity\n          );\n          const labelStrokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              node,\n              this.nodeLabelStrokeColorProperty,\n              this.defaultNodeLabelStrokeColor\n            )\n          );\n          labelStrokeColor.opacity = +get(\n            node,\n            this.nodeLabelStrokeOpacityProperty,\n            this.defaultNodeLabelStrokeOpacity\n          );\n          const u = (\n            this.nodeIdProperty === \"$index\"\n              ? i\n              : get(node, this.nodeIdProperty)\n          ).toString();\n          return {\n            u,\n            x:\n              preservePositions && p.prevData.vertices.has(u)\n                ? p.prevData.vertices.get(u).x\n                : +get(node, this.nodeXProperty, this.defaultNodeX),\n            y:\n              preservePositions && p.prevData.vertices.has(u)\n                ? p.prevData.vertices.get(u).y\n                : +get(node, this.nodeYProperty, this.defaultNodeY),\n            width: +get(node, this.nodeWidthProperty, this.defaultNodeWidth),\n            height: +get(node, this.nodeHeightProperty, this.defaultNodeHeight),\n            type: get(node, this.nodeTypeProperty, this.defaultNodeType),\n            fillColor,\n            strokeColor,\n            strokeWidth: +get(\n              node,\n              this.nodeStrokeWidthProperty,\n              this.defaultNodeStrokeWidth\n            ),\n            label: get(node, this.nodeLabelProperty, this.defaultNodeLabel),\n            labelDx: +get(\n              node,\n              this.nodeLabelDxProperty,\n              this.defaultNodeLabelDx\n            ),\n            labelDy: +get(\n              node,\n              this.nodeLabelDyProperty,\n              this.defaultNodeLabelDy\n            ),\n            labelDxBase: get(\n              node,\n              this.nodeLabelDxBaseProperty,\n              this.defaultNodeLabelDxBase\n            ),\n            labelDyBase: get(\n              node,\n              this.nodeLabelDyBaseProperty,\n              this.defaultNodeLabelDyBase\n            ),\n            labelFillColor,\n            labelStrokeColor,\n            labelStrokeWidth: +get(\n              node,\n              this.nodeLabelStrokeWidthProperty,\n              this.defaultNodeLabelStrokeWidth\n            ),\n            labelFontSize: +get(\n              node,\n              this.nodeLabelFontSizeProperty,\n              this.defaultNodeLabelFontSize\n            ),\n            labelFontFamily: get(\n              node,\n              this.nodeLabelFontFamilyProperty,\n              this.defaultNodeLabelFontFamily\n            ),\n            labelTextAlign: get(\n              node,\n              this.nodeLabelTextAlignProperty,\n              this.defaultNodeLabelTextAlign\n            ),\n            inEdges: [],\n            outEdges: [],\n            d: node,\n          };\n        });\n      const indices = new Map(vertices.map(({ u }, i) => [u, i]));\n      const edges = Array.from(get(data, this.graphLinksProperty))\n        .filter((link) =>\n          get(link, this.linkVisibilityProperty, this.defaultLinkVisibility)\n        )\n        .filter((link) => {\n          const u = get(link, this.linkSourceProperty).toString();\n          const v = get(link, this.linkTargetProperty).toString();\n          return indices.has(u) && indices.has(v);\n        })\n        .map((link) => {\n          const u = get(link, this.linkSourceProperty).toString();\n          const v = get(link, this.linkTargetProperty).toString();\n          const strokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(link, this.linkStrokeColorProperty, this.defaultLinkStrokeColor)\n          );\n          strokeColor.opacity = +get(\n            link,\n            this.linkStrokeOpacityProperty,\n            this.defaultLinkStrokeOpacity\n          );\n          const labelFillColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              link,\n              this.linkLabelFillColorProperty,\n              this.defaultLinkLabelFillColor\n            )\n          );\n          labelFillColor.opacity = +get(\n            link,\n            this.linkLabelFillOpacityProperty,\n            this.defaultLinkLabelFillOpacity\n          );\n          const labelStrokeColor = Object(d3_color__WEBPACK_IMPORTED_MODULE_1__[\"color\"])(\n            get(\n              link,\n              this.linkLabelStrokeColorProperty,\n              this.defaultLinkLabelStrokeColor\n            )\n          );\n          labelStrokeColor.opacity = +get(\n            link,\n            this.linkLabelStrokeOpacityProperty,\n            this.defaultLinkLabelStrokeOpacity\n          );\n          const du = vertices[indices.get(u)];\n          const dv = vertices[indices.get(v)];\n          const newPoints = [[du.x, du.y]];\n          for (const [x, y] of get(link, this.linkBendsProperty, [])) {\n            newPoints.push([x, y]);\n          }\n          newPoints.push([dv.x, dv.y]);\n          const points =\n            preservePositions &&\n            p.prevData.edges.has(u) &&\n            p.prevData.edges.get(u).has(v)\n              ? p.prevData.edges.get(u).get(v).points\n              : newPoints;\n          const edge = {\n            u,\n            v,\n            points,\n            type: get(link, this.linkTypeProperty, this.defaultLinkType),\n            strokeColor,\n            strokeWidth: +get(\n              link,\n              this.linkStrokeWidthProperty,\n              this.defaultLinkStrokeWidth\n            ),\n            sourceMarkerShape: get(\n              link,\n              this.linkSourceMarkerShapeProperty,\n              this.defaultLinkSourceMarkerShape\n            ),\n            sourceMarkerSize: +get(\n              link,\n              this.linkSourceMarkerSizeProperty,\n              this.defaultLinkSourceMarkerSize\n            ),\n            targetMarkerShape: get(\n              link,\n              this.linkTargetMarkerShapeProperty,\n              this.defaultLinkTargetMarkerShape\n            ),\n            targetMarkerSize: +get(\n              link,\n              this.linkTargetMarkerSizeProperty,\n              this.defaultLinkTargetMarkerSize\n            ),\n            label: get(link, this.linkLabelProperty, this.defaultLinkLabel),\n            labelDx: +get(\n              link,\n              this.linkLabelDxProperty,\n              this.defaultLinkLabelDx\n            ),\n            labelDy: +get(\n              link,\n              this.linkLabelDyProperty,\n              this.defaultLinkLabelDy\n            ),\n            labelDxBase: get(\n              link,\n              this.linkLabelDxBaseProperty,\n              this.defaultLinkLabelDxBase\n            ),\n            labelDyBase: get(\n              link,\n              this.linkLabelDyBaseProperty,\n              this.defaultLinkLabelDyBase\n            ),\n            labelFillColor,\n            labelStrokeColor,\n            labelStrokeWidth: +get(\n              link,\n              this.linkLabelStrokeWidthProperty,\n              this.defaultLinkLabelStrokeWidth\n            ),\n            labelFontSize: +get(\n              link,\n              this.linkLabelFontSizeProperty,\n              this.defaultLinkLabelFontSize\n            ),\n            labelFontFamily: get(\n              link,\n              this.linkLabelFontFamilyProperty,\n              this.defaultLinkLabelFontFamily\n            ),\n            labelTextAlign: get(\n              link,\n              this.linkLabelTextAlignProperty,\n              this.defaultLinkLabelTextAlign\n            ),\n            d: link,\n          };\n          du.outEdges.push(edge);\n          dv.inEdges.push(edge);\n          return edge;\n        });\n      p.data = {\n        groupIds: groups.map(({ g }) => g),\n        groups: new Map(groups.map((group) => [group.g, group])),\n        vertexIds: vertices.map(({ u }) => u),\n        vertices: new Map(vertices.map((vertex) => [vertex.u, vertex])),\n        edgeIds: edges.map(({ u, v }) => [u, v]),\n        edges: new Map(vertices.map((vertex) => [vertex.u, new Map()])),\n      };\n      for (const edge of edges) {\n        p.data.edges.get(edge.u).set(edge.v, edge);\n      }\n      this.onLayout(p.data, preservePositions);\n      for (const [u, v] of p.data.edgeIds) {\n        const edge = p.data.edges.get(u).get(v);\n        const du = p.data.vertices.get(u);\n        const dv = p.data.vertices.get(v);\n        Object(_marker_point__WEBPACK_IMPORTED_MODULE_8__[\"adjustEdge\"])(edge, du, dv);\n      }\n      p.layout = Object(_interpolate__WEBPACK_IMPORTED_MODULE_5__[\"diff\"])(p.prevData, p.data);\n      if (p.renderer) {\n        p.renderer.update(p.layout);\n      }\n      p.layoutTime = new Date();\n      if (this.autoCentering) {\n        this.center();\n      }\n      this.dispatchEvent(\n        new window.CustomEvent(\"updateend\", {\n          detail: { preservePositions },\n        })\n      );\n      return this;\n    }\n\n    onLayout() {}\n\n    invalidate() {\n      if (this.autoUpdate) {\n        privates.get(this).invalidate = true;\n      }\n    }\n\n    invalidatePositions() {\n      if (this.autoUpdate) {\n        privates.get(this).invalidatePositions = true;\n      }\n    }\n\n    findNode(px, py) {\n      const p = privates.get(this);\n      const t = p.transform;\n      const x = (px - t.x - p.margin) / t.k;\n      const y = (py - t.y - p.margin) / t.k;\n\n      let closest = null;\n      let closestDist = Infinity;\n      for (const vertex of p.data.vertices.values()) {\n        if (includes(vertex, x, y)) {\n          const dx = vertex.x - x;\n          const dy = vertex.y - y;\n          const dist = dx * dx + dy * dy;\n          if (dist < closestDist) {\n            closest = vertex.u;\n            closestDist = dist;\n          }\n        }\n      }\n      return closest;\n    }\n\n    get autoUpdate() {\n      return !this.hasAttribute(\"no-auto-update\");\n    }\n\n    set autoUpdate(value) {\n      if (value) {\n        this.removeAttribute(\"no-auto-update\");\n      } else {\n        this.setAttribute(\"no-auto-update\", \"\");\n      }\n    }\n\n    get autoCentering() {\n      return !this.hasAttribute(\"no-auto-centering\");\n    }\n\n    set autoCentering(value) {\n      if (value) {\n        this.removeAttribute(\"no-auto-centering\");\n      } else {\n        this.setAttribute(\"no-auto-centering\", \"\");\n      }\n    }\n\n    get canZoom() {\n      return !this.hasAttribute(\"no-zoom\");\n    }\n\n    set canZoom(value) {\n      if (value) {\n        this.removeAttribute(\"no-zoom\");\n      } else {\n        this.setAttribute(\"no-zoom\", \"\");\n      }\n    }\n\n    get canDragNode() {\n      return !this.hasAttribute(\"no-drag-node\");\n    }\n\n    set canDragNode(value) {\n      if (value) {\n        this.removeAttribute(\"no-drag-node\");\n      } else {\n        this.setAttribute(\"no-drag-node\", \"\");\n      }\n    }\n\n    get enableLinkEvents() {\n      return this.hasAttribute(\"enable-link-events\");\n    }\n\n    set enableLinkEvents(value) {\n      if (value) {\n        this.removeAttribute(\"no-drag-node\");\n      } else {\n        this.setAttribute(\"enable-link-events\", \"\");\n      }\n    }\n\n    get src() {\n      return getter(this, \"src\", null);\n    }\n\n    set src(value) {\n      this.setAttribute(\"src\", value);\n    }\n\n    get width() {\n      return getter(this, \"width\", 300);\n    }\n\n    set width(value) {\n      this.setAttribute(\"width\", value);\n    }\n\n    get height() {\n      return getter(this, \"height\", 150);\n    }\n\n    set height(value) {\n      this.setAttribute(\"height\", value);\n    }\n\n    get transitionDuration() {\n      return getter(this, \"transition-duration\", 0);\n    }\n\n    set transitionDuration(value) {\n      this.setAttribute(\"transition-duration\", value);\n    }\n\n    get graphGroupsProperty() {\n      return getter(this, \"graph-groups-property\", \"groups\");\n    }\n\n    set graphGroupsProperty(value) {\n      this.setAttribute(\"graph-groups-property\", value);\n    }\n\n    get graphNodesProperty() {\n      return getter(this, \"graph-nodes-property\", \"nodes\");\n    }\n\n    set graphNodesProperty(value) {\n      this.setAttribute(\"graph-nodes-property\", value);\n    }\n\n    get graphLinksProperty() {\n      return getter(this, \"graph-links-property\", \"links\");\n    }\n\n    set graphLinksProperty(value) {\n      this.setAttribute(\"graph-links-property\", value);\n    }\n\n    get groupIdProperty() {\n      return getter(this, \"group-id-property\", \"$index\");\n    }\n\n    set groupIdProperty(value) {\n      this.setAttribute(\"group-id-property\", value);\n    }\n\n    get groupXProperty() {\n      return getter(this, \"group-x-property\", \"x\");\n    }\n\n    set groupXProperty(value) {\n      this.setAttribute(\"group-x-property\", value);\n    }\n\n    get groupYProperty() {\n      return getter(this, \"group-y-property\", \"y\");\n    }\n\n    set groupYProperty(value) {\n      this.setAttribute(\"group-y-property\", value);\n    }\n\n    get groupWidthProperty() {\n      return getter(this, \"group-width-property\", \"width\");\n    }\n\n    set groupWidthProperty(value) {\n      this.setAttribute(\"group-width-property\", value);\n    }\n\n    get groupHeightProperty() {\n      return getter(this, \"group-height-property\", \"height\");\n    }\n\n    set groupHeightProperty(value) {\n      this.setAttribute(\"group-height-property\", value);\n    }\n\n    get groupFillColorProperty() {\n      return getter(this, \"group-fill-color-property\", \"fillColor\");\n    }\n\n    set groupFillColorProperty(value) {\n      this.setAttribute(\"group-fill-color-property\", value);\n    }\n\n    get groupFillOpacityProperty() {\n      return getter(this, \"group-fill-opacity-property\", \"fillOpacity\");\n    }\n\n    set groupFillOpacityProperty(value) {\n      this.setAttribute(\"group-fill-opacity-property\", value);\n    }\n\n    get groupStrokeColorProperty() {\n      return getter(this, \"group-stroke-color-property\", \"strokeColor\");\n    }\n\n    set groupStrokeColorProperty(value) {\n      this.setAttribute(\"group-stroke-color-property\", value);\n    }\n\n    get groupStrokeOpacityProperty() {\n      return getter(this, \"group-stroke-opacity-property\", \"strokeOpacity\");\n    }\n\n    set groupStrokeOpacityProperty(value) {\n      this.setAttribute(\"group-stroke-opacity-property\", value);\n    }\n\n    get groupStrokeWidthProperty() {\n      return getter(this, \"group-stroke-width-property\", \"strokeWidth\");\n    }\n\n    set groupStrokeWidthProperty(value) {\n      this.setAttribute(\"group-stroke-width-property\", value);\n    }\n\n    get groupTypeProperty() {\n      return getter(this, \"group-type-property\", \"type\");\n    }\n\n    set groupTypeProperty(value) {\n      this.setAttribute(\"group-type-property\", value);\n    }\n\n    get groupVisibilityProperty() {\n      return getter(this, \"group-visibility-property\", \"visibility\");\n    }\n\n    set groupVisibilityProperty(value) {\n      this.setAttribute(\"group-visibility-property\", value);\n    }\n\n    get groupLabelProperty() {\n      return getter(this, \"group-label-property\", \"label\");\n    }\n\n    set groupLabelProperty(value) {\n      this.setAttribute(\"group-label-property\", value);\n    }\n\n    get groupLabelDxProperty() {\n      return getter(this, \"group-label-dx-property\", \"labelDx\");\n    }\n\n    set groupLabelDxProperty(value) {\n      this.setAttribute(\"group-label-dx-property\", value);\n    }\n\n    get groupLabelDyProperty() {\n      return getter(this, \"group-label-dy-property\", \"labelDy\");\n    }\n\n    set groupLabelDyProperty(value) {\n      this.setAttribute(\"group-label-dy-property\", value);\n    }\n\n    get groupLabelDxBaseProperty() {\n      return getter(this, \"group-label-dx-base-property\", \"labelDxBase\");\n    }\n\n    set groupLabelDxBaseProperty(value) {\n      this.setAttribute(\"group-label-dx-base-property\", value);\n    }\n\n    get groupLabelDyBaseProperty() {\n      return getter(this, \"group-label-dy-base-property\", \"labelDyBase\");\n    }\n\n    set groupLabelDyBaseProperty(value) {\n      this.setAttribute(\"group-label-dy-base-property\", value);\n    }\n\n    get groupLabelFillColorProperty() {\n      return getter(this, \"group-label-fill-color-property\", \"labelFillColor\");\n    }\n\n    set groupLabelFillColorProperty(value) {\n      this.setAttribute(\"group-label-fill-color-property\", value);\n    }\n\n    get groupLabelFillOpacityProperty() {\n      return getter(\n        this,\n        \"group-label-fill-opacity-property\",\n        \"labelFillOpacity\"\n      );\n    }\n\n    set groupLabelFillOpacityProperty(value) {\n      this.setAttribute(\"group-label-fill-opacity-property\", value);\n    }\n\n    get groupLabelStrokeColorProperty() {\n      return getter(\n        this,\n        \"group-label-stroke-color-property\",\n        \"labelStrokeColor\"\n      );\n    }\n\n    set groupLabelStrokeColorProperty(value) {\n      this.setAttribute(\"group-label-stroke-color-property\", value);\n    }\n\n    get groupLabelStrokeOpacityProperty() {\n      return getter(\n        this,\n        \"group-label-stroke-opacity-property\",\n        \"labelStrokeOpacity\"\n      );\n    }\n\n    set groupLabelStrokeOpacityProperty(value) {\n      this.setAttribute(\"group-label-stroke-opacity-property\", value);\n    }\n\n    get groupLabelStrokeWidthProperty() {\n      return getter(\n        this,\n        \"group-label-stroke-width-property\",\n        \"labelStrokeWidth\"\n      );\n    }\n\n    set groupLabelStrokeWidthProperty(value) {\n      this.setAttribute(\"group-label-stroke-width-property\", value);\n    }\n\n    get groupLabelFontSizeProperty() {\n      return getter(this, \"group-label-font-size-property\", \"labelFontSize\");\n    }\n\n    set groupLabelFontSizeProperty(value) {\n      this.setAttribute(\"group-label-font-size-property\", value);\n    }\n\n    get groupLabelFontFamilyProperty() {\n      return getter(\n        this,\n        \"group-label-font-family-property\",\n        \"labelFontFamily\"\n      );\n    }\n\n    set groupLabelFontFamilyProperty(value) {\n      this.setAttribute(\"group-label-font-family-property\", value);\n    }\n\n    get groupLabelTextAlignProperty() {\n      return getter(this, \"group-label-text-align-property\", \"labelTextAlign\");\n    }\n\n    set groupLabelTextAlignProperty(value) {\n      this.setAttribute(\"group-label-text-align-property\", value);\n    }\n\n    get nodeIdProperty() {\n      return getter(this, \"node-id-property\", \"$index\");\n    }\n\n    set nodeIdProperty(value) {\n      this.setAttribute(\"node-id-property\", value);\n    }\n\n    get nodeXProperty() {\n      return getter(this, \"node-x-property\", \"x\");\n    }\n\n    set nodeXProperty(value) {\n      this.setAttribute(\"node-x-property\", value);\n    }\n\n    get nodeYProperty() {\n      return getter(this, \"node-y-property\", \"y\");\n    }\n\n    set nodeYProperty(value) {\n      this.setAttribute(\"node-y-property\", value);\n    }\n\n    get nodeWidthProperty() {\n      return getter(this, \"node-width-property\", \"width\");\n    }\n\n    set nodeWidthProperty(value) {\n      this.setAttribute(\"node-width-property\", value);\n    }\n\n    get nodeHeightProperty() {\n      return getter(this, \"node-height-property\", \"height\");\n    }\n\n    set nodeHeightProperty(value) {\n      this.setAttribute(\"node-height-property\", value);\n    }\n\n    get nodeFillColorProperty() {\n      return getter(this, \"node-fill-color-property\", \"fillColor\");\n    }\n\n    set nodeFillColorProperty(value) {\n      this.setAttribute(\"node-fill-color-property\", value);\n    }\n\n    get nodeFillOpacityProperty() {\n      return getter(this, \"node-fill-opacity-property\", \"fillOpacity\");\n    }\n\n    set nodeFillOpacityProperty(value) {\n      this.setAttribute(\"node-fill-opacity-property\", value);\n    }\n\n    get nodeStrokeColorProperty() {\n      return getter(this, \"node-stroke-color-property\", \"strokeColor\");\n    }\n\n    set nodeStrokeColorProperty(value) {\n      this.setAttribute(\"node-stroke-color-property\", value);\n    }\n\n    get nodeStrokeOpacityProperty() {\n      return getter(this, \"node-stroke-opacity-property\", \"strokeOpacity\");\n    }\n\n    set nodeStrokeOpacityProperty(value) {\n      this.setAttribute(\"node-stroke-opacity-property\", value);\n    }\n\n    get nodeStrokeWidthProperty() {\n      return getter(this, \"node-stroke-width-property\", \"strokeWidth\");\n    }\n\n    set nodeStrokeWidthProperty(value) {\n      this.setAttribute(\"node-stroke-width-property\", value);\n    }\n\n    get nodeTypeProperty() {\n      return getter(this, \"node-type-property\", \"type\");\n    }\n\n    set nodeTypeProperty(value) {\n      this.setAttribute(\"node-type-property\", value);\n    }\n\n    get nodeVisibilityProperty() {\n      return getter(this, \"node-visibility-property\", \"visibility\");\n    }\n\n    set nodeVisibilityProperty(value) {\n      this.setAttribute(\"node-visibility-property\", value);\n    }\n\n    get nodeLabelProperty() {\n      return getter(this, \"node-label-property\", \"label\");\n    }\n\n    set nodeLabelProperty(value) {\n      this.setAttribute(\"node-label-property\", value);\n    }\n\n    get nodeLabelDxProperty() {\n      return getter(this, \"node-label-dx-property\", \"labelDx\");\n    }\n\n    set nodeLabelDxProperty(value) {\n      this.setAttribute(\"node-label-dx-property\", value);\n    }\n\n    get nodeLabelDyProperty() {\n      return getter(this, \"node-label-dy-property\", \"labelDy\");\n    }\n\n    set nodeLabelDyProperty(value) {\n      this.setAttribute(\"node-label-dy-property\", value);\n    }\n\n    get nodeLabelDxBaseProperty() {\n      return getter(this, \"node-label-dx-base-property\", \"labelDxBase\");\n    }\n\n    set nodeLabelDxBaseProperty(value) {\n      this.setAttribute(\"node-label-dx-base-property\", value);\n    }\n\n    get nodeLabelDyBaseProperty() {\n      return getter(this, \"node-label-dy-base-property\", \"labelDyBase\");\n    }\n\n    set nodeLabelDyBaseProperty(value) {\n      this.setAttribute(\"node-label-dy-base-property\", value);\n    }\n\n    get nodeLabelFillColorProperty() {\n      return getter(this, \"node-label-fill-color-property\", \"labelFillColor\");\n    }\n\n    set nodeLabelFillColorProperty(value) {\n      this.setAttribute(\"node-label-fill-color-property\", value);\n    }\n\n    get nodeLabelFillOpacityProperty() {\n      return getter(\n        this,\n        \"node-label-fill-opacity-property\",\n        \"labelFillOpacity\"\n      );\n    }\n\n    set nodeLabelFillOpacityProperty(value) {\n      this.setAttribute(\"node-label-fill-opacity-property\", value);\n    }\n\n    get nodeLabelStrokeColorProperty() {\n      return getter(\n        this,\n        \"node-label-stroke-color-property\",\n        \"labelStrokeColor\"\n      );\n    }\n\n    set nodeLabelStrokeColorProperty(value) {\n      this.setAttribute(\"node-label-stroke-color-property\", value);\n    }\n\n    get nodeLabelStrokeOpacityProperty() {\n      return getter(\n        this,\n        \"node-label-stroke-opacity-property\",\n        \"labelStrokeOpacity\"\n      );\n    }\n\n    set nodeLabelStrokeOpacityProperty(value) {\n      this.setAttribute(\"node-label-stroke-opacity-property\", value);\n    }\n\n    get nodeLabelStrokeWidthProperty() {\n      return getter(\n        this,\n        \"node-label-stroke-width-property\",\n        \"labelStrokeWidth\"\n      );\n    }\n\n    set nodeLabelStrokeWidthProperty(value) {\n      this.setAttribute(\"node-label-stroke-width-property\", value);\n    }\n\n    get nodeLabelFontSizeProperty() {\n      return getter(this, \"node-label-font-size-property\", \"labelFontSize\");\n    }\n\n    set nodeLabelFontSizeProperty(value) {\n      this.setAttribute(\"node-label-font-size-property\", value);\n    }\n\n    get nodeLabelFontFamilyProperty() {\n      return getter(this, \"node-label-font-family-property\", \"labelFontFamily\");\n    }\n\n    set nodeLabelFontFamilyProperty(value) {\n      this.setAttribute(\"node-label-font-family-property\", value);\n    }\n\n    get nodeLabelTextAlignProperty() {\n      return getter(this, \"node-label-text-align-property\", \"labelTextAlign\");\n    }\n\n    set nodeLabelTextAlignProperty(value) {\n      this.setAttribute(\"node-label-text-align-property\", value);\n    }\n\n    get linkSourceProperty() {\n      return getter(this, \"link-source-property\", \"source\");\n    }\n\n    set linkSourceProperty(value) {\n      this.setAttribute(\"link-source-property\", value);\n    }\n\n    get linkTargetProperty() {\n      return getter(this, \"link-target-property\", \"target\");\n    }\n\n    set linkTargetProperty(value) {\n      this.setAttribute(\"link-target-property\", value);\n    }\n\n    get linkBendsProperty() {\n      return getter(this, \"link-bends-property\", \"bends\");\n    }\n\n    set linkBendsProperty(value) {\n      this.setAttribute(\"link-bends-property\", value);\n    }\n\n    get linkStrokeColorProperty() {\n      return getter(this, \"link-stroke-color-property\", \"strokeColor\");\n    }\n\n    set linkStrokeColorProperty(value) {\n      this.setAttribute(\"link-stroke-color-property\", value);\n    }\n\n    get linkStrokeOpacityProperty() {\n      return getter(this, \"link-stroke-opacity-property\", \"strokeOpacity\");\n    }\n\n    set linkStrokeOpacityProperty(value) {\n      this.setAttribute(\"link-stroke-opacity-property\", value);\n    }\n\n    get linkStrokeWidthProperty() {\n      return getter(this, \"link-stroke-width-property\", \"strokeWidth\");\n    }\n\n    set linkStrokeWidthProperty(value) {\n      this.setAttribute(\"link-stroke-width-property\", value);\n    }\n\n    get linkTypeProperty() {\n      return getter(this, \"link-type-property\", \"type\");\n    }\n\n    set linkTypeProperty(value) {\n      this.setAttribute(\"link-type-property\", value);\n    }\n\n    get linkVisibilityProperty() {\n      return getter(this, \"link-visibility-property\", \"visibility\");\n    }\n\n    set linkVisibilityProperty(value) {\n      this.setAttribute(\"link-visibility-property\", value);\n    }\n\n    get linkSourceMarkerShapeProperty() {\n      return getter(\n        this,\n        \"link-source-marker-shape-property\",\n        \"sourceMarkerShape\"\n      );\n    }\n\n    set linkSourceMarkerShapeProperty(value) {\n      this.setAttribute(\"link-source-marker-shape-property\", value);\n    }\n\n    get linkSourceMarkerSizeProperty() {\n      return getter(\n        this,\n        \"link-source-marker-size-property\",\n        \"sourceMarkerSize\"\n      );\n    }\n\n    set linkSourceMarkerSizeProperty(value) {\n      this.setAttribute(\"link-source-marker-size-property\", value);\n    }\n\n    get linkTargetMarkerShapeProperty() {\n      return getter(\n        this,\n        \"link-target-marker-shape-property\",\n        \"targetMarkerShape\"\n      );\n    }\n\n    set linkTargetMarkerShapeProperty(value) {\n      this.setAttribute(\"link-target-marker-shape-property\", value);\n    }\n\n    get linkTargetMarkerSizeProperty() {\n      return getter(\n        this,\n        \"link-target-marker-size-property\",\n        \"targetMarkerSize\"\n      );\n    }\n\n    set linkTargetMarkerSizeProperty(value) {\n      this.setAttribute(\"link-target-marker-size-property\", value);\n    }\n\n    get linkLabelProperty() {\n      return getter(this, \"link-label-property\", \"label\");\n    }\n\n    set linkLabelProperty(value) {\n      this.setAttribute(\"link-label-property\", value);\n    }\n\n    get linkLabelDxProperty() {\n      return getter(this, \"link-label-dx-property\", \"labelDx\");\n    }\n\n    set linkLabelDxProperty(value) {\n      this.setAttribute(\"link-label-dx-property\", value);\n    }\n\n    get linkLabelDyProperty() {\n      return getter(this, \"link-label-dy-property\", \"labelDy\");\n    }\n\n    set linkLabelDyProperty(value) {\n      this.setAttribute(\"link-label-dy-property\", value);\n    }\n\n    get linkLabelDxBaseProperty() {\n      return getter(this, \"link-label-dx-base-property\", \"labelDxBase\");\n    }\n\n    set linkLabelDxBaseProperty(value) {\n      this.setAttribute(\"link-label-dx-base-property\", value);\n    }\n\n    get linkLabelDyBaseProperty() {\n      return getter(this, \"link-label-dy-base-property\", \"labelDyBase\");\n    }\n\n    set linkLabelDyBaseProperty(value) {\n      this.setAttribute(\"link-label-dy-base-property\", value);\n    }\n\n    get linkLabelFillColorProperty() {\n      return getter(this, \"link-label-fill-color-property\", \"labelFillColor\");\n    }\n\n    set linkLabelFillColorProperty(value) {\n      this.setAttribute(\"link-label-fill-color-property\", value);\n    }\n\n    get linkLabelFillOpacityProperty() {\n      return getter(\n        this,\n        \"link-label-fill-opacity-property\",\n        \"labelFillOpacity\"\n      );\n    }\n\n    set linkLabelFillOpacityProperty(value) {\n      this.setAttribute(\"link-label-fill-opacity-property\", value);\n    }\n\n    get linkLabelStrokeColorProperty() {\n      return getter(\n        this,\n        \"link-label-stroke-color-property\",\n        \"labelStrokeColor\"\n      );\n    }\n\n    set linkLabelStrokeColorProperty(value) {\n      this.setAttribute(\"link-label-stroke-color-property\", value);\n    }\n\n    get linkLabelStrokeOpacityProperty() {\n      return getter(\n        this,\n        \"link-label-stroke-opacity-property\",\n        \"labelStrokeOpacity\"\n      );\n    }\n\n    set linkLabelStrokeOpacityProperty(value) {\n      this.setAttribute(\"link-label-stroke-opacity-property\", value);\n    }\n\n    get linkLabelStrokeWidthProperty() {\n      return getter(\n        this,\n        \"link-label-stroke-width-property\",\n        \"labelStrokeWidth\"\n      );\n    }\n\n    set linkLabelStrokeWidthProperty(value) {\n      this.setAttribute(\"link-label-stroke-width-property\", value);\n    }\n\n    get linkLabelFontSizeProperty() {\n      return getter(this, \"link-label-font-size-property\", \"labelFontSize\");\n    }\n\n    set linkLabelFontSizeProperty(value) {\n      this.setAttribute(\"link-label-font-size-property\", value);\n    }\n\n    get linkLabelFontFamilyProperty() {\n      return getter(this, \"link-label-font-family-property\", \"labelFontFamily\");\n    }\n\n    set linkLabelFontFamilyProperty(value) {\n      this.setAttribute(\"link-label-font-family-property\", value);\n    }\n\n    get linkLabelTextAlignProperty() {\n      return getter(this, \"link-label-text-align-property\", \"labelTextAlign\");\n    }\n\n    set linkLabelTextAlignProperty(value) {\n      this.setAttribute(\"link-label-text-align-property\", value);\n    }\n\n    get defaultGroupX() {\n      return getter(this, \"default-group-x\", 0);\n    }\n\n    set defaultGroupX(value) {\n      this.setAttribute(\"default-group-x\", value);\n    }\n\n    get defaultGroupY() {\n      return getter(this, \"default-group-y\", 0);\n    }\n\n    set defaultGroupY(value) {\n      this.setAttribute(\"default-group-y\", value);\n    }\n\n    get defaultGroupWidth() {\n      return getter(this, \"default-group-width\", 10);\n    }\n\n    set defaultGroupWidth(value) {\n      this.setAttribute(\"default-group-width\", value);\n    }\n\n    get defaultGroupHeight() {\n      return getter(this, \"default-group-height\", 10);\n    }\n\n    set defaultGroupHeight(value) {\n      this.setAttribute(\"default-group-height\", value);\n    }\n\n    get defaultGroupFillColor() {\n      return getter(this, \"default-group-fill-color\", \"#fff\");\n    }\n\n    set defaultGroupFillColor(value) {\n      this.setAttribute(\"default-group-fill-color\", value);\n    }\n\n    get defaultGroupFillOpacity() {\n      return getter(this, \"default-group-fill-opacity\", 1);\n    }\n\n    set defaultGroupFillOpacity(value) {\n      this.setAttribute(\"default-group-fill-opacity\", value);\n    }\n\n    get defaultGroupStrokeColor() {\n      return getter(this, \"default-group-stroke-color\", \"#000\");\n    }\n\n    set defaultGroupStrokeColor(value) {\n      this.setAttribute(\"default-group-stroke-color\", value);\n    }\n\n    get defaultGroupStrokeOpacity() {\n      return getter(this, \"default-group-stroke-opacity\", 1);\n    }\n\n    set defaultGroupStrokeOpacity(value) {\n      this.setAttribute(\"default-group-stroke-opacity\", value);\n    }\n\n    get defaultGroupStrokeWidth() {\n      return getter(this, \"default-group-stroke-width\", 1);\n    }\n\n    set defaultGroupStrokeWidth(value) {\n      this.setAttribute(\"default-group-stroke-width\", value);\n    }\n\n    get defaultGroupType() {\n      return getter(this, \"default-group-type\", \"rect\");\n    }\n\n    set defaultGroupType(value) {\n      this.setAttribute(\"default-group-type\", value);\n    }\n\n    get defaultGroupVisibility() {\n      return getter(this, \"default-group-visibility\", true);\n    }\n\n    set defaultGroupVisibility(value) {\n      this.setAttribute(\"default-group-visibility\", value);\n    }\n\n    get defaultGroupLabel() {\n      return getter(this, \"default-group-label\", \"\");\n    }\n\n    set defaultGroupLabel(value) {\n      this.setAttribute(\"default-group-label\", value);\n    }\n\n    get defaultGroupLabelDx() {\n      return getter(this, \"default-group-label-dx\", 0);\n    }\n\n    set defaultGroupLabelDx(value) {\n      this.setAttribute(\"default-group-label-dx\", value);\n    }\n\n    get defaultGroupLabelDy() {\n      return getter(this, \"default-group-label-dy\", 0);\n    }\n\n    set defaultGroupLabelDy(value) {\n      this.setAttribute(\"default-group-label-dy\", value);\n    }\n\n    get defaultGroupLabelDxBase() {\n      return getter(this, \"default-group-label-dx-base\", \"center\");\n    }\n\n    set defaultGroupLabelDxBase(value) {\n      this.setAttribute(\"default-group-label-dx-base\", value);\n    }\n\n    get defaultGroupLabelDyBase() {\n      return getter(this, \"default-group-label-dy-base\", \"middle\");\n    }\n\n    set defaultGroupLabelDyBase(value) {\n      this.setAttribute(\"default-group-label-dy-base\", value);\n    }\n\n    get defaultGroupLabelFillColor() {\n      return getter(this, \"default-group-label-fill-color\", \"#000\");\n    }\n\n    set defaultGroupLabelFillColor(value) {\n      this.setAttribute(\"default-group-label-fill-color\", value);\n    }\n\n    get defaultGroupLabelFillOpacity() {\n      return getter(this, \"default-group-label-fill-opacity\", 1);\n    }\n\n    set defaultGroupLabelFillOpacity(value) {\n      this.setAttribute(\"default-group-label-fill-opacity\", value);\n    }\n\n    get defaultGroupLabelStrokeColor() {\n      return getter(this, \"default-group-label-stroke-color\", \"#fff\");\n    }\n\n    set defaultGroupLabelStrokeColor(value) {\n      this.setAttribute(\"default-group-label-stroke-color\", value);\n    }\n\n    get defaultGroupLabelStrokeOpacity() {\n      return getter(this, \"default-group-label-stroke-opacity\", 1);\n    }\n\n    set defaultGroupLabelStrokeOpacity(value) {\n      this.setAttribute(\"default-group-label-stroke-opacity\", value);\n    }\n\n    get defaultGroupLabelStrokeWidth() {\n      return getter(this, \"default-group-label-stroke-width\", 0);\n    }\n\n    set defaultGroupLabelStrokeWidth(value) {\n      this.setAttribute(\"default-group-label-stroke-width\", value);\n    }\n\n    get defaultGroupLabelFontSize() {\n      return getter(this, \"default-group-label-font-size\", 10);\n    }\n\n    set defaultGroupLabelFontSize(value) {\n      this.setAttribute(\"default-group-label-font-size\", value);\n    }\n\n    get defaultGroupLabelFontFamily() {\n      return getter(this, \"default-group-label-font-family\", \"serif\");\n    }\n\n    set defaultGroupLabelFontFamily(value) {\n      this.setAttribute(\"default-group-label-font-family\", value);\n    }\n\n    get defaultGroupLabelTextAlign() {\n      return getter(this, \"default-group-label-text-align\", \"center\");\n    }\n\n    set defaultGroupLabelTextAlign(value) {\n      this.setAttribute(\"default-group-label-text-align\", value);\n    }\n\n    get defaultNodeX() {\n      return getter(this, \"default-node-x\", 0);\n    }\n\n    set defaultNodeX(value) {\n      this.setAttribute(\"default-node-x\", value);\n    }\n\n    get defaultNodeY() {\n      return getter(this, \"default-node-y\", 0);\n    }\n\n    set defaultNodeY(value) {\n      this.setAttribute(\"default-node-y\", value);\n    }\n\n    get defaultNodeWidth() {\n      return getter(this, \"default-node-width\", 10);\n    }\n\n    set defaultNodeWidth(value) {\n      this.setAttribute(\"default-node-width\", value);\n    }\n\n    get defaultNodeHeight() {\n      return getter(this, \"default-node-height\", 10);\n    }\n\n    set defaultNodeHeight(value) {\n      this.setAttribute(\"default-node-height\", value);\n    }\n\n    get defaultNodeFillColor() {\n      return getter(this, \"default-node-fill-color\", \"#fff\");\n    }\n\n    set defaultNodeFillColor(value) {\n      this.setAttribute(\"default-node-fill-color\", value);\n    }\n\n    get defaultNodeFillOpacity() {\n      return getter(this, \"default-node-fill-opacity\", 1);\n    }\n\n    set defaultNodeFillOpacity(value) {\n      this.setAttribute(\"default-node-fill-opacity\", value);\n    }\n\n    get defaultNodeStrokeColor() {\n      return getter(this, \"default-node-stroke-color\", \"#000\");\n    }\n\n    set defaultNodeStrokeColor(value) {\n      this.setAttribute(\"default-node-stroke-color\", value);\n    }\n\n    get defaultNodeStrokeOpacity() {\n      return getter(this, \"default-node-stroke-opacity\", 1);\n    }\n\n    set defaultNodeStrokeOpacity(value) {\n      this.setAttribute(\"default-node-stroke-opacity\", value);\n    }\n\n    get defaultNodeStrokeWidth() {\n      return getter(this, \"default-node-stroke-width\", 1);\n    }\n\n    set defaultNodeStrokeWidth(value) {\n      this.setAttribute(\"default-node-stroke-width\", value);\n    }\n\n    get defaultNodeType() {\n      return getter(this, \"default-node-type\", \"circle\");\n    }\n\n    set defaultNodeType(value) {\n      this.setAttribute(\"default-node-type\", value);\n    }\n\n    get defaultNodeVisibility() {\n      return getter(this, \"default-node-visibility\", true);\n    }\n\n    set defaultNodeVisibility(value) {\n      this.setAttribute(\"default-node-visibility\", value);\n    }\n\n    get defaultNodeLabel() {\n      return getter(this, \"default-node-label\", \"\");\n    }\n\n    set defaultNodeLabel(value) {\n      this.setAttribute(\"default-node-label\", value);\n    }\n\n    get defaultNodeLabelDx() {\n      return getter(this, \"default-node-label-dx\", 0);\n    }\n\n    set defaultNodeLabelDx(value) {\n      this.setAttribute(\"default-node-label-dx\", value);\n    }\n\n    get defaultNodeLabelDy() {\n      return getter(this, \"default-node-label-dy\", 0);\n    }\n\n    set defaultNodeLabelDy(value) {\n      this.setAttribute(\"default-node-label-dy\", value);\n    }\n\n    get defaultNodeLabelDxBase() {\n      return getter(this, \"default-node-label-dx-base\", \"center\");\n    }\n\n    set defaultNodeLabelDxBase(value) {\n      this.setAttribute(\"default-node-label-dx-base\", value);\n    }\n\n    get defaultNodeLabelDyBase() {\n      return getter(this, \"default-node-label-dy-base\", \"middle\");\n    }\n\n    set defaultNodeLabelDyBase(value) {\n      this.setAttribute(\"default-node-label-dy-base\", value);\n    }\n\n    get defaultNodeLabelFillColor() {\n      return getter(this, \"default-node-label-fill-color\", \"#000\");\n    }\n\n    set defaultNodeLabelFillColor(value) {\n      this.setAttribute(\"default-node-label-fill-color\", value);\n    }\n\n    get defaultNodeLabelFillOpacity() {\n      return getter(this, \"default-node-label-fill-opacity\", 1);\n    }\n\n    set defaultNodeLabelFillOpacity(value) {\n      this.setAttribute(\"default-node-label-fill-opacity\", value);\n    }\n\n    get defaultNodeLabelStrokeColor() {\n      return getter(this, \"default-node-label-stroke-color\", \"#fff\");\n    }\n\n    set defaultNodeLabelStrokeColor(value) {\n      this.setAttribute(\"default-node-label-stroke-color\", value);\n    }\n\n    get defaultNodeLabelStrokeOpacity() {\n      return getter(this, \"default-node-label-stroke-opacity\", 1);\n    }\n\n    set defaultNodeLabelStrokeOpacity(value) {\n      this.setAttribute(\"default-node-label-stroke-opacity\", value);\n    }\n\n    get defaultNodeLabelStrokeWidth() {\n      return getter(this, \"default-node-label-stroke-width\", 0);\n    }\n\n    set defaultNodeLabelStrokeWidth(value) {\n      this.setAttribute(\"default-node-label-stroke-width\", value);\n    }\n\n    get defaultNodeLabelFontSize() {\n      return getter(this, \"default-node-label-font-size\", 10);\n    }\n\n    set defaultNodeLabelFontSize(value) {\n      this.setAttribute(\"default-node-label-font-size\", value);\n    }\n\n    get defaultNodeLabelFontFamily() {\n      return getter(this, \"default-node-label-font-family\", \"serif\");\n    }\n\n    set defaultNodeLabelFontFamily(value) {\n      this.setAttribute(\"default-node-label-font-family\", value);\n    }\n\n    get defaultNodeLabelTextAlign() {\n      return getter(this, \"default-node-label-text-align\", \"center\");\n    }\n\n    set defaultNodeLabelTextAlign(value) {\n      this.setAttribute(\"default-node-label-text-align\", value);\n    }\n\n    get defaultLinkStrokeColor() {\n      return getter(this, \"default-link-stroke-color\", \"#000\");\n    }\n\n    set defaultLinkStrokeColor(value) {\n      this.setAttribute(\"default-link-stroke-color\", value);\n    }\n\n    get defaultLinkStrokeOpacity() {\n      return getter(this, \"default-link-stroke-opacity\", 1);\n    }\n\n    set defaultLinkStrokeOpacity(value) {\n      this.setAttribute(\"default-link-stroke-opacity\", value);\n    }\n\n    get defaultLinkStrokeWidth() {\n      return getter(this, \"default-link-stroke-width\", 1);\n    }\n\n    set defaultLinkStrokeWidth(value) {\n      this.setAttribute(\"default-link-stroke-width\", value);\n    }\n\n    get defaultLinkType() {\n      return getter(this, \"default-link-type\", \"line\");\n    }\n\n    set defaultLinkType(value) {\n      this.setAttribute(\"default-link-type\", value);\n    }\n\n    get defaultLinkVisibility() {\n      return getter(this, \"default-link-visibility\", true);\n    }\n\n    set defaultLinkVisibility(value) {\n      this.setAttribute(\"default-link-visibility\", value);\n    }\n\n    get defaultLinkSourceMarkerShape() {\n      return getter(this, \"default-link-source-marker-shape\", \"none\");\n    }\n\n    set defaultLinkSourceMarkerShape(value) {\n      this.setAttribute(\"default-link-source-marker-shape\", value);\n    }\n\n    get defaultLinkSourceMarkerSize() {\n      return getter(this, \"default-link-source-marker-size\", 5);\n    }\n\n    set defaultLinkSourceMarkerSize(value) {\n      this.setAttribute(\"default-link-source-marker-size\", value);\n    }\n\n    get defaultLinkTargetMarkerShape() {\n      return getter(this, \"default-link-target-marker-shape\", \"none\");\n    }\n\n    set defaultLinkTargetMarkerShape(value) {\n      this.setAttribute(\"default-link-target-marker-shape\", value);\n    }\n\n    get defaultLinkTargetMarkerSize() {\n      return getter(this, \"default-link-target-marker-size\", 5);\n    }\n\n    set defaultLinkTargetMarkerSize(value) {\n      this.setAttribute(\"default-link-target-marker-size\", value);\n    }\n\n    get defaultLinkLabel() {\n      return getter(this, \"default-link-label\", \"\");\n    }\n\n    set defaultLinkLabel(value) {\n      this.setAttribute(\"default-link-label\", value);\n    }\n\n    get defaultLinkLabelDx() {\n      return getter(this, \"default-link-label-dx\", 0);\n    }\n\n    set defaultLinkLabelDx(value) {\n      this.setAttribute(\"default-link-label-dx\", value);\n    }\n\n    get defaultLinkLabelDy() {\n      return getter(this, \"default-link-label-dy\", 0);\n    }\n\n    set defaultLinkLabelDy(value) {\n      this.setAttribute(\"default-link-label-dy\", value);\n    }\n\n    get defaultLinkLabelDxBase() {\n      return getter(this, \"default-link-label-dx-base\", \"center\");\n    }\n\n    set defaultLinkLabelDxBase(value) {\n      this.setAttribute(\"default-link-label-dx-base\", value);\n    }\n\n    get defaultLinkLabelDyBase() {\n      return getter(this, \"default-link-label-dy-base\", \"middle\");\n    }\n\n    set defaultLinkLabelDyBase(value) {\n      this.setAttribute(\"default-link-label-dy-base\", value);\n    }\n\n    get defaultLinkLabelFillColor() {\n      return getter(this, \"default-link-label-fill-color\", \"#000\");\n    }\n\n    set defaultLinkLabelFillColor(value) {\n      this.setAttribute(\"default-link-label-fill-color\", value);\n    }\n\n    get defaultLinkLabelFillOpacity() {\n      return getter(this, \"default-link-label-fill-opacity\", 1);\n    }\n\n    set defaultLinkLabelFillOpacity(value) {\n      this.setAttribute(\"default-link-label-fill-opacity\", value);\n    }\n\n    get defaultLinkLabelStrokeColor() {\n      return getter(this, \"default-link-label-stroke-color\", \"#fff\");\n    }\n\n    set defaultLinkLabelStrokeColor(value) {\n      this.setAttribute(\"default-link-label-stroke-color\", value);\n    }\n\n    get defaultLinkLabelStrokeOpacity() {\n      return getter(this, \"default-link-label-stroke-opacity\", 1);\n    }\n\n    set defaultLinkLabelStrokeOpacity(value) {\n      this.setAttribute(\"default-link-label-stroke-opacity\", value);\n    }\n\n    get defaultLinkLabelStrokeWidth() {\n      return getter(this, \"default-link-label-stroke-width\", 0);\n    }\n\n    set defaultLinkLabelStrokeWidth(value) {\n      this.setAttribute(\"default-link-label-stroke-width\", value);\n    }\n\n    get defaultLinkLabelFontSize() {\n      return getter(this, \"default-link-label-font-size\", 10);\n    }\n\n    set defaultLinkLabelFontSize(value) {\n      this.setAttribute(\"default-link-label-font-size\", value);\n    }\n\n    get defaultLinkLabelFontFamily() {\n      return getter(this, \"default-link-label-font-family\", \"serif\");\n    }\n\n    set defaultLinkLabelFontFamily(value) {\n      this.setAttribute(\"default-link-label-font-family\", value);\n    }\n\n    get defaultLinkLabelTextAlign() {\n      return getter(this, \"default-link-label-text-align\", \"center\");\n    }\n\n    set defaultLinkLabelTextAlign(value) {\n      this.setAttribute(\"default-link-label-text-align\", value);\n    }\n\n    get data() {\n      return privates.get(this).originalData;\n    }\n  };\n});\n\n\n//# sourceURL=webpack:///../eg-renderer/src/eg-renderer-element.js?");

/***/ }),

/***/ "../eg-renderer/src/index.js":
/*!***********************************!*\
  !*** ../eg-renderer/src/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eg_renderer_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eg-renderer-element */ \"../eg-renderer/src/eg-renderer-element.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! eg-renderer-core */ \"../../crates/eg-renderer-core/dist/bundler/eg_renderer_core.js\")).then(({ Renderer }) => {\n  const EgRendererElement = Object(_eg_renderer_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Renderer);\n  window.customElements.define(\"eg-renderer\", EgRendererElement);\n}));\n\n\n//# sourceURL=webpack:///../eg-renderer/src/index.js?");

/***/ }),

/***/ "../eg-renderer/src/interpolate.js":
/*!*****************************************!*\
  !*** ../eg-renderer/src/interpolate.js ***!
  \*****************************************/
/*! exports provided: interpolateGroup, interpolateVertex, interpolateEdge, diff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateGroup\", function() { return interpolateGroup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateVertex\", function() { return interpolateVertex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateEdge\", function() { return interpolateEdge; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"diff\", function() { return diff; });\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ \"../../node_modules/d3-interpolate/src/index.js\");\n\n\nconst interpolate = (current, next, r) => {\n  return (next - current) * r + current;\n};\n\nconst interpolateGroup = (current, next, r) => {\n  return interpolateVertex(current, next, r);\n};\n\nconst interpolateVertex = (current, next, r) => {\n  const copyProperties = [\"u\", \"type\", \"label\", \"labelFontFamily\", \"d\"];\n  const interpolateProperties = [\n    \"x\",\n    \"y\",\n    \"width\",\n    \"height\",\n    \"strokeWidth\",\n    \"labelStrokeWidth\",\n    \"labelFontSize\",\n    \"alpha\",\n  ];\n  const colorInterpolateProperties = [\n    \"fillColor\",\n    \"strokeColor\",\n    \"labelFillColor\",\n    \"labelStrokeColor\",\n  ];\n  const result = {};\n  for (const p of copyProperties) {\n    result[p] = next[p];\n  }\n  for (const p of interpolateProperties) {\n    result[p] = interpolate(current[p], next[p], r);\n  }\n  for (const p of colorInterpolateProperties) {\n    result[p] = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_0__[\"interpolateRgb\"])(current[p], next[p])(r);\n  }\n  return result;\n};\n\nconst interpolateEdge = (current, next, r) => {\n  const copyProperties = [\n    \"u\",\n    \"v\",\n    \"type\",\n    \"sourceMarkerShape\",\n    \"targetMarkerShape\",\n    \"label\",\n    \"labelFontFamily\",\n    \"d\",\n  ];\n  const interpolateProperties = [\n    \"strokeWidth\",\n    \"sourceMarkerSize\",\n    \"targetMarkerSize\",\n    \"labelStrokeWidth\",\n    \"labelFontSize\",\n    \"alpha\",\n  ];\n  const colorInterpolateProperties = [\n    \"strokeColor\",\n    \"labelFillColor\",\n    \"labelStrokeColor\",\n  ];\n  const result = {};\n  for (const p of copyProperties) {\n    result[p] = next[p];\n  }\n  for (const p of interpolateProperties) {\n    result[p] = interpolate(current[p], next[p], r);\n  }\n  for (const p of colorInterpolateProperties) {\n    result[p] = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_0__[\"interpolateRgb\"])(current[p], next[p])(r);\n  }\n  result.points = current.points.map(([x, y], i) => [\n    interpolate(x, next.points[i][0], r),\n    interpolate(y, next.points[i][1], r),\n  ]);\n  return result;\n};\n\nconst diff = (current, next) => {\n  const update = {\n    groups: next.groupIds\n      .filter((g) => current.groups.has(g))\n      .map((g) => {\n        return {\n          current: current.groups.get(g),\n          next: next.groups.get(g),\n        };\n      }),\n    vertices: next.vertexIds\n      .filter((u) => current.vertices.has(u))\n      .map((u) => {\n        return {\n          current: current.vertices.get(u),\n          next: next.vertices.get(u),\n        };\n      }),\n    edges: next.edgeIds\n      .filter(([u, v]) => {\n        if (!current.edges.has(u) || !current.edges.get(u).has(v)) {\n          return false;\n        }\n        const nextEdge = next.edges.get(u).get(v);\n        const currentEdge = current.edges.get(u).get(v);\n        return (\n          nextEdge.type === currentEdge.type &&\n          nextEdge.points.length === currentEdge.points.length\n        );\n      })\n      .map(([u, v]) => {\n        return {\n          current: current.edges.get(u).get(v),\n          next: next.edges.get(u).get(v),\n        };\n      }),\n  };\n  const enter = {\n    groups: next.groupIds\n      .filter((g) => !current.groups.has(g))\n      .map((g) => next.groups.get(g)),\n    vertices: next.vertexIds\n      .filter((u) => !current.vertices.has(u))\n      .map((u) => next.vertices.get(u)),\n    edges: next.edgeIds\n      .filter(([u, v]) => {\n        if (!current.edges.has(u) || !current.edges.get(u).has(v)) {\n          return true;\n        }\n        const nextEdge = next.edges.get(u).get(v);\n        const currentEdge = current.edges.get(u).get(v);\n        return (\n          nextEdge.type !== currentEdge.type ||\n          nextEdge.points.length !== currentEdge.points.length\n        );\n      })\n      .map(([u, v]) => next.edges.get(u).get(v)),\n  };\n  const exit = {\n    groups: current.groupIds\n      .filter((g) => !next.groups.has(g))\n      .map((g) => current.groups.get(g)),\n    vertices: current.vertexIds\n      .filter((u) => !next.vertices.has(u))\n      .map((u) => current.vertices.get(u)),\n    edges: current.edgeIds\n      .filter(([u, v]) => {\n        if (!next.edges.has(u) || !next.edges.get(u).has(v)) {\n          return true;\n        }\n        const nextEdge = next.edges.get(u).get(v);\n        const currentEdge = current.edges.get(u).get(v);\n        return (\n          nextEdge.type !== currentEdge.type ||\n          nextEdge.points.length !== currentEdge.points.length\n        );\n      })\n      .map(([u, v]) => current.edges.get(u).get(v)),\n  };\n  return { update, enter, exit };\n};\n\n\n//# sourceURL=webpack:///../eg-renderer/src/interpolate.js?");

/***/ }),

/***/ "../eg-renderer/src/marker-point.js":
/*!******************************************!*\
  !*** ../eg-renderer/src/marker-point.js ***!
  \******************************************/
/*! exports provided: adjustEdge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"adjustEdge\", function() { return adjustEdge; });\nconst baseCircleToRectMarkerPosition = (\n  x0,\n  y0,\n  x1,\n  y1,\n  width,\n  height,\n  size\n) => {\n  const r = size / 2;\n  if (x0 === x1) {\n    return [0, height / 2 + r];\n  }\n  const a = Math.abs((y0 - y1) / (x0 - x1));\n  const theta = Math.atan(a);\n  if (theta < Math.atan2(height / 2, width / 2 + r)) {\n    return [width / 2 + r, Math.tan(theta) * (width / 2 + r)];\n  }\n  if (theta > Math.atan2(height / 2 + r, width / 2)) {\n    return [Math.tan(Math.PI / 2 - theta) * (height / 2 + r), height / 2 + r];\n  }\n  const b = -1;\n  const c = y0 - a * x0;\n  const px = x0 + width / 2;\n  const py = y0 + height / 2;\n  const d = a * px + b * py + c;\n  const D = Math.sqrt((a ** 2 + b ** 2) * r ** 2 - d ** 2);\n  return [\n    (-a * d - b * D) / (a ** 2 + b ** 2) + px - x0,\n    (-b * d + a * D) / (a ** 2 + b ** 2) + py - y0,\n  ];\n};\n\nconst baseTriangleToRectMarkerPosition = (\n  x0,\n  y0,\n  x1,\n  y1,\n  width,\n  height,\n  size\n) => {\n  const r = (size * 2) / 3;\n  if (x0 === x1) {\n    return [0, height / 2 + r];\n  }\n  const a = Math.abs((y0 - y1) / (x0 - x1));\n  const theta = Math.atan(a);\n  if (theta < Math.atan2(height / 2, width / 2)) {\n    return [\n      width / 2 + Math.cos(theta) * r,\n      (Math.tan(theta) * width) / 2 + Math.sin(theta) * r,\n    ];\n  }\n  return [\n    (Math.tan(Math.PI / 2 - theta) * height) / 2 +\n      Math.sin(Math.PI / 2 - theta) * r,\n    height / 2 + Math.cos(Math.PI / 2 - theta) * r,\n  ];\n};\n\nconst baseCircleToCircleMarkerPosition = (\n  x0,\n  y0,\n  x1,\n  y1,\n  width,\n  height,\n  size\n) => {\n  const r = size / 2;\n  if (x0 === x1) {\n    return [0, height / 2 + r];\n  }\n  const rx = width / 2;\n  const ry = height / 2;\n  const a = Math.abs((y0 - y1) / (x0 - x1));\n  const theta = Math.atan(a);\n  const px = (rx * ry) / Math.sqrt(a ** 2 * rx ** 2 + ry ** 2);\n  const py = a * px;\n  return [px + r * Math.cos(theta), py + r * Math.sin(theta)];\n};\n\nconst baseTriangleToCircleMarkerPosition = (\n  x0,\n  y0,\n  x1,\n  y1,\n  width,\n  height,\n  size\n) => {\n  const r = (size * 2) / 3;\n  if (x0 === x1) {\n    return [0, height / 2 + r];\n  }\n  const rx = width / 2;\n  const ry = height / 2;\n  const a = Math.abs((y0 - y1) / (x0 - x1));\n  const theta = Math.atan(a);\n  const px = (rx * ry) / Math.sqrt(a ** 2 * rx ** 2 + ry ** 2);\n  const py = a * px;\n  return [px + r * Math.cos(theta), py + r * Math.sin(theta)];\n};\n\nconst markerPosition = (x, y, x0, y0, x1, y1) => {\n  if (x0 < x1) {\n    if (y0 < y1) {\n      return [x0 + x, y0 + y];\n    } else {\n      return [x0 + x, y0 - y];\n    }\n  } else {\n    if (y0 < y1) {\n      return [x0 - x, y0 + y];\n    } else {\n      return [x0 - x, y0 - y];\n    }\n  }\n};\n\nconst baseFunction = (markerShape, nodeType, linkType) => {\n  if (linkType === \"arc\") {\n    return () => [0, 0];\n  }\n  if (markerShape === \"circle\" && nodeType === \"rect\") {\n    return baseCircleToRectMarkerPosition;\n  }\n  if (markerShape === \"triangle\" && nodeType === \"rect\") {\n    return baseTriangleToRectMarkerPosition;\n  }\n  if (markerShape === \"circle\" && nodeType === \"circle\") {\n    return baseCircleToCircleMarkerPosition;\n  }\n  if (markerShape === \"triangle\" && nodeType === \"circle\") {\n    return baseTriangleToCircleMarkerPosition;\n  }\n  return () => [0, 0];\n};\n\nconst adjustEdge = (edge, source, target) => {\n  const {\n    points,\n    sourceMarkerShape,\n    sourceMarkerSize,\n    targetMarkerShape,\n    targetMarkerSize,\n  } = edge;\n  const n = points.length;\n  const sourceBaseFunction = baseFunction(\n    sourceMarkerShape,\n    source.type,\n    edge.type\n  );\n  const [x0, y0] = sourceBaseFunction(\n    source.x,\n    source.y,\n    points[1][0],\n    points[1][1],\n    source.width,\n    source.height,\n    sourceMarkerSize\n  );\n  points[0] = markerPosition(\n    x0,\n    y0,\n    source.x,\n    source.y,\n    points[1][0],\n    points[1][1]\n  );\n  const targetBaseFunction = baseFunction(\n    targetMarkerShape,\n    target.type,\n    edge.type\n  );\n  const [x1, y1] = targetBaseFunction(\n    target.x,\n    target.y,\n    points[n - 2][0],\n    points[n - 2][1],\n    target.width,\n    target.height,\n    targetMarkerSize\n  );\n  points[n - 1] = markerPosition(\n    x1,\n    y1,\n    target.x,\n    target.y,\n    points[n - 2][0],\n    points[n - 2][1]\n  );\n};\n\n\n//# sourceURL=webpack:///../eg-renderer/src/marker-point.js?");

/***/ }),

/***/ "../eg-renderer/src/zoom.js":
/*!**********************************!*\
  !*** ../eg-renderer/src/zoom.js ***!
  \**********************************/
/*! exports provided: zoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zoom\", function() { return zoom; });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"../../node_modules/d3-selection/src/index.js\");\n/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-zoom */ \"../../node_modules/d3-zoom/src/index.js\");\n/* harmony import */ var _marker_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./marker-point */ \"../eg-renderer/src/marker-point.js\");\n\n\n\n\nconst dispatchNodeMoveStartEvent = (element, u) => {\n  const event = new window.CustomEvent(\"nodemovestart\", {\n    detail: {\n      id: u,\n    },\n  });\n  element.dispatchEvent(event);\n};\n\nconst dispatchNodeMoveEvent = (element, { u, x, y }) => {\n  const event = new window.CustomEvent(\"nodemove\", {\n    detail: {\n      id: u,\n      x,\n      y,\n    },\n  });\n  element.dispatchEvent(event);\n};\n\nconst dispatchNodeMoveEndEvent = (element, u) => {\n  const event = new window.CustomEvent(\"nodemoveend\", {\n    detail: {\n      id: u,\n    },\n  });\n  element.dispatchEvent(event);\n};\n\nconst zoom = (element, attrs) => {\n  const pos = {\n    region: null,\n    x0: 0,\n    y0: 0,\n  };\n  let restoreTransform = false;\n  const zoom = Object(d3_zoom__WEBPACK_IMPORTED_MODULE_1__[\"zoom\"])();\n  zoom\n    .on(\"start\", () => {\n      if (\n        !element.canZoom ||\n        (element.canDragNode &&\n          d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].sourceEvent &&\n          d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].sourceEvent.region)\n      ) {\n        const u = d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].sourceEvent\n          ? JSON.parse(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].sourceEvent.region).id\n          : null;\n        const { x, y, k } = d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].transform;\n        pos.region = u;\n        pos.x0 = x / k;\n        pos.y0 = y / k;\n        if (u) {\n          dispatchNodeMoveStartEvent(element, u);\n        }\n      }\n    })\n    .on(\"zoom\", () => {\n      const { x, y, k } = d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].transform;\n      if (element.canDragNode && pos.region) {\n        const u = pos.region;\n        const dx = x / k - pos.x0;\n        const dy = y / k - pos.y0;\n        const { data } = attrs;\n        const vertex = data.vertices.get(u);\n        vertex.x += dx;\n        vertex.y += dy;\n        for (const edge of vertex.outEdges) {\n          const { points } = edge;\n          points[0][0] += dx;\n          points[0][1] += dy;\n          Object(_marker_point__WEBPACK_IMPORTED_MODULE_2__[\"adjustEdge\"])(edge, vertex, data.vertices.get(edge.v));\n        }\n        for (const edge of vertex.inEdges) {\n          const { points } = edge;\n          points[points.length - 1][0] += dx;\n          points[points.length - 1][1] += dy;\n          Object(_marker_point__WEBPACK_IMPORTED_MODULE_2__[\"adjustEdge\"])(edge, data.vertices.get(edge.u), vertex);\n        }\n        pos.x0 = x / k;\n        pos.y0 = y / k;\n        dispatchNodeMoveEvent(element, vertex);\n      } else if (element.canZoom || !d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"event\"].sourceEvent) {\n        Object.assign(attrs.transform, {\n          x,\n          y,\n          k,\n        });\n        if (attrs.renderer) {\n          attrs.renderer.transform(attrs.transform);\n        }\n      }\n    })\n    .on(\"end\", function () {\n      if (!restoreTransform && (!element.canZoom || pos.region)) {\n        const u = pos.region;\n        pos.region = null;\n        restoreTransform = true;\n        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__[\"select\"])(this).call(\n          zoom.transform,\n          d3_zoom__WEBPACK_IMPORTED_MODULE_1__[\"zoomIdentity\"]\n            .translate(attrs.transform.x, attrs.transform.y)\n            .scale(attrs.transform.k)\n        );\n        restoreTransform = false;\n        if (u) {\n          dispatchNodeMoveEndEvent(element, u);\n        }\n      }\n    });\n  return zoom;\n};\n\n\n//# sourceURL=webpack:///../eg-renderer/src/zoom.js?");

/***/ }),

/***/ "./src/eg-renderer.js":
/*!****************************!*\
  !*** ./src/eg-renderer.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var eg_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eg-renderer */ \"../eg-renderer/src/index.js\");\n\n\n\n//# sourceURL=webpack:///./src/eg-renderer.js?");

/***/ })

/******/ });