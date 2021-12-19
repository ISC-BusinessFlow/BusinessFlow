import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  const canvasRef = useRef<HTMLDivElement>(null);
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

  const registerNode = useCallback((position: DOMRect, id: string) => {
    setNodes((cur) => ({
      ...cur,
      [id]: position,
    }));
  }, []);

  const registerPath = useCallback((position: DOMRect, id: string) => {
    setPaths((cur) => ({
      ...cur,
      [id]: position,
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { top, left, width, height } =
          canvasRef.current.getBoundingClientRect();

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
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef.current]);

  return (
    <div ref={canvasRef}>
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
    </div>
  );
};
