// 导入模块
const mysql = require("mysql2");

// 创建数据库对象
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "MySQL_8.0.36",
    database: "sqlCustom",
    port: 3306
})

// 导出对象
module.exports = db