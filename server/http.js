const path = require('path');
const express = require('express');
const { createServer } = require('http');

// define constants
const rootDir = path.join(__dirname, '/..');
const wwwDir = path.join(rootDir, '/dist');

const createHttpServer = (port) => {
    // create app
    const app = express();
    const server = createServer(app);

    // serve static client files
    app.use(express.static(wwwDir));

    // define catch-all route for app
    app.get('*', function (req, res) {
        res.sendFile(`${wwwDir}/index.html`);
    });

    // start listening
    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`server started: ${url}`);
    });

    return server;
};

module.exports = { createHttpServer };