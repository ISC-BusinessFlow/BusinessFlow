import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { TaskType } from '@/lib/models/Task';

export const DisplayText: React.VFC<{
  task: TaskType;
  x?: number;
  y?: number;
  width: number;
  height: number;
}> = observer(({ task, x = 0, y = 0, width, height }) => {
  return (
    <foreignObject x={x} y={y} width={width} height={height} fill="none">
      <Box
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{task.name}</span>
      </Box>
    </foreignObject>
  );
});
