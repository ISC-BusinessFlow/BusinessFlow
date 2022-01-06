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
import { VscKebabVertical } from 'react-icons/vsc';

export type FlowListType = {
  id: number;
  title: string;
  createdAt: string;
};

export const FlowList: React.VFC<{ flows: FlowListType[] }> = ({ flows }) => {
  return (
    <SimpleGrid columns={2} spacing={5} w="100%" m="0 50px" pt="50px">
      {flows.map((flow) => {
        return (
          <FlowCard
            id={flow.id}
            key={flow.id}
            title={flow.title}
            createdAt={flow.createdAt}
          />
        );
      })}
    </SimpleGrid>
  );
};

const KebabMenuIcon = () => (
  <MenuButton as="button">
    <VscKebabVertical />
  </MenuButton>
);

const FlowCard = ({ id, title, createdAt }: FlowListType) => (
  <Box borderWidth="1px" w="100%" h="100px" p="10px" key={id}>
    <Box display="flex" alignItems="baseline">
      <Text>{title}</Text>
      <Spacer />
      <Menu>
        <KebabMenuIcon />
        <MenuList>
          <MenuItem>名前の変更</MenuItem>
          <MenuItem>削除</MenuItem>
        </MenuList>
      </Menu>
    </Box>
    <Text>{createdAt}</Text>
  </Box>
);
