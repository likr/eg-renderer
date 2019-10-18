pub const SHAPE_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aAlpha0;
layout(location = 2) in float aAlpha1;
layout(location = 3) in vec4 aColor0;
layout(location = 4) in vec4 aColor1;
layout(location = 5) in vec2 aCenterPosition0;
layout(location = 6) in vec2 aCenterPosition1;
layout(location = 7) in vec2 aSize0;
layout(location = 8) in vec2 aSize1;
layout(location = 9) in vec4 aStrokeColor0;
layout(location = 10) in vec4 aStrokeColor1;
layout(location = 11) in float aStrokeWidth0;
layout(location = 12) in float aStrokeWidth1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vPosition;
out vec4 vColor;
out vec2 vCenterPosition;
out vec2 vSize;
out vec4 vStrokeColor;
out float vStrokeWidth;

void main() {
    vStrokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    vSize = mix(aSize0, aSize1, r);
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vPosition = aPosition * (vSize + vStrokeWidth) + vCenterPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;

    vStrokeColor = mix(aStrokeColor0, aStrokeColor1, r);
    vStrokeColor.a *= alpha;
}
"#;

pub const CIRCLE_SHAPE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
in vec4 vStrokeColor;
in float vStrokeWidth;
out vec4 oFragColor;

float calcR(vec2 size, float theta) {
    vec2 tmp = vec2(1.0 / size.x, tan(theta) / size.y);
    float x = sqrt(1.0 / dot(tmp, tmp));
    float y = x * tan(theta);
    vec2 v = vec2(x, y);
    return sqrt(dot(v, v));
}

void main() {
    vec2 pos = vPosition - vCenterPosition;
    float theta = atan(pos.y, pos.x);
    float outerR = calcR((vSize + vStrokeWidth) / 2.0, theta);
    float innerR = calcR((vSize - vStrokeWidth) / 2.0, theta);
    float d = sqrt(dot(pos, pos));

    if (d > outerR) {
        discard;
    } else if (d > innerR) {
        oFragColor = vStrokeColor;
    } else {
        oFragColor = vColor;
    }
}
"#;

pub const RECTANGLE_SHAPE_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec4 vColor;
in vec2 vCenterPosition;
in vec2 vSize;
in vec4 vStrokeColor;
in float vStrokeWidth;
out vec4 oFragColor;
void main() {
    vec2 v = abs(vPosition - vCenterPosition) - (vSize - vStrokeWidth) / 2.0;
    if (v.x > 0.0 || v.y > 0.0) {
        oFragColor = vStrokeColor;
    } else {
        oFragColor = vColor;
    }
}
"#;

pub const STRAIGHT_LINK_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aPosition10;
layout(location = 2) in vec2 aPosition11;
layout(location = 3) in vec2 aPosition20;
layout(location = 4) in vec2 aPosition21;
layout(location = 5) in float aStrokeWidth0;
layout(location = 6) in float aStrokeWidth1;
layout(location = 7) in float aAlpha0;
layout(location = 8) in float aAlpha1;
layout(location = 9) in vec4 aColor0;
layout(location = 10) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;

void main() {
    vec2 position1 = mix(aPosition10, aPosition11, r);
    vec2 position2 = mix(aPosition20, aPosition21, r);
    vec2 centerPosition = (position1 + position2) / 2.0;
    vec2 diff = position2 - position1;
    float t = atan(diff.y, diff.x);

    float strokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    vec2 size = vec2(length(diff), strokeWidth);
    vec2 pos = aPosition * size;
    float x = pos.x * cos(t) - pos.y * sin(t) + centerPosition.x;
    float y = pos.x * sin(t) + pos.y * cos(t) + centerPosition.y;
    gl_Position = uPMatrix * uMVMatrix * vec4(x, y, 1.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

pub const ARC_LINK_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aPosition10;
layout(location = 2) in vec2 aPosition11;
layout(location = 3) in vec2 aPosition20;
layout(location = 4) in vec2 aPosition21;
layout(location = 5) in float aStrokeWidth0;
layout(location = 6) in float aStrokeWidth1;
layout(location = 7) in float aAlpha0;
layout(location = 8) in float aAlpha1;
layout(location = 9) in vec4 aColor0;
layout(location = 10) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;

void main() {
    vec2 position1 = mix(aPosition10, aPosition11, r);
    vec2 position2 = mix(aPosition20, aPosition21, r);
    vec2 centerPosition = (position1 + position2) / 2.0;
    vec2 diff = position2 - position1;
    float t = atan(diff.y, diff.x);

    float strokeWidth = mix(aStrokeWidth0, aStrokeWidth1, r);
    float radius = (length(diff) + (gl_VertexID % 2 == 0 ? strokeWidth : -strokeWidth)) / 2.0;
    vec2 pos = aPosition * radius;
    float x = pos.x * cos(t) - pos.y * sin(t) + centerPosition.x;
    float y = pos.x * sin(t) + pos.y * cos(t) + centerPosition.y;
    gl_Position = uPMatrix * uMVMatrix * vec4(x, y, 1.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

pub const LINK_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;
void main() {
    oFragColor = vColor;
}
"#;

pub const LINK_CIRCLE_MARKER_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aCenterPosition0;
layout(location = 2) in vec2 aCenterPosition1;
layout(location = 3) in float aRadius0;
layout(location = 4) in float aRadius1;
layout(location = 5) in float aAlpha0;
layout(location = 6) in float aAlpha1;
layout(location = 7) in vec4 aColor0;
layout(location = 8) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vPosition;
out vec2 vCenterPosition;
out float vRadius;
out vec4 vColor;

void main() {
    vCenterPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vRadius = mix(aRadius0, aRadius1, r);
    vPosition = aPosition * vRadius * 2.0 + vCenterPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 0.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

pub const LINK_CIRCLE_MARKER_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec2 vPosition;
in vec2 vCenterPosition;
in float vRadius;
in vec4 vColor;
out vec4 oFragColor;

void main() {
    vec2 pos = vPosition - vCenterPosition;
    float d = sqrt(dot(pos, pos));

    if (d > vRadius) {
        discard;
    } else {
        oFragColor = vColor;
    }
}
"#;

pub const LINK_TRIANGLE_MARKER_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aCenterPosition0;
layout(location = 2) in vec2 aCenterPosition1;
layout(location = 3) in vec2 aFromPosition0;
layout(location = 4) in vec2 aFromPosition1;
layout(location = 5) in float aRadius0;
layout(location = 6) in float aRadius1;
layout(location = 7) in float aAlpha0;
layout(location = 8) in float aAlpha1;
layout(location = 9) in vec4 aColor0;
layout(location = 10) in vec4 aColor1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec4 vColor;

void main() {
    vec2 centerPosition = mix(aCenterPosition0, aCenterPosition1, r);
    vec2 fromPosition = mix(aFromPosition0, aFromPosition1, r);
    vec2 diff = centerPosition - fromPosition;
    float t = atan(diff.y, diff.x);

    float radius = mix(aRadius0, aRadius1, r);
    vec2 pos = aPosition * radius;
    float x = pos.x * cos(t) - pos.y * sin(t) + centerPosition.x;
    float y = pos.x * sin(t) + pos.y * cos(t) + centerPosition.y;
    gl_Position = uPMatrix * uMVMatrix * vec4(x, y, 1.0, 1.0);

    float alpha = mix(aAlpha0, aAlpha1, r);
    vColor = mix(aColor0, aColor1, r);
    vColor.a *= alpha;
}
"#;

pub const LINK_TRIANGLE_MARKER_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 oFragColor;

void main() {
    oFragColor = vColor;
}
"#;

pub const LABEL_VERTEX_SHADER_SOURCE: &str = r#"#version 300 es
layout(location = 0) in vec2 aTextureCoord;
layout(location = 1) in vec2 aPosition0;
layout(location = 2) in vec2 aPosition1;
layout(location = 3) in float aAlpha0;
layout(location = 4) in float aAlpha1;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float r;
out vec2 vTextureCoord;
out float vAlpha;

void main() {
    vTextureCoord = aTextureCoord;
    vAlpha = mix(aAlpha0, aAlpha1, r);
    vec2 pos = mix(aPosition0, aPosition1, r);
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 0.0, 1.0);
}
"#;

pub const LABEL_FRAGMENT_SHADER_SOURCE: &str = r#"#version 300 es
precision mediump float;
uniform sampler2D image;
in vec2 vTextureCoord;
in float vAlpha;
out vec4 oFragColor;

void main() {
    vec4 smpColor = texture(image, vTextureCoord);
    oFragColor = smpColor;
    oFragColor.a *= vAlpha;
}
"#;
