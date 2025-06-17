import { Box, Flex, Text, Icon, VStack, HStack } from '@chakra-ui/react';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog, WiDust } from 'react-icons/wi';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  switch (conditionLower) {
    case 'clear':
    case 'clear sky':
      return WiDaySunny;
    case 'rain':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
      return WiRain;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      return WiSnow;
    case 'thunderstorm':
      return WiThunderstorm;
    case 'mist':
    case 'fog':
      return WiFog;
    case 'dust':
    case 'sand':
      return WiDust;
    default:
      return WiCloudy;
  }
};

export const WeatherCard = ({ city, temperature, condition, humidity, windSpeed }: WeatherCardProps) => {
  const WeatherIcon = getWeatherIcon(condition);

  return (
    <Box
      bg="whiteAlpha.300"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={6}
      boxShadow="xl"
      border="1px solid"
      borderColor="whiteAlpha.400"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {city}
          </Text>
          <Icon as={WeatherIcon} w={12} h={12} color="white" />
        </Flex>

        <Text fontSize="4xl" fontWeight="bold" color="white">
          {temperature}°C
        </Text>

        <Text fontSize="lg" color="whiteAlpha.900">
          {condition}
        </Text>

        <HStack spacing={4} justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color="whiteAlpha.800">
              Umidade
            </Text>
            <Text fontSize="md" fontWeight="medium" color="white">
              {humidity}%
            </Text>
          </VStack>

          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color="whiteAlpha.800">
              Velocidade do Vento
            </Text>
            <Text fontSize="md" fontWeight="medium" color="white">
              {windSpeed} km/h
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}; 