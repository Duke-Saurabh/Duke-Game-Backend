
import { Team } from "../models/teams.modals.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/assyncHandlers.js";


const sendTeamMates=asyncHandler(async(req,res)=>{
    const {teamSelected}=req.body;
    // console.log(req.body);
    
    if(!teamSelected){
        throw new APIError(404,'Please select a team first');
    }
    const team=await Team.findOne({teamName:teamSelected})

    if(!team || team.teamName!==teamSelected){
        throw new APIError(409,'this team not exist in database. Create team first.');
    }

    res.status(200).json(new APIResponse(200,team));

})

let teams={};
const joinGame = () => {
    socket.on('joinGame', (user) => {
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

        socket.on('disconnect', () => {
            teams[team] = teams[team].filter(member => member.id !== socket.id);
            io.emit(`/${team}`, teams[team]); // Emit updated team information to all clients
        });
    });
}

// const leaveGame=()=>{
//     socket.on('disconnect',()=>{
//         teams.team=teams.team.filter(field=>field.id!=socket.id);
//     })
// }

export {sendTeamMates,joinGame};