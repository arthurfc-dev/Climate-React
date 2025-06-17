import { ChakraProvider, extendTheme, SimpleGrid } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { WeatherCard } from './components/WeatherCard';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'transparent',
      },
    },
  },
});

function App() {
  const mockData = [
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
  ];

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {mockData.map((weather) => (
            <WeatherCard key={weather.city} {...weather} />
          ))}
        </SimpleGrid>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
