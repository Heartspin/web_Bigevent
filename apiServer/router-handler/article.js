const path = require('path')
const db = require("../db/index.js")
exports.addArticle = (req, res) => {
    // 手动验证上传文件的合法性
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')
    // 处理文章的信息对象
    const articleInfo = {
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章的发布时间
        pub_data: new Date(),
        // 文章作者的Id
        author_id: req.user.id
    }

    const sql = `insert into ev_articles set ?`
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("文章发布失败")

        res.cc("文章发布成功", 0)
    })
}
// 当涉及解析multipart / formdata格式的时候，需要引入multer模块
