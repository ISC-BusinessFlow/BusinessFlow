import { Box, Center, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Task } from '@FlowEditor/components/Task';
import { actorState, tasksHasActorState } from '@FlowEditor/store';
import maxBy from 'lodash/maxBy';
import { useMemo } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';

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

const tasksSelector = selectorFamily({
  key: 'tasksSelector',
  get:
    (id: number) =>
    ({ get }) => {
      return get(tasksHasActorState(id)).map((task) => ({
        id: task.id,
        y: task.y,
      }));
    },
});

export const Actor: React.VFC<{ id: number; maxX: number }> = ({
  id,
  maxX,
}) => {
  const actor = useRecoilValue(actorState(id));
  const tasks = useRecoilValue(tasksSelector(id));
  const tasksY = tasks.map((task) => task.y);

  const maxY = useMemo(() => {
    return maxBy(tasksY, (y) => y) ?? 0;
  }, [tasksY]);

  const minH = maxY === 0 ? PADDING.y : maxY + PADDING.y * 2;
  const minW = maxX + PADDING.x * 2;

  if (!actor) return null;

  return (
    <Flex>
      <Center
        bg="white"
        maxH={`${minH + 2}px`}
        minW="150px"
        position="sticky"
        left={0}
        top={0}
        marginBottom="-2px"
        borderBottomWidth="2px"
        borderStyle="solid"
        borderColor="rgba(0, 0, 0, 0.05)"
      >
        <Text color="gray.600" fontWeight="bold">
          {actor.name}
        </Text>
      </Center>
      <Box flex="1" bg="gray.50" minWidth={minW}>
        <StyledSvg
          width={minW}
          height={minH}
          viewBox={`${-PADDING.x}, ${-PADDING.y}, ${minW} ${minH}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {tasks.map((task) => (
            <Task key={task.id} id={task.id} />
          ))}
        </StyledSvg>
      </Box>
    </Flex>
  );
};
