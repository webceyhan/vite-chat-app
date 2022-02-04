import { debug, emit, broadcast } from './utils.js';

// define clients map <socket : name>
const clients = new Map();

export const connect = (ws) => {
    debug(clients.get(ws), 'connected');
    heartbeat(ws);
};

export const disconnect = (ws) => {
    leaveChat(ws);

    debug(clients.get(ws), 'disconnected');
};

export const heartbeat = (ws) => {
    ws.isAlive = true;
    debug(clients.get(ws), `is alive`);
};

// CUSTOM EVENTS ///////////////////////////////////////////////////////////////////////////////////

export const joinChat = (ws, userName) => {
    clients.set(ws, userName);
    emit(ws, 'joined', userName);

    debug(userName, 'joined');
};

export const textMessage = (ws, text) => {
    const date = Date.now();
    const userName = clients.get(ws);
    const message = { user: userName, text, date };

    broadcast(clients.keys(), 'message', message);

    debug(userName, 'messaged');
};

export const leaveChat = (ws) => {
    const userName = clients.get(ws);

    clients.delete(ws);
    emit(ws, 'left', userName);

    debug(userName, 'left');
};
