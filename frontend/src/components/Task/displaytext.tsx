import { observer } from 'mobx-react-lite';

import { TaskType } from '@/lib/models/Task';

export const DisplayText: React.VFC<{
  task: TaskType;
  width: number;
  height: number;
}> = observer(({ task, width, height }) => {
  return (
    <foreignObject x="0" y="0" width={width} height={height} fill="none">
      <div style={{ textAlign: 'center', padding: '4px' }}>
        <span>{task.name}</span>
      </div>
    </foreignObject>
  );
});
