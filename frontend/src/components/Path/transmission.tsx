import { observer } from 'mobx-react-lite';

export const Transmission: React.VFC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}> = observer(({ fromPos, toPos }) => {
  return (
    <>
      <defs>
        <marker
          id="allow-v"
          viewBox="0 0 16 10"
          refX="8"
          refY="8.5"
          markerUnits="userSpaceOnUse"
          markerWidth="16"
          markerHeight="10"
          orient="auto"
        >
          <path d="M0 0L16 10H8L8 10Z" fill="#598CD8" />
        </marker>
      </defs>
      <g>
        <line
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x - 8}
          y2={toPos.y}
          stroke="#598CD8"
          strokeWidth="3"
          markerEnd="url(#allow-v)"
        />
      </g>
    </>
  );
});
