import { Path } from '@FlowEditor/components/Path';
import { pathIdsState } from '@FlowEditor/store';
import { useRecoilValue } from 'recoil';

export const Paths: React.VFC = () => {
  const ids = useRecoilValue(pathIdsState);

  return (
    <>
      {ids.map((id) => (
        <Path key={id} id={id} />
      ))}
    </>
  );
};
