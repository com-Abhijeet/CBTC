import jwt from 'jsonwebtoken';

export const createToken = (id ,role) =>{
    const JWT_SECRET = 'KingOfHill';
    return jwt.sign({id, role}, JWT_SECRET, {
        expiresIn: '1d'
    })
}