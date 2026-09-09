import { Router } from "express";
import  *  as CS  from "./comments.service.js";


const commentRouter=Router()

commentRouter.post("/",CS.createBulk)
commentRouter.patch("/:commentId",CS.updateComment)
commentRouter.post("/find-or-create",CS.findOrCreate)
commentRouter.get("/search",CS.retrieveSpecific)
commentRouter.get("/newest/:postId",CS.newestComment)
commentRouter.get("/details/:Id",CS.CommentDetails)





export default commentRouter