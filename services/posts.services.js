import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createPosts = async (req) => {
    const content = req.body.content
    const result = await prisma.posts.create({
        data: {
            content,
            userId: req.body.user.id
        },
        include: {
            User: true
        }
    })
    return { result };
}

const listPosts = async (req) => {
    const result = await prisma.posts.findMany({
        include: {
            User: true
        }
    })
    return result;
}


export { createPosts, listPosts }