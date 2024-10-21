// 验证规则
const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()

const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
// 定义id，nickname，email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
// 登录注册的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
// 更新用户信息的验证规则
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 重置密码的验证规则
exports.update_password_schema = {
    body: {
        // 使用之前的password验证规则
        oldPwd: password,
        /* 
        1.joi.ref('oldPwd')表示newPwd的值必须和oldPwd的值相同
        2.joi.not(joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd的值
        3. .concat()用于合并joi.not(joi.ref('oldPwd'))和password的验证规则
        */
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

const avatar = joi.string().dataUri().required()
// 更新头像的验证规则
exports.update_avatar_schema = {
    // dataUri()指的是如下格式的字符串: 
    // data:image/png;base64,VE9PTUFOWVNQ1JFVFM=
    body: {
        avatar
    }
}