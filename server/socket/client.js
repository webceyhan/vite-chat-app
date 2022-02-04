import { emit, broadcast } from './utils.js';

// define clients map <socket : name>
const clients = new Map();

export const connect = (ws) => {
    console.log('client connected');
    heartbeat(ws);
};

export const disconnect = (ws) => {
    leaveChat(ws);
    clearTimeout(ws.pingTimeout);

    console.log('client disconnected');
};

export const heartbeat = (ws) => {
    const delay = 30000 + 1000;
    const userName = clients.get(ws);

    clearTimeout(ws.pingTimeout);

    console.log(`heartbeat: ${userName}`);
    ws.pingTimeout = setTimeout(() => ws.terminate(), delay);
};

// CUSTOM EVENTS ///////////////////////////////////////////////////////////////////////////////////

export const joinChat = (ws, userName) => {
    clients.set(ws, userName);
    emit(ws, 'joined', userName);

    console.log(`client joined: ${userName}`);
};

export const textMessage = (ws, text) => {
    const date = Date.now();
    const userName = clients.get(ws);
    const message = { user: userName, text, date };
    broadcast(clients.keys(), 'message', message);

    console.log(`client messaged: ${userName}`);
};

export const leaveChat = (ws) => {
    const userName = clients.get(ws);
    clients.delete(ws);
    emit(ws, 'left', userName);

    console.log(`client left: ${userName}`);
};
