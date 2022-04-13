import { usePathPosition } from '@FlowEditor/hooks/usePathPosition';
import { pathPositionState, pathState } from '@FlowEditor/store';
import { useRecoilValue } from 'recoil';

import { Transition } from './transition';
import { Transmission } from './transmission';

const PathContainer: React.VFC<{ id: number; from: DOMRect; to: DOMRect }> = ({
  id,
  from,
  to,
}) => {
  const path = useRecoilValue(pathState(id));
  const { from: fromPos, to: toPos } = usePathPosition({
    from,
    to,
  });
  if (!path) return null;

  switch (path.pathTypeId) {
    case 1:
      return <Transition fromPos={fromPos} toPos={toPos} />;
    case 2:
      return <Transmission fromPos={fromPos} toPos={toPos} path={path} />;
    default:
      return null;
  }
};

export const Path: React.VFC<{ id: number }> = ({ id }) => {
  const path = useRecoilValue(pathState(id));
  const pathPosition = useRecoilValue(pathPositionState(id));
  if (!pathPosition || !path) return null;

  return (
    <PathContainer id={id} from={pathPosition.from} to={pathPosition.to} />
  );
};
