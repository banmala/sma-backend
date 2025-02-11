import { PrismaClient } from '@prisma/client'
import EventEmitter from 'events'


const prisma = new PrismaClient()

const eventEmitter = new EventEmitter()

eventEmitter.on("greet", (message) => {
    console.log("Hello! Good Morning!");
    console.log("Message: ", message)
})



const createPosts = async (req) => {
    eventEmitter.emit("greet", "Create Post Called")
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
    eventEmitter.emit("greet", "List Post Called")
    const searchParams = req.query.search
    const result = await prisma.posts.findMany({
        where: {
            OR: [
                {
                    content: {
                        contains: searchParams,
                        mode: 'insensitive'
                    }
                },
                {
                    User: {
                        fullName: {
                            contains: searchParams,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        },
        include: {
            User: true
        }
    })
    return result;
}


//update 2 works
// like count update =>> like: true
// content  ==>> content:"asdfasdf"
const updatePost = async (req) => {
    eventEmitter.emit("greet", "Update Post Called")
    const { content, like } = req.body
    const postId = req.params.postId

    const checkPostExist = await prisma.posts.findFirst({
        where: {
            id: +postId
        }
    })
    if (!checkPostExist) {
        return ("Post of given id doesnot exist!");
    }
    const data = {}
    if (like) {
        data.likesCount = checkPostExist.likesCount + 1
    }
    if (content) {
        data.content = content
    }
    const result = await prisma.posts.update({
        where: {
            id: +postId
        },
        data: data,
        include: {
            User: true
        }
    })
    return { result };
}

const deletePost = async (req) => {
    eventEmitter.emit("greet", "Delete Post Called")
    const postId = req.params.postId

    const checkPostExist = await prisma.posts.findFirst({
        where: {
            id: +postId
        }
    })
    if (!checkPostExist) {
        return ("Post of given id doesnot exist!");
    }
    const result = await prisma.posts.delete({
        where: {
            id: +postId
        },
        include: {
            User: true
        }
    })
    return { result };
}


export { createPosts, listPosts, updatePost, deletePost }