import { Flex, Text, HStack, Box, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const tabs = [
  {
    label: 'Sobre',
    description: 'Este site mostra o clima de cidades do mundo em tempo real, com design moderno e responsivo.'
  },
  {
    label: 'Como usar',
    description: 'Escolha um país, digite o nome da cidade e veja as informações climáticas instantaneamente.'
  },
  {
    label: 'Créditos',
    description: 'Desenvolvido por Seu Nome. Dados fornecidos pela OpenWeatherMap.'
  }
];

export const Footer = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Flex
      as="footer"
      w="auto"
      maxW="700px"
      mx="auto"
      mb={4}
      mt={4}
      px={{ base: 6, md: 10 }}
      py={2}
      align="center"
      justify="center"
      bg="whiteAlpha.200"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      boxShadow="md"
      border="1px solid"
      borderColor="whiteAlpha.300"
      position="relative"
      direction="column"
      flexDirection="column"
    >
      <HStack spacing={8} justify="center">
        {tabs.map((tab, idx) => (
          <Box
            key={tab.label}
            px={4}
            py={2}
            borderRadius="md"
            cursor="pointer"
            color="whiteAlpha.900"
            fontWeight="bold"
            fontSize="md"
            _hover={{ bg: 'whiteAlpha.300' }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            transition="background 0.2s"
          >
            {tab.label}
          </Box>
        ))}
      </HStack>
      <Box minH="32px" mt={2} textAlign="center">
        {hovered !== null && (
          <Text color="whiteAlpha.900" fontSize="sm" transition="opacity 0.2s">
            {tabs[hovered].description}
          </Text>
        )}
      </Box>
    </Flex>
  );
}; 