import { Box, Flex } from '@chakra-ui/react';
import FlowList from '../components/new/FlowListComponent';

const New = () => {
  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        Header
      </Box>
      <div>
        <button>new</button>
        <input type="text" placeholder="search" />
      </div>
      <Flex>
        <div>
          <div>
            <FlowList />
          </div>
        </div>
      </Flex>
    </>
  );
};

export default New;
