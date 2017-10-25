var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    _option:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: config.service.host + '/weapp/getoption', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var _data = res.data.message.showapi_res_body.xz ? res.data.message.showapi_res_body.xz+",":""
        var _img = res.data.message.showapi_res_body.img ? res.data.message.showapi_res_body.img :"../../images/bg4.jpg"
        var obj = {
          title: res.data.message.showapi_res_body.drugName,
          cont: _data + res.data.message.showapi_res_body.zycf + "," + res.data.message.showapi_res_body.zysx + "." + res.data.message.showapi_res_body.yfyl + "," + res.data.message.showapi_res_body.zysx + "," + res.data.message.showapi_res_body.ywxhzy,
          img: _img
        }
        _this.setData({
          hidden: true,
          _option: obj
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