const { createHttpServer } = require('./http');
const { createSocketServer } = require('./socket');

const PORT = process.env.PORT || 8080;

// start servers on same port
const server = createHttpServer(PORT);
const wss = createSocketServer(server);
