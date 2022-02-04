import { WebSocketServer } from 'ws';
import * as client from './client.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    // Keep-alive check on clints
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) return ws.terminate();
            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);

    wss.on('close', () => clearInterval(interval));

    wss.on('connection', (ws) => {
        // define events
        client.connect(ws);
        ws.on('pong', ()=> client.heartbeat(ws));
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
