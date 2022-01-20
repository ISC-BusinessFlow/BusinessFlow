import { Box } from '@chakra-ui/layout';
import React, { useCallback, useState } from 'react';

import { ICanvas, IDiagramContext, ISetDiagramContext } from './type';

export const DiagramContextPaths = React.createContext<
  IDiagramContext['paths']
>({});

export const DiagramContextNodes = React.createContext<
  IDiagramContext['nodes']
>({});

export const DiagramContextCanvas = React.createContext<
  IDiagramContext['canvas']
>({
  position: {
    top: 0,
    left: 0,
  },
  size: {
    width: 0,
    height: 0,
  },
  updated: false,
});

export const SetDiagramContext = React.createContext<ISetDiagramContext>({
  registerNode: () => {},
  registerPath: () => {},
});

export const DiagramProvider: React.FC = ({ children }) => {
  const [nodes, setNodes] = useState<IDiagramContext['nodes']>({});
  const [paths, setPaths] = useState<IDiagramContext['paths']>({});
  const [canvas, setCanvas] = useState<ICanvas>({
    position: {
      top: 0,
      left: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
    updated: false,
  });

  const registerNode = useCallback((position: DOMRect, id: number) => {
    setNodes((cur) => ({
      ...cur,
      [id]: position,
    }));
  }, []);

  const registerPath = useCallback((position: DOMRect, id: number) => {
    setPaths((cur) => ({
      ...cur,
      [id]: position,
    }));
  }, []);

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
    <Box ref={canvasRef} display="inline-block">
      <DiagramContextNodes.Provider value={nodes}>
        <DiagramContextPaths.Provider value={paths}>
          <DiagramContextCanvas.Provider value={canvas}>
            <SetDiagramContext.Provider
              value={{
                registerNode,
                registerPath,
              }}
            >
              {children}
            </SetDiagramContext.Provider>
          </DiagramContextCanvas.Provider>
        </DiagramContextPaths.Provider>
      </DiagramContextNodes.Provider>
    </Box>
  );
};
