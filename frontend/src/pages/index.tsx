import { Box, Flex, Spacer } from '@chakra-ui/react';

import { FlowList, FlowListType } from '../components/new/FlowListComponent';
import { Toolbar } from '../components/new/ToolbarComponent';

const dummyFlows: FlowListType[] = [
  { id: 1, title: 'Flow1', createdAt: '2022-01-01' },
  { id: 2, title: 'Flow2', createdAt: '2022-01-02' },
  { id: 3, title: 'Flow3', createdAt: '2022-01-03' },
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
