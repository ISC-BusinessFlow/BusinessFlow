import { observer } from 'mobx-react-lite';

import { Path } from '@/components/Path';
import { useDiagramNodes } from '@/diagrams';
import { Path as PathType } from '@/lib/models/Path';

export const Paths: React.VFC<{ paths: PathType[] }> = observer(({ paths }) => {
  const nodes = useDiagramNodes();

  return (
    <>
      {paths.map(
        (path) =>
          path.toTaskId &&
          nodes[path.fromTaskId] &&
          nodes[path.toTaskId] && (
            <Path
              key={path.id}
              path={path}
              from={nodes[path.fromTaskId]}
              to={nodes[path.toTaskId]}
            />
          )
      )}
    </>
  );
});
