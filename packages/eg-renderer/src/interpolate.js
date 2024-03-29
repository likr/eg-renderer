import { interpolateRgb as d3InterpolateRgb } from "d3-interpolate";

const interpolate = (current, next, r) => {
  return (next - current) * r + current;
};

export const interpolateGroup = (current, next, r) => {
  return interpolateVertex(current, next, r);
};

export const interpolateVertex = (current, next, r) => {
  const copyProperties = ["u", "type", "label", "labelFontFamily", "d"];
  const interpolateProperties = [
    "x",
    "y",
    "width",
    "height",
    "strokeWidth",
    "labelStrokeWidth",
    "labelFontSize",
    "alpha",
  ];
  const colorInterpolateProperties = [
    "fillColor",
    "strokeColor",
    "labelFillColor",
    "labelStrokeColor",
  ];
  const result = {};
  for (const p of copyProperties) {
    result[p] = next[p];
  }
  for (const p of interpolateProperties) {
    result[p] = interpolate(current[p], next[p], r);
  }
  for (const p of colorInterpolateProperties) {
    result[p] = d3InterpolateRgb(current[p], next[p])(r);
  }
  return result;
};

export const interpolateEdge = (current, next, r) => {
  const copyProperties = [
    "u",
    "v",
    "type",
    "sourceMarkerShape",
    "targetMarkerShape",
    "label",
    "labelFontFamily",
    "d",
  ];
  const interpolateProperties = [
    "strokeWidth",
    "sourceMarkerSize",
    "targetMarkerSize",
    "labelStrokeWidth",
    "labelFontSize",
    "alpha",
  ];
  const colorInterpolateProperties = [
    "strokeColor",
    "labelFillColor",
    "labelStrokeColor",
  ];
  const result = {};
  for (const p of copyProperties) {
    result[p] = next[p];
  }
  for (const p of interpolateProperties) {
    result[p] = interpolate(current[p], next[p], r);
  }
  for (const p of colorInterpolateProperties) {
    result[p] = d3InterpolateRgb(current[p], next[p])(r);
  }
  result.points = current.points.map(([x, y], i) => [
    interpolate(x, next.points[i][0], r),
    interpolate(y, next.points[i][1], r),
  ]);
  return result;
};

export const diff = (current, next) => {
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
