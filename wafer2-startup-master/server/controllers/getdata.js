const { mysql } = require('../qcloud')

async function get(ctx, next) {
  var data = await mysql('movies').select('*')
  ctx.body = {
    code: 1,
    message: data
  }
}

async function post(ctx, next) {
  var data = await mysql('movies').select('*')
  ctx.body = {
    code: 1,
    message: data
  }
}

module.exports = {
  post,
  get
}
