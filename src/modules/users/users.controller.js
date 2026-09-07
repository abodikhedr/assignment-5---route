import { Router } from "express";
import * as US from "./users.service.js";

const userRouter=Router()

userRouter.post("/signup",US.createUser)

userRouter.put("/:id",US.createOrUpdate)

userRouter.get("/by-email",US.findByEmail)

userRouter.get("/:id",US.retrieveByPK)


export default userRouter