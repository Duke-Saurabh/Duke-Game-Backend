
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





export {sendTeamMates};