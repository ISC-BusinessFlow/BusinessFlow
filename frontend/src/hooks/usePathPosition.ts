import { useMemo } from 'react';

import { useNodeCenterPosition } from './useNodeCenterPosition';

type SpaceOption = {
  spaceY?: number;
  spaceX?: number;
};

export const usePathPosition = ({
  from,
  to,
  option,
}: {
  from: DOMRect;
  to: DOMRect;
  option?: {
    from?: SpaceOption;
    to?: SpaceOption;
  };
}) => {
  const { width: fromWidth, height: fromHeight } = from;
  const { width: toWidth, height: toHeight } = to;

  const fromCenter = useNodeCenterPosition(from);
  const toCenter = useNodeCenterPosition(to);

  const dx = fromCenter.x - toCenter.x;
  const dy = fromCenter.y - toCenter.y;

  const ky = dx == 0 ? 1 : Math.abs(dy / dx);
  const kx = dy == 0 ? 1 : Math.abs(1 / ky);

  const getDistance = (
    size: { height: number; width: number },
    option?: { spaceY?: number; spaceX?: number }
  ) => {
    const { spaceX = 15, spaceY = 15 } = option ?? {};
    const h = size.height / 2;
    const w = size.width / 2;

    return ky === kx
      ? {
          y: h + spaceY,
          x: w + spaceX,
        }
      : ky > kx
      ? {
          y: h + spaceY,
          x: kx * (h + spaceX),
        }
      : {
          y: ky * (w + spaceY),
          x: w + spaceX,
        };
  };

  const fromPosition = useMemo(() => {
    const { y, x } = getDistance(from, option?.from);
    return {
      x: fromCenter.x - Math.sign(dx) * x,
      y: fromCenter.y - Math.sign(dy) * y,
    };
  }, [fromCenter, fromWidth, fromHeight, dy, dx]);

  const toPosition = useMemo(() => {
    const { y, x } = getDistance(to, option?.to);
    return {
      x: toCenter.x + Math.sign(dx) * x,
      y: toCenter.y + Math.sign(dy) * y,
    };
  }, [toCenter, toWidth, toHeight, dy, dx]);

  return {
    from: fromPosition,
    to: toPosition,
  };
};
