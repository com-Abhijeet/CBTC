import User from "../Model/user.js";
import bcrypt, { genSalt } from 'bcrypt'
import { createToken } from "../helper/userHelper.js";
import  jwt   from "jsonwebtoken";

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
            const name = isUser.name;
        
        console.log(name);
        
        if(!isUser){
            res.status(404).json({
                message: 'User not found'
            })
        }
        else{
            const isPassword = await bcrypt.compare(password, isUser.password);
            if(isPassword){  
                const token = createToken(isUser._id, isUser.name);
                console.log("Generated token" , token);
                  
                res.cookie('token', token, {
                    httpOnly: false,
                    maxAge: 24*60*60*1000,
                    secure : process.env.NODE_ENV === 'production',
                    sameSite: 'Strict'
                    
                });
                console.log("Token set in Cokkie");
                res.status(200).json({
                    message: 'Login successful',
                    token ,
                    name
                });

            }
            else{
                res.status(400).json({
                    message: 'Invalid credentials'
                })
            }
        }
    }catch(error){
        res.status(500).json({
            message: ' Internal Server Error' , error
        })
        console.log(error);
    }
}

export const updateUserDetails = async (req,res) =>{
    try{
        const{
            id
        } = req.params;
        const{
            name,
            email,
            phoneNo,
            role
        } = req.body;
        const isUser = await User.findOne({id});
        if(!isUser){
            res.status(404).json({
                message: 'User not found'
            })
        }
        else{
            const updatedUser = await User.findByIdAndUpdate(i11d,{
                name,
                email,
                phoneNo,
                role
            });
            console.log(updatedUser);
            res.status(200).json({
                message: 'User updated'
            })
        }
            
    }catch(error){
        console.log(error);
        res.status(500).json({
            message : ' Internal Server Error'
        })
    }
}
