const http = require('http');
require('dotenv').config();
const router = require('./router');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  router(req, res);
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));