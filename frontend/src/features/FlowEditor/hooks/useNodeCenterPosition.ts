import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { diagramCanvasState } from '@/features/Diagrams';

export const useNodeCenterPosition = (position: DOMRect) => {
  const {
    position: { top, left },
  } = useRecoilValue(diagramCanvasState);
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
