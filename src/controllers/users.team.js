import { asyncHandler } from "../utils/assyncHandlers.js";
import { APIError } from "../utils/APIError.js";
import { Team} from "../models/teams.modals.js";
import { User } from "../models/users.modals.js";
import { APIResponse } from "../utils/APIResponse.js";

const createTeam = asyncHandler(async (req, res) => {
    const {
        teamName,
        firstPlayerUserName,
        secondPlayerUserName,
        thirdPlayerUserName,
        fourthPlayerUserName
    } = req.body;

    if (![teamName, firstPlayerUserName, secondPlayerUserName, thirdPlayerUserName, fourthPlayerUserName].every(Boolean) ||
        [teamName, firstPlayerUserName, secondPlayerUserName, thirdPlayerUserName, fourthPlayerUserName].some(field => field.trim() === '')) {
        throw new APIError(400, 'All fields are required');
    }

    const existedTeam = await Team.findOne({ teamName: teamName.trim() });

    if (existedTeam) {
        throw new APIError(409, 'Team already exists. Create a new Team');
    }

    const users = await User.find({
        userName: {
            $in: [firstPlayerUserName, secondPlayerUserName, thirdPlayerUserName, fourthPlayerUserName].map(username => username.trim())
        }
    });

    if (users.length !== 4) {
        throw new APIError(404, 'Some users do not exist in the database. Please check again');
    }

    const team = await Team.create({
        teamName: teamName.trim(),
        firstPlayerUserName: firstPlayerUserName.trim(),
        secondPlayerUserName: secondPlayerUserName.trim(),
        thirdPlayerUserName: thirdPlayerUserName.trim(),
        fourthPlayerUserName: fourthPlayerUserName.trim()
    });

    if (!team) {
        throw new APIError(502, 'Unable to create Team');
    }

    res.status(200).json(new APIResponse(200, team));
});

const sendTeams = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.userName) {
        throw new APIError(401, 'Authentication failed.');
    }

    const { userName, email } = req.user;
    // Find the current user in the database
    const user = await User.findOne({ userName, email });

    // If user not found, throw a 404 error
    if (!user) {
        throw new APIError(404, "User not found");
    }

    const teams = await Team.aggregate([
        {
            $match: {
                $or: [
                    { firstPlayerUserName: userName },
                    { secondPlayerUserName: userName },
                    { thirdPlayerUserName: userName },
                    { fourthPlayerUserName: userName }
                ]
            }
        },
        { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(new APIResponse(200, teams));
});

export { createTeam, sendTeams };
