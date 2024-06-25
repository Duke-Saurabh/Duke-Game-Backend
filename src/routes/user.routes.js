import { Router } from 'express';
import { register } from '../controllers/users.register.js';
import { login } from '../controllers/users.login.js';
import { createTeam, sendTeams } from '../controllers/users.team.js';
import { authmiddleware } from '../middlewares/verifyAccessToken.middlewares.js';
import { logout } from '../controllers/users.logout.js';
import { sendTeamMates } from '../controllers/users.game.js';
import { handleLeaveGame } from '../controllers/users.gameLeave.js';
const router = Router();

//public route
router.post('/login', login);
router.post('/register', register);

//authentic route
router.post('/createTeam',authmiddleware,createTeam);
router.get('/team',authmiddleware,sendTeams);
router.post('/logout', logout);
router.post('/teamMates',sendTeamMates);
router.post('/teamMates/game/leave',handleLeaveGame);

export default router;










