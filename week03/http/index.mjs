import * as http from 'http';
import fs from 'fs';

const PORT = 4000;
const HOST = '127.0.0.1';

const server = http.createServer();

let html = fs.readFileSync('./index.html');

server.on('request', (req, res) => {
  res.writeHead('200', 'Content Type: text/html');
  res.end(html.toString());
})

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});