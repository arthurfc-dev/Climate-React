import { Box, Flex } from '@chakra-ui/react';
import { Header } from './Header';
import type { ReactNode } from 'react';

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
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Flex
        flex={1}
        w="100%"
        align="center"
        justify="center"
        direction="column"
        position="relative"
        zIndex={1}
        minH={0}
        mt={0}
        mb={0}
      >
        <Box
          bg="whiteAlpha.200"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={{ base: 4, md: 8 }}
          pb={16}
          boxShadow="xl"
          border="1px solid"
          borderColor="whiteAlpha.300"
          w="100%"
          maxW="700px"
          minH="200px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          overflow="unset"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
}; 