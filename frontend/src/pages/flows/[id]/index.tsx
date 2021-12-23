import { Box } from '@chakra-ui/react';

import { Diagram } from '@/components/Diagram';
import { DiagramProvider } from '@/diagrams';
import { Actor } from '@/lib/Actor';
import { Flow } from '@/lib/Flow';
import { Path } from '@/lib/Path';
import { Task } from '@/lib/Task';

const flow = new Flow({ id: 1, name: 'sample' });
const actor1 = new Actor({
  id: 1,
  name: 'test1',
  createdAt: '',
  updatedAt: '',
});
const actor2 = new Actor({
  id: 2,
  name: 'test2',
  createdAt: '',
  updatedAt: '',
});

const task1 = new Task({
  id: 1,
  x: 100,
  y: 40,
  type: '',
  label: '',
  description: '',
});
const task2 = new Task({
  id: 2,
  x: 300,
  y: 40,
  type: '',
  label: '',
  description: '',
});

const path1 = new Path({ id: 1, from: 1, to: 2, type: '' });

flow.createActor(actor1);
flow.createActor(actor2);

actor1.createTask(task1);
actor2.createTask(task2);

flow.createPath(path1);

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
