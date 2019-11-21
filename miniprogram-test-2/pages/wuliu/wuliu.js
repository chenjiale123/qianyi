const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
leng:'',
wuliu:'',
she:false
  },

detail:function(e){
wx.navigateTo({
  url: '/pages/kuaidi/kuaidi?id='+e.currentTarget.dataset.id,
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
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectLogistics?userId='+userId).then(res => {


      console.log(res)
      if(res.isSuc==true){
        this.setData({
          wuliu: res.data,
          she: res.isSuc
        })
      }else{
        this.setData({
          she: res.isSuc,
        })
        console.log(this.data.she)
      }
    

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