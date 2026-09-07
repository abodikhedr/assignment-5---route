import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('blog_app', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
});

export const connectDB = async (app, port) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


export const syncDB = async () => {
    try {
        await sequelize.sync({ alter: false, force: false });
        console.log('sync has been established successfully.');

    } catch (error) {
        console.error('Unable to sync to the database:', error);
    }
}