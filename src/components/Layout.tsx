import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.400, purple.500)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("/bg-pattern.svg")',
        opacity: 0.1,
        zIndex: 0,
      }}
    >
      <Container
        maxW="container.xl"
        py={8}
        position="relative"
        zIndex={1}
      >
        <Box
          bg="whiteAlpha.200"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={6}
          boxShadow="xl"
          border="1px solid"
          borderColor="whiteAlpha.300"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}; 