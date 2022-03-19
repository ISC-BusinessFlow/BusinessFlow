import { Box } from '@chakra-ui/layout';
import React, { useCallback, useEffect } from 'react';
import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export type DiagramCanvas = {
  position: {
    top: number;
    left: number;
  };

  size: {
    width: number;
    height: number;
  };

  updated: boolean;
};

export const diagramNodes = atom<Record<number, DOMRect>>({
  key: 'diagramNodes',
  default: [],
});

export const diagramNode = selectorFamily<DOMRect | undefined, number>({
  key: 'diagramTask',
  get:
    (id: number) =>
    ({ get }) => {
      const tasks = get(diagramNodes);
      return tasks[id] ?? undefined;
    },
});

export const useRegisterNode = (ref: React.RefObject<Element>, id?: number) => {
  const canvas = useRecoilValue(diagramCanvasState);
  const registerNode = useRecoilCallback(
    ({ set }) =>
      (id: number, dom: DOMRect) => {
        set(diagramNodes, (cur) => ({
          ...cur,
          [id]: dom,
        }));
      }
  );

  useEffect(() => {
    const handleRegister = () => {
      if (!canvas.updated) {
        return;
      }

      if (id && ref && ref.current && 'getBoundingClientRect' in ref.current) {
        registerNode(id, ref.current.getBoundingClientRect());
      }
    };

    handleRegister();
    // window.addEventListener('resize', handleRegister);

    // return () => window.removeEventListener('resize', handleRegister);
  }, [canvas]);

  return registerNode;
};

export const diagramCanvasState = atom<DiagramCanvas>({
  key: 'diagramCanvas',
  default: {
    position: {
      top: 0,
      left: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
    updated: false,
  },
});

export const DiagramProvider: React.FC = ({ children }) => {
  const setCanvas = useSetRecoilState(diagramCanvasState);

  console.log('DiagramProvider');

  const canvasRef: React.RefCallback<HTMLDivElement> = useCallback((node) => {
    const resizeObserver = new ResizeObserver((entries) => {
      const target = entries[0].target;
      const { top, left, width, height } = target.getBoundingClientRect();

      setCanvas((cur) => ({
        ...cur,
        position: {
          top,
          left,
        },
        size: {
          width,
          height,
        },
        updated: true,
      }));
    });

    if (node) {
      resizeObserver.observe(node);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box ref={canvasRef} display="inline-block" h="full">
      {children}
    </Box>
  );
};
