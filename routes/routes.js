import { Router } from "express";
import authRouter from "./auth.route.js"
import postRouter from "./posts.route.js"
import authentication from "../middlewares/authentication.js";
// import EventEmitter from "events";
const router = Router();

// const eventEmit = new EventEmitter();
// let count = 0
// eventEmit.on("countApi", () => {
//     count += 1;
//     console.log("Count: ", count)
// })

// router.use((req, res, next) => {
//     eventEmit.emit("countApi")
//     next();
// })

router.use("/auth", authRouter);
//non authentication routes

router.use(authentication)


router.use("/posts", postRouter);
//authentication routes


export default router;