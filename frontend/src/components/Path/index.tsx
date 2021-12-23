import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useDiagramCanvas } from '@/diagrams';
import { Path as PathType } from '@/lib/Path';

const useNodeCenterPosition = (position: DOMRect) => {
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

export const Path: React.VFC<{
  path: PathType;
  from: DOMRect;
  to: DOMRect;
}> = observer(({ from, to }) => {
  const { x: x1, y: y1 } = useNodeCenterPosition(from);
  const { x: x2, y: y2 } = useNodeCenterPosition(to);

  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      stroke="black"
      strokeWidth={3}
      markerEnd="url(#arrowhead)"
    />
  );
});
