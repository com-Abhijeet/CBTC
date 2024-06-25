import User from "../Model/user.js";

export const registerUser = (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            phoneNo, 
            role 
        } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            phoneNo,
            role
        });
        
        const isEmail = User.findOne({email});
        if(isEmail){
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        else{
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

export const loginUser = (req, res) =>{
    try{
        const {email, password} = req.body
        const isUser = User.findOne({email});
        if(isUser){
            if(isUser.password === password){
                res.status(200).json({
                    message: 'Login successful'
                })
            }else{
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        }
        else{
            res.status(404).json({
                message: 'User not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message: ' Internal Server Error'
        })
    }
}