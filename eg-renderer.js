(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.egRenderer = factory());
})(this, (function () { 'use strict';

    let wasm;

    const heap = new Array(32).fill(undefined);

    heap.push(undefined, null, true, false);

    function getObject(idx) { return heap[idx]; }

    let heap_next = heap.length;

    function dropObject(idx) {
        if (idx < 36) return;
        heap[idx] = heap_next;
        heap_next = idx;
    }

    function takeObject(idx) {
        const ret = getObject(idx);
        dropObject(idx);
        return ret;
    }

    let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

    cachedTextDecoder.decode();

    let cachegetUint8Memory0 = null;
    function getUint8Memory0() {
        if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory0;
    }

    function getStringFromWasm0(ptr, len) {
        return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
    }

    function addHeapObject(obj) {
        if (heap_next === heap.length) heap.push(heap.length + 1);
        const idx = heap_next;
        heap_next = heap[idx];

        heap[idx] = obj;
        return idx;
    }

    let WASM_VECTOR_LEN = 0;

    let cachedTextEncoder = new TextEncoder('utf-8');

    const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
        : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

    function passStringToWasm0(arg, malloc, realloc) {

        if (realloc === undefined) {
            const buf = cachedTextEncoder.encode(arg);
            const ptr = malloc(buf.length);
            getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
            WASM_VECTOR_LEN = buf.length;
            return ptr;
        }

        let len = arg.length;
        let ptr = malloc(len);

        const mem = getUint8Memory0();

        let offset = 0;

        for (; offset < len; offset++) {
            const code = arg.charCodeAt(offset);
            if (code > 0x7F) break;
            mem[ptr + offset] = code;
        }

        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = realloc(ptr, len, len = offset + arg.length * 3);
            const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
            const ret = encodeString(arg, view);

            offset += ret.written;
        }

        WASM_VECTOR_LEN = offset;
        return ptr;
    }

    let cachegetInt32Memory0 = null;
    function getInt32Memory0() {
        if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
            cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
        }
        return cachegetInt32Memory0;
    }

    function getArrayU8FromWasm0(ptr, len) {
        return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
    }

    function isLikeNone(x) {
        return x === undefined || x === null;
    }

    function handleError(f, args) {
        try {
            return f.apply(this, args);
        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    }

    let cachegetFloat32Memory0 = null;
    function getFloat32Memory0() {
        if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
            cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
        }
        return cachegetFloat32Memory0;
    }

    function getArrayF32FromWasm0(ptr, len) {
        return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
    }
    /**
    */
    class Renderer {

        static __wrap(ptr) {
            const obj = Object.create(Renderer.prototype);
            obj.ptr = ptr;

            return obj;
        }

        __destroy_into_raw() {
            const ptr = this.ptr;
            this.ptr = 0;

            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_renderer_free(ptr);
        }
        /**
        * @param {HTMLCanvasElement} canvas
        */
        constructor(canvas) {
            var ret = wasm.renderer_new(addHeapObject(canvas));
            return Renderer.__wrap(ret);
        }
        /**
        * @param {number} r
        */
        render(r) {
            wasm.renderer_render(this.ptr, r);
        }
        /**
        * @param {any} layout
        */
        update(layout) {
            wasm.renderer_update(this.ptr, addHeapObject(layout));
        }
        /**
        * @param {any} transform
        */
        transform(transform) {
            wasm.renderer_transform(this.ptr, addHeapObject(transform));
        }
        /**
        * @param {number} width
        * @param {number} height
        */
        resize(width, height) {
            wasm.renderer_resize(this.ptr, width, height);
        }
    }

    async function load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);

                } catch (e) {
                    if (module.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                    } else {
                        throw e;
                    }
                }
            }

            const bytes = await module.arrayBuffer();
            return await WebAssembly.instantiate(bytes, imports);

        } else {
            const instance = await WebAssembly.instantiate(module, imports);

            if (instance instanceof WebAssembly.Instance) {
                return { instance, module };

            } else {
                return instance;
            }
        }
    }

    async function init$1(input) {
        if (typeof input === 'undefined') {
            input = new URL('eg_renderer_core_bg.wasm', (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('eg-renderer.js', document.baseURI).href)));
        }
        const imports = {};
        imports.wbg = {};
        imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
            takeObject(arg0);
        };
        imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
            var ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
            var ret = getObject(arg0);
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
            var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
            const obj = getObject(arg1);
            var ret = JSON.stringify(obj === undefined ? null : obj);
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        };
        imports.wbg.__wbindgen_boolean_get = function(arg0) {
            const v = getObject(arg0);
            var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
            return ret;
        };
        imports.wbg.__wbg_instanceof_WebGl2RenderingContext_56ad96bfac3f5531 = function(arg0) {
            var ret = getObject(arg0) instanceof WebGL2RenderingContext;
            return ret;
        };
        imports.wbg.__wbg_bindVertexArray_52b8b2f5fd93d81d = function(arg0, arg1) {
            getObject(arg0).bindVertexArray(getObject(arg1));
        };
        imports.wbg.__wbg_bufferData_794d61d3c392fafd = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).bufferData(arg1 >>> 0, getArrayU8FromWasm0(arg2, arg3), arg4 >>> 0);
        };
        imports.wbg.__wbg_createVertexArray_d59135c0a43c410b = function(arg0) {
            var ret = getObject(arg0).createVertexArray();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_drawElementsInstanced_c138e56b91de9ba4 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        };
        imports.wbg.__wbg_texImage2D_153b2a8f02fceedd = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
        }, arguments) };
        imports.wbg.__wbg_uniformMatrix4fv_03d4a6800fd3537e = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        };
        imports.wbg.__wbg_vertexAttribDivisor_8d11db24ac277254 = function(arg0, arg1, arg2) {
            getObject(arg0).vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
        };
        imports.wbg.__wbg_attachShader_7faccaa7b5ac28a6 = function(arg0, arg1, arg2) {
            getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
        };
        imports.wbg.__wbg_bindBuffer_4ece833dd10cac2f = function(arg0, arg1, arg2) {
            getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
        };
        imports.wbg.__wbg_bindTexture_9d8ed0fcd83eb0a9 = function(arg0, arg1, arg2) {
            getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
        };
        imports.wbg.__wbg_blendFuncSeparate_1d03d2ee0347dd73 = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        };
        imports.wbg.__wbg_clear_4ce66c813d66e77d = function(arg0, arg1) {
            getObject(arg0).clear(arg1 >>> 0);
        };
        imports.wbg.__wbg_clearColor_71f96fd72a7646a6 = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
        };
        imports.wbg.__wbg_compileShader_dd66d66a5a6481f3 = function(arg0, arg1) {
            getObject(arg0).compileShader(getObject(arg1));
        };
        imports.wbg.__wbg_createBuffer_5c5caa16032a81b7 = function(arg0) {
            var ret = getObject(arg0).createBuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_createProgram_32d01a55e144b9fc = function(arg0) {
            var ret = getObject(arg0).createProgram();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_createShader_6e8eed55567fe1a6 = function(arg0, arg1) {
            var ret = getObject(arg0).createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_createTexture_8f31e7386e22fc37 = function(arg0) {
            var ret = getObject(arg0).createTexture();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_disable_b05e075ae54fa448 = function(arg0, arg1) {
            getObject(arg0).disable(arg1 >>> 0);
        };
        imports.wbg.__wbg_drawElements_a41bb53d39cd6297 = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        };
        imports.wbg.__wbg_enable_766e546395da5a5d = function(arg0, arg1) {
            getObject(arg0).enable(arg1 >>> 0);
        };
        imports.wbg.__wbg_enableVertexAttribArray_91da8d3cbe0c2bbd = function(arg0, arg1) {
            getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
        };
        imports.wbg.__wbg_generateMipmap_75691e7b4b9a138a = function(arg0, arg1) {
            getObject(arg0).generateMipmap(arg1 >>> 0);
        };
        imports.wbg.__wbg_getAttribLocation_5d304d390c7273f5 = function(arg0, arg1, arg2, arg3) {
            var ret = getObject(arg0).getAttribLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        };
        imports.wbg.__wbg_getProgramInfoLog_18c849a5fa54e7b1 = function(arg0, arg1, arg2) {
            var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
            var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        };
        imports.wbg.__wbg_getProgramParameter_80edd3cfbcf7cf1d = function(arg0, arg1, arg2) {
            var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_getShaderInfoLog_ba1de20c14b6fb63 = function(arg0, arg1, arg2) {
            var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
            var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        };
        imports.wbg.__wbg_getShaderParameter_264d9ab5c13ece4d = function(arg0, arg1, arg2) {
            var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_getUniformLocation_77b2d89291f84289 = function(arg0, arg1, arg2, arg3) {
            var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_linkProgram_b84796e37364e5c9 = function(arg0, arg1) {
            getObject(arg0).linkProgram(getObject(arg1));
        };
        imports.wbg.__wbg_shaderSource_18f45f93c05a8311 = function(arg0, arg1, arg2, arg3) {
            getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
        };
        imports.wbg.__wbg_texParameteri_c54aab65b2f8cf6d = function(arg0, arg1, arg2, arg3) {
            getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        };
        imports.wbg.__wbg_uniform1f_a7858af9d2384350 = function(arg0, arg1, arg2) {
            getObject(arg0).uniform1f(getObject(arg1), arg2);
        };
        imports.wbg.__wbg_uniform1i_e287345af4468e22 = function(arg0, arg1, arg2) {
            getObject(arg0).uniform1i(getObject(arg1), arg2);
        };
        imports.wbg.__wbg_uniform2f_f8d8e7662e0e0eb6 = function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
        };
        imports.wbg.__wbg_useProgram_c2fdf4a953d1128a = function(arg0, arg1) {
            getObject(arg0).useProgram(getObject(arg1));
        };
        imports.wbg.__wbg_vertexAttribPointer_76d558694fe81cd7 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        };
        imports.wbg.__wbg_viewport_da0901eee69b9909 = function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).viewport(arg1, arg2, arg3, arg4);
        };
        imports.wbg.__wbg_instanceof_Window_c4b70662a0d2c5ec = function(arg0) {
            var ret = getObject(arg0) instanceof Window;
            return ret;
        };
        imports.wbg.__wbg_document_1c64944725c0d81d = function(arg0) {
            var ret = getObject(arg0).document;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        };
        imports.wbg.__wbg_devicePixelRatio_d8c3852bb37f76bf = function(arg0) {
            var ret = getObject(arg0).devicePixelRatio;
            return ret;
        };
        imports.wbg.__wbg_createElement_86c152812a141a62 = function() { return handleError(function (arg0, arg1, arg2) {
            var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_3abbe7ec7af32cae = function(arg0) {
            var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
            return ret;
        };
        imports.wbg.__wbg_setstrokeStyle_947bd4c26c94673f = function(arg0, arg1) {
            getObject(arg0).strokeStyle = getObject(arg1);
        };
        imports.wbg.__wbg_setfillStyle_528a6a267c863ae7 = function(arg0, arg1) {
            getObject(arg0).fillStyle = getObject(arg1);
        };
        imports.wbg.__wbg_setlineWidth_3221b7818c00ed48 = function(arg0, arg1) {
            getObject(arg0).lineWidth = arg1;
        };
        imports.wbg.__wbg_setfont_884816cc1b46ae3f = function(arg0, arg1, arg2) {
            getObject(arg0).font = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_settextAlign_1891d6f4d7f9b9a3 = function(arg0, arg1, arg2) {
            getObject(arg0).textAlign = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_settextBaseline_3b90a2129ee3dead = function(arg0, arg1, arg2) {
            getObject(arg0).textBaseline = getStringFromWasm0(arg1, arg2);
        };
        imports.wbg.__wbg_fillText_25221e9cc35a1850 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments) };
        imports.wbg.__wbg_measureText_646aac3696f5cad5 = function() { return handleError(function (arg0, arg1, arg2) {
            var ret = getObject(arg0).measureText(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_strokeText_ac933a55116c976f = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).strokeText(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments) };
        imports.wbg.__wbg_instanceof_HtmlCanvasElement_25d964a0dde6717e = function(arg0) {
            var ret = getObject(arg0) instanceof HTMLCanvasElement;
            return ret;
        };
        imports.wbg.__wbg_width_555f63ab09ba7d3f = function(arg0) {
            var ret = getObject(arg0).width;
            return ret;
        };
        imports.wbg.__wbg_setwidth_c1a7061891b71f25 = function(arg0, arg1) {
            getObject(arg0).width = arg1 >>> 0;
        };
        imports.wbg.__wbg_height_7153faec70fbaf7b = function(arg0) {
            var ret = getObject(arg0).height;
            return ret;
        };
        imports.wbg.__wbg_setheight_88894b05710ff752 = function(arg0, arg1) {
            getObject(arg0).height = arg1 >>> 0;
        };
        imports.wbg.__wbg_getContext_f701d0231ae22393 = function() { return handleError(function (arg0, arg1, arg2) {
            var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_getContext_3e21e21280a332fc = function() { return handleError(function (arg0, arg1, arg2, arg3) {
            var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_width_4dd0ad3fb763f881 = function(arg0) {
            var ret = getObject(arg0).width;
            return ret;
        };
        imports.wbg.__wbg_newnoargs_be86524d73f67598 = function(arg0, arg1) {
            var ret = new Function(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_call_888d259a5fefc347 = function() { return handleError(function (arg0, arg1) {
            var ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_self_c6fbdfc2918d5e58 = function() { return handleError(function () {
            var ret = self.self;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_window_baec038b5ab35c54 = function() { return handleError(function () {
            var ret = window.window;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_globalThis_3f735a5746d41fbd = function() { return handleError(function () {
            var ret = globalThis.globalThis;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_global_1bc0b39582740e95 = function() { return handleError(function () {
            var ret = global.global;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbindgen_is_undefined = function(arg0) {
            var ret = getObject(arg0) === undefined;
            return ret;
        };
        imports.wbg.__wbindgen_throw = function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        };
        imports.wbg.__wbindgen_rethrow = function(arg0) {
            throw takeObject(arg0);
        };

        if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
            input = fetch(input);
        }



        const { instance, module } = await load(await input, imports);

        wasm = instance.exports;
        init$1.__wbindgen_wasm_module = module;

        return wasm;
    }

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function selection_selectAll(select) {
      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    var keyPrefix = "$"; // Protect against keys like “__proto__”.

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = {},
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (i = 0; i < groupLength; ++i) {
        if (node = group[i]) {
          keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
          if (keyValue in nodeByKeyValue) {
            exit[i] = node;
          } else {
            nodeByKeyValue[keyValue] = node;
          }
        }
      }

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (i = 0; i < dataLength; ++i) {
        keyValue = keyPrefix + key.call(parent, data[i], i, data);
        if (node = nodeByKeyValue[keyValue]) {
          update[i] = node;
          node.__data__ = data[i];
          nodeByKeyValue[keyValue] = null;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
          exit[i] = node;
        }
      }
    }

    function selection_data(value, key) {
      if (!value) {
        data = new Array(this.size()), j = -1;
        this.each(function(d) { data[++j] = d; });
        return data;
      }

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = value.call(parent, parent && parent.__data__, j, parents),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
      if (onupdate != null) update = onupdate(update);
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(selection) {

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending;

      function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
      }

      for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            sortgroup[i] = node;
          }
        }
        sortgroup.sort(compareNode);
      }

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      var nodes = new Array(this.size()), i = -1;
      this.each(function() { nodes[++i] = this; });
      return nodes;
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      var size = 0;
      this.each(function() { ++size; });
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

    function propertyRemove(name) {
      return function() {
        delete this[name];
      };
    }

    function propertyConstant(name, value) {
      return function() {
        this[name] = value;
      };
    }

    function propertyFunction(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

    function classArray(string) {
      return string.trim().split(/^|\s+/);
    }

    function classList(node) {
      return node.classList || new ClassList(node);
    }

    function ClassList(node) {
      this._node = node;
      this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };

    function classedAdd(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
      return function() {
        classedAdd(this, names);
      };
    }

    function classedFalse(names) {
      return function() {
        classedRemove(this, names);
      };
    }

    function classedFunction(names, value) {
      return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
      };
    }

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

    function htmlRemove() {
      this.innerHTML = "";
    }

    function htmlConstant(value) {
      return function() {
        this.innerHTML = value;
      };
    }

    function htmlFunction(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      };
    }

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    var filterEvents = {};

    var event = null;

    if (typeof document !== "undefined") {
      var element = document.documentElement;
      if (!("onmouseenter" in element)) {
        filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
      }
    }

    function filterContextListener(listener, index, group) {
      listener = contextListener(listener, index, group);
      return function(event) {
        var related = event.relatedTarget;
        if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
          listener.call(this, event);
        }
      };
    }

    function contextListener(listener, index, group) {
      return function(event1) {
        var event0 = event; // Events can be reentrant (e.g., focus).
        event = event1;
        try {
          listener.call(this, this.__data__, index, group);
        } finally {
          event = event0;
        }
      };
    }

    function parseTypenames$1(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.capture);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, capture) {
      var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
      return function(d, i, group) {
        var on = this.__on, o, listener = wrap(value, i, group);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.capture);
            this.addEventListener(o.type, o.listener = listener, o.capture = capture);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, capture);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, capture) {
      var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      if (capture == null) capture = false;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
      return this;
    }

    function customEvent(event1, listener, that, args) {
      var event0 = event;
      event1.sourceEvent = event;
      event = event1;
      try {
        return listener.apply(that, args);
      } finally {
        event = event0;
      }
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch
    };

    function d3Select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    function sourceEvent() {
      var current = event, source;
      while (source = current.sourceEvent) current = source;
      return current;
    }

    function point(node, event) {
      var svg = node.ownerSVGElement || node;

      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }

      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }

    function mouse(node) {
      var event = sourceEvent();
      if (event.changedTouches) event = event.changedTouches[0];
      return point(node, event);
    }

    function touch(node, touches, identifier) {
      if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

      for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
        if ((touch = touches[i]).identifier === identifier) {
          return point(node, touch);
        }
      }

      return null;
    }

    var noop = {value: function() {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$2(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$2(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    function noevent$1() {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function dragDisable(view) {
      var root = view.document.documentElement,
          selection = d3Select(view).on("dragstart.drag", noevent$1, true);
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", noevent$1, true);
      } else {
        root.__noselect = root.style.MozUserSelect;
        root.style.MozUserSelect = "none";
      }
    }

    function yesdrag(view, noclick) {
      var root = view.document.documentElement,
          selection = d3Select(view).on("dragstart.drag", null);
      if (noclick) {
        selection.on("click.drag", noevent$1, true);
        setTimeout(function() { selection.on("click.drag", null); }, 0);
      }
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", null);
      } else {
        root.style.MozUserSelect = root.__noselect;
        delete root.__noselect;
      }
    }

    function constant$1(x) {
      return function() {
        return x;
      };
    }

    function linear(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var d3InterpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    var degrees = 180 / Math.PI;

    var identity$1 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var cssNode,
        cssRoot,
        cssView,
        svgNode;

    function parseCss(value) {
      if (value === "none") return identity$1;
      if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
      cssNode.style.transform = value;
      value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
      cssRoot.removeChild(cssNode);
      value = value.slice(7, -1).split(",");
      return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
    }

    function parseSvg(value) {
      if (value == null) return identity$1;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var rho = Math.SQRT2,
        rho2 = 2,
        rho4 = 4,
        epsilon2 = 1e-12;

    function cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }

    function sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }

    function tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function interpolateZoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000;

      return i;
    }

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };

    function timer(callback, delay, time) {
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
          t0 = t1, t1 = t1._next;
        } else {
          t2 = t1._next, t1._next = null;
          t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
      }
      taskTail = t0;
      sleep(time);
    }

    function sleep(time) {
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(function(elapsed) {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
      });
    }

    function init(node, id) {
      var schedule = get$1(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get$1(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get$1(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = tween0 = tween;
          for (var i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1 = tween1.slice();
              tween1.splice(i, 1);
              break;
            }
          }
        }

        schedule.tween = tween1;
      };
    }

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get$1(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get$1(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? d3InterpolateRgb
          : (c = color(b)) ? (b = c, d3InterpolateRgb)
          : interpolateString)(a, b);
    }

    function attrRemove(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

    function attrInterpolate(name, i) {
      return function(t) {
        this.setAttribute(name, i.call(this, t));
      };
    }

    function attrInterpolateNS(fullname, i) {
      return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
      };
    }

    function attrTweenNS(fullname, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get$1(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get$1(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get$1(this.node(), id).ease;
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Transition(merges, this._parents, this._name, this._id);
    }

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get$1(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get$1(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      end: transition_end
    };

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          return defaultTiming.time = now(), defaultTiming;
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    function constant(x) {
      return function() {
        return x;
      };
    }

    function ZoomEvent(target, type, transform) {
      this.target = target;
      this.type = type;
      this.transform = transform;
    }

    function Transform(k, x, y) {
      this.k = k;
      this.x = x;
      this.y = y;
    }

    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };

    var identity = new Transform(1, 0, 0);

    function nopropagation() {
      event.stopImmediatePropagation();
    }

    function noevent() {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    // Ignore right-click, since that should open the context menu.
    function defaultFilter() {
      return !event.ctrlKey && !event.button;
    }

    function defaultExtent() {
      var e = this;
      if (e instanceof SVGElement) {
        e = e.ownerSVGElement || e;
        if (e.hasAttribute("viewBox")) {
          e = e.viewBox.baseVal;
          return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
        }
        return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
      }
      return [[0, 0], [e.clientWidth, e.clientHeight]];
    }

    function defaultTransform() {
      return this.__zoom || identity;
    }

    function defaultWheelDelta() {
      return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002);
    }

    function defaultTouchable() {
      return navigator.maxTouchPoints || ("ontouchstart" in this);
    }

    function defaultConstrain(transform, extent, translateExtent) {
      var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
          dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
          dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
          dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
      return transform.translate(
        dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
        dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
      );
    }

    function d3Zoom() {
      var filter = defaultFilter,
          extent = defaultExtent,
          constrain = defaultConstrain,
          wheelDelta = defaultWheelDelta,
          touchable = defaultTouchable,
          scaleExtent = [0, Infinity],
          translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
          duration = 250,
          interpolate = interpolateZoom,
          listeners = dispatch("start", "zoom", "end"),
          touchstarting,
          touchending,
          touchDelay = 500,
          wheelDelay = 150,
          clickDistance2 = 0;

      function zoom(selection) {
        selection
            .property("__zoom", defaultTransform)
            .on("wheel.zoom", wheeled)
            .on("mousedown.zoom", mousedowned)
            .on("dblclick.zoom", dblclicked)
          .filter(touchable)
            .on("touchstart.zoom", touchstarted)
            .on("touchmove.zoom", touchmoved)
            .on("touchend.zoom touchcancel.zoom", touchended)
            .style("touch-action", "none")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }

      zoom.transform = function(collection, transform, point) {
        var selection = collection.selection ? collection.selection() : collection;
        selection.property("__zoom", defaultTransform);
        if (collection !== selection) {
          schedule(collection, transform, point);
        } else {
          selection.interrupt().each(function() {
            gesture(this, arguments)
                .start()
                .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
                .end();
          });
        }
      };

      zoom.scaleBy = function(selection, k, p) {
        zoom.scaleTo(selection, function() {
          var k0 = this.__zoom.k,
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return k0 * k1;
        }, p);
      };

      zoom.scaleTo = function(selection, k, p) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t0 = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
              p1 = t0.invert(p0),
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
        }, p);
      };

      zoom.translateBy = function(selection, x, y) {
        zoom.transform(selection, function() {
          return constrain(this.__zoom.translate(
            typeof x === "function" ? x.apply(this, arguments) : x,
            typeof y === "function" ? y.apply(this, arguments) : y
          ), extent.apply(this, arguments), translateExtent);
        });
      };

      zoom.translateTo = function(selection, x, y, p) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
          return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
            typeof x === "function" ? -x.apply(this, arguments) : -x,
            typeof y === "function" ? -y.apply(this, arguments) : -y
          ), e, translateExtent);
        }, p);
      };

      function scale(transform, k) {
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
        return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
      }

      function translate(transform, p0, p1) {
        var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
        return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
      }

      function centroid(extent) {
        return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
      }

      function schedule(transition, transform, point) {
        transition
            .on("start.zoom", function() { gesture(this, arguments).start(); })
            .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
            .tween("zoom", function() {
              var that = this,
                  args = arguments,
                  g = gesture(that, args),
                  e = extent.apply(that, args),
                  p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                  w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                  a = that.__zoom,
                  b = typeof transform === "function" ? transform.apply(that, args) : transform,
                  i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
              return function(t) {
                if (t === 1) t = b; // Avoid rounding error on end.
                else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
                g.zoom(null, t);
              };
            });
      }

      function gesture(that, args, clean) {
        return (!clean && that.__zooming) || new Gesture(that, args);
      }

      function Gesture(that, args) {
        this.that = that;
        this.args = args;
        this.active = 0;
        this.extent = extent.apply(that, args);
        this.taps = 0;
      }

      Gesture.prototype = {
        start: function() {
          if (++this.active === 1) {
            this.that.__zooming = this;
            this.emit("start");
          }
          return this;
        },
        zoom: function(key, transform) {
          if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
          if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
          if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
          this.that.__zoom = transform;
          this.emit("zoom");
          return this;
        },
        end: function() {
          if (--this.active === 0) {
            delete this.that.__zooming;
            this.emit("end");
          }
          return this;
        },
        emit: function(type) {
          customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
        }
      };

      function wheeled() {
        if (!filter.apply(this, arguments)) return;
        var g = gesture(this, arguments),
            t = this.__zoom,
            k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
            p = mouse(this);

        // If the mouse is in the same location as before, reuse it.
        // If there were recent wheel events, reset the wheel idle timeout.
        if (g.wheel) {
          if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
            g.mouse[1] = t.invert(g.mouse[0] = p);
          }
          clearTimeout(g.wheel);
        }

        // If this wheel event won’t trigger a transform change, ignore it.
        else if (t.k === k) return;

        // Otherwise, capture the mouse point and location at the start.
        else {
          g.mouse = [p, t.invert(p)];
          interrupt(this);
          g.start();
        }

        noevent();
        g.wheel = setTimeout(wheelidled, wheelDelay);
        g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

        function wheelidled() {
          g.wheel = null;
          g.end();
        }
      }

      function mousedowned() {
        if (touchending || !filter.apply(this, arguments)) return;
        var g = gesture(this, arguments, true),
            v = d3Select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
            p = mouse(this),
            x0 = event.clientX,
            y0 = event.clientY;

        dragDisable(event.view);
        nopropagation();
        g.mouse = [p, this.__zoom.invert(p)];
        interrupt(this);
        g.start();

        function mousemoved() {
          noevent();
          if (!g.moved) {
            var dx = event.clientX - x0, dy = event.clientY - y0;
            g.moved = dx * dx + dy * dy > clickDistance2;
          }
          g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent, translateExtent));
        }

        function mouseupped() {
          v.on("mousemove.zoom mouseup.zoom", null);
          yesdrag(event.view, g.moved);
          noevent();
          g.end();
        }
      }

      function dblclicked() {
        if (!filter.apply(this, arguments)) return;
        var t0 = this.__zoom,
            p0 = mouse(this),
            p1 = t0.invert(p0),
            k1 = t0.k * (event.shiftKey ? 0.5 : 2),
            t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

        noevent();
        if (duration > 0) d3Select(this).transition().duration(duration).call(schedule, t1, p0);
        else d3Select(this).call(zoom.transform, t1);
      }

      function touchstarted() {
        if (!filter.apply(this, arguments)) return;
        var touches = event.touches,
            n = touches.length,
            g = gesture(this, arguments, event.changedTouches.length === n),
            started, i, t, p;

        nopropagation();
        for (i = 0; i < n; ++i) {
          t = touches[i], p = touch(this, touches, t.identifier);
          p = [p, this.__zoom.invert(p), t.identifier];
          if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
          else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
        }

        if (touchstarting) touchstarting = clearTimeout(touchstarting);

        if (started) {
          if (g.taps < 2) touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
          interrupt(this);
          g.start();
        }
      }

      function touchmoved() {
        if (!this.__zooming) return;
        var g = gesture(this, arguments),
            touches = event.changedTouches,
            n = touches.length, i, t, p, l;

        noevent();
        if (touchstarting) touchstarting = clearTimeout(touchstarting);
        g.taps = 0;
        for (i = 0; i < n; ++i) {
          t = touches[i], p = touch(this, touches, t.identifier);
          if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
          else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
        }
        t = g.that.__zoom;
        if (g.touch1) {
          var p0 = g.touch0[0], l0 = g.touch0[1],
              p1 = g.touch1[0], l1 = g.touch1[1],
              dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
              dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
          t = scale(t, Math.sqrt(dp / dl));
          p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        }
        else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
        else return;
        g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
      }

      function touchended() {
        if (!this.__zooming) return;
        var g = gesture(this, arguments),
            touches = event.changedTouches,
            n = touches.length, i, t;

        nopropagation();
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, touchDelay);
        for (i = 0; i < n; ++i) {
          t = touches[i];
          if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
          else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
        }
        if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
        if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
        else {
          g.end();
          // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
          if (g.taps === 2) {
            var p = d3Select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }

      zoom.wheelDelta = function(_) {
        return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
      };

      zoom.filter = function(_) {
        return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
      };

      zoom.touchable = function(_) {
        return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
      };

      zoom.extent = function(_) {
        return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
      };

      zoom.scaleExtent = function(_) {
        return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
      };

      zoom.translateExtent = function(_) {
        return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
      };

      zoom.constrain = function(_) {
        return arguments.length ? (constrain = _, zoom) : constrain;
      };

      zoom.duration = function(_) {
        return arguments.length ? (duration = +_, zoom) : duration;
      };

      zoom.interpolate = function(_) {
        return arguments.length ? (interpolate = _, zoom) : interpolate;
      };

      zoom.on = function() {
        var value = listeners.on.apply(listeners, arguments);
        return value === listeners ? zoom : value;
      };

      zoom.clickDistance = function(_) {
        return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
      };

      return zoom;
    }

    const layoutRect = (items) => {
      if (items.length === 0) {
        return {
          left: 0,
          top: 0,
          layoutWidth: 0,
          layoutHeight: 0,
        };
      }
      items = Array.from(items.values());
      const left = Math.min(...items.map(({ x, width }) => x - width / 2));
      const right = Math.max(...items.map(({ x, width }) => x + width / 2));
      const top = Math.min(...items.map(({ y, height }) => y - height / 2));
      const bottom = Math.max(...items.map(({ y, height }) => y + height / 2));
      return {
        left: left,
        top: top,
        layoutWidth: right - left,
        layoutHeight: bottom - top,
      };
    };

    const centerTransform = (
      lWidth,
      lHeight,
      left,
      top,
      cWidth,
      cHeight,
      margin
    ) => {
      if (lWidth === 0 || lHeight === 0) {
        return {
          x: 0,
          y: 0,
          k: 1,
        };
      }
      const aWidth = cWidth - 2 * margin;
      const aHeight = cHeight - 2 * margin;
      const hScale = aWidth / lWidth;
      const vScale = aHeight / lHeight;
      const scale = Math.min(hScale, vScale);
      const x = hScale < vScale ? 0 : (aWidth - lWidth * scale) / 2;
      const y = vScale < hScale ? 0 : (aHeight - lHeight * scale) / 2;
      return { x, y, k: scale };
    };

    const diff = (current, next) => {
      const update = {
        groups: next.groupIds
          .filter((g) => current.groups.has(g))
          .map((g) => {
            return {
              current: current.groups.get(g),
              next: next.groups.get(g),
            };
          }),
        vertices: next.vertexIds
          .filter((u) => current.vertices.has(u))
          .map((u) => {
            return {
              current: current.vertices.get(u),
              next: next.vertices.get(u),
            };
          }),
        edges: next.edgeIds
          .filter(([u, v]) => {
            if (!current.edges.has(u) || !current.edges.get(u).has(v)) {
              return false;
            }
            const nextEdge = next.edges.get(u).get(v);
            const currentEdge = current.edges.get(u).get(v);
            return (
              nextEdge.type === currentEdge.type &&
              nextEdge.points.length === currentEdge.points.length
            );
          })
          .map(([u, v]) => {
            return {
              current: current.edges.get(u).get(v),
              next: next.edges.get(u).get(v),
            };
          }),
      };
      const enter = {
        groups: next.groupIds
          .filter((g) => !current.groups.has(g))
          .map((g) => next.groups.get(g)),
        vertices: next.vertexIds
          .filter((u) => !current.vertices.has(u))
          .map((u) => next.vertices.get(u)),
        edges: next.edgeIds
          .filter(([u, v]) => {
            if (!current.edges.has(u) || !current.edges.get(u).has(v)) {
              return true;
            }
            const nextEdge = next.edges.get(u).get(v);
            const currentEdge = current.edges.get(u).get(v);
            return (
              nextEdge.type !== currentEdge.type ||
              nextEdge.points.length !== currentEdge.points.length
            );
          })
          .map(([u, v]) => next.edges.get(u).get(v)),
      };
      const exit = {
        groups: current.groupIds
          .filter((g) => !next.groups.has(g))
          .map((g) => current.groups.get(g)),
        vertices: current.vertexIds
          .filter((u) => !next.vertices.has(u))
          .map((u) => current.vertices.get(u)),
        edges: current.edgeIds
          .filter(([u, v]) => {
            if (!next.edges.has(u) || !next.edges.get(u).has(v)) {
              return true;
            }
            const nextEdge = next.edges.get(u).get(v);
            const currentEdge = current.edges.get(u).get(v);
            return (
              nextEdge.type !== currentEdge.type ||
              nextEdge.points.length !== currentEdge.points.length
            );
          })
          .map(([u, v]) => current.edges.get(u).get(v)),
      };
      return { update, enter, exit };
    };

    const devicePixelRatio = () => {
      return window.devicePixelRatio || 1.0;
    };

    const baseCircleToRectMarkerPosition = (
      x0,
      y0,
      x1,
      y1,
      width,
      height,
      size
    ) => {
      const r = size / 2;
      if (x0 === x1) {
        return [0, height / 2 + r];
      }
      const a = Math.abs((y0 - y1) / (x0 - x1));
      const theta = Math.atan(a);
      if (theta < Math.atan2(height / 2, width / 2 + r)) {
        return [width / 2 + r, Math.tan(theta) * (width / 2 + r)];
      }
      if (theta > Math.atan2(height / 2 + r, width / 2)) {
        return [Math.tan(Math.PI / 2 - theta) * (height / 2 + r), height / 2 + r];
      }
      const b = -1;
      const c = y0 - a * x0;
      const px = x0 + width / 2;
      const py = y0 + height / 2;
      const d = a * px + b * py + c;
      const D = Math.sqrt((a ** 2 + b ** 2) * r ** 2 - d ** 2);
      return [
        (-a * d - b * D) / (a ** 2 + b ** 2) + px - x0,
        (-b * d + a * D) / (a ** 2 + b ** 2) + py - y0,
      ];
    };

    const baseTriangleToRectMarkerPosition = (
      x0,
      y0,
      x1,
      y1,
      width,
      height,
      size
    ) => {
      const r = (size * 2) / 3;
      if (x0 === x1) {
        return [0, height / 2 + r];
      }
      const a = Math.abs((y0 - y1) / (x0 - x1));
      const theta = Math.atan(a);
      if (theta < Math.atan2(height / 2, width / 2)) {
        return [
          width / 2 + Math.cos(theta) * r,
          (Math.tan(theta) * width) / 2 + Math.sin(theta) * r,
        ];
      }
      return [
        (Math.tan(Math.PI / 2 - theta) * height) / 2 +
          Math.sin(Math.PI / 2 - theta) * r,
        height / 2 + Math.cos(Math.PI / 2 - theta) * r,
      ];
    };

    const baseCircleToCircleMarkerPosition = (
      x0,
      y0,
      x1,
      y1,
      width,
      height,
      size
    ) => {
      const r = size / 2;
      if (x0 === x1) {
        return [0, height / 2 + r];
      }
      const rx = width / 2;
      const ry = height / 2;
      const a = Math.abs((y0 - y1) / (x0 - x1));
      const theta = Math.atan(a);
      const px = (rx * ry) / Math.sqrt(a ** 2 * rx ** 2 + ry ** 2);
      const py = a * px;
      return [px + r * Math.cos(theta), py + r * Math.sin(theta)];
    };

    const baseTriangleToCircleMarkerPosition = (
      x0,
      y0,
      x1,
      y1,
      width,
      height,
      size
    ) => {
      const r = (size * 2) / 3;
      if (x0 === x1) {
        return [0, height / 2 + r];
      }
      const rx = width / 2;
      const ry = height / 2;
      const a = Math.abs((y0 - y1) / (x0 - x1));
      const theta = Math.atan(a);
      const px = (rx * ry) / Math.sqrt(a ** 2 * rx ** 2 + ry ** 2);
      const py = a * px;
      return [px + r * Math.cos(theta), py + r * Math.sin(theta)];
    };

    const markerPosition = (x, y, x0, y0, x1, y1) => {
      if (x0 < x1) {
        if (y0 < y1) {
          return [x0 + x, y0 + y];
        } else {
          return [x0 + x, y0 - y];
        }
      } else {
        if (y0 < y1) {
          return [x0 - x, y0 + y];
        } else {
          return [x0 - x, y0 - y];
        }
      }
    };

    const baseFunction = (markerShape, nodeType, linkType) => {
      if (linkType === "arc") {
        return () => [0, 0];
      }
      if (markerShape === "circle" && nodeType === "rect") {
        return baseCircleToRectMarkerPosition;
      }
      if (markerShape === "triangle" && nodeType === "rect") {
        return baseTriangleToRectMarkerPosition;
      }
      if (markerShape === "circle" && nodeType === "circle") {
        return baseCircleToCircleMarkerPosition;
      }
      if (markerShape === "triangle" && nodeType === "circle") {
        return baseTriangleToCircleMarkerPosition;
      }
      return () => [0, 0];
    };

    const adjustEdge = (edge, source, target) => {
      const {
        points,
        sourceMarkerShape,
        sourceMarkerSize,
        targetMarkerShape,
        targetMarkerSize,
      } = edge;
      const n = points.length;
      const sourceBaseFunction = baseFunction(
        sourceMarkerShape,
        source.type,
        edge.type
      );
      const [x0, y0] = sourceBaseFunction(
        source.x,
        source.y,
        points[1][0],
        points[1][1],
        source.width,
        source.height,
        sourceMarkerSize
      );
      points[0] = markerPosition(
        x0,
        y0,
        source.x,
        source.y,
        points[1][0],
        points[1][1]
      );
      const targetBaseFunction = baseFunction(
        targetMarkerShape,
        target.type,
        edge.type
      );
      const [x1, y1] = targetBaseFunction(
        target.x,
        target.y,
        points[n - 2][0],
        points[n - 2][1],
        target.width,
        target.height,
        targetMarkerSize
      );
      points[n - 1] = markerPosition(
        x1,
        y1,
        target.x,
        target.y,
        points[n - 2][0],
        points[n - 2][1]
      );
    };

    const dispatchNodeMoveStartEvent = (element, u) => {
      const event = new window.CustomEvent("nodemovestart", {
        detail: {
          id: u,
        },
      });
      element.dispatchEvent(event);
    };

    const dispatchNodeMoveEvent = (element, { u, x, y }) => {
      const event = new window.CustomEvent("nodemove", {
        detail: {
          id: u,
          x,
          y,
        },
      });
      element.dispatchEvent(event);
    };

    const dispatchNodeMoveEndEvent = (element, u) => {
      const event = new window.CustomEvent("nodemoveend", {
        detail: {
          id: u,
        },
      });
      element.dispatchEvent(event);
    };

    const zoom = (element, attrs) => {
      const pos = {
        region: null,
        x0: 0,
        y0: 0,
      };
      let restoreTransform = false;
      const zoom = d3Zoom();
      zoom
        .on("start", () => {
          if (
            !element.canZoom ||
            (element.canDragNode &&
              event.sourceEvent &&
              event.sourceEvent.region)
          ) {
            const u = event.sourceEvent
              ? JSON.parse(event.sourceEvent.region).id
              : null;
            const { x, y, k } = event.transform;
            pos.region = u;
            pos.x0 = x / k;
            pos.y0 = y / k;
            if (u) {
              dispatchNodeMoveStartEvent(element, u);
            }
          }
        })
        .on("zoom", () => {
          const { x, y, k } = event.transform;
          if (element.canDragNode && pos.region) {
            const u = pos.region;
            const dx = x / k - pos.x0;
            const dy = y / k - pos.y0;
            const { data } = attrs;
            const vertex = data.vertices.get(u);
            vertex.x += dx;
            vertex.y += dy;
            for (const edge of vertex.outEdges) {
              const { points } = edge;
              points[0][0] += dx;
              points[0][1] += dy;
              adjustEdge(edge, vertex, data.vertices.get(edge.v));
            }
            for (const edge of vertex.inEdges) {
              const { points } = edge;
              points[points.length - 1][0] += dx;
              points[points.length - 1][1] += dy;
              adjustEdge(edge, data.vertices.get(edge.u), vertex);
            }
            pos.x0 = x / k;
            pos.y0 = y / k;
            dispatchNodeMoveEvent(element, vertex);
          } else if (element.canZoom || !event.sourceEvent) {
            Object.assign(attrs.transform, {
              x,
              y,
              k,
            });
            if (attrs.renderer) {
              attrs.renderer.transform(attrs.transform);
            }
          }
        })
        .on("end", function () {
          if (!restoreTransform && (!element.canZoom || pos.region)) {
            const u = pos.region;
            pos.region = null;
            restoreTransform = true;
            d3Select(this).call(
              zoom.transform,
              identity
                .translate(attrs.transform.x, attrs.transform.y)
                .scale(attrs.transform.k)
            );
            restoreTransform = false;
            if (u) {
              dispatchNodeMoveEndEvent(element, u);
            }
          }
        });
      return zoom;
    };

    const get = (...args) => {
      let d = args[0];
      const key = args[1];
      const attrs = key.split(".");
      for (const attr of attrs) {
        if (!(attr in d)) {
          if (args.length === 2) {
            throw new Error(`Object doesn't have an attribute ${key}`);
          }
          return args[2];
        }
        d = d[attr];
      }
      return d;
    };

    const privates = new WeakMap();

    const setWidth = (e, width) => {
      const p = privates.get(e);
      p.canvas.width = width * devicePixelRatio();
      p.canvas.style.width = `${width}px`;
      if (p.renderer) {
        p.renderer.resize(e.width, e.height);
      }
    };

    const setHeight = (e, height) => {
      const p = privates.get(e);
      p.canvas.height = height * devicePixelRatio();
      p.canvas.style.height = `${height}px`;
      if (p.renderer) {
        p.renderer.resize(e.width, e.height);
      }
    };

    const getter = (element, attributeName, defaultValue) => {
      if (!element.hasAttribute(attributeName)) {
        return defaultValue;
      }
      return element.getAttribute(attributeName);
    };

    const includes = (v, x, y) => {
      if (v.type === "circle") {
        const xa = (2 * (x - v.x)) / v.width;
        const yb = (2 * (y - v.y)) / v.height;
        return xa * xa + yb * yb <= 1;
      }
      return (
        v.x - v.width / 2 <= x &&
        x <= v.x + v.width / 2 &&
        v.y - v.height / 2 <= y &&
        y <= v.y + v.height / 2
      );
    };

    var initElement = (Renderer) => {
      return class EgRendererElement extends window.HTMLElement {
        static get observedAttributes() {
          return [
            "src",
            "width",
            "height",
            "graph-groups-property",
            "graph-nodes-property",
            "graph-links-property",
            "group-id-property",
            "group-x-property",
            "group-y-property",
            "group-width-property",
            "group-height-property",
            "group-type-property",
            "group-visibility-property",
            "group-fill-color-property",
            "group-fill-opacity-property",
            "group-stroke-color-property",
            "group-stroke-opacity-property",
            "group-stroke-width-property",
            "group-label-property",
            "group-label-dx-property",
            "group-label-dy-property",
            "group-label-dx-base-property",
            "group-label-dy-base-property",
            "group-label-fill-color-property",
            "group-label-fill-opacity-property",
            "group-label-stroke-color-property",
            "group-label-stroke-opacity-property",
            "group-label-stroke-width-property",
            "group-label-font-size-property",
            "group-label-font-family-property",
            "group-label-text-align-property",
            "node-id-property",
            "node-x-property",
            "node-y-property",
            "node-width-property",
            "node-height-property",
            "node-type-property",
            "node-visibility-property",
            "node-fill-color-property",
            "node-fill-opacity-property",
            "node-stroke-color-property",
            "node-stroke-opacity-property",
            "node-stroke-width-property",
            "node-label-property",
            "node-label-dx-property",
            "node-label-dy-property",
            "node-label-dx-base-property",
            "node-label-dy-base-property",
            "node-label-fill-color-property",
            "node-label-fill-opacity-property",
            "node-label-stroke-color-property",
            "node-label-stroke-opacity-property",
            "node-label-stroke-width-property",
            "node-label-font-size-property",
            "node-label-font-family-property",
            "node-label-text-align-property",
            "link-source-property",
            "link-target-property",
            "link-stroke-color-property",
            "link-stroke-opacity-property",
            "link-stroke-width-property",
            "link-visibility-property",
            "link-source-marker-shape-property",
            "link-source-marker-size-property",
            "link-target-marker-shape-property",
            "link-target-marker-size-property",
            "link-label-property",
            "link-label-dx-property",
            "link-label-dy-property",
            "link-label-dx-base-property",
            "link-label-dy-base-property",
            "link-label-fill-color-property",
            "link-label-fill-opacity-property",
            "link-label-stroke-color-property",
            "link-label-stroke-opacity-property",
            "link-label-stroke-width-property",
            "link-label-font-size-property",
            "link-label-font-family-property",
            "link-label-text-align-property",
            "default-group-x",
            "default-group-y",
            "default-group-width",
            "default-group-height",
            "default-group-type",
            "default-group-visibility",
            "default-group-fill-color",
            "default-group-fill-opacity",
            "default-group-stroke-color",
            "default-group-stroke-opacity",
            "default-group-stroke-width",
            "default-group-label",
            "default-group-label-dx",
            "default-group-label-dy",
            "default-group-label-dx-base",
            "default-group-label-dy-base",
            "default-group-label-fill-color",
            "default-group-label-fill-opacity",
            "default-group-label-stroke-color",
            "default-group-label-stroke-opacity",
            "default-group-label-stroke-width",
            "default-group-label-font-size",
            "default-group-label-font-family",
            "default-group-label-text-align",
            "default-node-x",
            "default-node-y",
            "default-node-width",
            "default-node-height",
            "default-node-type",
            "default-node-visibility",
            "default-node-fill-color",
            "default-node-fill-opacity",
            "default-node-stroke-color",
            "default-node-stroke-opacity",
            "default-node-stroke-width",
            "default-node-label",
            "default-node-label-dx",
            "default-node-label-dy",
            "default-node-label-dx-base",
            "default-node-label-dy-base",
            "default-node-label-fill-color",
            "default-node-label-fill-opacity",
            "default-node-label-stroke-color",
            "default-node-label-stroke-opacity",
            "default-node-label-stroke-width",
            "default-node-label-font-size",
            "default-node-label-font-family",
            "default-node-label-text-align",
            "default-link-stroke-color",
            "default-link-stroke-opacity",
            "default-link-stroke-width",
            "default-link-visibility",
            "default-link-source-marker-shape",
            "default-link-source-marker-size",
            "default-link-target-marker-shape",
            "default-link-target-marker-size",
            "default-link-label",
            "default-link-label-dx",
            "default-link-label-dy",
            "default-link-label-dx-base",
            "default-link-label-dy-base",
            "default-link-label-fill-color",
            "default-link-label-fill-opacity",
            "default-link-label-stroke-color",
            "default-link-label-stroke-opacity",
            "default-link-label-stroke-width",
            "default-link-label-font-size",
            "default-link-label-font-family",
            "default-link-label-text-align",
          ];
        }

        constructor() {
          super();
          const canvas = document.createElement("canvas");
          const p = {
            invalidate: false,
            invalidatePositions: false,
            originalData: null,
            canvas,
            data: {
              groupIds: [],
              groups: new Map(),
              vertexIds: [],
              vertices: new Map(),
              edgeIds: [],
              edges: new Map(),
            },
            transform: {
              x: 0,
              y: 0,
              k: 1,
            },
            currentRegion: null,
            layout: {
              update: {
                groups: [],
                vertices: [],
                edges: [],
              },
              enter: {
                groups: [],
                vertices: [],
                edges: [],
              },
              exit: {
                groups: [],
                vertices: [],
                edges: [],
              },
            },
            margin: 10,
            layoutTime: 0,
            ease: cubicInOut,
            stop: false,
          };

          p.zoom = zoom(this, p);
          privates.set(this, p);

          d3Select(p.canvas).call(p.zoom).on("dblclick.zoom", null);

          p.canvas.addEventListener("mousemove", (event) => {
            if (event.region) {
              const obj = JSON.parse(event.region);
              if (p.currentRegion == null) {
                if (obj.id) {
                  const { id } = obj;
                  this.dispatchEvent(
                    new window.CustomEvent("nodemouseenter", {
                      detail: { id },
                    })
                  );
                } else if (obj.source && obj.target) {
                  const { source, target } = obj;
                  this.dispatchEvent(
                    new window.CustomEvent("linkmouseenter", {
                      detail: { source, target },
                    })
                  );
                }
              }
              p.currentRegion = obj;
            } else {
              if (p.currentRegion) {
                const obj = p.currentRegion;
                if (obj.id) {
                  const { id } = obj;
                  this.dispatchEvent(
                    new window.CustomEvent("nodemouseleave", {
                      detail: { id },
                    })
                  );
                } else if (obj.source && obj.target) {
                  const { source, target } = obj;
                  this.dispatchEvent(
                    new window.CustomEvent("linkmouseleave", {
                      detail: { source, target },
                    })
                  );
                }
              }
              p.currentRegion = null;
            }
            if (this.canDragNode && event.region) {
              const obj = JSON.parse(event.region);
              if (obj.id) {
                p.canvas.style.cursor = "pointer";
              }
            } else if (this.canZoom) {
              p.canvas.style.cursor = "move";
            } else {
              p.canvas.style.cursor = "default";
            }
          });

          const events = ["click", "dblclick", "contextmenu"];
          for (const name of events) {
            p.canvas.addEventListener(name, (event) => {
              const id = this.findNode(event.offsetX, event.offsetY);
              if (id) {
                if (name === "contextmenu") {
                  event.preventDefault();
                }
                this.dispatchEvent(
                  new window.CustomEvent(`node${name}`, {
                    detail: { id },
                  })
                );
              }
            });
          }
        }

        connectedCallback() {
          const p = privates.get(this);
          this.appendChild(p.canvas);

          const render = () => {
            if (p.stop) {
              return;
            }
            if (p.invalidate && p.originalData) {
              this.update(!p.invalidatePositions);
            }
            p.invalidate = false;
            p.invalidatePositions = false;
            const now = new Date();
            const transitionDuration = this.transitionDuration;
            const t = Math.min(
              1,
              now > p.layoutTime
                ? (now - p.layoutTime) / transitionDuration
                : 1 / transitionDuration
            );
            const r = p.ease(t);
            p.renderer.enableLinkEvents = this.enableLinkEvents;
            p.renderer.render(r);
            window.requestAnimationFrame(render);
          };

          p.renderer = new Renderer(p.canvas, p.layout, p.transform);
          this.invalidate();
          p.renderer.resize(this.width, this.height);
          render();
        }

        disconnectedCallback() {
          const p = privates.get(this);
          p.stop = true;
        }

        attributeChangedCallback(attr, oldValue, newValue) {
          switch (attr) {
            case "src":
              window
                .fetch(newValue)
                .then((response) => response.json())
                .then((data) => {
                  this.dispatchEvent(
                    new window.CustomEvent("datafetchend", { detail: data })
                  );
                  this.load(data);
                });
              break;
            case "width":
              setWidth(this, newValue);
              break;
            case "height":
              setHeight(this, newValue);
              break;
            default:
              this.invalidate();
          }
        }

        center() {
          const { canvas, data, margin, zoom } = privates.get(this);
          const items = [].concat(
            Array.from(data.vertices.values()),
            Array.from(data.groups.values())
          );
          const { layoutWidth, layoutHeight, left, top } = layoutRect(items);
          const canvasWidth = canvas.width / devicePixelRatio();
          const canvasHeight = canvas.height / devicePixelRatio();
          const { x, y, k } = centerTransform(
            layoutWidth,
            layoutHeight,
            left,
            top,
            canvasWidth,
            canvasHeight,
            margin
          );
          zoom.transform(
            d3Select(canvas),
            identity.translate(x, y).scale(k).translate(-left, -top)
          );
          return this;
        }

        focus(x, y) {
          const { canvas, data, margin, zoom } = privates.get(this);
          const items = [].concat(
            Array.from(data.vertices.values()),
            Array.from(data.groups.values())
          );
          const { layoutWidth, layoutHeight, left, top } = layoutRect(items);
          const canvasWidth = canvas.width / devicePixelRatio();
          const canvasHeight = canvas.height / devicePixelRatio();
          const { k } = centerTransform(
            layoutWidth,
            layoutHeight,
            left,
            top,
            canvasWidth,
            canvasHeight,
            margin
          );
          zoom.transform(
            d3Select(canvas),
            identity.translate(x, y).scale(k).translate(-left, -top)
          );
          return this;
        }

        load(data) {
          privates.get(this).originalData = data;
          return this.update();
        }

        update(preservePositions = false) {
          const p = privates.get(this);
          p.prevData = p.data;
          const data = p.originalData;
          const groups = Array.from(get(data, this.graphGroupsProperty, []))
            .filter((group) =>
              get(group, this.groupVisibilityProperty, this.defaultGroupVisibility)
            )
            .map((group, i) => {
              const fillColor = color(
                get(group, this.groupFillColorProperty, this.defaultGroupFillColor)
              );
              fillColor.opacity = +get(
                group,
                this.groupFillOpacityProperty,
                this.defaultGroupFillOpacity
              );
              const strokeColor = color(
                get(
                  group,
                  this.groupStrokeColorProperty,
                  this.defaultGroupStrokeColor
                )
              );
              strokeColor.opacity = +get(
                group,
                this.groupStrokeOpacityProperty,
                this.defaultGroupStrokeOpacity
              );
              const labelFillColor = color(
                get(
                  group,
                  this.groupLabelFillColorProperty,
                  this.defaultGroupLabelFillColor
                )
              );
              labelFillColor.opacity = +get(
                group,
                this.groupLabelFillOpacityProperty,
                this.defaultGroupLabelFillOpacity
              );
              const labelStrokeColor = color(
                get(
                  group,
                  this.groupLabelStrokeColorProperty,
                  this.defaultGroupLabelStrokeColor
                )
              );
              labelStrokeColor.opacity = +get(
                group,
                this.groupLabelStrokeOpacityProperty,
                this.defaultGroupLabelStrokeOpacity
              );
              const g = (
                this.groupIdProperty === "$index"
                  ? i
                  : get(group, this.groupIdProperty)
              ).toString();
              return {
                g,
                x:
                  preservePositions && p.prevData.groups.has(g)
                    ? p.prevData.groups.get(g).x
                    : +get(group, this.groupXProperty, this.defaultGroupX),
                y:
                  preservePositions && p.prevData.groups.has(g)
                    ? p.prevData.groups.get(g).y
                    : +get(group, this.groupYProperty, this.defaultGroupY),
                width: +get(group, this.groupWidthProperty, this.defaultGroupWidth),
                height: +get(
                  group,
                  this.groupHeightProperty,
                  this.defaultGroupHeight
                ),
                type: get(group, this.groupTypeProperty, this.defaultGroupType),
                fillColor,
                strokeColor,
                strokeWidth: +get(
                  group,
                  this.groupStrokeWidthProperty,
                  this.defaultGroupStrokeWidth
                ),
                label: get(group, this.groupLabelProperty, this.defaultGroupLabel),
                labelDx: +get(
                  group,
                  this.groupLabelDxProperty,
                  this.defaultGroupLabelDx
                ),
                labelDy: +get(
                  group,
                  this.groupLabelDyProperty,
                  this.defaultGroupLabelDy
                ),
                labelDxBase: get(
                  group,
                  this.groupLabelDxBaseProperty,
                  this.defaultGroupLabelDxBase
                ),
                labelDyBase: get(
                  group,
                  this.groupLabelDyBaseProperty,
                  this.defaultGroupLabelDyBase
                ),
                labelFillColor,
                labelStrokeColor,
                labelStrokeWidth: +get(
                  group,
                  this.groupLabelStrokeWidthProperty,
                  this.defaultGroupLabelStrokeWidth
                ),
                labelFontSize: +get(
                  group,
                  this.groupLabelFontSizeProperty,
                  this.defaultGroupLabelFontSize
                ),
                labelFontFamily: get(
                  group,
                  this.groupLabelFontFamilyProperty,
                  this.defaultGroupLabelFontFamily
                ),
                labelTextAlign: get(
                  group,
                  this.groupLabelTextAlignProperty,
                  this.defaultGroupLabelTextAlign
                ),
                d: group,
              };
            });
          const vertices = Array.from(get(data, this.graphNodesProperty))
            .filter((node) =>
              get(node, this.nodeVisibilityProperty, this.defaultNodeVisibility)
            )
            .map((node, i) => {
              const fillColor = color(
                get(node, this.nodeFillColorProperty, this.defaultNodeFillColor)
              );
              fillColor.opacity = +get(
                node,
                this.nodeFillOpacityProperty,
                this.defaultNodeFillOpacity
              );
              const strokeColor = color(
                get(node, this.nodeStrokeColorProperty, this.defaultNodeStrokeColor)
              );
              strokeColor.opacity = +get(
                node,
                this.nodeStrokeOpacityProperty,
                this.defaultNodeStrokeOpacity
              );
              const labelFillColor = color(
                get(
                  node,
                  this.nodeLabelFillColorProperty,
                  this.defaultNodeLabelFillColor
                )
              );
              labelFillColor.opacity = +get(
                node,
                this.nodeLabelFillOpacityProperty,
                this.defaultNodeLabelFillOpacity
              );
              const labelStrokeColor = color(
                get(
                  node,
                  this.nodeLabelStrokeColorProperty,
                  this.defaultNodeLabelStrokeColor
                )
              );
              labelStrokeColor.opacity = +get(
                node,
                this.nodeLabelStrokeOpacityProperty,
                this.defaultNodeLabelStrokeOpacity
              );
              const u = (
                this.nodeIdProperty === "$index"
                  ? i
                  : get(node, this.nodeIdProperty)
              ).toString();
              return {
                u,
                x:
                  preservePositions && p.prevData.vertices.has(u)
                    ? p.prevData.vertices.get(u).x
                    : +get(node, this.nodeXProperty, this.defaultNodeX),
                y:
                  preservePositions && p.prevData.vertices.has(u)
                    ? p.prevData.vertices.get(u).y
                    : +get(node, this.nodeYProperty, this.defaultNodeY),
                width: +get(node, this.nodeWidthProperty, this.defaultNodeWidth),
                height: +get(node, this.nodeHeightProperty, this.defaultNodeHeight),
                type: get(node, this.nodeTypeProperty, this.defaultNodeType),
                fillColor,
                strokeColor,
                strokeWidth: +get(
                  node,
                  this.nodeStrokeWidthProperty,
                  this.defaultNodeStrokeWidth
                ),
                label: get(node, this.nodeLabelProperty, this.defaultNodeLabel),
                labelDx: +get(
                  node,
                  this.nodeLabelDxProperty,
                  this.defaultNodeLabelDx
                ),
                labelDy: +get(
                  node,
                  this.nodeLabelDyProperty,
                  this.defaultNodeLabelDy
                ),
                labelDxBase: get(
                  node,
                  this.nodeLabelDxBaseProperty,
                  this.defaultNodeLabelDxBase
                ),
                labelDyBase: get(
                  node,
                  this.nodeLabelDyBaseProperty,
                  this.defaultNodeLabelDyBase
                ),
                labelFillColor,
                labelStrokeColor,
                labelStrokeWidth: +get(
                  node,
                  this.nodeLabelStrokeWidthProperty,
                  this.defaultNodeLabelStrokeWidth
                ),
                labelFontSize: +get(
                  node,
                  this.nodeLabelFontSizeProperty,
                  this.defaultNodeLabelFontSize
                ),
                labelFontFamily: get(
                  node,
                  this.nodeLabelFontFamilyProperty,
                  this.defaultNodeLabelFontFamily
                ),
                labelTextAlign: get(
                  node,
                  this.nodeLabelTextAlignProperty,
                  this.defaultNodeLabelTextAlign
                ),
                inEdges: [],
                outEdges: [],
                d: node,
              };
            });
          const indices = new Map(vertices.map(({ u }, i) => [u, i]));
          const edges = Array.from(get(data, this.graphLinksProperty))
            .filter((link) =>
              get(link, this.linkVisibilityProperty, this.defaultLinkVisibility)
            )
            .filter((link) => {
              const u = get(link, this.linkSourceProperty).toString();
              const v = get(link, this.linkTargetProperty).toString();
              return indices.has(u) && indices.has(v);
            })
            .map((link) => {
              const u = get(link, this.linkSourceProperty).toString();
              const v = get(link, this.linkTargetProperty).toString();
              const strokeColor = color(
                get(link, this.linkStrokeColorProperty, this.defaultLinkStrokeColor)
              );
              strokeColor.opacity = +get(
                link,
                this.linkStrokeOpacityProperty,
                this.defaultLinkStrokeOpacity
              );
              const labelFillColor = color(
                get(
                  link,
                  this.linkLabelFillColorProperty,
                  this.defaultLinkLabelFillColor
                )
              );
              labelFillColor.opacity = +get(
                link,
                this.linkLabelFillOpacityProperty,
                this.defaultLinkLabelFillOpacity
              );
              const labelStrokeColor = color(
                get(
                  link,
                  this.linkLabelStrokeColorProperty,
                  this.defaultLinkLabelStrokeColor
                )
              );
              labelStrokeColor.opacity = +get(
                link,
                this.linkLabelStrokeOpacityProperty,
                this.defaultLinkLabelStrokeOpacity
              );
              const du = vertices[indices.get(u)];
              const dv = vertices[indices.get(v)];
              const newPoints = [[du.x, du.y]];
              for (const [x, y] of get(link, this.linkBendsProperty, [])) {
                newPoints.push([x, y]);
              }
              newPoints.push([dv.x, dv.y]);
              const points =
                preservePositions &&
                p.prevData.edges.has(u) &&
                p.prevData.edges.get(u).has(v)
                  ? p.prevData.edges.get(u).get(v).points
                  : newPoints;
              const edge = {
                u,
                v,
                points,
                type: get(link, this.linkTypeProperty, this.defaultLinkType),
                strokeColor,
                strokeWidth: +get(
                  link,
                  this.linkStrokeWidthProperty,
                  this.defaultLinkStrokeWidth
                ),
                sourceMarkerShape: get(
                  link,
                  this.linkSourceMarkerShapeProperty,
                  this.defaultLinkSourceMarkerShape
                ),
                sourceMarkerSize: +get(
                  link,
                  this.linkSourceMarkerSizeProperty,
                  this.defaultLinkSourceMarkerSize
                ),
                targetMarkerShape: get(
                  link,
                  this.linkTargetMarkerShapeProperty,
                  this.defaultLinkTargetMarkerShape
                ),
                targetMarkerSize: +get(
                  link,
                  this.linkTargetMarkerSizeProperty,
                  this.defaultLinkTargetMarkerSize
                ),
                label: get(link, this.linkLabelProperty, this.defaultLinkLabel),
                labelDx: +get(
                  link,
                  this.linkLabelDxProperty,
                  this.defaultLinkLabelDx
                ),
                labelDy: +get(
                  link,
                  this.linkLabelDyProperty,
                  this.defaultLinkLabelDy
                ),
                labelDxBase: get(
                  link,
                  this.linkLabelDxBaseProperty,
                  this.defaultLinkLabelDxBase
                ),
                labelDyBase: get(
                  link,
                  this.linkLabelDyBaseProperty,
                  this.defaultLinkLabelDyBase
                ),
                labelFillColor,
                labelStrokeColor,
                labelStrokeWidth: +get(
                  link,
                  this.linkLabelStrokeWidthProperty,
                  this.defaultLinkLabelStrokeWidth
                ),
                labelFontSize: +get(
                  link,
                  this.linkLabelFontSizeProperty,
                  this.defaultLinkLabelFontSize
                ),
                labelFontFamily: get(
                  link,
                  this.linkLabelFontFamilyProperty,
                  this.defaultLinkLabelFontFamily
                ),
                labelTextAlign: get(
                  link,
                  this.linkLabelTextAlignProperty,
                  this.defaultLinkLabelTextAlign
                ),
                d: link,
              };
              du.outEdges.push(edge);
              dv.inEdges.push(edge);
              return edge;
            });
          p.data = {
            groupIds: groups.map(({ g }) => g),
            groups: new Map(groups.map((group) => [group.g, group])),
            vertexIds: vertices.map(({ u }) => u),
            vertices: new Map(vertices.map((vertex) => [vertex.u, vertex])),
            edgeIds: edges.map(({ u, v }) => [u, v]),
            edges: new Map(vertices.map((vertex) => [vertex.u, new Map()])),
          };
          for (const edge of edges) {
            p.data.edges.get(edge.u).set(edge.v, edge);
          }
          this.onLayout(p.data, preservePositions);
          for (const [u, v] of p.data.edgeIds) {
            const edge = p.data.edges.get(u).get(v);
            const du = p.data.vertices.get(u);
            const dv = p.data.vertices.get(v);
            adjustEdge(edge, du, dv);
          }
          p.layout = diff(p.prevData, p.data);
          if (p.renderer) {
            p.renderer.update(p.layout);
          }
          p.layoutTime = new Date();
          if (this.autoCentering) {
            this.center();
          }
          this.dispatchEvent(
            new window.CustomEvent("updateend", {
              detail: { preservePositions },
            })
          );
          return this;
        }

        onLayout() {}

        invalidate() {
          if (this.autoUpdate) {
            privates.get(this).invalidate = true;
          }
        }

        invalidatePositions() {
          if (this.autoUpdate) {
            privates.get(this).invalidatePositions = true;
          }
        }

        findNode(px, py) {
          const p = privates.get(this);
          const t = p.transform;
          const x = (px - t.x - p.margin) / t.k;
          const y = (py - t.y - p.margin) / t.k;

          let closest = null;
          let closestDist = Infinity;
          for (const vertex of p.data.vertices.values()) {
            if (includes(vertex, x, y)) {
              const dx = vertex.x - x;
              const dy = vertex.y - y;
              const dist = dx * dx + dy * dy;
              if (dist < closestDist) {
                closest = vertex.u;
                closestDist = dist;
              }
            }
          }
          return closest;
        }

        get autoUpdate() {
          return !this.hasAttribute("no-auto-update");
        }

        set autoUpdate(value) {
          if (value) {
            this.removeAttribute("no-auto-update");
          } else {
            this.setAttribute("no-auto-update", "");
          }
        }

        get autoCentering() {
          return !this.hasAttribute("no-auto-centering");
        }

        set autoCentering(value) {
          if (value) {
            this.removeAttribute("no-auto-centering");
          } else {
            this.setAttribute("no-auto-centering", "");
          }
        }

        get canZoom() {
          return !this.hasAttribute("no-zoom");
        }

        set canZoom(value) {
          if (value) {
            this.removeAttribute("no-zoom");
          } else {
            this.setAttribute("no-zoom", "");
          }
        }

        get canDragNode() {
          return !this.hasAttribute("no-drag-node");
        }

        set canDragNode(value) {
          if (value) {
            this.removeAttribute("no-drag-node");
          } else {
            this.setAttribute("no-drag-node", "");
          }
        }

        get enableLinkEvents() {
          return this.hasAttribute("enable-link-events");
        }

        set enableLinkEvents(value) {
          if (value) {
            this.removeAttribute("no-drag-node");
          } else {
            this.setAttribute("enable-link-events", "");
          }
        }

        get src() {
          return getter(this, "src", null);
        }

        set src(value) {
          this.setAttribute("src", value);
        }

        get width() {
          return getter(this, "width", 300);
        }

        set width(value) {
          this.setAttribute("width", value);
        }

        get height() {
          return getter(this, "height", 150);
        }

        set height(value) {
          this.setAttribute("height", value);
        }

        get transitionDuration() {
          return getter(this, "transition-duration", 0);
        }

        set transitionDuration(value) {
          this.setAttribute("transition-duration", value);
        }

        get graphGroupsProperty() {
          return getter(this, "graph-groups-property", "groups");
        }

        set graphGroupsProperty(value) {
          this.setAttribute("graph-groups-property", value);
        }

        get graphNodesProperty() {
          return getter(this, "graph-nodes-property", "nodes");
        }

        set graphNodesProperty(value) {
          this.setAttribute("graph-nodes-property", value);
        }

        get graphLinksProperty() {
          return getter(this, "graph-links-property", "links");
        }

        set graphLinksProperty(value) {
          this.setAttribute("graph-links-property", value);
        }

        get groupIdProperty() {
          return getter(this, "group-id-property", "$index");
        }

        set groupIdProperty(value) {
          this.setAttribute("group-id-property", value);
        }

        get groupXProperty() {
          return getter(this, "group-x-property", "x");
        }

        set groupXProperty(value) {
          this.setAttribute("group-x-property", value);
        }

        get groupYProperty() {
          return getter(this, "group-y-property", "y");
        }

        set groupYProperty(value) {
          this.setAttribute("group-y-property", value);
        }

        get groupWidthProperty() {
          return getter(this, "group-width-property", "width");
        }

        set groupWidthProperty(value) {
          this.setAttribute("group-width-property", value);
        }

        get groupHeightProperty() {
          return getter(this, "group-height-property", "height");
        }

        set groupHeightProperty(value) {
          this.setAttribute("group-height-property", value);
        }

        get groupFillColorProperty() {
          return getter(this, "group-fill-color-property", "fillColor");
        }

        set groupFillColorProperty(value) {
          this.setAttribute("group-fill-color-property", value);
        }

        get groupFillOpacityProperty() {
          return getter(this, "group-fill-opacity-property", "fillOpacity");
        }

        set groupFillOpacityProperty(value) {
          this.setAttribute("group-fill-opacity-property", value);
        }

        get groupStrokeColorProperty() {
          return getter(this, "group-stroke-color-property", "strokeColor");
        }

        set groupStrokeColorProperty(value) {
          this.setAttribute("group-stroke-color-property", value);
        }

        get groupStrokeOpacityProperty() {
          return getter(this, "group-stroke-opacity-property", "strokeOpacity");
        }

        set groupStrokeOpacityProperty(value) {
          this.setAttribute("group-stroke-opacity-property", value);
        }

        get groupStrokeWidthProperty() {
          return getter(this, "group-stroke-width-property", "strokeWidth");
        }

        set groupStrokeWidthProperty(value) {
          this.setAttribute("group-stroke-width-property", value);
        }

        get groupTypeProperty() {
          return getter(this, "group-type-property", "type");
        }

        set groupTypeProperty(value) {
          this.setAttribute("group-type-property", value);
        }

        get groupVisibilityProperty() {
          return getter(this, "group-visibility-property", "visibility");
        }

        set groupVisibilityProperty(value) {
          this.setAttribute("group-visibility-property", value);
        }

        get groupLabelProperty() {
          return getter(this, "group-label-property", "label");
        }

        set groupLabelProperty(value) {
          this.setAttribute("group-label-property", value);
        }

        get groupLabelDxProperty() {
          return getter(this, "group-label-dx-property", "labelDx");
        }

        set groupLabelDxProperty(value) {
          this.setAttribute("group-label-dx-property", value);
        }

        get groupLabelDyProperty() {
          return getter(this, "group-label-dy-property", "labelDy");
        }

        set groupLabelDyProperty(value) {
          this.setAttribute("group-label-dy-property", value);
        }

        get groupLabelDxBaseProperty() {
          return getter(this, "group-label-dx-base-property", "labelDxBase");
        }

        set groupLabelDxBaseProperty(value) {
          this.setAttribute("group-label-dx-base-property", value);
        }

        get groupLabelDyBaseProperty() {
          return getter(this, "group-label-dy-base-property", "labelDyBase");
        }

        set groupLabelDyBaseProperty(value) {
          this.setAttribute("group-label-dy-base-property", value);
        }

        get groupLabelFillColorProperty() {
          return getter(this, "group-label-fill-color-property", "labelFillColor");
        }

        set groupLabelFillColorProperty(value) {
          this.setAttribute("group-label-fill-color-property", value);
        }

        get groupLabelFillOpacityProperty() {
          return getter(
            this,
            "group-label-fill-opacity-property",
            "labelFillOpacity"
          );
        }

        set groupLabelFillOpacityProperty(value) {
          this.setAttribute("group-label-fill-opacity-property", value);
        }

        get groupLabelStrokeColorProperty() {
          return getter(
            this,
            "group-label-stroke-color-property",
            "labelStrokeColor"
          );
        }

        set groupLabelStrokeColorProperty(value) {
          this.setAttribute("group-label-stroke-color-property", value);
        }

        get groupLabelStrokeOpacityProperty() {
          return getter(
            this,
            "group-label-stroke-opacity-property",
            "labelStrokeOpacity"
          );
        }

        set groupLabelStrokeOpacityProperty(value) {
          this.setAttribute("group-label-stroke-opacity-property", value);
        }

        get groupLabelStrokeWidthProperty() {
          return getter(
            this,
            "group-label-stroke-width-property",
            "labelStrokeWidth"
          );
        }

        set groupLabelStrokeWidthProperty(value) {
          this.setAttribute("group-label-stroke-width-property", value);
        }

        get groupLabelFontSizeProperty() {
          return getter(this, "group-label-font-size-property", "labelFontSize");
        }

        set groupLabelFontSizeProperty(value) {
          this.setAttribute("group-label-font-size-property", value);
        }

        get groupLabelFontFamilyProperty() {
          return getter(
            this,
            "group-label-font-family-property",
            "labelFontFamily"
          );
        }

        set groupLabelFontFamilyProperty(value) {
          this.setAttribute("group-label-font-family-property", value);
        }

        get groupLabelTextAlignProperty() {
          return getter(this, "group-label-text-align-property", "labelTextAlign");
        }

        set groupLabelTextAlignProperty(value) {
          this.setAttribute("group-label-text-align-property", value);
        }

        get nodeIdProperty() {
          return getter(this, "node-id-property", "$index");
        }

        set nodeIdProperty(value) {
          this.setAttribute("node-id-property", value);
        }

        get nodeXProperty() {
          return getter(this, "node-x-property", "x");
        }

        set nodeXProperty(value) {
          this.setAttribute("node-x-property", value);
        }

        get nodeYProperty() {
          return getter(this, "node-y-property", "y");
        }

        set nodeYProperty(value) {
          this.setAttribute("node-y-property", value);
        }

        get nodeWidthProperty() {
          return getter(this, "node-width-property", "width");
        }

        set nodeWidthProperty(value) {
          this.setAttribute("node-width-property", value);
        }

        get nodeHeightProperty() {
          return getter(this, "node-height-property", "height");
        }

        set nodeHeightProperty(value) {
          this.setAttribute("node-height-property", value);
        }

        get nodeFillColorProperty() {
          return getter(this, "node-fill-color-property", "fillColor");
        }

        set nodeFillColorProperty(value) {
          this.setAttribute("node-fill-color-property", value);
        }

        get nodeFillOpacityProperty() {
          return getter(this, "node-fill-opacity-property", "fillOpacity");
        }

        set nodeFillOpacityProperty(value) {
          this.setAttribute("node-fill-opacity-property", value);
        }

        get nodeStrokeColorProperty() {
          return getter(this, "node-stroke-color-property", "strokeColor");
        }

        set nodeStrokeColorProperty(value) {
          this.setAttribute("node-stroke-color-property", value);
        }

        get nodeStrokeOpacityProperty() {
          return getter(this, "node-stroke-opacity-property", "strokeOpacity");
        }

        set nodeStrokeOpacityProperty(value) {
          this.setAttribute("node-stroke-opacity-property", value);
        }

        get nodeStrokeWidthProperty() {
          return getter(this, "node-stroke-width-property", "strokeWidth");
        }

        set nodeStrokeWidthProperty(value) {
          this.setAttribute("node-stroke-width-property", value);
        }

        get nodeTypeProperty() {
          return getter(this, "node-type-property", "type");
        }

        set nodeTypeProperty(value) {
          this.setAttribute("node-type-property", value);
        }

        get nodeVisibilityProperty() {
          return getter(this, "node-visibility-property", "visibility");
        }

        set nodeVisibilityProperty(value) {
          this.setAttribute("node-visibility-property", value);
        }

        get nodeLabelProperty() {
          return getter(this, "node-label-property", "label");
        }

        set nodeLabelProperty(value) {
          this.setAttribute("node-label-property", value);
        }

        get nodeLabelDxProperty() {
          return getter(this, "node-label-dx-property", "labelDx");
        }

        set nodeLabelDxProperty(value) {
          this.setAttribute("node-label-dx-property", value);
        }

        get nodeLabelDyProperty() {
          return getter(this, "node-label-dy-property", "labelDy");
        }

        set nodeLabelDyProperty(value) {
          this.setAttribute("node-label-dy-property", value);
        }

        get nodeLabelDxBaseProperty() {
          return getter(this, "node-label-dx-base-property", "labelDxBase");
        }

        set nodeLabelDxBaseProperty(value) {
          this.setAttribute("node-label-dx-base-property", value);
        }

        get nodeLabelDyBaseProperty() {
          return getter(this, "node-label-dy-base-property", "labelDyBase");
        }

        set nodeLabelDyBaseProperty(value) {
          this.setAttribute("node-label-dy-base-property", value);
        }

        get nodeLabelFillColorProperty() {
          return getter(this, "node-label-fill-color-property", "labelFillColor");
        }

        set nodeLabelFillColorProperty(value) {
          this.setAttribute("node-label-fill-color-property", value);
        }

        get nodeLabelFillOpacityProperty() {
          return getter(
            this,
            "node-label-fill-opacity-property",
            "labelFillOpacity"
          );
        }

        set nodeLabelFillOpacityProperty(value) {
          this.setAttribute("node-label-fill-opacity-property", value);
        }

        get nodeLabelStrokeColorProperty() {
          return getter(
            this,
            "node-label-stroke-color-property",
            "labelStrokeColor"
          );
        }

        set nodeLabelStrokeColorProperty(value) {
          this.setAttribute("node-label-stroke-color-property", value);
        }

        get nodeLabelStrokeOpacityProperty() {
          return getter(
            this,
            "node-label-stroke-opacity-property",
            "labelStrokeOpacity"
          );
        }

        set nodeLabelStrokeOpacityProperty(value) {
          this.setAttribute("node-label-stroke-opacity-property", value);
        }

        get nodeLabelStrokeWidthProperty() {
          return getter(
            this,
            "node-label-stroke-width-property",
            "labelStrokeWidth"
          );
        }

        set nodeLabelStrokeWidthProperty(value) {
          this.setAttribute("node-label-stroke-width-property", value);
        }

        get nodeLabelFontSizeProperty() {
          return getter(this, "node-label-font-size-property", "labelFontSize");
        }

        set nodeLabelFontSizeProperty(value) {
          this.setAttribute("node-label-font-size-property", value);
        }

        get nodeLabelFontFamilyProperty() {
          return getter(this, "node-label-font-family-property", "labelFontFamily");
        }

        set nodeLabelFontFamilyProperty(value) {
          this.setAttribute("node-label-font-family-property", value);
        }

        get nodeLabelTextAlignProperty() {
          return getter(this, "node-label-text-align-property", "labelTextAlign");
        }

        set nodeLabelTextAlignProperty(value) {
          this.setAttribute("node-label-text-align-property", value);
        }

        get linkSourceProperty() {
          return getter(this, "link-source-property", "source");
        }

        set linkSourceProperty(value) {
          this.setAttribute("link-source-property", value);
        }

        get linkTargetProperty() {
          return getter(this, "link-target-property", "target");
        }

        set linkTargetProperty(value) {
          this.setAttribute("link-target-property", value);
        }

        get linkBendsProperty() {
          return getter(this, "link-bends-property", "bends");
        }

        set linkBendsProperty(value) {
          this.setAttribute("link-bends-property", value);
        }

        get linkStrokeColorProperty() {
          return getter(this, "link-stroke-color-property", "strokeColor");
        }

        set linkStrokeColorProperty(value) {
          this.setAttribute("link-stroke-color-property", value);
        }

        get linkStrokeOpacityProperty() {
          return getter(this, "link-stroke-opacity-property", "strokeOpacity");
        }

        set linkStrokeOpacityProperty(value) {
          this.setAttribute("link-stroke-opacity-property", value);
        }

        get linkStrokeWidthProperty() {
          return getter(this, "link-stroke-width-property", "strokeWidth");
        }

        set linkStrokeWidthProperty(value) {
          this.setAttribute("link-stroke-width-property", value);
        }

        get linkTypeProperty() {
          return getter(this, "link-type-property", "type");
        }

        set linkTypeProperty(value) {
          this.setAttribute("link-type-property", value);
        }

        get linkVisibilityProperty() {
          return getter(this, "link-visibility-property", "visibility");
        }

        set linkVisibilityProperty(value) {
          this.setAttribute("link-visibility-property", value);
        }

        get linkSourceMarkerShapeProperty() {
          return getter(
            this,
            "link-source-marker-shape-property",
            "sourceMarkerShape"
          );
        }

        set linkSourceMarkerShapeProperty(value) {
          this.setAttribute("link-source-marker-shape-property", value);
        }

        get linkSourceMarkerSizeProperty() {
          return getter(
            this,
            "link-source-marker-size-property",
            "sourceMarkerSize"
          );
        }

        set linkSourceMarkerSizeProperty(value) {
          this.setAttribute("link-source-marker-size-property", value);
        }

        get linkTargetMarkerShapeProperty() {
          return getter(
            this,
            "link-target-marker-shape-property",
            "targetMarkerShape"
          );
        }

        set linkTargetMarkerShapeProperty(value) {
          this.setAttribute("link-target-marker-shape-property", value);
        }

        get linkTargetMarkerSizeProperty() {
          return getter(
            this,
            "link-target-marker-size-property",
            "targetMarkerSize"
          );
        }

        set linkTargetMarkerSizeProperty(value) {
          this.setAttribute("link-target-marker-size-property", value);
        }

        get linkLabelProperty() {
          return getter(this, "link-label-property", "label");
        }

        set linkLabelProperty(value) {
          this.setAttribute("link-label-property", value);
        }

        get linkLabelDxProperty() {
          return getter(this, "link-label-dx-property", "labelDx");
        }

        set linkLabelDxProperty(value) {
          this.setAttribute("link-label-dx-property", value);
        }

        get linkLabelDyProperty() {
          return getter(this, "link-label-dy-property", "labelDy");
        }

        set linkLabelDyProperty(value) {
          this.setAttribute("link-label-dy-property", value);
        }

        get linkLabelDxBaseProperty() {
          return getter(this, "link-label-dx-base-property", "labelDxBase");
        }

        set linkLabelDxBaseProperty(value) {
          this.setAttribute("link-label-dx-base-property", value);
        }

        get linkLabelDyBaseProperty() {
          return getter(this, "link-label-dy-base-property", "labelDyBase");
        }

        set linkLabelDyBaseProperty(value) {
          this.setAttribute("link-label-dy-base-property", value);
        }

        get linkLabelFillColorProperty() {
          return getter(this, "link-label-fill-color-property", "labelFillColor");
        }

        set linkLabelFillColorProperty(value) {
          this.setAttribute("link-label-fill-color-property", value);
        }

        get linkLabelFillOpacityProperty() {
          return getter(
            this,
            "link-label-fill-opacity-property",
            "labelFillOpacity"
          );
        }

        set linkLabelFillOpacityProperty(value) {
          this.setAttribute("link-label-fill-opacity-property", value);
        }

        get linkLabelStrokeColorProperty() {
          return getter(
            this,
            "link-label-stroke-color-property",
            "labelStrokeColor"
          );
        }

        set linkLabelStrokeColorProperty(value) {
          this.setAttribute("link-label-stroke-color-property", value);
        }

        get linkLabelStrokeOpacityProperty() {
          return getter(
            this,
            "link-label-stroke-opacity-property",
            "labelStrokeOpacity"
          );
        }

        set linkLabelStrokeOpacityProperty(value) {
          this.setAttribute("link-label-stroke-opacity-property", value);
        }

        get linkLabelStrokeWidthProperty() {
          return getter(
            this,
            "link-label-stroke-width-property",
            "labelStrokeWidth"
          );
        }

        set linkLabelStrokeWidthProperty(value) {
          this.setAttribute("link-label-stroke-width-property", value);
        }

        get linkLabelFontSizeProperty() {
          return getter(this, "link-label-font-size-property", "labelFontSize");
        }

        set linkLabelFontSizeProperty(value) {
          this.setAttribute("link-label-font-size-property", value);
        }

        get linkLabelFontFamilyProperty() {
          return getter(this, "link-label-font-family-property", "labelFontFamily");
        }

        set linkLabelFontFamilyProperty(value) {
          this.setAttribute("link-label-font-family-property", value);
        }

        get linkLabelTextAlignProperty() {
          return getter(this, "link-label-text-align-property", "labelTextAlign");
        }

        set linkLabelTextAlignProperty(value) {
          this.setAttribute("link-label-text-align-property", value);
        }

        get defaultGroupX() {
          return getter(this, "default-group-x", 0);
        }

        set defaultGroupX(value) {
          this.setAttribute("default-group-x", value);
        }

        get defaultGroupY() {
          return getter(this, "default-group-y", 0);
        }

        set defaultGroupY(value) {
          this.setAttribute("default-group-y", value);
        }

        get defaultGroupWidth() {
          return getter(this, "default-group-width", 10);
        }

        set defaultGroupWidth(value) {
          this.setAttribute("default-group-width", value);
        }

        get defaultGroupHeight() {
          return getter(this, "default-group-height", 10);
        }

        set defaultGroupHeight(value) {
          this.setAttribute("default-group-height", value);
        }

        get defaultGroupFillColor() {
          return getter(this, "default-group-fill-color", "#fff");
        }

        set defaultGroupFillColor(value) {
          this.setAttribute("default-group-fill-color", value);
        }

        get defaultGroupFillOpacity() {
          return getter(this, "default-group-fill-opacity", 1);
        }

        set defaultGroupFillOpacity(value) {
          this.setAttribute("default-group-fill-opacity", value);
        }

        get defaultGroupStrokeColor() {
          return getter(this, "default-group-stroke-color", "#000");
        }

        set defaultGroupStrokeColor(value) {
          this.setAttribute("default-group-stroke-color", value);
        }

        get defaultGroupStrokeOpacity() {
          return getter(this, "default-group-stroke-opacity", 1);
        }

        set defaultGroupStrokeOpacity(value) {
          this.setAttribute("default-group-stroke-opacity", value);
        }

        get defaultGroupStrokeWidth() {
          return getter(this, "default-group-stroke-width", 1);
        }

        set defaultGroupStrokeWidth(value) {
          this.setAttribute("default-group-stroke-width", value);
        }

        get defaultGroupType() {
          return getter(this, "default-group-type", "rect");
        }

        set defaultGroupType(value) {
          this.setAttribute("default-group-type", value);
        }

        get defaultGroupVisibility() {
          return getter(this, "default-group-visibility", true);
        }

        set defaultGroupVisibility(value) {
          this.setAttribute("default-group-visibility", value);
        }

        get defaultGroupLabel() {
          return getter(this, "default-group-label", "");
        }

        set defaultGroupLabel(value) {
          this.setAttribute("default-group-label", value);
        }

        get defaultGroupLabelDx() {
          return getter(this, "default-group-label-dx", 0);
        }

        set defaultGroupLabelDx(value) {
          this.setAttribute("default-group-label-dx", value);
        }

        get defaultGroupLabelDy() {
          return getter(this, "default-group-label-dy", 0);
        }

        set defaultGroupLabelDy(value) {
          this.setAttribute("default-group-label-dy", value);
        }

        get defaultGroupLabelDxBase() {
          return getter(this, "default-group-label-dx-base", "center");
        }

        set defaultGroupLabelDxBase(value) {
          this.setAttribute("default-group-label-dx-base", value);
        }

        get defaultGroupLabelDyBase() {
          return getter(this, "default-group-label-dy-base", "middle");
        }

        set defaultGroupLabelDyBase(value) {
          this.setAttribute("default-group-label-dy-base", value);
        }

        get defaultGroupLabelFillColor() {
          return getter(this, "default-group-label-fill-color", "#000");
        }

        set defaultGroupLabelFillColor(value) {
          this.setAttribute("default-group-label-fill-color", value);
        }

        get defaultGroupLabelFillOpacity() {
          return getter(this, "default-group-label-fill-opacity", 1);
        }

        set defaultGroupLabelFillOpacity(value) {
          this.setAttribute("default-group-label-fill-opacity", value);
        }

        get defaultGroupLabelStrokeColor() {
          return getter(this, "default-group-label-stroke-color", "#fff");
        }

        set defaultGroupLabelStrokeColor(value) {
          this.setAttribute("default-group-label-stroke-color", value);
        }

        get defaultGroupLabelStrokeOpacity() {
          return getter(this, "default-group-label-stroke-opacity", 1);
        }

        set defaultGroupLabelStrokeOpacity(value) {
          this.setAttribute("default-group-label-stroke-opacity", value);
        }

        get defaultGroupLabelStrokeWidth() {
          return getter(this, "default-group-label-stroke-width", 0);
        }

        set defaultGroupLabelStrokeWidth(value) {
          this.setAttribute("default-group-label-stroke-width", value);
        }

        get defaultGroupLabelFontSize() {
          return getter(this, "default-group-label-font-size", 10);
        }

        set defaultGroupLabelFontSize(value) {
          this.setAttribute("default-group-label-font-size", value);
        }

        get defaultGroupLabelFontFamily() {
          return getter(this, "default-group-label-font-family", "serif");
        }

        set defaultGroupLabelFontFamily(value) {
          this.setAttribute("default-group-label-font-family", value);
        }

        get defaultGroupLabelTextAlign() {
          return getter(this, "default-group-label-text-align", "center");
        }

        set defaultGroupLabelTextAlign(value) {
          this.setAttribute("default-group-label-text-align", value);
        }

        get defaultNodeX() {
          return getter(this, "default-node-x", 0);
        }

        set defaultNodeX(value) {
          this.setAttribute("default-node-x", value);
        }

        get defaultNodeY() {
          return getter(this, "default-node-y", 0);
        }

        set defaultNodeY(value) {
          this.setAttribute("default-node-y", value);
        }

        get defaultNodeWidth() {
          return getter(this, "default-node-width", 10);
        }

        set defaultNodeWidth(value) {
          this.setAttribute("default-node-width", value);
        }

        get defaultNodeHeight() {
          return getter(this, "default-node-height", 10);
        }

        set defaultNodeHeight(value) {
          this.setAttribute("default-node-height", value);
        }

        get defaultNodeFillColor() {
          return getter(this, "default-node-fill-color", "#fff");
        }

        set defaultNodeFillColor(value) {
          this.setAttribute("default-node-fill-color", value);
        }

        get defaultNodeFillOpacity() {
          return getter(this, "default-node-fill-opacity", 1);
        }

        set defaultNodeFillOpacity(value) {
          this.setAttribute("default-node-fill-opacity", value);
        }

        get defaultNodeStrokeColor() {
          return getter(this, "default-node-stroke-color", "#000");
        }

        set defaultNodeStrokeColor(value) {
          this.setAttribute("default-node-stroke-color", value);
        }

        get defaultNodeStrokeOpacity() {
          return getter(this, "default-node-stroke-opacity", 1);
        }

        set defaultNodeStrokeOpacity(value) {
          this.setAttribute("default-node-stroke-opacity", value);
        }

        get defaultNodeStrokeWidth() {
          return getter(this, "default-node-stroke-width", 1);
        }

        set defaultNodeStrokeWidth(value) {
          this.setAttribute("default-node-stroke-width", value);
        }

        get defaultNodeType() {
          return getter(this, "default-node-type", "circle");
        }

        set defaultNodeType(value) {
          this.setAttribute("default-node-type", value);
        }

        get defaultNodeVisibility() {
          return getter(this, "default-node-visibility", true);
        }

        set defaultNodeVisibility(value) {
          this.setAttribute("default-node-visibility", value);
        }

        get defaultNodeLabel() {
          return getter(this, "default-node-label", "");
        }

        set defaultNodeLabel(value) {
          this.setAttribute("default-node-label", value);
        }

        get defaultNodeLabelDx() {
          return getter(this, "default-node-label-dx", 0);
        }

        set defaultNodeLabelDx(value) {
          this.setAttribute("default-node-label-dx", value);
        }

        get defaultNodeLabelDy() {
          return getter(this, "default-node-label-dy", 0);
        }

        set defaultNodeLabelDy(value) {
          this.setAttribute("default-node-label-dy", value);
        }

        get defaultNodeLabelDxBase() {
          return getter(this, "default-node-label-dx-base", "center");
        }

        set defaultNodeLabelDxBase(value) {
          this.setAttribute("default-node-label-dx-base", value);
        }

        get defaultNodeLabelDyBase() {
          return getter(this, "default-node-label-dy-base", "middle");
        }

        set defaultNodeLabelDyBase(value) {
          this.setAttribute("default-node-label-dy-base", value);
        }

        get defaultNodeLabelFillColor() {
          return getter(this, "default-node-label-fill-color", "#000");
        }

        set defaultNodeLabelFillColor(value) {
          this.setAttribute("default-node-label-fill-color", value);
        }

        get defaultNodeLabelFillOpacity() {
          return getter(this, "default-node-label-fill-opacity", 1);
        }

        set defaultNodeLabelFillOpacity(value) {
          this.setAttribute("default-node-label-fill-opacity", value);
        }

        get defaultNodeLabelStrokeColor() {
          return getter(this, "default-node-label-stroke-color", "#fff");
        }

        set defaultNodeLabelStrokeColor(value) {
          this.setAttribute("default-node-label-stroke-color", value);
        }

        get defaultNodeLabelStrokeOpacity() {
          return getter(this, "default-node-label-stroke-opacity", 1);
        }

        set defaultNodeLabelStrokeOpacity(value) {
          this.setAttribute("default-node-label-stroke-opacity", value);
        }

        get defaultNodeLabelStrokeWidth() {
          return getter(this, "default-node-label-stroke-width", 0);
        }

        set defaultNodeLabelStrokeWidth(value) {
          this.setAttribute("default-node-label-stroke-width", value);
        }

        get defaultNodeLabelFontSize() {
          return getter(this, "default-node-label-font-size", 10);
        }

        set defaultNodeLabelFontSize(value) {
          this.setAttribute("default-node-label-font-size", value);
        }

        get defaultNodeLabelFontFamily() {
          return getter(this, "default-node-label-font-family", "serif");
        }

        set defaultNodeLabelFontFamily(value) {
          this.setAttribute("default-node-label-font-family", value);
        }

        get defaultNodeLabelTextAlign() {
          return getter(this, "default-node-label-text-align", "center");
        }

        set defaultNodeLabelTextAlign(value) {
          this.setAttribute("default-node-label-text-align", value);
        }

        get defaultLinkStrokeColor() {
          return getter(this, "default-link-stroke-color", "#000");
        }

        set defaultLinkStrokeColor(value) {
          this.setAttribute("default-link-stroke-color", value);
        }

        get defaultLinkStrokeOpacity() {
          return getter(this, "default-link-stroke-opacity", 1);
        }

        set defaultLinkStrokeOpacity(value) {
          this.setAttribute("default-link-stroke-opacity", value);
        }

        get defaultLinkStrokeWidth() {
          return getter(this, "default-link-stroke-width", 1);
        }

        set defaultLinkStrokeWidth(value) {
          this.setAttribute("default-link-stroke-width", value);
        }

        get defaultLinkType() {
          return getter(this, "default-link-type", "line");
        }

        set defaultLinkType(value) {
          this.setAttribute("default-link-type", value);
        }

        get defaultLinkVisibility() {
          return getter(this, "default-link-visibility", true);
        }

        set defaultLinkVisibility(value) {
          this.setAttribute("default-link-visibility", value);
        }

        get defaultLinkSourceMarkerShape() {
          return getter(this, "default-link-source-marker-shape", "none");
        }

        set defaultLinkSourceMarkerShape(value) {
          this.setAttribute("default-link-source-marker-shape", value);
        }

        get defaultLinkSourceMarkerSize() {
          return getter(this, "default-link-source-marker-size", 5);
        }

        set defaultLinkSourceMarkerSize(value) {
          this.setAttribute("default-link-source-marker-size", value);
        }

        get defaultLinkTargetMarkerShape() {
          return getter(this, "default-link-target-marker-shape", "none");
        }

        set defaultLinkTargetMarkerShape(value) {
          this.setAttribute("default-link-target-marker-shape", value);
        }

        get defaultLinkTargetMarkerSize() {
          return getter(this, "default-link-target-marker-size", 5);
        }

        set defaultLinkTargetMarkerSize(value) {
          this.setAttribute("default-link-target-marker-size", value);
        }

        get defaultLinkLabel() {
          return getter(this, "default-link-label", "");
        }

        set defaultLinkLabel(value) {
          this.setAttribute("default-link-label", value);
        }

        get defaultLinkLabelDx() {
          return getter(this, "default-link-label-dx", 0);
        }

        set defaultLinkLabelDx(value) {
          this.setAttribute("default-link-label-dx", value);
        }

        get defaultLinkLabelDy() {
          return getter(this, "default-link-label-dy", 0);
        }

        set defaultLinkLabelDy(value) {
          this.setAttribute("default-link-label-dy", value);
        }

        get defaultLinkLabelDxBase() {
          return getter(this, "default-link-label-dx-base", "center");
        }

        set defaultLinkLabelDxBase(value) {
          this.setAttribute("default-link-label-dx-base", value);
        }

        get defaultLinkLabelDyBase() {
          return getter(this, "default-link-label-dy-base", "middle");
        }

        set defaultLinkLabelDyBase(value) {
          this.setAttribute("default-link-label-dy-base", value);
        }

        get defaultLinkLabelFillColor() {
          return getter(this, "default-link-label-fill-color", "#000");
        }

        set defaultLinkLabelFillColor(value) {
          this.setAttribute("default-link-label-fill-color", value);
        }

        get defaultLinkLabelFillOpacity() {
          return getter(this, "default-link-label-fill-opacity", 1);
        }

        set defaultLinkLabelFillOpacity(value) {
          this.setAttribute("default-link-label-fill-opacity", value);
        }

        get defaultLinkLabelStrokeColor() {
          return getter(this, "default-link-label-stroke-color", "#fff");
        }

        set defaultLinkLabelStrokeColor(value) {
          this.setAttribute("default-link-label-stroke-color", value);
        }

        get defaultLinkLabelStrokeOpacity() {
          return getter(this, "default-link-label-stroke-opacity", 1);
        }

        set defaultLinkLabelStrokeOpacity(value) {
          this.setAttribute("default-link-label-stroke-opacity", value);
        }

        get defaultLinkLabelStrokeWidth() {
          return getter(this, "default-link-label-stroke-width", 0);
        }

        set defaultLinkLabelStrokeWidth(value) {
          this.setAttribute("default-link-label-stroke-width", value);
        }

        get defaultLinkLabelFontSize() {
          return getter(this, "default-link-label-font-size", 10);
        }

        set defaultLinkLabelFontSize(value) {
          this.setAttribute("default-link-label-font-size", value);
        }

        get defaultLinkLabelFontFamily() {
          return getter(this, "default-link-label-font-family", "serif");
        }

        set defaultLinkLabelFontFamily(value) {
          this.setAttribute("default-link-label-font-family", value);
        }

        get defaultLinkLabelTextAlign() {
          return getter(this, "default-link-label-text-align", "center");
        }

        set defaultLinkLabelTextAlign(value) {
          this.setAttribute("default-link-label-text-align", value);
        }

        get data() {
          return privates.get(this).originalData;
        }
      };
    };

    var umd = (wasmUrl) => {
      return init$1(wasmUrl).then((result) => {
        const EgRendererElement = initElement(Renderer);
        window.customElements.define("eg-renderer", EgRendererElement);
      });
    };

    return umd;

}));
