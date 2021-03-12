//This file loads in the html file, and serves it when needed.
//Technically we could put the html file into the /assets folder and we
//would not need this code.
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

module.exports = {
  getIndex,
};