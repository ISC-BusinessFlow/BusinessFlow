import { observer } from 'mobx-react-lite';

import { TaskType } from '@/lib/Task';

export const DisplayText: React.VFC<{
  task: TaskType;
  height: number;
  width: number;
}> = observer(({ task, width, height }) => {
  return (
    <foreignObject
      x={task.x}
      y={task.y}
      width={width}
      height={height}
      fill="none"
    >
      <div style={{ textAlign: 'center', padding: '4px' }}>
        <span>{task.label}</span>
      </div>
    </foreignObject>
  );
});
