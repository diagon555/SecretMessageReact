const Sequelize = require("sequelize");

const sequelize =  new Sequelize("messages", "messages", "Mmess123", {
    dialect: "mysql",
    host: "localhost"
});

const Notes = require('./Notes')(sequelize);

module.exports = {
    sequelize : sequelize,
    notes : Notes
}
