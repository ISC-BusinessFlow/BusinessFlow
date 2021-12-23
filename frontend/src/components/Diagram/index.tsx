import { StackDivider, VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { Actor } from '@/components/Actor';
import { Paths } from '@/components/Paths';
import { useDiagramCanvas } from '@/diagrams';
import { Flow } from '@/lib/Flow';

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

const DiagramPathsContainer: React.FC = ({ children }) => {
  const canvas = useDiagramCanvas();

  const {
    size: { width, height },
  } = canvas;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height,
        pointerEvents: 'none',
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g style={{ pointerEvents: 'all' }}>{children}</g>
    </svg>
  );
};

export const Diagram: React.VFC<{ flow: Flow }> = observer(({ flow }) => {
  return (
    <>
      <DiagramPathsContainer>
        <ArrowMarker />
        <Paths paths={flow.pathAggregate.paths} />
      </DiagramPathsContainer>

      <VStack
        spacing={0}
        align="stretch"
        divider={<StackDivider bg="gray.200" m="0" />}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.200"
      >
        {flow.actorAggregate.actors.map((actor) => (
          <Actor key={actor.id} actor={actor} />
        ))}
      </VStack>
    </>
  );
});
