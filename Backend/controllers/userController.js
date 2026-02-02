import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}


// Route for user login
const loginUser = async (req,res) => {
    try {
        
      const {email,password} = req.body

    //  not exits

    const user = await userModel.findOne({email});

    if (!user) {
         return res.json({success:false,message:"User does not exists"});
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if (isMatched) {
        const token = createToken(user._id);

        res.json({success:true,token});
    }
    else{
        res.json({sucess:false,message:"Invalid creadetials"})
    }

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}

// Route for user registration

const registerUser = async (req,res) => {
     
    try {
        const {name,email,password} = req.body;

        // checking user already exits or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        // Validating email formate & strong password

         if (!validator.isEmail(email)) {
            return res.json({scuccess:false,message:"Please enter a valid email"})
         }

         if (password.length<8) {
            return res.json({scuccess:false,message:"Please enter a Strong password"})
         }

        //  hashing password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({sucess:true,token})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}

// Route for admin login

const adminLogin = async (req,res) => {
    
    try {

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
         console.log(error);
        res.json({sucess:false,message:error.message})
    }

}

export {loginUser,registerUser,adminLogin}