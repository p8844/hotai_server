// 引入数据库模块
const db = require('../db/index')
// 导入bcryptjs 加密
const bcrypt = require('bcrypt');
// 导入jwt
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 注册处理函数
exports.register = function (req, res) {
    const userinfo = req.body
    if (!userinfo.account || !userinfo.password) {
        return res.cc('用户名和密码不能为空！！！')
    }
    const sql = 'select * from users where account=?'
    db.query(sql, userinfo.account, function (err, results) {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名')
        // 密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into users set ?'
        db.query(sql, {
            account: userinfo.account,
            password: userinfo.password,
            identity: '用户',
            create_time: new Date()
        }, function (err, results) {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试')
            res.cc('注册成功', 0)
        })
    })
};

// 登录处理函数
exports.login = function (req, res) {
    const userinfo = req.body
    const sql = 'select * from users where account=?'
    db.query(sql, userinfo.account, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败，请稍后再试')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败，请稍后再试')
        const tokenStr = jwt.sign({ account: results[0].account }, config.secretjwtSecretKey, {
            expiresIn: config.secretjwtExpireTime
        })
        res.send({ status: 0, message: '登录成功', token: 'Bearer ' + tokenStr })
    })
};