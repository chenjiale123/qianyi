const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods5: '',
    leng5: '',
  },

  detail: function (e) {
    this.setData({
      id4: e.currentTarget.dataset.in
    })
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + e.currentTarget.dataset.id + '&ding=' + e.currentTarget.dataset.in,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(e.currentTarget.dataset.id)
  },
  shanchu: function (e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=-3').then(res => {
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi_Shop/selectShopOrder?userId='+userId+'&orderStatus=2&page=1').then(res => {
      console.log(res)
      this.setData({
        goods5: res.data.orderList,
        leng5: res.data.orderList.length

      })
 


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