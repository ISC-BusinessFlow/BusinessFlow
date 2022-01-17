import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/Task';

import { DataStore } from './dataStore';
import { Input } from './input';
import { Output } from './output';
import { Process } from './process';
import { Receipt } from './receipt';
import { SystematizedOutput } from './systematizedOutput';
import { Trigger } from './trigger';

export const Task: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  //toriaezu
  switch (task.type) {
    case 'trigger':
      return <Trigger task={task} />;
    case 'process':
      return <Process task={task} />;
    case 'input':
      return <Input task={task} />;
    case 'output':
      return <Output task={task} />;
    case 'receipt':
      return <Receipt task={task} />;
    case 'systematizedOutput':
      return <SystematizedOutput task={task} />;
    case 'dataStore':
      return <DataStore task={task} />;
    default:
      return <rect x={task.x} y={task.y} width="40" height="40" />;
  }
});
