var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meds:[],
    hidden: false,
    inputShowed: false,
    inputVal: "",
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
  inputTyping: function (e) {
    // if (e.detail.value == "")
    // {
    //   this.setData({
    //     inputVal: "胶囊"
    //   });
    // }
    
  },
  search:function(e){
    
    var _this = this
    var _title
    if(e == undefined)
    {
      _title = "胶囊"
    }
    else{
      _title = e.detail.value
    }
    wx.request({
      url: config.service.host + '/weapp/getmeds', //仅为示例，并非真实的接口地址
      data: {
        title: _title
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          meds: res.data.message.showapi_res_body.drugList
        })
      }
    })
  },
  _search: function (e) {
    var _this = this
    wx.navigateTo({
      url: '../options/option?id=' + e.currentTarget.dataset.id
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search()
    this.setData({
      hidden: true
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