import { reactive } from 'vue';

// define environment vars
const IS_PROD = import.meta.env.PROD;
const HOST_DEV = 'ws://localhost:8080';
const HOST_PROD = location.origin.replace(/^http/, 'ws');
const SOCKET_URL = IS_PROD ? HOST_PROD : HOST_DEV;

const timestamp = (now = Date.now()) =>
    new Date(now).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

export const createApi = () => {
    // define internal state
    const state = reactive({
        user: null,
        messages: [],
        active: false,
    });

    // define socket
    // const socket = new WebSocket(SOCKET_URL);
    const socket = new WebSocket('wss://webceyhan-chat-app.herokuapp.com');

    // define emit helper
    const emit = (event, data) => socket.send(JSON.stringify({ event, data }));

    // define event handlers
    socket.onopen = () => {
        console.log('socket open');
    };

    socket.onmessage = (raw) => {
        // parse message as event, data
        const { event, data } = JSON.parse(raw.data);

        switch (event) {
            case 'joined':
                state.user = data;
                state.active = !!data;
                break;

            case 'left':
                state.user = null;
                state.active = false;
                state.messages = [];
                break;

            case 'message':
                state.messages.push({
                    ...data,
                    date: timestamp(data.date),
                });
                break;
        }
    };

    return { state, emit };
};
