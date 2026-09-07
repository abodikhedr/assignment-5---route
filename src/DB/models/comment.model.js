import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";
import postModel from "./post.model.js";




const commentModel=sequelize.define("comment",{
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },

},{})


//comments <--> user
commentModel.belongsTo(userModel,{
    foreignKey:"userId",
    onDelete:"cascade",
    onUpdate:"cascade"
})
userModel.hasMany(commentModel,{
    foreignKey:"userId",
    onDelete:"cascade",
    onUpdate:"cascade"
})

//comments <--> post
commentModel.belongsTo(postModel,{
    foreignKey:"postId",
    onDelete:"cascade",
    onUpdate:"cascade"
})
postModel.hasMany(commentModel,{
    foreignKey:"postId",
    onDelete:"cascade",
    onUpdate:"cascade"
})


export default commentModel