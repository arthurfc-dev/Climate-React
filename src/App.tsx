import { ChakraProvider, extendTheme, SimpleGrid, VStack, useToast } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { useState } from 'react';
import { weatherService, WeatherResponse } from './services/weatherService';

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

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await weatherService.getWeatherByCity(query);
      
      const newWeatherData: WeatherData = {
        city: response.name,
        temperature: Math.round(response.main.temp),
        condition: response.weather[0].main,
        humidity: response.main.humidity,
        windSpeed: Math.round(response.wind.speed * 3.6), // Convertendo m/s para km/h
      };

      setWeatherData((prev) => {
        const filtered = prev.filter((w) => w.city !== newWeatherData.city);
        return [...filtered, newWeatherData];
      });
    } catch (error) {
      toast({
        title: 'Erro ao buscar dados do clima',
        description: 'Não foi possível encontrar informações para esta cidade.',
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
        <VStack spacing={8} w="100%">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
            {weatherData.map((weather) => (
              <WeatherCard key={weather.city} {...weather} />
            ))}
          </SimpleGrid>
        </VStack>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
