import { server } from './src/app.js';
import { Server } from 'socket.io';
import { joinGame } from './src/controllers/users.gameJoin.js';
import { sendUsersGameMess } from './src/controllers/users.gameMessage.js';

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    joinGame(socket,io)
    sendUsersGameMess(socket,io);
    
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

export { io };
