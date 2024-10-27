const sql = require('mssql');
const configDB = require('./configDB')
let pool;
const connection = async () => {
    if (!pool) {
        pool = await sql.connect(configDB);
        console.log('Kết nối đến cơ sở dữ liệu thành công!');
    }
    return pool;
}

module.exports = connection
// kết nối đến databasenpm install mssql
