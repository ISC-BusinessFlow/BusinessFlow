import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
} from '@chakra-ui/react';

const orderOptions = [
  { label: '作成日時(昇順)', value: 'created-asc' },
  { label: '作成日時(降順)', value: 'created-desc' },
  { label: '更新日時(昇順)', value: 'updated-asc' },
  { label: '更新日時(降順)', value: 'updated-desc' },
];

export const Toolbar = () => {
  return (
    <Box mx={'50px'} py={'20px'} borderBottom={'1px'}>
      <Flex>
        <Box>
          <Button
            colorScheme={'blue'}
            borderRadius="none"
            leftIcon={<AddIcon />}
          >
            新規
          </Button>
        </Box>
        <Box w="50%" ml="5px">
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color={'gray'} />
            </InputLeftElement>
            <Input
              placeholder="キーワードを入力"
              borderRadius="none"
              focusBorderColor="none"
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Select
            placeholder="並び替え"
            borderRadius="none"
            focusBorderColor="none"
          >
            {orderOptions.map((order) => (
              <option value={order.value} key={order.value}>
                {order.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
