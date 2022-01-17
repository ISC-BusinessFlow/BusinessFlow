import { observer } from 'mobx-react-lite';

import { usePathPosition } from '@/hooks/usePathPosition';
import { Path as PathType } from '@/lib/Path';

import { Transition } from './transition';
import { Transmission } from './transmission';

export const Path: React.VFC<{
  path: PathType;
  from: DOMRect;
  to: DOMRect;
}> = observer(({ path, from, to }) => {
  const { from: fromPos, to: toPos } = usePathPosition({ from, to });

  switch (path.type) {
    case 'transition':
      return <Transition fromPos={fromPos} toPos={toPos} />;
    case 'transmission':
      return <Transmission fromPos={fromPos} toPos={toPos} />;
    default:
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
  }
});
