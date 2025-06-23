const fs = require('fs');
const readline = require('readline');
const path = require('path');

const inputFile = path.join(__dirname, '../utils/allCountries.txt');
const outputFile = path.join(__dirname, '../utils/cities.json');

const countriesCities = {};

console.log('Processando cidades, isso pode demorar alguns minutos...');

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  // GeoNames: geonameid\tname\tasciiname\t...\tcountry_code\t...\tfeature_class\tfeature_code\t...
  // Campos: 0-id, 1-nome, 8-country_code, 6-feature_class, 7-feature_code
  const parts = line.split('\t');
  if (parts[6] === 'P') { // Apenas cidades
    const countryCode = parts[8];
    const city = parts[1];
    if (!countriesCities[countryCode]) countriesCities[countryCode] = [];
    countriesCities[countryCode].push(city);
  }
});

rl.on('close', () => {
  // Remover duplicatas e ordenar
  Object.keys(countriesCities).forEach(country => {
    countriesCities[country] = Array.from(new Set(countriesCities[country])).sort((a, b) => a.localeCompare(b));
  });
  fs.writeFileSync(outputFile, JSON.stringify(countriesCities, null, 2), 'utf8');
  console.log('Arquivo cities.json gerado com sucesso!');
});