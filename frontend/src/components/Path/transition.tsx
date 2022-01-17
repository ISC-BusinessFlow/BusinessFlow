import { observer } from 'mobx-react-lite';

export const Transition: React.VFC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}> = observer(({ fromPos, toPos }) => {
  //プロトタイプではパスが斜めになる可能性があるため、終端の図形の角度を合わせるような処理を追加してます
  const arrowAngle = (): number => {
    if (fromPos.y === toPos.y) {
      return 0;
    } else {
      return (
        Math.abs(Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x) * 180) /
        Math.PI
      );
    }
  };

  const path_d = `M${toPos.x - 22} ${toPos.y - 10}
  L${toPos.x + 16} ${toPos.y + 1.5}
  H${toPos.x}
  L${toPos.x - 22} ${toPos.y - 10}
  Z`;

  const trans = `rotate(${arrowAngle()} ${toPos.x} ${toPos.y})`;

  return (
    <g>
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke="#EE8C44"
        strokeWidth="3"
      />
      <path d={path_d} fill="#EE8C44" transform={trans} />
    </g>
  );
});
