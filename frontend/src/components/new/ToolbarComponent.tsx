/* eslint-disable react/no-children-prop */
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
            <InputLeftElement children={<SearchIcon color={'gray'} />} />
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
            <option value="created-asc">作成日時(昇順)</option>
            <option value="created-desc">作成日時(降順)</option>
            <option value="updated-asc">更新日時(昇順)</option>
            <option value="updated-desc">更新日時(降順)</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
