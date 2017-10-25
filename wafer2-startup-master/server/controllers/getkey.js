var WXBizDataCrypt = require('./WXBizDataCrypt')
const config = require('./../config');
const request = require('request');
const { mysql } = require('../qcloud');

async function post(ctx, next) {
  var appId = 'wxf1583fc52009cf66'
  var sessionKey = ctx.request.body.session_key
  var encryptedData = ctx.request.body.encryptedData
  var iv = ctx.request.body.iv
  var _code = ctx.request.body.code

  var pc = new WXBizDataCrypt(appId, sessionKey)

  var data = await pc.decryptData(encryptedData, iv)
  ctx.body = {
    code: 1,
    message: data
  }
}
module.exports = {
  post
}
