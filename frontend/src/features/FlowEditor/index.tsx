import { Box, Flex, Heading } from '@chakra-ui/react';
import { DiagramProvider } from '@Diagrams';
import { Diagram } from '@FlowEditor/components/Diagram';
import { useBootstrapFlow } from '@FlowEditor/hooks/useBootstrapFlow';

type Props = {
  id: number;
};

export const FlowEditor: React.VFC<Props> = ({ id }) => {
  const { flow } = useBootstrapFlow({ id });

  return (
    <Flex direction="column" h="100vh">
      <Box w="100%" bg="gray.600" px={10} py={6} as="nav">
        <Heading size="md" color="white">
          {flow?.name}
        </Heading>
      </Box>

      <Box w="full" flex="1" maxW="full" position="relative" overflowX="auto">
        <DiagramProvider>{flow && <Diagram flow={flow} />}</DiagramProvider>
      </Box>
    </Flex>
  );
};
