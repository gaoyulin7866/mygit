const config = require('./../config');
const request = require('request');
const { mysql } = require('../qcloud');
async function post(ctx, next) {
  var url = "https://route.showapi.com/96-36?&showapi_appid=47662&showapi_sign=4c70bda39fba4d4a9a809ac6f721b50d&id=" + ctx.request.body.id
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

