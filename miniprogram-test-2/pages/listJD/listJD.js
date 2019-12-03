const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pages: 0,
    currentTab: 0,
    data2: [],
    price: false,
    mrc: '综合',
    id: 1,
    sousuo: false,
    di1: '',
    gao1: '',
  },
  videoPlay: function (e) {
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    console.log(this.data._index)
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(_index + "")
    videoContextPrev.stop();

    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)
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
    api._get('/QianYi/selectScenicSpotTicket?page=1&longitude=' + startLonLat.split(',')[0] + '&latitude=' + startLonLat.split(',')[1] +'&label='+id).then(res => {

      var shit = []
      this.setData({
        jindian: res.data.scenicList,
        // img: res.data.scenicList.pictureUrl.split(',')[0]
      })
      console.log(this.data.jindian)
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