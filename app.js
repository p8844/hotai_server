const express = require('express')
const app = express()

// 允许跨域
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 自定义中间件，简化响应
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入解析token中间件
const { expressjwt: jwt } = require('express-jwt')
const config = require('./config')
app.use(jwt({
  secret: "shhhhhhared-secret",
  algorithms: ["HS256"],
}).unless({ path: [/^\/api\//] }))

// 引入路由
const usersRouter = require('./router/users')
app.use('/api', usersRouter)

// Joi 错误级别中间件
const Joi = require('joi')
app.use(function (err, req, res, next) {
  // Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }
  // token 认证失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.send({
    status: 1,
    message: err.message
  })
})


// 启动服务器
app.listen(8888, () => {
  console.log('server is running at http://localhost:8888')
})