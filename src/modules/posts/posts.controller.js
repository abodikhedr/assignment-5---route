import { Router } from "express";
import * as PS from "./posts.service.js";


const postRouter=Router()

postRouter.post("/",PS.postUser)
postRouter.delete("/:postId",PS.deletePost)


export default postRouter