const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
 com:'',
 num:'',
    axis:"",
    id:'',
    dan:'',
    dan1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      id:options.id,
      com:options.com
    })
    api._post('/QianYi_Shop/selectOrderInfo?id='+this.data.id).then(res => {

      var axis = JSON.parse(res.data.expressLogistics)
      console.log(res)
      that.setData({
        axis: axis.data,
        dan: res.data.orderUnique,
        dan1: res.data.expressCom

      })
      console.log(this.data.axis)


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