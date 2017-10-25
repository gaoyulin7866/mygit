const { mysql } = require('../qcloud')

async function get(ctx, next) {
  var data = await mysql('imgurls').insert([{ imgurl: ctx.request.body.imgurl }, { mimeType: ctx.request.body.mimeType }, { name: ctx.request.body.name }, { size: ctx.request.body.size }]) 
  ctx.body = {
    code: 1,
    message: data
  }
}

async function post(ctx, next) {
  var data = await mysql('imgurls').insert([{ imgurl: ctx.request.body.imgurl, mimeType: ctx.request.body.mimeType ,name: ctx.request.body.name ,size: ctx.request.body.size }]) 
  ctx.body = {
    code: 1,
    message: data
  }
}

module.exports = {
  post,
  get
}
