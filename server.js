const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const createHttpServer = (port = 9090) => {
    // create app
    const app = express();
    const server = createServer(app);

    // serve static client files
    app.use(express.static('dist'));

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

        ws.on('message', (raw) => {
            const { event, data } = JSON.parse(raw.toString());

            switch (event) {
                case 'join':
                    // add user {ws as id: data as name}
                    user = data;
                    users.set(ws, user);                    
                    emit(ws, 'joined', user);

                    console.log(`user joined: ${user}`);
                    break;

                case 'leave':                    
                    users.delete(ws);
                    emit(ws, 'left', user);

                    console.log(`user left: ${user}`);
                    break;

                case 'message':
                    // construct message object
                    const message = {
                        user,
                        text: data,
                        date: Date.now(),
                    };

                    // broadcast message to all joined users
                    Array.from(users.keys()).forEach((socket) =>
                        emit(socket, 'message', message)
                    );

                    console.log(`user messaged: ${user}`);
                    break;
            }
        });
    });

    return wss;
};

// start servers on same port
const server = createHttpServer();
const wss = createSocketServer(server);
