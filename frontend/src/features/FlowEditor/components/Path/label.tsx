import { Box } from '@chakra-ui/react';

export const Label: React.FC<{
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}> = ({ fromPos, toPos, children }) => {
  const size = {
    x: 100,
    y: 50,
  };

  const labelCenter = {
    x: fromPos.x - size.x / 2,
    y:
      (fromPos.y > toPos.y
        ? toPos.y + Math.abs(fromPos.y - toPos.y) / 2
        : fromPos.y + Math.abs(fromPos.y - toPos.y) / 2) -
      size.y / 2,
  };

  return (
    <g>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x={labelCenter.x}
        y={labelCenter.y}
        width="99"
        height="49"
        rx="7.5"
        fill="#87D674"
        stroke="#449C2E"
      />
      <foreignObject
        x={labelCenter.x}
        y={labelCenter.y}
        width={size.x}
        height={size.y}
        fill="none"
      >
        <Box
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <span>{children}</span>
        </Box>
      </foreignObject>
    </g>
  );
};
