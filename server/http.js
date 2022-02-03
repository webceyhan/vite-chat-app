import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import express from 'express';

// define constants
const __dirname = dirname(fileURLToPath(import.meta.url));
const wwwDir = `${__dirname}/../dist`;
const wwwIndex = `${wwwDir}/index.html`;

export const createHttpServer = (port) => {
    // create app
    const app = express();
    const server = createServer(app);

    // serve static client files
    app.use(express.static(wwwDir));

    // define catch-all route for app
    app.get('*', (req, res) => res.sendFile(wwwIndex));

    // start listening
    server.listen(port, () =>
        console.log(`server started: http://localhost:${port}`)
    );

    return server;
};
