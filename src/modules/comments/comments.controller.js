import { Router } from "express";
import { getComments } from "./comments.service.js";


const commentRouter=Router()

commentRouter.get("/",getComments)

export default commentRouter