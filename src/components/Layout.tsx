import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bgGradient="linear(to-br, blue.400, purple.500)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
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
      zIndex={0}
    >
      <Flex
        minH="100vh"
        minW="100vw"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
      >
        <Box
          bg="whiteAlpha.200"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={{ base: 4, md: 8 }}
          boxShadow="xl"
          border="1px solid"
          borderColor="whiteAlpha.300"
          w={{ base: '95vw', md: '80vw', lg: '70vw', xl: '60vw' }}
          maxW="1600px"
          minH="200px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
}; 