const { WebSocketServer } = require('ws');

function createSocketServer() {
    // create websocket server
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

                    // broadcast message to all joined users
                    Array.from(users.keys()).forEach((socket) =>
                        emit(socket, 'message', message)
                    );

                    console.log('message received:', message);
                    break;
            }
        });
    });

    return wss;
}

const wss = createSocketServer();
