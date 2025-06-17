import { Input, InputGroup, InputLeftElement, Box, Spinner } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      w="100%"
      mb={0}
    >
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          {isLoading ? (
            <Spinner size="sm" color="whiteAlpha.700" />
          ) : (
            <SearchIcon color="whiteAlpha.700" />
          )}
        </InputLeftElement>
        <Input
          placeholder="Buscar cidade..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg="whiteAlpha.200"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'whiteAlpha.700' }}
          _hover={{
            borderColor: 'whiteAlpha.400',
          }}
          _focus={{
            borderColor: 'whiteAlpha.500',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)',
          }}
          isDisabled={isLoading}
          h="48px"
        />
      </InputGroup>
    </Box>
  );
}; 