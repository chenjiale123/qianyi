const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
id:''
  },
detailTC:function(e){
wx.navigateTo({
  url: '/pages/comDetail/comDetail?id=' + this.data.id,
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
    var id=options.id
    this.setData({
      id:id
    })
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