import { ChakraProvider, extendTheme, VStack, useToast, HStack, Box } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { useState } from 'react';
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

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <VStack spacing={8} w="100%" align="center" justify="center">
          <HStack spacing={4} w="100%" justify="center">
            <Box as="select" value={country} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}
              bg="whiteAlpha.200" color="white" borderRadius="md" border="1px solid" borderColor="whiteAlpha.300" p={2} fontWeight="bold">
              {countries.map(c => (
                <option key={c.code} value={c.code} style={{ color: 'black' }}>{c.name}</option>
              ))}
            </Box>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </HStack>
          <VStack spacing={6} w="100%">
            {weatherData.map((weather) => (
              <WeatherCard key={weather.city} {...weather} />
            ))}
          </VStack>
        </VStack>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
