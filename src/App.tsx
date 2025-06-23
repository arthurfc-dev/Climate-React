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
  { code: 'AF', name: 'Afeganistão' },
  { code: 'ZA', name: 'África do Sul' },
  { code: 'AL', name: 'Albânia' },
  { code: 'DE', name: 'Alemanha' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antígua e Barbuda' },
  { code: 'SA', name: 'Arábia Saudita' },
  { code: 'DZ', name: 'Argélia' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armênia' },
  { code: 'AU', name: 'Austrália' },
  { code: 'AT', name: 'Áustria' },
  { code: 'AZ', name: 'Azerbaijão' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BD', name: 'Bangladexe' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BH', name: 'Barém' },
  { code: 'BE', name: 'Bélgica' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benim' },
  { code: 'BY', name: 'Bielorrússia' },
  { code: 'BO', name: 'Bolívia' },
  { code: 'BA', name: 'Bósnia e Herzegovina' },
  { code: 'BW', name: 'Botsuana' },
  { code: 'BR', name: 'Brasil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgária' },
  { code: 'BF', name: 'Burquina Fasso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'BT', name: 'Butão' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Camboja' },
  { code: 'CM', name: 'Camarões' },
  { code: 'CA', name: 'Canadá' },
  { code: 'QA', name: 'Catar' },
  { code: 'KZ', name: 'Cazaquistão' },
  { code: 'CF', name: 'República Centro-Africana' },
  { code: 'TD', name: 'Chade' },
  { code: 'CZ', name: 'Chéquia' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CY', name: 'Chipre' },
  { code: 'CO', name: 'Colômbia' },
  { code: 'KM', name: 'Comores' },
  { code: 'CG', name: 'República do Congo' },
  { code: 'CD', name: 'República Democrática do Congo' },
  { code: 'KR', name: 'Coreia do Sul' },
  { code: 'KP', name: 'Coreia do Norte' },
  { code: 'CI', name: 'Costa do Marfim' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croácia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DK', name: 'Dinamarca' },
  { code: 'DJ', name: 'Djibuti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EG', name: 'Egito' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'AE', name: 'Emirados Árabes Unidos' },
  { code: 'EC', name: 'Equador' },
  { code: 'ER', name: 'Eritreia' },
  { code: 'SK', name: 'Eslováquia' },
  { code: 'SI', name: 'Eslovênia' },
  { code: 'ES', name: 'Espanha' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'EE', name: 'Estónia' },
  { code: 'SZ', name: 'Essuatíni' },
  { code: 'ET', name: 'Etiópia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'PH', name: 'Filipinas' },
  { code: 'FI', name: 'Finlândia' },
  { code: 'FR', name: 'França' },
  { code: 'GA', name: 'Gabão' },
  { code: 'GM', name: 'Gâmbia' },
  { code: 'GH', name: 'Gana' },
  { code: 'GE', name: 'Geórgia' },
  { code: 'GD', name: 'Granada' },
  { code: 'GR', name: 'Grécia' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GY', name: 'Guiana' },
  { code: 'GW', name: 'Guiné-Bissau' },
  { code: 'GN', name: 'Guiné' },
  { code: 'GQ', name: 'Guiné Equatorial' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungria' },
  { code: 'YE', name: 'Iêmen' },
  { code: 'IN', name: 'Índia' },
  { code: 'ID', name: 'Indonésia' },
  { code: 'IQ', name: 'Iraque' },
  { code: 'IR', name: 'Irã' },
  { code: 'IE', name: 'Irlanda' },
  { code: 'IS', name: 'Islândia' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Itália' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japão' },
  { code: 'JO', name: 'Jordânia' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'LA', name: 'Laos' },
  { code: 'LS', name: 'Lesoto' },
  { code: 'LV', name: 'Letónia' },
  { code: 'LB', name: 'Líbano' },
  { code: 'LR', name: 'Libéria' },
  { code: 'LY', name: 'Líbia' },
  { code: 'LI', name: 'Listenstaine' },
  { code: 'LT', name: 'Lituânia' },
  { code: 'LU', name: 'Luxemburgo' },
  { code: 'MK', name: 'Macedônia do Norte' },
  { code: 'MG', name: 'Madagáscar' },
  { code: 'MY', name: 'Malásia' },
  { code: 'MW', name: 'Maláui' },
  { code: 'MV', name: 'Maldivas' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MA', name: 'Marrocos' },
  { code: 'MH', name: 'Ilhas Marshall' },
  { code: 'MU', name: 'Ilhas Maurícias' },
  { code: 'MR', name: 'Mauritânia' },
  { code: 'MX', name: 'México' },
  { code: 'MM', name: 'Mianmar' },
  { code: 'FM', name: 'Estados Federados da Micronésia' },
  { code: 'MZ', name: 'Moçambique' },
  { code: 'MD', name: 'Moldávia' },
  { code: 'MC', name: 'Mónaco' },
  { code: 'MN', name: 'Mongólia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'NA', name: 'Namíbia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NI', name: 'Nicarágua' },
  { code: 'NE', name: 'Níger' },
  { code: 'NG', name: 'Nigéria' },
  { code: 'NO', name: 'Noruega' },
  { code: 'NZ', name: 'Nova Zelândia' },
  { code: 'OM', name: 'Omã' },
  { code: 'NL', name: 'Países Baixos' },
  { code: 'PW', name: 'Palau' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PG', name: 'Papua-Nova Guiné' },
  { code: 'PK', name: 'Paquistão' },
  { code: 'PY', name: 'Paraguai' },
  { code: 'PE', name: 'Peru' },
  { code: 'PL', name: 'Polónia' },
  { code: 'PT', name: 'Portugal' },
  { code: 'KE', name: 'Quênia' },
  { code: 'KG', name: 'Quirguistão' },
  { code: 'KI', name: 'Quiribáti' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'RO', name: 'Roménia' },
  { code: 'RW', name: 'Ruanda' },
  { code: 'RU', name: 'Rússia' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SB', name: 'Ilhas Salomão' },
  { code: 'SM', name: 'San Marino' },
  { code: 'LC', name: 'Santa Lúcia' },
  { code: 'KN', name: 'São Cristóvão e Neves' },
  { code: 'ST', name: 'São Tomé e Príncipe' },
  { code: 'VC', name: 'São Vicente e Granadinas' },
  { code: 'SC', name: 'Seicheles' },
  { code: 'SN', name: 'Senegal' },
  { code: 'LK', name: 'Seri Lanca' },
  { code: 'SL', name: 'Serra Leoa' },
  { code: 'RS', name: 'Sérvia' },
  { code: 'SG', name: 'Singapura' },
  { code: 'SY', name: 'Síria' },
  { code: 'SO', name: 'Somália' },
  { code: 'SD', name: 'Sudão' },
  { code: 'SS', name: 'Sudão do Sul' },
  { code: 'SE', name: 'Suécia' },
  { code: 'CH', name: 'Suíça' },
  { code: 'SR', name: 'Suriname' },
  { code: 'TH', name: 'Tailândia' },
  { code: 'TJ', name: 'Tajiquistão' },
  { code: 'TZ', name: 'Tanzânia' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad e Tobago' },
  { code: 'TN', name: 'Tunísia' },
  { code: 'TM', name: 'Turcomenistão' },
  { code: 'TR', name: 'Turquia' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UA', name: 'Ucrânia' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UY', name: 'Uruguai' },
  { code: 'UZ', name: 'Uzbequistão' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietname' },
  { code: 'ZM', name: 'Zâmbia' },
  { code: 'ZW', name: 'Zimbábue' }
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
