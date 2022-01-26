import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { TaskType } from '@/lib/models/Task';

export const Label: React.VFC<{
  task: TaskType;
  width: number;
  height: number;
  color?: string;
}> = observer(({ task, width, height, color = '#FFE589' }) => {
  const labelSize = {
    x: 160,
    y: 70,
  };
  const labelPos = {
    x: width / 2,
    y: height / 2 + 10,
  };
  const textAreaSize = {
    x: 120,
    y: 44,
  };
  const textAreaPos = {
    x: labelSize.x / 2 - textAreaSize.x / 2,
    y: labelSize.y / 2 - textAreaSize.y / 2,
  };
  const borderColor = () => {};

  return (
    <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
      <path
        d="M159.5 35C159.5 39.6671 157.34 44.1526 153.354 48.2761C149.365 52.4019 143.569 56.1403 136.368 59.2907C121.968 65.5908 102.039 69.5 80 69.5C57.9609 69.5 38.0321 65.5908 23.6319 59.2907C16.431 56.1403 10.635 52.4019 6.64627 48.2761C2.65984 44.1526 0.5 39.6671 0.5 35C0.5 30.3329 2.65984 25.8474 6.64627 21.724C10.635 17.5981 16.431 13.8597 23.6319 10.7093C38.0321 4.40922 57.9609 0.5 80 0.5C102.039 0.5 121.968 4.40922 136.368 10.7093C143.569 13.8597 149.365 17.5981 153.354 21.724C157.34 25.8474 159.5 30.3329 159.5 35Z"
        fill={color}
        stroke={borderColor()}
      />
      <foreignObject
        x={textAreaPos.x}
        y={textAreaPos.y}
        width={textAreaSize.x}
        height={textAreaSize.y}
        fill="none"
      >
        <Box
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>{task.label}</span>
        </Box>
      </foreignObject>
    </g>
  );
});
