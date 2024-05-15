const Joi = require('joi')

// 用户注册数据验证
const account = Joi.number().min(9999).max(9999999999).required().error(new Error('账号格式不正确，应该为5到10位数字组合。'))
const password = Joi.string().min(6).max(12).alphanum().required().error(new Error('密码格式不正确，应该为6到12位字母数字组合。'))
exports.register_schema = {
    body: {
        account,
        password
    }
}

// 用户登录数据验证
exports.login_schema = {
    body: {
        account,
        password
    }
}