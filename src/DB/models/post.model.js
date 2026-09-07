import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";



const postModel=sequelize.define("post",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:DataTypes.TEXT,


},{
    paranoid:true
})




//post <--> user

userModel.hasMany(postModel,{
    foreignKey:"userId",
    onDelete:"cascade",
    onUpdate:"cascade"
})
postModel.belongsTo(userModel,{
    foreignKey:"userId",
    onDelete:"cascade",
    onUpdate:"cascade"
})




export default postModel