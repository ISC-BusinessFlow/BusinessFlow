import { observer } from 'mobx-react-lite';

import { usePathPosition } from '@/hooks/usePathPosition';
import { Path as PathType } from '@/lib/models/Path';

import { Transition } from './transition';
import { Transmission } from './transmission';

export const Path: React.VFC<{
  path: PathType;
  from: DOMRect;
  to: DOMRect;
}> = observer(({ path, from, to }) => {
  const { from: fromPos, to: toPos } = usePathPosition({ from, to });

  switch (path.id) {
    case 1:
      return <Transition fromPos={fromPos} toPos={toPos} />;
    case 2:
      return <Transmission fromPos={fromPos} toPos={toPos} />;
    default:
      return null;
  }
});
