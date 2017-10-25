const { mysql } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {
  var data = await mysql('med').select('*')
  ctx.body = {
    code: 1,
    message: data
  }
}

async function post(ctx, next) {
  var data = await mysql('med').select('*')
  ctx.body = {
    code: 1,
    message: data
  }
}

module.exports = {
  post,
  get
}
