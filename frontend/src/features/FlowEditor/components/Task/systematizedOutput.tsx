import { forwardRef } from 'react';

import { BaseTaskProps } from '.';
import { DisplayText } from './displaytext';
import { Label } from './label';

const size = {
  width: 160,
  height: 110,
};

export const Output = forwardRef<SVGGElement, BaseTaskProps>(function Output(
  { task, translate },
  ref
) {
  if (!task || !translate) return null;

  return (
    <g ref={ref} transform={`translate(${translate.x}, ${translate.y})`}>
      <path
        d="M1 1H159V92.3664C117.561 92.4578 96.4233 98.2203 79.1207 102.937C77.0329 103.507 75.0009 104.061 72.9958 104.588C63.6556 107.042 54.9344 108.9 43.8351 108.996C32.8751 109.091 19.5513 107.468 1 102.954V1Z"
        fill="#A3C6FB"
        stroke="#7F9AC2"
        strokeWidth="2"
      />
      <DisplayText width={size.width} height={size.height - 17}>
        {task.name}
      </DisplayText>
      {task.label && (
        <Label width={size.width} height={size.height} color="#FFE589">
          {task.label}
        </Label>
      )}
    </g>
  );
});
