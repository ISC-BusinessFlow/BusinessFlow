import { forwardRef } from 'react';

import { BaseTaskProps } from '.';
import { DisplayText } from './displaytext';
import { Label } from './label';

const size = {
  width: 160,
  height: 100,
};

export const Process = forwardRef<SVGGElement, BaseTaskProps>(function Process(
  { task, translate },
  ref
) {
  if (!task || !translate) return null;

  return (
    <g ref={ref} transform={`translate(${translate.x}, ${translate.y})`}>
      <rect
        width={size.width}
        height={size.height}
        fill="#EE8C44"
        stroke="#B36A35"
        strokeWidth="2"
      />
      <DisplayText width={size.width} height={size.height}>
        {task.name}
      </DisplayText>
      {task.label && (
        <Label width={size.width} height={size.height} color="#7936CD">
          {task.label}
        </Label>
      )}
    </g>
  );
});
