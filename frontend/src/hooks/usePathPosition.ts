import { useMemo } from 'react';

import { useNodeCenterPosition } from './useNodeCenterPosition';

export const usePathPosition = ({
  from,
  to,
}: {
  from: DOMRect;
  to: DOMRect;
}) => {
  const { width: fromWidth, height: fromHeight } = from;
  const { width: toWidth, height: toHeight } = to;

  const fromCenter = useNodeCenterPosition(from);
  const toCenter = useNodeCenterPosition(to);

  const dx = fromCenter.x - toCenter.x;
  const dy = fromCenter.y - toCenter.y;

  const slope = dx == 0 ? 1 : Math.abs(dy / dx);
  const reciprocalSlope = dy == 0 ? 1 : Math.abs(1 / slope);

  /**
   * fromやtoの中央座標からどれくらいずらすかを決定するためのパラメータ。
   * fromからtoへのxとyの増加量をもとに計算し、0 ~ 1の値を取る。
   */
  const kx = reciprocalSlope > 1 ? 1 : reciprocalSlope;
  const ky = slope > 1 ? 1 : slope;

  const fromPosition = useMemo(() => {
    return {
      x: fromCenter.x - Math.sign(dx) * kx * fromWidth,
      y: fromCenter.y - Math.sign(dy) * ky * fromHeight,
    };
  }, [fromCenter, fromWidth, fromHeight, dy, dx]);

  const toPosition = useMemo(() => {
    return {
      x: toCenter.x + Math.sign(dx) * kx * toWidth,
      y: toCenter.y + Math.sign(dy) * ky * toHeight,
    };
  }, [toCenter, toWidth, toHeight, dy, dx]);

  return {
    from: fromPosition,
    to: toPosition,
  };
};
