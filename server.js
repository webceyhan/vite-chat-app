const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createHttpServer } = require('http');
const { createServer: createViteServer } = require('vite');
const { WebSocketServer } = require('ws');

async function createServer() {
    const app = express();
    const server = createHttpServer(app);

    // Create Vite server in middleware mode. This disables Vite's own HTML
    // serving logic and let the parent server take control.
    //
    // In middleware mode, if you want to use Vite's own HTML serving logic
    // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
    const vite = await createViteServer({
        server: { middlewareMode: 'html' },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        // serve index.html - we will tackle this next
    });

    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('socket connected');
    });

    server.listen(3000);
}

createServer();
