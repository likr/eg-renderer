export const layoutRect = (items) => {
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

export const centerTransform = (
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
