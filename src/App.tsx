import { ChakraProvider, extendTheme, SimpleGrid, VStack } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { useState } from 'react';

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
  const [weatherData, setWeatherData] = useState<WeatherData[]>([
    {
      city: 'São Paulo',
      temperature: 25,
      condition: 'Clear',
      humidity: 65,
      windSpeed: 12,
    },
    {
      city: 'Rio de Janeiro',
      temperature: 28,
      condition: 'Rain',
      humidity: 80,
      windSpeed: 15,
    },
  ]);

  const handleSearch = (query: string) => {
    // TODO: Implementar a busca real com a API
    console.log('Buscando por:', query);
  };

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <VStack spacing={8} w="100%">
          <SearchBar onSearch={handleSearch} />
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
