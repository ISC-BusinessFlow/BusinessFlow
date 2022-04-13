import { Path } from '@FlowEditor/store';

import { Label } from './label';

export const Transmission: React.VFC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
  path: Path;
}> = ({ fromPos, toPos, path }) => {
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
      {path.label && (
        <Label fromPos={fromPos} toPos={toPos}>
          {path.label}
        </Label>
      )}
    </g>
  );
};
