import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";


const userModel = sequelize.define("user", {

    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkNamelength(name) {
                if (name.length < 3) {
                    throw new Error("name must be 3 charachters or greater")
                }
            }
        }

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "email already exists"
        },
        validate: {
            isEmail: {
                args: true,
                msg: "enter a valid email"
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkPasswordlength(password) {
                if (password.length < 6) {
                    throw new Error("password must be 6 charachters or greater")
                }
            }
        }
    },

    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"], defaultValue: "user"
    },

}, {
    timestamps: true,
    primaryKey: false
})


export default userModel