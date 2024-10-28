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
const sequelize = new Sequelize('MockProject_102024_Nhom5', 'sa', '1234', {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, 
            trustServerCertificate: true,
        },
    },
    host: 'localhost',
    port: 1433,
    logging: false,
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
