import { Box, Flex } from '@chakra-ui/react';

import { FlowList } from '../components/new/FlowListComponent';
import { Toolbar } from '../components/new/ToolbarComponent';

const New = () => {
  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        Header
      </Box>
      <Toolbar></Toolbar>
      <Flex>
        <FlowList />
      </Flex>
    </>
  );
};

export default New;
