const joi = require('joi')

// 新增校验规则
const name = joi.string().required()
const alias = joi.string().required().alphanum()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 删除校验规则
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 根据id更新校验规则
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}