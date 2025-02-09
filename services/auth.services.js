import { PrismaClient } from '@prisma/client'
import "dotenv/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const login = async (req) => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
    })
    if (!user) {
        return ("User of given email doesnot exists!");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            return ("Password doesnot match!");
        }
    });
    const token = jwt.sign({
        expiresIn: "1d",
        data: user
    }, process.env.jwtsecretcode);

    return { token, user };
}

const register = async (req) => {
    let { email, password, fullName, gender } = req.body
    password = await bcrypt.hash(password, 10);
    console.log("adfasdf: ", email, password, fullName, gender)
    const user = await prisma.user.create({
        data: {
            email,
            password,
            fullName,
            gender
        }
    })
    console.log("user: ", user)
    const token = jwt.sign({
        expiresIn: "1d",
        data: user
    }, process.env.jwtsecretcode);
    return { user, token }
}



const getUser = async (req) => {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
        where: {
            id: +userId
        },
    })
    if (!user) {
        return ("User of given email doesnot exists!");
    }
    return { user };
}



export { login, register, getUser }