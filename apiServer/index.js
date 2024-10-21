const express = require("express");
const cors = require("cors");
const joi = require("joi");
// 导入用户路由模块
const userRouter = require("./router/user");
// 解析token的中间件
const expressJWT = require("express-jwt");
const config = require("./config");
// 导入用户信息路由模块
const userInfoRouter = require("./router/userInfo.js");
// 导入文章分类列表路由模块
const artCateRouter = require("./router/artcat.js")
// 导入文章路由模块
const articleRouter = require("./router/article.js")

const app = express();
// 配置跨域中间件
app.use(cors());
// 封装错误处理函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 注册解析 Token 的中间件
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }));
// 注册登录路由
app.use('/api', userRouter);
// 注册用户信息路由
app.use('/my', userInfoRouter)
// 注册文章分类列表路由
app.use("/my/article", artCateRouter)
// 注册文章路由模块
app.use('/my/article', articleRouter)
// 托管静态资源
app.use("/uploads", express.static(__dirname + "/uploads"));

// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    // 未知错误
    res.cc(err)
})

app.listen(9000, () => {
    console.log("Server running at http://127.0.0.1");
})