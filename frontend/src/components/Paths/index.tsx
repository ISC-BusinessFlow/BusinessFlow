import { observer } from 'mobx-react-lite';

import { Path } from '@/components/Path';
import { useDiagramNodes } from '@/diagrams';
import { Path as PathType } from '@/lib/Path';

export const Paths: React.VFC<{ paths: PathType[] }> = observer(({ paths }) => {
  const nodes = useDiagramNodes();

  return (
    <>
      {paths.map(
        (path) =>
          path.to &&
          nodes[path.from] &&
          nodes[path.to] && (
            <Path
              key={path.id}
              path={path}
              from={nodes[path.from]}
              to={nodes[path.to]}
            />
          )
      )}
    </>
  );
});
