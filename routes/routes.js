import { Router } from "express";
import authRouter from "./auth.route.js"
import postRouter from "./posts.route.js"
import authentication from "../middlewares/authentication.js";

const router = Router();


router.use("/auth", authRouter);
//non authentication routes

router.use(authentication)


router.use("/posts", postRouter);
//authentication routes


export default router;