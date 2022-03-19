import { Box, Flex, StackDivider, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Actor } from '@FlowEditor/components/Actor';
import { NewActor } from '@FlowEditor/components/Actor/new';
import { Paths } from '@FlowEditor/components/Paths';
import { actorIdsState, tasksPositionState } from '@FlowEditor/store';
import maxBy from 'lodash/maxBy';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { diagramCanvasState } from '@/features/Diagrams';

const ArrowMarker = () => {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="5"
        markerHeight="4"
        refX="0"
        refY="2"
        orient="auto"
      >
        <polygon points="0 0, 5 2, 0 4" />
      </marker>
    </defs>
  );
};

const StyledSvg = styled.svg<{ width: number; height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  pointer-events: none;
`;

const StyledG = styled.g`
  pointer-events: all;
`;

const DiagramPathsContainer: React.FC = ({ children }) => {
  const canvas = useRecoilValue(diagramCanvasState);

  const {
    size: { width, height },
  } = canvas;

  return (
    <StyledSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <StyledG>{children}</StyledG>
    </StyledSvg>
  );
};

const RestArea: React.VFC = () => {
  return (
    <Flex flex="1">
      <Box
        bg="white"
        minW="150px"
        position="sticky"
        left={0}
        top={0}
        borderBottomWidth="1px"
        borderStyle="solid"
        borderColor="rgba(0, 0, 0, 0.05)"
      />
      <Box flex="1" bg="gray.50" />
    </Flex>
  );
};

export const Diagram: React.VFC = () => {
  const tasksPosition = useRecoilValue(tasksPositionState);
  const actorIds = useRecoilValue(actorIdsState);
  const tasksX = tasksPosition.map((task) => task.x);

  const maxX = useMemo(() => {
    return maxBy(tasksX, (x) => x) ?? 0;
  }, [tasksX]);

  return (
    <>
      <DiagramPathsContainer>
        <ArrowMarker />
        <Paths />
      </DiagramPathsContainer>

      <Flex
        direction="column"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="rgba(0, 0, 0, 0.1)"
        minH="100%"
      >
        <VStack
          spacing={0}
          align="stretch"
          divider={<StackDivider bg="rgba(0, 0, 0, 0.05)" h="2px" m="0" />}
        >
          {actorIds.map((id) => (
            <Actor key={id} id={id} maxX={maxX} />
          ))}
          <NewActor />
        </VStack>
        <RestArea />
      </Flex>
    </>
  );
};
