const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/detailTC/detailTC?id='+e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tcdetail:function(){
wx.navigateTo({
  url: '/pages/spList/spList',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    api._get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {

      that.setData({
        data3: res.data.goodsList
      })
      console.log(res.data)

    }).catch(e => {
      console.log(e)
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