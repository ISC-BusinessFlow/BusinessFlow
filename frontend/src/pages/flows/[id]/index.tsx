import { Box } from '@chakra-ui/react';
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
    <Box w="full" position="relative" overscrollX="auto" minW="1440px">
      <DiagramProvider>{flow && <Diagram flow={flow} />}</DiagramProvider>
    </Box>
  );
};

const Index: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id) return null;
  if (Array.isArray(id)) return <Error statusCode={404} />;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return <Error statusCode={404} />;

  return (
    <Box>
      <Box bg="tomato" w="100%" p={4} color="white" as="nav">
        Header
      </Box>
      <Component id={parsedId} />
    </Box>
  );
};

export default Index;
