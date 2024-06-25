import User from "../Model/user.js";

export const registerUser = () =>{
	try{
        const user = {
        name,
        email,
        password,
        phoneNo,
        role
    } = req.body;

    const newUser = new User(user);
    newUser.save()
    .then(() => {
        res.status(201).json({
            message: 'User created'})
        })
    }catch(error){
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const loginUser = () =>{
    try{
        const {email, password} = req.body
        const isUser = User.findOne(email | email);
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