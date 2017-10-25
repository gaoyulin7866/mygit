var config = require('../../config');
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    helthy: [],
    info:{
      avatarUrl:'../../images/bg.jpeg'
    },
    imgUrls: [
      '../../images/bg1.png',
      '../../images/bg2.png',
      '../../images/bg3.png',
      '../../images/bg4.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    uploadUrl: config.service.uploadUrl,
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: config.service.host + '/weapp/getxiaohua', 
      data: {
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          helthy: res.data.message.showapi_res_body.contentlist,
          info: options,
          hidden:true
        })
      }
    })
  },
  doUpload() {
    var that = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0]
        wx.uploadFile({
          url: that.data.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (resp) {
            resp = JSON.parse(resp.data)
            wx.request({
              url: config.service.host + '/weapp/saveUrl',
              data: {
                imgurl: resp.data.imgUrl,
                mimeType: resp.data.mimeType,
                name: resp.data.name,
                size: resp.data.size
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (response) {
                showSuccess('上传图片成功')
              }
            })
          },

          fail: function (e) {
            console.error(e)
          }
        })

      },
      fail: function (e) {
        console.error(e)
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
    wx.stopPullDownRefresh()
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
  
  },
  refer:function(){
    wx.startPullDownRefresh()
  },
  /**
   * 用户点击看电影
   */
  movies:function(event){
    wx.navigateTo({ url: '../movies/movie' });
  },
  /**
   * 用户点击药材
   */
  meds:function (event) {
    wx.navigateTo({ url: '../meds/med' });
  },
  /**
   * 用户知识
   */
  knows:function(event) {
    wx.navigateTo({ url: '../knows/know' });
  },
  step: function (event) {
    wx.navigateTo({ url: '../steps/step' });
  }, 
  chat: function (event) {
    wx.navigateTo({ url: '../chat/chat' });
  },
  downimg:function(){
    wx.navigateTo({ url: '../imgs/img' });
  },
  music: function () {
    wx.navigateTo({ url: '../musics/music' });
  },
})