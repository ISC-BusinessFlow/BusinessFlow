import { Box } from '@chakra-ui/react';

import { Diagram } from '@/components/Diagram';
import { DiagramProvider } from '@/diagrams';
import { Actor } from '@/lib/Actor';
import { Flow } from '@/lib/Flow';
import { Path } from '@/lib/Path';
import { Task } from '@/lib/Task';

const flow = new Flow({ id: 1, name: 'sample', createdAt: '', updatedAt: '' });
const actor1 = new Actor({
  id: 1,
  flowId: 1,
  name: 'test1',
  createdAt: '',
  updatedAt: '',
});
const actor2 = new Actor({
  id: 2,
  flowId: 1,
  name: 'test2',
  createdAt: '',
  updatedAt: '',
});

const task1 = new Task({
  id: 1,
  actorId: 1,
  flowId: 1,
  x: 100,
  y: 30,
  type: 'trigger',
  label: 'trigger',
  description: '',
  createdAt: '',
  updatedAt: '',
});
const task2 = new Task({
  id: 2,
  actorId: 1,
  flowId: 1,
  x: 400,
  y: 30,
  type: 'receipt',
  label: '',
  description: '',
  createdAt: '',
  updatedAt: '',
});

const task3 = new Task({
  id: 3,
  actorId: 1,
  flowId: 1,
  x: 400,
  y: 30,
  type: 'output',
  label: 'output',
  description: '',
  createdAt: '',
  updatedAt: '',
});

const task4 = new Task({
  id: 4,
  actorId: 1,
  flowId: 1,
  x: 700,
  y: 30,
  type: 'process',
  label: 'process',
  description: '',
  createdAt: '',
  updatedAt: '',
});

const task5 = new Task({
  id: 5,
  actorId: 2,
  flowId: 1,
  x: 700,
  y: 30,
  type: 'input',
  label: 'input',
  description: '',
  createdAt: '',
  updatedAt: '',
});

const task6 = new Task({
  id: 6,
  actorId: 1,
  flowId: 1,
  x: 1000,
  y: 30,
  type: 'systematizedOutput',
  label: 'systematizedOutput',
  description: '',
  createdAt: '',
  updatedAt: '',
});
const task7 = new Task({
  id: 7,
  actorId: 2,
  flowId: 1,
  x: 1000,
  y: 30,
  type: 'dataStore',
  label: 'dataStore',
  description: '',
  createdAt: '',
  updatedAt: '',
});

//dataStore

//svgサイズが140 x 70以上だとパスが崩れる

const path1 = new Path({
  id: 1,
  fromTaskId: 2,
  toTaskId: 3,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});

const path2 = new Path({
  id: 2,
  fromTaskId: 1,
  toTaskId: 2,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});

const path3 = new Path({
  id: 3,
  fromTaskId: 2,
  toTaskId: 4,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});
const path4 = new Path({
  id: 4,
  fromTaskId: 4,
  toTaskId: 5,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});
const path5 = new Path({
  id: 5,
  fromTaskId: 4,
  toTaskId: 6,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});
const path6 = new Path({
  id: 6,
  fromTaskId: 6,
  toTaskId: 7,
  flowId: 1,
  type: '',
  createdAt: '',
  updatedAt: '',
});

flow.createActor(actor1);
flow.createActor(actor2);

actor1.createTask(task1);
actor1.createTask(task2);
actor2.createTask(task3);
actor1.createTask(task4);
actor2.createTask(task5);
actor1.createTask(task6);
actor2.createTask(task7);

flow.createPath(path1);
flow.createPath(path2);
flow.createPath(path3);
flow.createPath(path4);
flow.createPath(path5);
flow.createPath(path6);

const Index = () => {
  return (
    <Box>
      <Box bg="tomato" w="100%" p={4} color="white" as="nav">
        Header
      </Box>
      <Box w="full" position="relative" overscrollX="auto" minW="1440px">
        <DiagramProvider>
          <Diagram flow={flow} />
        </DiagramProvider>
      </Box>
    </Box>
  );
};

export default Index;
