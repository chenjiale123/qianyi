const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disshop:"" ,
    disablest:"",
    discourt: "",
    disuser:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi_Shop/selectShopUserCoupon?userId='+userId).then(res => {

      that.setData({
        disshop: res.data.disabledShopUserCouponsList,
        disablestroy: res.data.disabledStoresCouponsList,
        discourt: res.data.discountStoresCouponsList,
        disuser: res.data.shopUserCouponsList
      })
      console.log(this.data.discourt == "" && this.data.disuser == "" )

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