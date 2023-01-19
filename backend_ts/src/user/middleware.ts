import {User, IUser} from "./model.js"
import {Request, Response, Next} from "express"

import jwt from "jsonwebtoken";

export async function getUserByID(req: Request, res: Response, next: Next){
    let user:IUser;  
    console.log(req.params.id);
    
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user!' });
        }
    } catch (err) {
        console.log("ONOOO");
        
        return res.status(500).json({ message: err.message })
    }
    req.body.user = user;
    console.log(user);
    next();
}



const HASH_KEY = '507efdf8992d4e9ff3343f55334c2de8929da7ff93d7063aadb01a4fec6869e62c642e77b64f06e1466f16bb087b3f039ba154e63a2306aadd4a546120f935a0';

const verifyToken = async (req: Request, res: Response, next: Next) => {
    const auth = req.params.authentication
    if(!auth) return res.sendStatus(401)
    const token = auth.split(" ")[1]
    if (!token) return res.sendStatus(401)
    const decoded = jwt.verify(token, HASH_KEY);
    jwt.verify(token, HASH_KEY, (err, userID) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        try {
            
        } catch (err){
            res.sendStatus(403)
        }
    })

}

export default { getUserByID };