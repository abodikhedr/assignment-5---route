import express from "express"
import { connectDB, syncDB } from "./DB/connectionDB.js"
import userRouter from "./modules/users/users.controller.js"
import postRouter from "./modules/posts/posts.controller.js"
import commentRouter from "./modules/comments/comments.controller.js"
const app = express()
const port = 3000
const bootstrap = async () => {

    app.use(express.json())
    app.get('/', (req, res, next) => { res.status(200).json({ message: "welcome to my blog app" })})

    await connectDB(app, port)
    await syncDB()

    app.use('/users',userRouter)
    app.use('/posts',postRouter)
    app.use('/comments',commentRouter)







    app.use("{/*demo}", (req, res, next) => {
        res.status(404).json({
            message: `url:${req.originalUrl} with method:${req.method} not found`,
            statuscode: 404
        })
    })
}


export default bootstrap