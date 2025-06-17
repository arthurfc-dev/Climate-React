import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Layout } from './components/Layout';

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
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <h1>Climate React</h1>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
