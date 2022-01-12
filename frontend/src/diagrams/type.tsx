export type IPath = {
  id: number;
  from: number;
  to: number;
};

export type ICanvas = {
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

export type IDiagramContext = {
  nodes: Record<number, DOMRect>;
  paths: Record<number, DOMRect>;
  canvas: ICanvas;
};

export type ISetDiagramContext = {
  registerNode: (position: DOMRect, id: number) => void;
  registerPath: (position: DOMRect, id: number) => void;
};
