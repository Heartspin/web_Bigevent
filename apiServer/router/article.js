// 文章路由模块
const express = require("express");
// 导入multer模块
const multer = require("multer");
// 导入path模块
const path = require("path");
// 导入验证规则模块
const { add_article_schema } = require("../schema/article.js");
// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi")

// 创建 multer 的实例对象
/* 
通过传递的配置对象的dest属性，来指定上传文件的路径
*/
const upload = multer({ dest: path.join(__dirname, "../uploads") });
const router = express.Router();

const articleHandler = require('../router-handler/article.js')

// 发布文章的路由
/* 
upload.single()方法，是一个局部生效的中间件，用来解析 FormData 格式的表单数据
将文件类型的数据，解析并挂载到 req.file 属性中
将解析出来的文件数据，挂载到 req.body 中
*/
router.post('/add', upload.single("cover_img"), expressJoi(add_article_schema), articleHandler.addArticle)

module.exports = router