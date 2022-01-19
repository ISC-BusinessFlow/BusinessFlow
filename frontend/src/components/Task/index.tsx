import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DataStore } from './dataStore';
import { Input } from './input';
import { Output } from './output';
import { Process } from './process';
import { Receipt } from './receipt';
import { SystematizedOutput } from './systematizedOutput';
import { Trigger } from './trigger';

export const Task: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  switch (task.id) {
    case 1:
      return <Trigger task={task} />;
    case 2:
      return <SystematizedOutput task={task} />;
    case 3:
      return <Input task={task} />;
    case 4:
      return <Output task={task} />;
    case 5:
      return <DataStore task={task} />;
    case 6:
      return <Process task={task} />;
    case 7:
      return <Receipt task={task} />;

    default:
      return null;
  }
});
