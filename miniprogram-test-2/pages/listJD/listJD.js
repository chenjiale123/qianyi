const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  detail: function (e) {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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
    var city = options.city
    var startLonLat = options.startLonLat
    var that = this
    console.log(startLonLat)
    api._get('/QianYi/forYourChoice?city=' + city + '&page=1&startLonLat=' + startLonLat+'&label='+id).then(res => {

      var shit = []
      this.setData({
        jindian: res.data.scenicList,
        // img: res.data.scenicList.pictureUrl.split(',')[0]
      })
      for (let key in this.data.jindian) {
        this.setData({
          img: this.data.jindian[key]["pictureUrl"].split(',')[0]


        })
        shit.push(this.data.img)

      }
      console.log(shit)
      this.setData({
        shit: shit
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