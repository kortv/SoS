// server/app.js
const express = require('express');
const path = require('path');
var Pokedex = require("pokedex-promise-v2");

const app = express();

const P = new Pokedex();

P.getTypesList() // with Promise
  .then(response => {
    console.log(response);
    // response.forEach((obj) => {
    //   console.log(obj.name);
    //   console.log(obj.id);
    //   console.log(JSON.stringify(obj.abilities));
    //   console.log(JSON.stringify(obj.types));
    // })
  })
  .catch(error => {
    console.log("There was an ERROR: ", error);
  });


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/api/bla', (req, res) => {
  console.log('api');
  res.send({
    some: "json"
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
