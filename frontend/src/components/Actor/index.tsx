import { Box, Center, HStack, StackDivider, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import { Task } from '@/components/Task';
import { Actor as ActorType } from '@/lib/Actor';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const Actor: React.VFC<{ actor: ActorType }> = observer(({ actor }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleSetSize = () => {
      if (!ref.current) {
        return;
      }
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    };
    handleSetSize();

    window.addEventListener('resize', handleSetSize);
  }, []);

  return (
    <Box>
      <HStack divider={<StackDivider bg="gray.200" m="0" />} minH="120px">
        <Center w="150px" h="full">
          <Text color="gray.700" fontWeight="bold">
            {actor.name}
          </Text>
        </Center>
        <Box h="full" flex="1">
          <StyledSvg
            ref={ref}
            viewBox={`0 0 ${size.width} ${size.height}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {actor.taskAggregate.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </StyledSvg>
        </Box>
      </HStack>
    </Box>
  );
});
