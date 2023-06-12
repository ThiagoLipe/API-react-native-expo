const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para obter a temperatura
app.get('/temperatura', (req, res) => {
  const cidade = req.query.cidade;
  const apiKey = '484e2aad606313884e28a7e6b2deb88a';

  // Faz a requisição para a API do OpenWeatherMap
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`)
    .then(response => {
      const temperatura = response.data.main.temp;
      res.send(`A temperatura em ${cidade} é ${temperatura}°C`);
    })
    .catch(error => {
      console.log(error);
      res.send('Erro ao obter a temperatura');
    });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
