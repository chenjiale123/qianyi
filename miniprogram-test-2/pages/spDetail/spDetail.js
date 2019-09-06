const api = require('../../utils/api.js')
// pages/spDetail/spDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:'',
jindian:''
  },
  quxiao: function (e) {
    api._post('/QianYi/updateScenicOrder?orderId=' + e.currentTarget.dataset.in + '&orderStauts=-2').then(res => {
      console.log(res)
      wx.showToast({
        title: '取消订单成功',
        icon: 'success'
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  tuikuan: function (e) {
    wx.showModal({
      title: '提示',
      content: '确认退款？',
      success: function (res) {
        if (res.confirm) {
          api._post('/QianYi/updateRefundScenicOrder?orderId=' + e.currentTarget.dataset.in + '&refund=1').then(res => {
            console.log(res)


          }).catch(e => {
            console.log(e)
          })
          // console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    this.setData({
      id:id
    })
    api._post('/QianYi/selectScenicOrderInfo?id='+this.data.id).then(res => {
      console.log(res)
      this.setData({
jindian:res.data

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