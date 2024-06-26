import User from "../Model/user.js";
import bcrypt, { genSalt } from 'bcrypt'
import { createToken } from "../helper/userHelper.js";

export const registerUser = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            phoneNo, 
            role 
        } = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        else{
            const newUser = new User({
                name,
                email,
                password : hashedPassword,
                phoneNo,
                role
            });
            
            newUser.save()
            .then(() => {
                res.status(201).json({
                    message: 'User created'
                });
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
        console.log(error);
    }
};

export const loginUser = async (req, res) =>{
    try{
        const {
            email, 
            password
        } = req.body
        
        const isUser = await User.findOne({email});
        
        if(!isUser){
            res.status(404).json({
                message: 'User not found'
            })
        }
        else{
            const isPassword = await bcrypt.compare(password, isUser.password);
            if(isPassword){
                const token = createToken(isUser._id, isUser.role);
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24*60*60*1000,
                    secure : true
                })
                res.status(200).json({
                    message: 'Login successful',
                    token
                })
            }
            else{
                res.status(400).json({
                    message: 'Invalid credentials'
                })
            }
        }
    }catch(error){
        res.status(500).json({
            message: ' Internal Server Error'
        })
        console.log(error);
    }
}
