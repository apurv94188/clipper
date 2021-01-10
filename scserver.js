const http = require('http');
const port = process.env.port || 3030

const handle_request = require('./handle_client_request.js');
const sc_server = http.createServer(handle_request);

sc_server.listen(port);
