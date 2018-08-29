interface Size {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

function getCoverSizeFixVertical(source: Size, target: Size): { size: Size; point: Point } {
  const size = {
    width: target.width,
    height: (source.height * target.width) / source.width,
  };

  const point = {
    x: 0,
    y: size.height / -2 + target.height / 2,
  };

  return { size, point };
}

function getCoverSizeFixHorizontal(source: Size, target: Size): { size: Size; point: Point } {
  const size = {
    width: (source.width * target.height) / source.height,
    height: target.height,
  };

  const point = {
    x: (size.width - target.width) / -2,
    y: 0,
  };

  return { size, point };
}

export default function getCoverSize(source: Size, target: Size): { size: Size; point: Point } {
  const targetRatio = { x: 1, y: target.height / target.width };
  const sourceRatio = { x: 1, y: source.height / source.width };
  const isVerticalTarget = targetRatio.x <= targetRatio.y;
  const isVerticalSource = sourceRatio.x <= sourceRatio.y;

  if (isVerticalTarget === isVerticalSource) {
    return sourceRatio.y < targetRatio.y
      ? getCoverSizeFixHorizontal(source, target)
      : getCoverSizeFixVertical(source, target);
  } else {
    return isVerticalTarget && !isVerticalSource
      ? getCoverSizeFixHorizontal(source, target)
      : getCoverSizeFixVertical(source, target);
  }
}
