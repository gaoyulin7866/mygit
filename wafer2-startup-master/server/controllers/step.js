const config = require('./../config');
const request = require('request');
const { mysql } = require('../qcloud');

async function post(ctx, next) {
  var url= 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf1583fc52009cf66&secret=27aba81d91131f0d5ed6ae12df0d5a5a&grant_type=authorization_code&js_code='+ctx.request.body.code
  var data = await requestPostAction(url, {})
  ctx.body = {
    code: 1,
    message: data
  }
}
var requestPostAction = function (url, obj) {
  return new Promise(function (resolve, reject) {
    request.post({ url: url, json: true, headers: { "content-type": "application/json" }, body: obj }, function (error, response, body) {
      if (error) return reject(error);
      resolve(body);
    })
  });
};



module.exports = {
  post
}


