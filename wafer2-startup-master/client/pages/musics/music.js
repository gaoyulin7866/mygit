// pages/musics/music.js
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    musics:[]
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.search()
  },
  _search: function (e) {
    wx.navigateTo({ url: '../voice/voice?url=' + encodeURIComponent(e.currentTarget.dataset.src) + '&name=' + e.currentTarget.dataset.name + '&pop=' + e.currentTarget.dataset.pop + '&albumpic_big=' + encodeURIComponent(e.currentTarget.dataset.albumpic_big)});
  },
  search:function(e){
    // e.detail.value
    var _this = this
    var _title
    if (e == undefined) {
      _title = "海阔天空"
    }
    else {
      _title = e.detail.value
    }
    wx.request({
      url: config.service.host + '/weapp/getMusic',
      data: {
        keyword: _title
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          hidden: true,
          musics: res.data.message.showapi_res_body.pagebean.contentlist
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