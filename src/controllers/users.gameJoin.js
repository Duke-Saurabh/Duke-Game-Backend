let teams = {};

const joinGame = (socket, io) => {
    console.log('jpoin game 1')
    socket.on('joinGame', (user) => {
        console.log('jpoin game 2')
        const team = user.teamSelected;
        const playerName = user.userName;

        if (!playerName || typeof playerName !== 'string' || playerName.trim() === '') {
            socket.emit('error', { message: 'Invalid userName' });
            return;
        }

        if (!team || typeof team !== 'string' || team.trim() === '') {
            socket.emit('error', { message: 'Invalid team name' });
            return;
        }

        if (!teams[team]) {
            teams[team] = [];
        }

        const playerAlreadyInAnyTeam = Object.values(teams).some(teamMembers =>
            teamMembers.some(member => member.id === socket.id)
        );

        if (playerAlreadyInAnyTeam) {
            socket.emit('error', { message: 'User is already in a team' });
            return;
        }

        if (teams[team].length >= 4) {
            socket.emit('error', { message: 'Team is full' });
            return;
        }

        if (!teams[team].some(member => member.id === socket.id)) {
            teams[team].push({ id: socket.id, name: playerName });
            io.emit(`/${team}`, teams[team]); // Emit updated team information to all clients
        }

        
    });
};


// const handleDisconnect = (socket, io) => {
    //  socket.on('disconnect', () => {
//         for (let team in teams) {
//             const index = teams[team].findIndex(member => member.id === socket.id);
//             if (index !== -1) {
//                 teams[team].splice(index, 1);
//                 io.emit(`/${team}`, teams[team]); // Emit updated team information to all clients
//                 break;
//             }
//         }
//     });  
// };

export { joinGame ,teams};
