import { observer } from 'mobx-react-lite';

export const Transmission: React.VFC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}> = observer(({ fromPos, toPos }) => {
  return (
    <g>
      <defs>
        <marker
          id="arrowv"
          refX="4"
          refY="2"
          markerWidth="5"
          markerHeight="4"
          orient="auto"
        >
          <polygon points="0 0, 5 2, 0 4" fill="#598CD8" />
        </marker>
      </defs>
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke="#598CD8"
        strokeWidth="3"
        markerEnd="url(#arrowv)"
      />
    </g>
  );
});
