// pages/imgs/img.js
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
    img:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  doUpload() {
    

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    wx.request({
      url: config.service.host + '/weapp/getUrl',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          img: res.data.message
        })
      }
    })
  },
  down:function(e){
    var _this = this
    wx.downloadFile({
      url: 'https://picture-1254541115.cn-north.myqcloud.com/'+_this.data.img[parseInt(e.currentTarget.dataset.id - 1)].name, 
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(resp) {
            console.log(resp,'resp')
            showSuccess('图片下载成功')
          },
          fail:function(){
            showSuccess('图片下载失败')
          }
        })
      },
      fail:function(){
        showSuccess('图片下载失败')
      }
    })
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