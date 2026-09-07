import commentModel from "../../DB/models/comment.model.js"




export const getComments = async (req, res, next) => {
    try {
        const comments = await commentModel.findAll()
    res.status(200).json({ message: "done", comments })
    } catch (error) {
        res.status(500).json( error )
        
    }
}