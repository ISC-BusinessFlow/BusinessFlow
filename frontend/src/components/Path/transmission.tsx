import { observer } from 'mobx-react-lite';

export const Transmission: React.VFC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}> = observer(({ fromPos, toPos }) => {
  //プロトタイプではパスが斜めになる可能性があるため、終端の図形の角度を合わせるような処理を追加してます
  const arrowAngle = (): number => {
    if (fromPos.x === toPos.x) {
      return 0;
    } else {
      return (
        Math.abs(Math.atan2(toPos.x - fromPos.x, toPos.y - fromPos.y) * 180) /
        Math.PI
      );
    }
  };

  const path_d = `M${toPos.x + 10} ${toPos.y - 22}
  L${toPos.x - 1.5} ${toPos.y + 16}
  V${toPos.y}
  L${toPos.x + 10} ${toPos.y - 22}
  Z`;

  const trans = `rotate(${arrowAngle()} ${toPos.x} ${toPos.y})`;

  return (
    <g>
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke="#598CD8"
        strokeWidth="3"
      />
      <path d={path_d} fill="#598CD8" transform={trans} />
    </g>
  );
});
