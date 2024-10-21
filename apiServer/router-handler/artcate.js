const db = require('../db/index.js')
// 获取文章分类列表处理函数
exports.getArticleCates = (req, res) => {
    const sql = 'select id, name, alias from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results
        })
    })
}

// 新增文章分类处理函数
exports.addArticleCates = (req, res) => {
    // 定义查重的sql语句
    const sqlStr = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        // 查重失败
        if (err) return res.cc(err)
        // 查询成功，判断数据是否被占用
        if (results.length === 2) return res.cc('文章分类名和别名被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('文章分类名和别名被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('文章分类名被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('文章分类别名被占用')

        // 添加文章
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功', 0)
        })
    })
}

// 删除文章分类处理函数
exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功', 0)
    })
}

// 
exports.getArtCatesById = (req, res) => {
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        // 获取失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('没有查询到文章分类')
        // 获取成功
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}

// 根据id更新文章分类处理函数
exports.updateCateById = (req, res) => {
    // res.send('ok')
    // 定义查重的sql语句
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 查重失败
        if (err) return res.cc(err)
        // 查询成功，判断数据是否被占用
        if (results.length === 2) return res.cc('文章分类名和别名被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('文章分类名和别名被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('文章分类名被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('文章分类别名被占用')

        // 执行更新操作
        const sql = `update ev_article_cate set ? where Id=?`
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')

            res.cc('更新文章分类成功', 0)
        })
    })
}