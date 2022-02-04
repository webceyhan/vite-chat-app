import { emit, broadcast } from './utils.js';

// define user map (socket:name)
const users = new Map();

export const joinChat = (ws, user) => {
    users.set(ws, user);
    emit(ws, 'joined', user);

    console.log(`user joined: ${user}`);
};

export const message = (ws, text) => {
    const date = Date.now();
    const user = users.get(ws);
    const message = { user, text, date };
    broadcast(users.keys(), 'message', message);

    console.log(`user messaged: ${user}`);
};

export const leaveChat = (ws) => {
    const user = users.get(ws);
    users.delete(ws);
    emit(ws, 'left', user);

    console.log(`user left: ${user}`);
};

export const disconnet = (ws) => {
    client.leaveChat(ws);
    clearTimeout(ws.pingTimeout);
    console.log('user disconnected');
};

export const heartbeat = function () {
    const user = users.get(ws);
    clearTimeout(this.pingTimeout);
    console.log(`heartbeat: ${user}`);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 30000 + 1000);
};
