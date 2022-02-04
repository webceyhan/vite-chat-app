import { WebSocketServer } from 'ws';
import * as client from './client.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws) => {
        console.log('socket connected');

        // define events
        ws.on('open', client.heartbeat);
        ws.on('ping', client.heartbeat);
        ws.on('close', () => client.disconnect(ws));

        ws.on('message', (raw) => {
            const { event, data } = JSON.parse(raw.toString());

            switch (event) {
                case 'join':
                    return client.joinChat(ws, data);
                case 'leave':
                    return client.leaveChat(ws);
                case 'message':
                    return client.message(ws, data);
            }
        });
    });

    return wss;
};
