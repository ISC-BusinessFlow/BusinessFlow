import { observer } from 'mobx-react-lite';

import { usePathPosition } from '@/hooks/usePathPosition';
import { Path as PathType } from '@/lib/models/Path';

export const Path: React.VFC<{
  path: PathType;
  from: DOMRect;
  to: DOMRect;
}> = observer(({ from, to }) => {
  const { from: fromPos, to: toPos } = usePathPosition({ from, to });

  return (
    <line
      x1={fromPos.x}
      y1={fromPos.y}
      x2={toPos.x}
      y2={toPos.y}
      stroke="black"
      strokeWidth={3}
      markerEnd="url(#arrowhead)"
    />
  );
});
