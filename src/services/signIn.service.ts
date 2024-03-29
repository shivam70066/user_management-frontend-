import prisma from "../../DB/db.config";
import bcrypt from 'bcrypt';
interface UserData {
    data: object;
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds (recommended: 10 or higher)
    return bcrypt.hash(password, saltRounds);
}

export const isEmailRegistered = async (email: string): Promise<boolean> => {
    const findUser = await prisma.um_users.findUnique({
        where: {
            user_email: email.toLowerCase()
        }
    });

    if (findUser) return true;

    return false;
}

export const isValidData = async (name: string, email: string, password: string, gender: string, number: string): Promise<boolean> => {
    const isValidName = (name: string) => {
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        return nameRegex.test(name);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidNumber = (number: string) => {
        const numberRegex = /^\d{10}$/;
        return numberRegex.test(number);
    };

    const isValidGender = (gender: string) => {
        return gender === "male" || gender === "female";
    };

    const isValidPassword = (password: string) => {
        // Regular expression to match password with at least one uppercase, one lowercase, one digit, one special character, and minimum length of 8 characters
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return passwordRegex.test(password);
    };

    if (!isValidName(name) || !isValidEmail(email) || !isValidNumber(number) || !isValidGender(gender) || !isValidPassword(password)) {
        return false;
    }

    return true;
};

export const createNewUser = async (name: string, email: string, password: string, gender: string, number: string) => {
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword)
    const newUser = await prisma.um_users.create({
        data: {
            user_name: name,
            user_email: email.toLowerCase(),
            user_password: hashedPassword,
            user_gender: gender,
            user_number: String(number),
            user_role_id: 5
        }
    });
    return true;
}


