export type ID = number;

export type IPath = {
  id: ID;
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
  nodes: Record<ID, DOMRect>;
  paths: Record<ID, DOMRect>;
  canvas: ICanvas;
};

export type ISetDiagramContext = {
  registerNode: (position: DOMRect, id: ID) => void;
  registerPath: (position: DOMRect, id: ID) => void;
};
