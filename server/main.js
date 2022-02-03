const path = require('path');
const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const createHttpServer = (port = process.env.PORT || 8080) => {
    // create app
    const app = express();
    const server = createServer(app);

    // set root directory
    const rootDir = path.join(__dirname, '/../dist');

    // serve static client files
    app.use(express.static(rootDir));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(rootDir + '/index.html'));
    });

    // listen
    server.listen(port, () => {
        console.log(`server started: http://localhost:${port}`);
    });

    return server;
};

const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    // define user map (socket:name)
    const users = new Map();

    // define client with helper
    const emit = (ws, event, data) => {
        ws.send(JSON.stringify({ event, data }));
    };

    wss.on('connection', (ws) => {
        let user = null;
        console.log('socket connected');

        const joinChat = (userName) => {
            user = userName; // set global user
            users.set(ws, user); // add to room

            emit(ws, 'joined', user);
            console.log(`user joined: ${user}`);
        };

        const leaveChat = () => {
            users.delete(ws);

            emit(ws, 'left', user);
            console.log(`user left: ${user}`);
        };

        const receiveMessage = (text) => {
            const date = Date.now();
            const message = { user, text, date };

            // broadcast message to all joined users
            Array.from(users.keys()).forEach((socket) =>
                emit(socket, 'message', message)
            );

            console.log(`user messaged: ${user}`);
        };

        const heartbeat = function () {
            clearTimeout(this.pingTimeout);
            console.log(`heartbeat: ${user}`);
            // Use `WebSocket#terminate()`, which immediately destroys the connection,
            // instead of `WebSocket#close()`, which waits for the close timer.
            // Delay should be equal to the interval at which your server
            // sends out pings plus a conservative assumption of the latency.
            this.pingTimeout = setTimeout(() => {
                this.terminate();
            }, 30000 + 1000);
        };

        // EVENTS ///////////////////////////////////////////////////////////////

        ws.on('open', heartbeat);
        ws.on('ping', heartbeat);

        ws.on('close', () => {
            leaveChat();
            clearTimeout(ws.pingTimeout);
            console.log('connection closed');
        });

        ws.on('message', (raw) => {
            const { event, data } = JSON.parse(raw.toString());

            switch (event) {
                case 'join':
                    return joinChat(data);
                case 'leave':
                    return leaveChat();
                case 'message':
                    return receiveMessage(data);
            }
        });
    });

    return wss;
};

// start servers on same port
const server = createHttpServer();
const wss = createSocketServer(server);
