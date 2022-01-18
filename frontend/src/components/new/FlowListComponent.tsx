import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { VscKebabVertical } from 'react-icons/vsc';

import { FlowType } from '@/lib/Flow';

export const FlowList: React.VFC<{ flows: FlowType[] }> = ({ flows }) => {
  return (
    <SimpleGrid columns={2} spacing={5} w="100%" m="0 50px" pt="50px">
      {flows.map((flow) => {
        return <FlowCard key={flow.id} flow={flow} />;
      })}
    </SimpleGrid>
  );
};

const FlowCard: React.VFC<{ flow: FlowType }> = ({ flow }) => {
  const { name, createdAt, id } = flow;

  return (
    <Box borderWidth="1px" w="100%" h="100px" p="10px" key={id}>
      <Box display="flex" alignItems="baseline">
        <Link href="/flows/[id]" as={`/flows/${id}`}>
          <a>
            <Text>{name}</Text>
          </a>
        </Link>
        <Spacer />
        <Menu>
          <MenuButton as="button">
            <VscKebabVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>名前の変更</MenuItem>
            <MenuItem>削除</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Text>{createdAt}</Text>
    </Box>
  );
};
