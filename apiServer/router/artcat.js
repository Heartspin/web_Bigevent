// 文章分类列表路由模块
const express = require("express");
// 验证数据的中间件件
const expressJoi = require("@escook/express-joi");
// 导入新增文章分类的验证规则
// 导入删除文章分类的验证规则
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require("../schema/artcate.js");


const router = express.Router();

// 导入文章分类的路由处理函数
const artCateHandler = require("../router-handler/artcate.js");

// 获取文章分类
router.get("/cates", artCateHandler.getArticleCates)
// 新增文章分类
router.post("/addcates", expressJoi(add_cate_schema), artCateHandler.addArticleCates)
// 删除文章分类
router.get("/delete/:id", expressJoi(delete_cate_schema), artCateHandler.deleteCateById)
// 根据id获取文章分类
router.get("/cates/:id", expressJoi(delete_cate_schema), artCateHandler.getArtCatesById)
// 根据id更新文章分类
router.post("/updatecate", expressJoi(update_cate_schema), artCateHandler.updateCateById)

module.exports = router