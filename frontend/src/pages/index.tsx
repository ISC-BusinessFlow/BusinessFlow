import { Box, Flex, Spacer } from '@chakra-ui/react';

import { FlowList } from '@/components/new/FlowListComponent';
import { Toolbar } from '@/components/new/ToolbarComponent';
import { FlowType } from '@/lib/Flow';

const dummyFlows: FlowType[] = [
  { id: 1, name: 'Flow1', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
  { id: 2, name: 'Flow2', createdAt: '2022-01-02', updatedAt: '2022-01-01' },
  { id: 3, name: 'Flow3', createdAt: '2022-01-03', updatedAt: '2022-01-01' },
];

const New = () => {
  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        Header
      </Box>
      <Toolbar></Toolbar>
      <Spacer />
      <Flex>
        <FlowList flows={dummyFlows} />
      </Flex>
    </>
  );
};

export default New;
