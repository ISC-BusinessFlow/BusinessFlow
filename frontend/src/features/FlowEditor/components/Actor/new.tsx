import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

export const NewActor: React.VFC = () => {
  return (
    <Flex minH="80px">
      <Center
        bg="white"
        minW="150px"
        _hover={{
          bg: 'rgba(0, 0, 0, 0.05)',
          transition: '0.2s',
        }}
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
};
