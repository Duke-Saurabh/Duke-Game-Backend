import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { teams } from "./users.gameJoin.js";
import { io } from "../../socket.js";

const handleLeaveGame = (req, res) => {
  const { userName, teamSelected } = req.body;

  console.log('handleLeaveGame');

  if (!teams[teamSelected]) {
    throw new APIError(400, 'The teamSelected does not exist in our database');
  }

  const playerIndex = teams[teamSelected].findIndex(player => player.name === userName);

  if (playerIndex === -1) {
    throw new APIError(400, 'The user is not part of the team');
  }

  teams[teamSelected].splice(playerIndex, 1);
  console.log(teams[teamSelected]);
  io.emit(`/${teamSelected}`, teams[teamSelected]);
  res.status(200).json(new APIResponse(200, 'You successfully left the game.'));
};

const removeFromTeam = (socketId, io) => {
  for (let team in teams) {
    const index = teams[team].findIndex(member => member.id === socketId);
    if (index !== -1) {
      teams[team].splice(index, 1);
      io.emit(`/${team}`, teams[team]); // Emit updated team information to all clients
      return true;
    }
  }
  return false;
};

export { handleLeaveGame, removeFromTeam };
