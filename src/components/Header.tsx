import { Flex, Text, Link, HStack, Icon, Box, Button, Collapse } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';

const tabInfo = [
  {
    label: 'Sobre',
    text: 'Este site mostra o clima de cidades do mundo em tempo real, com design moderno e responsivo.'
  },
  {
    label: 'Como usar',
    text: 'Escolha um país, digite o nome da cidade e veja as informações do clima instantaneamente.'
  },
  {
    label: 'Créditos',
    text: 'Desenvolvido por Seu Nome. Dados fornecidos pela OpenWeatherMap.'
  },
];

export const Header = () => {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  return (
    <Box w="auto" maxW="700px" mx="auto" mt={4} mb={4}>
      <Flex
        as="header"
        w="100%"
        px={{ base: 6, md: 10 }}
        py={2}
        align="center"
        justify="space-between"
        bg="whiteAlpha.200"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="md"
        border="1px solid"
        borderColor="whiteAlpha.300"
        position="relative"
        zIndex={10}
      >
        <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="wide">
          ClimateReact
        </Text>
        <HStack spacing={4}>
          {tabInfo.map((tab, idx) => (
            <Button
              key={tab.label}
              variant="ghost"
              color="whiteAlpha.900"
              _hover={{ bg: 'whiteAlpha.300', color: 'blue.200' }}
              onMouseEnter={() => setHoveredTab(idx)}
              onMouseLeave={() => setHoveredTab(null)}
              fontWeight="bold"
              fontSize="md"
            >
              {tab.label}
            </Button>
          ))}
          <Link href="https://github.com/seu-usuario" isExternal aria-label="GitHub">
            <Icon as={FaGithub} w={5} h={5} color="whiteAlpha.900" _hover={{ color: 'blue.200' }} />
          </Link>
          <Link href="https://linkedin.com/in/seu-usuario" isExternal aria-label="LinkedIn">
            <Icon as={FaLinkedin} w={5} h={5} color="whiteAlpha.900" _hover={{ color: 'blue.300' }} />
          </Link>
        </HStack>
      </Flex>
      <Box minH="32px">
        {tabInfo.map((tab, idx) => (
          <Collapse in={hoveredTab === idx} animateOpacity key={tab.label} unmountOnExit>
            <Box
              mt={2}
              px={6}
              py={2}
              bg="whiteAlpha.300"
              borderRadius="md"
              color="white"
              fontSize="md"
              textAlign="center"
              boxShadow="md"
            >
              {tab.text}
            </Box>
          </Collapse>
        ))}
      </Box>
    </Box>
  );
}; 