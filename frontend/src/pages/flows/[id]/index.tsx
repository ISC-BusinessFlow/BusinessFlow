import { Box, Flex, Heading } from '@chakra-ui/react';
import { isNaN } from 'lodash';
import { NextPage } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

import { Diagram } from '@/components/Diagram';
import { DiagramProvider } from '@/diagrams';
import { useBootstrapFlow } from '@/hooks/useBootstrapFlow';

type Props = {
  id: number;
};

const Component: React.VFC<Props> = ({ id }) => {
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

const Index: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id) return null;
  if (Array.isArray(id)) return <Error statusCode={404} />;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return <Error statusCode={404} />;

  return <Component id={parsedId} />;
};

export default Index;
