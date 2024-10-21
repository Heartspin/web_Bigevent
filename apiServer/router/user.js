const express = require("express");
// 导入路由处理函数模块
const userHandler = require("../router-handler/user.js");
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user.js')
// 创建路由对象
const router = express.Router()

// 注册新用户
router.post("/register", expressJoi(reg_login_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 共享路由对象
module.exports = router