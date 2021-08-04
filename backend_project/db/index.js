const Sequelize = require("sequelize");

const sequelize =  new Sequelize("secret_messages", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

const Notes = require('./notes')(sequelize);

module.exports = {
    sequelize : sequelize,
    notes : Notes
}