import { Box } from '@chakra-ui/react';

export const DisplayText: React.FC<{
  x?: number;
  y?: number;
  width: number;
  height: number;
}> = ({ x = 0, y = 0, width, height, children }) => {
  return (
    <foreignObject x={x} y={y} width={width} height={height} fill="none">
      <Box
        w="full"
        h="full"
        p="4px"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <span>{children}</span>
      </Box>
    </foreignObject>
  );
};
