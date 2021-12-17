import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  StackDivider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DiagramPaths,
  DiagramProvider,
  useDiagramCanvas,
  useRegisterNode,
} from '../diagrams';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const useNodeCenterPosition = (position: DOMRect) => {
  const {
    position: { top, left },
  } = useDiagramCanvas();
  const {
    left: nodeLeft,
    top: nodeTop,
    width: nodeWidth,
    height: nodeHeight,
  } = position;

  const x = useMemo(
    () => nodeLeft + nodeWidth / 2 - left,
    [nodeLeft, nodeWidth, left]
  );

  const y = useMemo(
    () => nodeTop + nodeHeight / 2 - top,
    [nodeTop, nodeHeight, top]
  );

  return { x, y };
};

const Path: React.VFC<{
  from: DOMRect;
  to: DOMRect;
}> = ({ from, to }) => {
  const { x: x1, y: y1 } = useNodeCenterPosition(from);
  const { x: x2, y: y2 } = useNodeCenterPosition(to);

  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      stroke="black"
      strokeWidth={3}
      markerEnd="url(#arrowhead)"
    />
  );
};

const Task: React.VFC<{ id: string }> = ({ id }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, id);
  return <rect ref={taskRef} x="400" y="30" width="40" height="40" />;
};

const Actor: React.VFC<{ id: string }> = ({ id }) => {
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
            Box 1
          </Text>
        </Center>
        <Box h="full" flex="1">
          <StyledSvg
            ref={ref}
            viewBox={`0 0 ${size.width} ${size.height}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <Task id={id} />
          </StyledSvg>
        </Box>
      </HStack>
    </Box>
  );
};

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

const Diagram = () => {
  const paths = [
    { id: '1', from: '1', to: '2' },
    { id: '2', from: '2', to: '3' },
    { id: '3', from: '3', to: '4' },
    { id: '4', from: '4', to: '5' },
  ];

  return (
    <>
      <DiagramPathsContainer>
        <ArrowMarker />
        <DiagramPaths paths={paths}>
          {(path, from, to) =>
            from && to && <Path key={path.id} from={from} to={to} />
          }
        </DiagramPaths>
      </DiagramPathsContainer>

      <VStack
        spacing={0}
        align="stretch"
        divider={<StackDivider bg="gray.200" m="0" />}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.200"
      >
        <Actor id={'1'} />
        <Actor id={'2'} />
        <Actor id={'3'} />
        <Actor id={'4'} />
        <Actor id={'5'} />
      </VStack>
    </>
  );
};

const Index = () => {
  return (
    <Box>
      <Box bg="tomato" w="100%" p={4} color="white" as="nav">
        Header
      </Box>
      <Box w="full" position="relative" overscrollX="auto" minW="1440px">
        <DiagramProvider>
          <Diagram />
        </DiagramProvider>
      </Box>
    </Box>
  );
};

export default Index;
