import {
  Box,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { VscKebabVertical } from 'react-icons/vsc';

import { FlowType } from '@/lib/models/Flow';

export const FlowList: React.VFC<{ flows: FlowType[] }> = ({ flows }) => {
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

const formatDate = (d: string) => {
  const dd = new Date(d);
  const year = dd.getFullYear();
  const month = (dd.getMonth() + 1).toString().padStart(2, '0');
  const date = dd.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};

const FlowCard: React.VFC<{ flow: FlowType }> = ({ flow }) => {
  const { name, createdAt, id } = flow;

  const formattedCreatedAt = formatDate(createdAt);

  return (
    <Box
      w="full"
      _hover={{ bg: 'gray.50', transition: '0.2s' }}
      p={5}
      border="1px solid rgba(0, 0, 0, 0.08)"
      borderRadius="4px"
    >
      <Flex h="full">
        <Box flex="1" h="full">
          <Link
            href={{
              pathname: 'flows/[id]',
              query: { id: id },
            }}
            passHref
          >
            <Box w="full" h="full" display="inline-block" as="a">
              <Text color="gray.900" fontSize="md" fontWeight="bold">
                {name}
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
                as="time"
                dateTime={formattedCreatedAt}
              >
                {formattedCreatedAt}
              </Text>
            </Box>
          </Link>
        </Box>
        <Box>
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
      </Flex>
    </Box>
  );
};
