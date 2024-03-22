import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = async (payload: object): Promise<string> => {
    return "Bearer " + jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '3d' });
}
