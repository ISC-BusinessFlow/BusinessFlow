import { Box, Flex, Spacer } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { api } from '@/api';
import { FlowList } from '@/components/FlowList';
import { Toolbar } from '@/components/FlowListToolbar';
import { FlowRepo } from '@/lib/repositories/Flow';
import { flowCacheKey } from '@/utils/cacheKey';

const New = () => {
  const { data } = useQuery(flowCacheKey.getAll, () => {
    const repo = new FlowRepo(api);
    return repo.getFlows();
  });

  return (
    <>
      <Box bg="gray.600" w="100%" h={16} color="white" as={'header'} />
      <Box as={'main'}>
        <Toolbar />
        <Spacer />
        <Flex>{data && <FlowList flows={data} />}</Flex>
      </Box>
    </>
  );
};

export default New;
