import userModel from "../../DB/models/user.model.js"





export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const data = userModel.build({ name, email, password, role })
        await data.save()
        res.status(201).json({ message: "user created", data })

    } catch (error) {
        res.status(500).json({ error: error.errors[0].message })
    }
}

export const createOrUpdate = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, email, password, role } = req.body
        const data = await userModel.findOrCreate({
            where: { id },
            defaults: { name, email, password, role }
        })

        if (data[1] == false) {
            await userModel.update({ name, email, password, role }, {
                where: { id }
            })
            return res.status(200).json({ message: "user updated successfully", data: data[0] })
        }

        res.status(200).json({ message: "done", data })



    } catch (error) {
        res.status(500).json({ error: error.errors[0].message })

    }
}

export const findByEmail = async (req, res, next) => {
    try {
        const { email } = req.body ?? req.query
        const data = await userModel.findOne({
            where: { email }
        })
        if (!data) {
        res.status(404).json({ message: "email not found" })
            
        }
        res.status(200).json({ message: "found", data })
    } catch (error) {
        res.status(500).json( {error:error.message} )

    }

}

export const retrieveByPK=async (req, res, next) => {
    try {
        const {id}=req.params
        const data=await userModel.findByPk(id,{
            attributes:{exclude:"role"}
        })
        if (!data) {
        res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({ message: "user found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



