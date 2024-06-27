import { server } from './src/app.js';
import { Server } from 'socket.io';
import { joinGame } from './src/controllers/users.gameJoin.js';
import { sendUsersGameMess } from './src/controllers/users.gameMessage.js';
import { removeFromTeam } from './src/controllers/users.gameLeave.js';
import { cardSelect } from './src/controllers/users.game.playerIndex.js';
import { suffle } from './src/controllers/users.game.suffle.js';

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    joinGame(socket, io);
    sendUsersGameMess(socket, io);
    cardSelect(socket,io);
    suffle(socket,io);
    
    socket.on('disconnect', () => {
        removeFromTeam(socket.id, io);
        console.log('a user disconnected');
    //     handleDisconnect(socket, io);
    });
});

// const handleDisconnect = (socket, io) => {
//     // Your disconnect logic here
//     // Ensure this function handles cleaning up the user's data
// };

export { io };
