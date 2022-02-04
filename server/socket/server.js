import { WebSocketServer } from 'ws';
import * as client from './client.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws) => {
        // define events
        ws.on('open', () => client.connect(ws));
        ws.on('ping', () => client.heartbeat(ws));
        ws.on('close', () => client.disconnect(ws));

        ws.on('message', (raw) => {
            const { event, data } = JSON.parse(raw.toString());

            switch (event) {
                case 'join':
                    return client.joinChat(ws, data);
                case 'leave':
                    return client.leaveChat(ws);
                case 'message':
                    return client.textMessage(ws, data);
            }
        });
    });

    return wss;
};
