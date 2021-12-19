import { useContext, useEffect } from 'react';

import {
  DiagramContextCanvas,
  DiagramContextNodes,
  DiagramContextPaths,
  SetDiagramContext,
} from './context';
import { IDiagramContext, ISetDiagramContext } from './type';

export const useDiagramNodes = (): IDiagramContext['nodes'] => {
  return useContext(DiagramContextNodes);
};

export const useDiagramPaths = (): IDiagramContext['paths'] => {
  return useContext(DiagramContextPaths);
};

export const useDiagramCanvas = (): IDiagramContext['canvas'] => {
  return useContext(DiagramContextCanvas);
};

export const useSetDiagram = (): ISetDiagramContext => {
  return useContext(SetDiagramContext);
};

export const useRegisterNode = (
  ref: React.RefObject<Element>,
  id: string
): ISetDiagramContext['registerNode'] => {
  const { registerNode } = useSetDiagram();
  const canvas = useDiagramCanvas();

  useEffect(() => {
    const handleRegister = () => {
      if (!canvas.updated) {
        return;
      }

      if (ref && ref.current && 'getBoundingClientRect' in ref.current) {
        registerNode(ref.current.getBoundingClientRect(), id);
      }
    };

    handleRegister();
    window.addEventListener('resize', handleRegister);

    return () => window.removeEventListener('resize', handleRegister);
  }, [canvas]);

  return registerNode;
};

export const useRegisterPath = (
  ref: React.RefObject<Element>,
  id: string
): void => {
  const { registerPath } = useSetDiagram();

  useEffect(() => {
    if (ref && ref.current && 'getBoundingClientRect' in ref.current) {
      registerPath(ref.current.getBoundingClientRect(), id);
    }
  }, []);
};
