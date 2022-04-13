import { Grid } from '@chakra-ui/react';
import { FlowCard } from '@FlowList/components/Card';

import { FlowType } from '@/lib/models/Flow';

export const FlowCardList: React.VFC<{ flows: FlowType[] }> = ({ flows }) => {
  return (
    <Grid
      templateColumns={{
        lg: 'repeat(3, 1fr)',
        md: 'repeat(2, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
      gap={5}
      w="100%"
      p="50px"
    >
      {flows.map((flow) => (
        <FlowCard key={flow.id} flow={flow} />
      ))}
    </Grid>
  );
};
