import { Box, Flex, Spacer } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { api } from '@/api';
import { FlowList } from '@/components/new/FlowListComponent';
import { Toolbar } from '@/components/new/ToolbarComponent';
import { FlowRepo } from '@/lib/repositories/Flow';

const New = () => {
  const { data } = useQuery('flows', () => {
    const repo = new FlowRepo(api);
    return repo.getFlows();
  });

  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        Header
      </Box>
      <Toolbar></Toolbar>
      <Spacer />
      <Flex>{data && <FlowList flows={data} />}</Flex>
    </>
  );
};

export default New;
