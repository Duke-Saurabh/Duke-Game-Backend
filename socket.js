import { server } from './src/app.js';
import { Server } from 'socket.io';
import { joinGame } from './src/controllers/users.gameJoin.js';
import { sendUsersGameMess } from './src/controllers/users.gameMessage.js';
import { removeFromTeam } from './src/controllers/users.gameLeave.js';
import { cardSelect } from './src/controllers/users.game.playerIndex.js';
import { suffle } from './src/controllers/users.game.suffle.js';
import { playerSelected } from './src/controllers/users.game.playerSelected.js';

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

console.log('Socket server initialized');

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    joinGame(socket, io);
    sendUsersGameMess(socket, io);
    cardSelect(socket, io);
    suffle(socket, io);
    playerSelected(socket, io);
    
    socket.on('disconnect', () => {
        removeFromTeam(socket.id, io);
        console.log('A user disconnected:', socket.id);
    });
});

io.on('error', (error) => {
    console.error('Socket.io error:', error);
});

export { io };
