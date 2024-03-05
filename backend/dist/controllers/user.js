import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
export const newUser = async (req, res, next) => {
    try {
        return next(new ErrorHandler("mera error", 402));
        const { name, email, photo, gender, dob, _id } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            gender,
            dob: new Date(dob),
            _id,
        });
        return res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        });
    }
};
