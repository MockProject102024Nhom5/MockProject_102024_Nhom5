const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('mockproject', 'sa', '123456', {
//     host: 'localhost',
//     dialect: 'mssql',
//     dialectOptions: {
//         options: {
//             encrypt: true,
//             trustServerCertificate: true
//         }
//     }
// });
const sequelize = new Sequelize('mockproject', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql',
    dialectModule: require('tedious'),
});


const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = connection;
