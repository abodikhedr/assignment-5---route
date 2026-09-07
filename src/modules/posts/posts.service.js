import postModel from "../../DB/models/post.model.js"



export const postUser = async (req, res, next) => {
    try {
        const { title, content, userId } = req.body
        const data = new postModel({ title, content, userId })
        await data.save()
        res.status(201).json({ message: "post created", data })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { postId } =req.params
        const { userId } =req.body
        const data = await postModel.findByPk(postId)
        if (data.userId ==userId ) {
            const deletedData = await postModel.destroy({where:{id:postId}})
            return res.status(200).json({ message: "post deleted", deletedData })
        }
        res.status(200).json({ message: "access denied (userId doesnt match post)", data })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}