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
    <svg
      height="20"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.84978 13.3632C8.53228 13.3632 9.086 12.8083 9.086 12.1244C9.086 11.4405 8.53228 10.8856 7.84978 10.8856C7.16729 10.8856 6.61357 11.4405 6.61357 12.1244C6.61357 12.8083 7.16729 13.3632 7.84978 13.3632ZM7.84978 6.54977C7.16729 6.54977 6.61357 7.10463 6.61357 7.78853C6.61357 8.47242 7.16729 9.02728 7.84978 9.02728C8.53228 9.02728 9.086 8.47242 9.086 7.78853C9.086 7.10463 8.53228 6.54977 7.84978 6.54977ZM9.086 3.4529C9.086 4.13678 8.53228 4.69162 7.84978 4.69162C7.16729 4.69162 6.61357 4.13678 6.61357 3.4529C6.61357 2.76902 7.16729 2.21417 7.84978 2.21417C8.53228 2.21417 9.086 2.76902 9.086 3.4529Z"
        fill="#CBCBCB"
      ></path>
    </svg>
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
