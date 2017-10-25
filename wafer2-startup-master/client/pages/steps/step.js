// pages/steps/step.js
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.login({
      success: function (res) {
        wx.request({
          url: config.service.host + '/weapp/step',
          data: {
            code: res.code
          },
          method:'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resp) {
            wx.getWeRunData({
              success(response) {
                wx.request({
                  url: config.service.host + '/weapp/getkey',
                  data: {
                    encryptedData: response.encryptedData,
                    iv: response.iv,
                    expires_in: resp.data.message.expires_in,
                    openid: resp.data.message.openid,
                    session_key: resp.data.message.session_key
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (resps) {
                    var _arr = []
                    for (var i = 0; i < resps.data.message.stepInfoList.length; i++){
                      var date = new Date(resps.data.message.stepInfoList[i].timestamp*1000)
                      var _time = date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());  
                      var obj = {
                        time: _time,
                        step: resps.data.message.stepInfoList[i].step
                      }
                      _arr.push(obj)
                    }
                    _this.setData({
                      hidden: true,
                      arr: _arr
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})