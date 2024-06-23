import mongoose from "mongoose";

const teamSchema=new mongoose.Schema({
    teamName:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    firstPlayerUserName:{
        type: String,
        required: true,
        unique: true,
    },
    secondPlayerUserName:{
        type: String,
        required: true,
        unique: true,
    },
    thirdPlayerUserName:{
        type: String,
        required: true,
        unique: true,
    },
    fourthPlayerUserName:{
        type: String,
        required: true,
        unique: true,
    }

},{timestamps:true});

// Create the User model
const Team = mongoose.model('Team', teamSchema);

export {Team};
