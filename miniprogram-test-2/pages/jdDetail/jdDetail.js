const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: '',
    kuaidi:''
  },
kuaidi1:function(e){
wx.navigateTo({
  url: '/pages/kuaidi/kuaidi?id=' + this.data.id1,
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
tuikuan:function(){
wx.navigateTo({
  url: '/pages/tuikuan/tuikuan?id=' + this.data.id1,
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
    })

    this.setData({
      id1: options.id
    })
    api._post('/QianYi_Shop/selectOrderInfo?id=' + this.data.id1).then(res => {
      console.log(res)
      that.setData({


        goods1: res.data,
        kuaidi: JSON.parse(res.data.expressLogistics)
       

      })
      console.log(this.data.kuaidi)


    }).catch(e => {
      console.log(e)
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})