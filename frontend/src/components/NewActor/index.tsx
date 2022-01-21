import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FaPlus } from 'react-icons/fa';

import { Flow } from '@/lib/models/Flow';

export const NewActor: React.VFC<{ flow: Flow }> = observer(() => {
  return (
    <Flex minH="80px">
      <Center
        bg="white"
        minW="150px"
        position="sticky"
        left={0}
        top={0}
        borderBottomWidth="2px"
        borderStyle="solid"
        borderColor="rgba(0, 0, 0, 0.05)"
      >
        <Icon as={FaPlus} />
      </Center>
      <Box flex="1" bg="gray.50" />
    </Flex>
  );
});
