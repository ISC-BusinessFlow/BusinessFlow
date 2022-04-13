import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaEllipsisV } from 'react-icons/fa';

import { Flow as FlowType } from '@/lib/models/Flow';

const formatDate = (d: string) => {
  const dd = new Date(d);
  const year = dd.getFullYear();
  const month = (dd.getMonth() + 1).toString().padStart(2, '0');
  const date = dd.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};

export const FlowCard: React.VFC<{ flow: FlowType }> = ({ flow }) => {
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
              <Icon as={FaEllipsisV} />
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
