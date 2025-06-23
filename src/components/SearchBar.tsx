import { Input, InputGroup, InputLeftElement, Box, Spinner, List, ListItem } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  country?: string;
}

// Cache global para cidades
let citiesCache: Record<string, string[]> | null = null;
let citiesPromise: Promise<Record<string, string[]>> | null = null;

export const SearchBar = ({ onSearch, isLoading = false, country = 'BR' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingCities(true);
    const loadCities = async () => {
      if (!citiesCache) {
        if (!citiesPromise) {
          citiesPromise = fetch('/src/utils/cities.json').then(res => res.json());
        }
        citiesCache = await citiesPromise;
      }
      if (isMounted) {
        setCities(citiesCache[country] || []);
        setLoadingCities(false);
      }
    };
    loadCities();
    return () => { isMounted = false; };
  }, [country]);

  const filteredCities = query.length > 0
    ? cities.filter(city => city.toLowerCase().startsWith(query.toLowerCase()))
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    onSearch(city);
    inputRef.current?.blur();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" mb={0} position="relative">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          {isLoading || loadingCities ? (
            <Spinner size="sm" color="whiteAlpha.700" />
          ) : (
            <SearchIcon color="whiteAlpha.700" />
          )}
        </InputLeftElement>
        <Input
          ref={inputRef}
          placeholder={loadingCities ? 'Carregando cidades...' : 'Buscar cidade...'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          bg="whiteAlpha.200"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'whiteAlpha.700' }}
          _hover={{ borderColor: 'whiteAlpha.400' }}
          _focus={{ borderColor: 'whiteAlpha.500', boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)' }}
          isDisabled={isLoading || loadingCities}
          h="48px"
          autoComplete="off"
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
      </InputGroup>
      {showSuggestions && filteredCities.length > 0 && !loadingCities && (
        <List
          position="absolute"
          top="52px"
          left={0}
          w="100%"
          bg="whiteAlpha.900"
          borderRadius="md"
          boxShadow="md"
          zIndex={20}
          maxH="200px"
          overflowY="auto"
        >
          {filteredCities.map(city => (
            <ListItem
              key={city}
              px={4}
              py={2}
              cursor="pointer"
              _hover={{ bg: 'blue.100' }}
              color="black"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}; 