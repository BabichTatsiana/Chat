export function handleMouseMove(
  e,
  resizing,
  startPos,
  startSize,
  setWindowSize
) {
  const minWidth = 360;
  const minHeight = 400;
  if (resizing) {
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    const newWidth = Math.max(startSize.width + deltaX, minWidth);
    const newHeight = Math.max(startSize.height + deltaY, minHeight);
    setWindowSize({ width: newWidth, height: newHeight });
  }
}

export function handleMouseUp(e, setResizing) {
  setResizing(false);
}

export function handleMouseLeave(e, resizing, setResizing) {
  if (resizing) {
    setResizing(false);
  }
}
export function handleMouseDown(
  e,
  setResizing,
  setStartPos,
  setStartSize,
  windowSize
) {
  e.preventDefault();
  setResizing(true);
  setStartPos({ x: e.clientX, y: e.clientY });
  setStartSize({ width: windowSize.width, height: windowSize.height });
  document.addEventListener("mousemove", handleMouseMove);
}
