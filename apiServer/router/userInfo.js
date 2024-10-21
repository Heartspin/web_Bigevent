const express = require("express");
// 用户信息路由处理函数
const userInfoHandler = require("../router-handler/userInfo.js");
// 数据验证组件
const expressJoi = require("@escook/express-joi");
// 导入验证更新用户信息的规则对象
// 导入更新密码的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require("../schema/user.js");
const Joi = require("joi");

const router = express.Router();

// 获取用户信息
router.get("/userInfo", userInfoHandler.getUserInfo)
// 更新用户信息
router.post("/userInfo", expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)
// 重置密码
router.post("/updatePwd", expressJoi(update_password_schema), userInfoHandler.updatePassword)
// 更新用户头像
router.post("/update/avatar", expressJoi(update_avatar_schema), userInfoHandler.updateAvatar)

module.exports = router