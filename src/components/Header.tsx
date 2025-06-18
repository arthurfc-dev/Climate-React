import { Flex, Text, Link, HStack, Icon, Box, Button, Collapse, Spacer } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
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
    <Box w="auto" maxW="700px" mx="auto" mt={4} mb={4} position="relative">
      <Flex
        as="header"
        w="100%"
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
        zIndex={10}
        minH="56px"
        maxH="56px"
      >
        <HStack spacing={2} align="center" flexShrink={0} mr={6}>
          <Icon as={FaReact} w={6} h={6} color="blue.200" />
          <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="wide" display="flex" alignItems="center">
            ClimateReact
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={0} align="center" justify="center" flex={1} maxW="400px">
          {tabInfo.map((tab, idx) => (
            <HStack key={tab.label} spacing={0} align="center">
              {idx > 0 && (
                <Text color="whiteAlpha.500" px={2} fontWeight="bold">|</Text>
              )}
              <Button
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: 'whiteAlpha.300', color: 'blue.200' }}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                fontWeight="bold"
                fontSize="md"
                px={3}
                py={2}
                h="auto"
              >
                {tab.label}
              </Button>
            </HStack>
          ))}
        </HStack>
        <Spacer />
        <HStack spacing={4} align="center" flexShrink={0} ml={4}>
          <Link href="https://github.com/seu-usuario" isExternal aria-label="GitHub" display="flex" alignItems="center">
            <Icon as={FaGithub} w={5} h={5} color="whiteAlpha.900" _hover={{ color: 'blue.200' }} />
          </Link>
          <Link href="https://linkedin.com/in/seu-usuario" isExternal aria-label="LinkedIn" display="flex" alignItems="center">
            <Icon as={FaLinkedin} w={5} h={5} color="whiteAlpha.900" _hover={{ color: 'blue.300' }} />
          </Link>
        </HStack>
      </Flex>
      {/* Texto explicativo em position absolute, não afeta o layout */}
      <Box position="absolute" left={0} right={0} top="100%" zIndex={20} pointerEvents="none">
        {tabInfo.map((tab, idx) => (
          <Collapse in={hoveredTab === idx} animateOpacity key={tab.label} unmountOnExit style={{ pointerEvents: 'auto' }}>
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
              pointerEvents="auto"
            >
              {tab.text}
            </Box>
          </Collapse>
        ))}
      </Box>
    </Box>
  );
}; 