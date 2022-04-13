import { Box } from '@chakra-ui/react';
import { FlowList } from '@FlowList';
import { useQuery } from 'react-query';

import { api } from '@/api';
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
      <FlowList flows={data} />
    </>
  );
};

export default New;
