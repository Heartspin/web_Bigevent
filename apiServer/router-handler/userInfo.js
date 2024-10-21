// 导入数据库模块
const db = require("../db/index.js")
// 导入加密模块 bcrypt
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.getUserInfo = (req, res) => {
    // 获取用户的基本信息
    // 为了防止密码泄露，排除密码字段
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'

    db.query(sql, req.user.id, (err, result) => {
        // 获取失败
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户信息失败')
        // 获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        // 修改失败
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
        // 修改成功
        res.cc('更新用户信息成功', 0)
    })
}

// 更新密码
exports.updatePassword = (req, res) => {
    // 根据id查询用户的信息
    const sql = 'select * from ev_users where id = ?'
    db.query(sql, req.user.id, (err, result) => {
        // 查询失败
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户不存在')

        // 判断原密码是否正确
        /* 
        bcrypt.compareSync(提交的密码，数据库中密码)
        切记不能使用等号，因为数据库中的密码是经过加密的
        */
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        // 对新密码进行加密
        const sqlStr = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlStr, [newPwd, req.user.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

// 更新头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}