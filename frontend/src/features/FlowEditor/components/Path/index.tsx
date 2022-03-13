import { pathPositionState, pathState } from '@FlowEditor/store';
import { useRecoilValue } from 'recoil';

import { Transition } from './transition';
import { Transmission } from './transmission';

export const Path: React.VFC<{ id: number }> = ({ id }) => {
  const path = useRecoilValue(pathState(id));
  const pathPosition = useRecoilValue(pathPositionState(id));
  if (!pathPosition || !path) return null;

  switch (path.pathTypeId) {
    case 1:
      return <Transition fromPos={pathPosition.from} toPos={pathPosition.to} />;
    case 2:
      return (
        <Transmission
          fromPos={pathPosition.from}
          toPos={pathPosition.to}
          path={path}
        />
      );
    default:
      return null;
  }
};
