import { emit, broadcast } from './utils.js';

// define user map (socket:name)
const users = new Map();

export const connect = (ws) => {
    console.log('user connected');
    heartbeat(ws);
};

export const disconnect = (ws) => {
    leaveChat(ws);
    clearTimeout(ws.pingTimeout);

    console.log('user disconnected');
};

export const heartbeat = (ws) => {
    const delay = 30000 + 1000;
    const user = users.get(ws);

    clearTimeout(ws.pingTimeout);

    console.log(`heartbeat: ${user}`);
    ws.pingTimeout = setTimeout(() => ws.terminate(), delay);
};

// CUSTOM EVENTS ///////////////////////////////////////////////////////////////////////////////////

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
