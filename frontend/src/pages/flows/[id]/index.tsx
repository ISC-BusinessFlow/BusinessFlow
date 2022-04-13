import { FlowEditor } from '@FlowEditor';
import { NextPage } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id) return null;
  if (Array.isArray(id)) return <Error statusCode={404} />;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return <Error statusCode={404} />;

  return <FlowEditor id={parsedId} />;
};

export default Index;
