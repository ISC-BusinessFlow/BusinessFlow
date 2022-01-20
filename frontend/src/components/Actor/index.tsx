import { Box, Center, HStack, StackDivider, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { maxBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { Task } from '@/components/Task';
import { Actor as ActorType } from '@/lib/models/Actor';

/**
 * xとyはTaskの真ん中になるようにするため、本来のsvgで使う左上の座標がマイナスになる可能性がある
 * そのため、PADDINGを使ってTaskがはみ出さないようにする
 */
const PADDING = {
  x: 90,
  y: 80,
};

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const Actor: React.VFC<
  {
    actor: ActorType;
  } & {
    maxX: number;
  }
> = observer(({ actor, maxX }) => {
  const tasksY = actor.taskAggregate.tasks.map((task) => task.y);

  const maxY = useMemo(() => {
    return maxBy(tasksY, (y) => y) ?? 0;
  }, [tasksY]);

  const minH = maxY === 0 ? PADDING.y : maxY + PADDING.y * 2;
  const minW = maxX + PADDING.x * 2;

  return (
    <HStack divider={<StackDivider bg="gray.200" m="0" />}>
      <Center minW="150px">
        <Text color="gray.700" fontWeight="bold">
          {actor.name}
        </Text>
      </Center>
      <Box flex="1" minWidth={minW}>
        <StyledSvg
          width={minW}
          height={minH}
          viewBox={`${-PADDING.x}, ${-PADDING.y}, ${minW} ${minH}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {actor.taskAggregate.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </StyledSvg>
      </Box>
    </HStack>
  );
});
