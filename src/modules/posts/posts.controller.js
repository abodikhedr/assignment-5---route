import { Router } from "express";
import * as PS from "./posts.service.js";


const postRouter=Router()

postRouter.post("/",PS.postUser)
postRouter.delete("/:postId",PS.deletePost)
postRouter.get("/details",PS.retrievePosts)
postRouter.get("/comment-count",PS.commentCount)


export default postRouter