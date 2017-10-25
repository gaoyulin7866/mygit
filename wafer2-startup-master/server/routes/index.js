/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'   // 定义所有路由的前缀都已 /weapp 开头
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口 /weapp/login
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态） /weapp/user
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中 /weapp/upload
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的 /weapp/tunnel
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/getdata', controllers.getdata.get)
// POST 用来处理微信转发过来的客服消息
router.post('/getdata', controllers.getdata.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getmed', controllers.getmed.post)
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/getmed', controllers.getmed.get)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getmeds', controllers.getmeds.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getoption', controllers.getoption.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getxiaohua', controllers.getxiaohua.post)
router.get('/getxiaohua', controllers.getxiaohua.get)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/gethelth', controllers.gethelth.get)
router.post('/gethelth', controllers.gethelth.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getnews', controllers.getnews.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getcomp', controllers.getcomp.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/step', controllers.step.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getkey', controllers.getkey.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/saveUrl', controllers.saveUrl.post)
// post  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.post('/getUrl', controllers.getUrl.post)
router.post('/getMusic', controllers.getMusic.post)
module.exports = router
