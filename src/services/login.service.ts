
import prisma from "../../DB/db.config";

export const isEmailRegistered = async(email:string): Promise<boolean>=>{
    const findUser = await prisma.um_users.findUnique({
        where: {
            user_email: email.toLowerCase()
        }
    });
    
    if(findUser) return true;

    return false;
}


export const isValidEmail = async (email: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isCredentialsTrue = async(email:string,password:string)=>{
    const findUser = await prisma.um_users.findUnique({
        where: {
            user_email: email.toLowerCase(),
            user_password : password

        }
    });

    if(findUser){
        return {
            email:email,
            id: findUser.user_id
        }
    }
    return false;

}