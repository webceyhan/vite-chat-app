// define user map (socket:name)
const users = new Map();

// HELPERS //////////////////////////////
const emit = (ws, event, data) => {
    ws.send(JSON.stringify({ event, data }));
};

const broadcast = (clients, event, data) =>
    Array.from(clients).map((ws) => emit(ws, event, data));

// EVENTS ///////////////////////////////
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

export const heartbeat = function () {
    const user = users.get(ws);
    clearTimeout(this.pingTimeout);
    console.log(`heartbeat: ${user}`);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 30000 + 1000);
};

export const useClient = (ws) => {
    return {
        join: (user) => joinChat(ws, user),
        leave: () => leaveChat(ws),
    };
};
