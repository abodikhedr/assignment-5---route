import commentModel from "../../DB/models/comment.model.js";
import { Op } from "sequelize";
import userModel from "../../DB/models/user.model.js";
import postModel from "../../DB/models/post.model.js";
export const createBulk = async (req, res, next) => {
    try {
        const { comments } = req.body;
        const data = await commentModel.bulkCreate(comments);
        res.status(201).json({ message: "comments created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;
        const data = await commentModel.findByPk(commentId);
        if (data.userId == userId) {
            const updatedData = await commentModel.update(
                { content },
                {
                    where: { id: commentId },
                },
            );
            return res.status(200).json({ message: "comment updated", data });
        }
        res.status(200).json({
            message: "access denied (userId doesnt match comment)",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findOrCreate = async (req, res, next) => {
    try {
        const { userId, postId, content } = req.body;
        const data = await commentModel.findOrCreate({
            where: { userId, postId, content },
            defaults: { userId, postId, content },
        });

        if (data[1] == false) {
            res.status(200).json({ message: "comment found", data });
        }
        res.status(200).json({ message: "comment created", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const retrieveSpecific = async (req, res, next) => {
    try {
        const { word } = req.query;
        const data = await commentModel.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
        });
        res.status(200).json({ message: "comments found", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const newestComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const data = await commentModel.findAll({
            where: { postId: postId },
            limit: 3,
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ message: "newest comments retrieved", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const CommentDetails = async (req, res, next) => {
    try {
        const { Id } = req.params;
        const data = await commentModel.findByPk(Id, {
            attributes: { exclude: ["userId", "postId"] },
            include: [
                { model: userModel, attributes: ["id", "email","name"] },
                { model: postModel,attributes:["id","title","content"] },
            ],
        });
        res.status(200).json({ message: "comment details", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
