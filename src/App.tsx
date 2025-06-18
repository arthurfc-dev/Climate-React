import { ChakraProvider, extendTheme, Flex, useToast, HStack, Box, Select, VStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Layout } from './components/Layout';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { useState, useRef } from 'react';
import { weatherService, WeatherError } from './services/weatherService';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'transparent',
      },
    },
  },
});

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const countries = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'FR', name: 'França' },
  { code: 'JP', name: 'Japão' },
];

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('BR');
  const toast = useToast();
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await weatherService.getWeatherByCity(`${query},${country}`);
      
      const newWeatherData: WeatherData = {
        city: response.name,
        temperature: Math.round(response.main.temp),
        condition: response.weather[0].main,
        humidity: response.main.humidity,
        windSpeed: Math.round(response.wind.speed * 3.6),
      };

      setWeatherData((prev) => {
        const filtered = prev.filter((w) => w.city !== newWeatherData.city);
        return [...filtered, newWeatherData];
      });
    } catch (error) {
      let errorMessage = 'Não foi possível encontrar informações para esta cidade.';
      if (error instanceof WeatherError) {
        errorMessage = error.message;
      }
      toast({
        title: 'Erro ao buscar dados do clima',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollCards = (direction: 'left' | 'right') => {
    const container = cardsContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Largura aproximada de um card + espaçamento
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <VStack spacing={8} w="100%" h="100%" align="center" justify="flex-start">
          <HStack spacing={4} w="100%" maxW="900px" justify="center" align="center" mt={8}>
            <Select
              value={country}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}
              bg="whiteAlpha.200"
              color="white"
              borderRadius="md"
              border="1px solid"
              borderColor="whiteAlpha.300"
              fontWeight="bold"
              h="48px"
              fontSize="lg"
              _focus={{ borderColor: 'whiteAlpha.500', boxShadow: '0 0 0 1px rgba(255,255,255,0.3)' }}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              flex={1}
              minW="120px"
              maxW="250px"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code} style={{ color: 'black' }}>{c.name}</option>
              ))}
            </Select>
            <Box flex={2}>
              <SearchBar onSearch={handleSearch} isLoading={isLoading} country={country} />
            </Box>
          </HStack>
          <Flex w="100%" justify="center" align="flex-start" mt={8} position="relative" overflow="visible">
            {weatherData.length > 0 && (
              <>
                <IconButton
                  aria-label="Scroll left"
                  icon={<ChevronLeftIcon boxSize={8} />}
                  onClick={() => scrollCards('left')}
                  position="absolute"
                  left={-12}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  bg="whiteAlpha.300"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.500' }}
                  isDisabled={weatherData.length <= 1}
                />
                <Box
                  ref={cardsContainerRef}
                  w="100%"
                  maxW="1200px"
                  overflowX="hidden"
                  overflowY="visible"
                  py={2}
                  pb={6}
                >
                  <HStack spacing={8} minW="max-content">
                    {weatherData.map((weather) => (
                      <WeatherCard key={weather.city} {...weather} />
                    ))}
                  </HStack>
                </Box>
                <IconButton
                  aria-label="Scroll right"
                  icon={<ChevronRightIcon boxSize={8} />}
                  onClick={() => scrollCards('right')}
                  position="absolute"
                  right={-12}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  bg="whiteAlpha.300"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.500' }}
                  isDisabled={weatherData.length <= 1}
                />
              </>
            )}
          </Flex>
        </VStack>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
