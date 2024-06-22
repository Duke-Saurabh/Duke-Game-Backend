import { asyncHandler } from "../utils/assyncHandlers.js";
import { User } from "../models/users.modals.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";


const register = asyncHandler(async (req, res) => {
    const { name, userName, email, password } = req.body;

    console.log(req.body);
    console.log('Name:', name);
    console.log('UserName:', userName);
    console.log('Email:', email);

    // All fields are required
    if (![name, userName, email, password].every(Boolean) || [name, userName, email, password].some(field => field.trim() === '')) {
        throw new APIError(404, 'All fields are required');
    }

    console.log(userName);

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [
            { userName },
            { email }
        ]
    });

    if (existedUser) {
        console.log(existedUser);
        throw new APIError(409, 'User already exists. Register with a new userName or Email');
    }

    
   

    const user = await User.create({
        name: name.toLowerCase().trim(),
        userName: userName.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password,
       
    });

    // Created user
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
        throw new APIError(502, 'Unable to create user');
    }

    res.status(200).json(new APIResponse(200, createdUser));
});

export { register };
