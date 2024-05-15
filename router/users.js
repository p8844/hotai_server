const express = require('express');
const expressJoi = require('@escook/express-joi')

const router = express.Router();

// 导入路由处理函数
const userHandler = require('../router_handler/users');

// 导入Joi 验证数据规则
const { register_schema, login_schema } = require('../schema/users_schema');

// 注册
router.post('/register', expressJoi(register_schema), userHandler.register);
// 登录
router.post('/login', expressJoi(login_schema), userHandler.login);


module.exports = router;