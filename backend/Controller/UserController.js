import User from "../Model/user.js";

export const registerUser = () =>{
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
}