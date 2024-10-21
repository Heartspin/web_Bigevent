// 导入数据库模块
const db = require('../db/index.js');
// 导入加密模块 bcrypt
const bcrypt = require('bcryptjs');
// 导入生成 Token 字符串的包
const jwt = require('jsonwebtoken');
// 导入密钥文件
const config = require('../config.js');
// exports 向外暴露的对象
// 注册新用户处理函数
exports.regUser = (req, res) => {
    // 获取用户信息
    const userInfo = req.body

    // 定义 SQL 语句
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用')
        }
        // 对密码进行散列运算 hashSync()方法
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // 插入新用户
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            // 判断 SQL 语句是否执行成功
            if (err) {
                return res.cc(err)
            }
            // 执行成功，判断影响行数
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败')
            }
            // 注册用户成功
            res.cc('注册用户成功', 0)
        })
    })
}

// 登陆处理函数
exports.login = (req, res) => {
    // 接受表单数据
    const userInfo = req.body

    const sql = 'select * from ev_users where username = ?'

    db.query(sql, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('用户名或密码错误')

        // 判断密码是否正确
        // 因为密码是经过 bcrypt 加密的, 所以不能用 === 比较
        // 所以只能用 bcrypt.compareSync() 方法对用户的密码和数据库中的密码进行比较
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('用户名或密码错误')
        }
        // 登录成功
        // 生成 Token 字符串
        // 获取用户信息，并剔除密码和头像的值
        // ES6方式，快速剔除密码和头像的值
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        // 将token响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: "Bearer " + tokenStr
        })
    })
}