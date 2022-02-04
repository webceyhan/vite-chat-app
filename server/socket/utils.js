export const emit = (ws, event, data) => {
    ws.send(JSON.stringify({ event, data }));
};

export const broadcast = (clients, event, data) =>
    Array.from(clients).map((ws) => emit(ws, event, data));
