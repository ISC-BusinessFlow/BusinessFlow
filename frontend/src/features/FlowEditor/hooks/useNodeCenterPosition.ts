import { useDiagramCanvas } from '@Diagrams';
import { useMemo } from 'react';

export const useNodeCenterPosition = (position: DOMRect) => {
  const {
    position: { top, left },
  } = useDiagramCanvas();
  const {
    left: nodeLeft,
    top: nodeTop,
    width: nodeWidth,
    height: nodeHeight,
  } = position;

  const x = useMemo(
    () => nodeLeft + nodeWidth / 2 - left,
    [nodeLeft, nodeWidth, left]
  );

  const y = useMemo(
    () => nodeTop + nodeHeight / 2 - top,
    [nodeTop, nodeHeight, top]
  );

  return { x, y };
};
