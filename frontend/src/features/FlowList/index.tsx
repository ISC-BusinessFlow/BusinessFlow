import { Box, Flex, Spacer } from '@chakra-ui/react';
import { FlowCardList } from '@FlowList/components/List';
import { Toolbar } from '@FlowList/components/Toolbar';

import { Flow } from '@/lib/models/Flow';

export const FlowList: React.VFC<{ flows: Flow[] | undefined }> = ({
  flows,
}) => {
  return (
    <Box as={'main'}>
      <Toolbar />
      <Spacer />
      <Flex>{flows && <FlowCardList flows={flows} />}</Flex>
    </Box>
  );
};
