# Climate React

Uma aplicação web moderna para visualizar informações climáticas de cidades ao redor do mundo, construída com React e TypeScript.

## Características

- Design moderno com efeito glassmorphism
- Busca de clima por cidade
- Exibição de temperatura, condições climáticas, umidade e velocidade do vento
- Interface responsiva
- Suporte a múltiplas cidades

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Chakra UI
- Axios
- OpenWeatherMap API

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/climate-react.git
cd climate-react
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API do OpenWeatherMap:
```
VITE_WEATHER_API_KEY=sua_chave_api_aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Como Usar

1. Digite o nome de uma cidade na barra de pesquisa
2. Pressione Enter ou clique no ícone de busca
3. As informações climáticas serão exibidas em um card
4. Você pode buscar por múltiplas cidades

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
