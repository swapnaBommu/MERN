import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type:String,
        requited:[true, "Email is required"],
        unique:true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // ❗ Hide password by default
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
},{timestamps:true}
);

// Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//return JWT token
userSchema.methods.generateToken = function(){
    //creating jwt token
    return jwt.sign({id:this._id,role: this.role,name:this.name}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
};

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};


const User = mongoose.model("User", userSchema);

export default User; 