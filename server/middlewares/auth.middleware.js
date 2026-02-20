import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({ message: "Not authorized" });
    }

    const decoded  = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();

}

//authorize user roles for admin tasks
export const authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) {
            return  next(new ErrorHandler(
                `Role ${req.user.role} is not allowed to access this resource`,403
            ));
        }
        next();
    }
}