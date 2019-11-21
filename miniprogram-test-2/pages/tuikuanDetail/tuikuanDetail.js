const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
id:"",
    reason:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      api: api.url
    })
    var id1=options.id
    this.setData({
      id:id1
    })
 
    api._get('/QianYi_Shop/selectOrderCourse?orderId='+this.data.id).then(res => {
      console.log(res)
      that.setData({


        goods: res.data,
        reason: res.data.refundReson

      })
      if (that.data.reason == 1) {
       this.setData({
         reason:'拍错/不想要'
       })
      } else if (that.data.reason == 2) {
        this.setData({
          reason: '与卖家协商退款'
        })
      }
      console.log(that.data.reason)


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
  // this.onLoad()
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