// const express = require('express');
// const { createServer } = require('http');
const { WebSocketServer } = require('ws');

function createSocketServer(server) {
    // create websocket server
    // const wss = new WebSocketServer({ server });
    const wss = new WebSocketServer({ port: 9090 });

    // define user map (socket:name)
    const users = new Map();

    // define client with helper
    const emit = (ws, event, data) => {
        ws.send(JSON.stringify({ event, data }));
    };

    wss.on('connection', (ws) => {
        console.log('socket connected');

        ws.on('message', (raw) => {
            const { event, data } = JSON.parse(raw.toString());

            switch (event) {
                case 'join':
                    // add user {ws as id: data as name}
                    users.set(ws, data);
                    emit(ws, 'joined', true);
                    console.log(`user joined: ${data}`);
                    break;

                case 'message':
                    // construct message object
                    const message = {
                        user: users.get(ws),
                        text: data,
                        date: Date.now(),
                    };

                    console.log('message received:', message);

                    // broadcast message to all joined users
                    Array.from(users.keys()).forEach((socket) =>
                        emit(socket, 'message', message)
                    );
                    break;
            }
        });
    });

    return wss;
}

// const app = express();
// const server = createServer(app);
// const wss = createSocketServer(server);
const wss = createSocketServer();

// server.listen(9090);
