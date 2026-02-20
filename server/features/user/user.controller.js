import User from "./user.model.js";



export const createUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password });
        
        const token = user.generateToken();
        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    }catch(err){
        console.log("Error in registering user",err);
    }
}

export const login = async (req, res)=>{
    try{
       const {email, password} = req.body;
       const user =await User.findOne({email}).select("+password");
       if (!user){
           return res.status(400).json({ message: "Invalid credentials" });
       }
       const isMatch = await user.comparePassword(password);

       if (!isMatch){

           return res.status(400).json({ message: "Invalid credentials" });
       }
       const token = await user.generateToken();
       res.json({
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    }catch(err){
        res.status(500).json({message:"Server Error"})
        console.log(err.message);
    }
}


export const logout = async (req, res) =>{
    res.cookie("token",null, {
        expires : new Date(Date.now()),
        httpOnly : true
    });
    res.status(200).json({
        message:"Logged Out"
    })
}


