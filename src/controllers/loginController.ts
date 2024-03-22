import { isEmailRegistered, isCredentialsTrue , isValidEmail} from './../services/login.service';
import { Request, Response } from 'express';
import {generateToken} from '../services/jwt.service'
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    
    const valid = await isValidEmail(email);

    if(!(valid)){
        return res.json({status:400, msg:"Bad Request"})
    }
    

    try {

        if (await isEmailRegistered(email)) {
            

            const valid =  await isCredentialsTrue(email, password);
            if (valid) {
                const token = await generateToken(valid)
                return res.json({status:200, msg:"Login Successfully",token:token})
            }

        }

        return res.json({ status: 403, msg: "Wrong Credentials" })

    } catch (error) {
        console.error("Error creating user:", error);
        return res.json({ status: 500, msg: "Internal Server Error" });
    }
};


// function generateToken(payload: object): string {
//     return jwt.sign(payload, "secretKey", { expiresIn: '1h' });
// }


