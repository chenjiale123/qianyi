const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    com: true,
    hot: '',
    goodsList: '',
    inputVal: '',
    pecode: [],
    fou:true
  },
  remen: function (e) {
    this.setData({
      searchValue: e.currentTarget.dataset.in,
      com: false
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectHomeSearchBykeyword?keyword=' + e.currentTarget.dataset.in + '&type=2&page=1&userId='+userId+'&longitude=' + this.data.jing + '&latitude=' + this.data.wei).then(res => {
      console.log(res)
      this.setData({
        goodsList: res.data.scenicList,

      })

    }).catch(e => {
      console.log(e)
    })
  },
  detail:function(e){
wx.navigateTo({
  url: '/pages/detail/detail?id='+e.currentTarget.dataset.id,
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
  },
  openHistorySearch: function () {
    this.setData({
      pecode: wx.getStorageSync('pecode') || [],//若无储存则为空
    })
  },
  del: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      pecode: []
    })
    this.onLoad()
    console.log('111')
  },
  show: function (e) {
    this.setData({
      com: false
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectHomeSearchBykeyword?keyword=' + e.detail.value + '&type=2&page=1&userId='+userId+'&longitude=' + this.data.jing +'&latitude='+this.data.wei).then(res => {
      console.log(res)
      this.setData({
        goodsList: res.data.scenicList,

      })

    }).catch(e => {
      console.log(e)
    })
    var that = this
    var inputVal = e.detail.value
    var pecode = this.data.pecode
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前五条
      if (pecode.length < 5) {
        pecode.unshift(
          {
            value: inputVal,
            id: pecode.length
          }
        )
      }
      else {
        pecode.pop()//删掉旧的时间最早的第一条
        pecode.unshift(
          {
            value: inputVal,
            id: pecode.length
          }
        )
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('pecode', pecode)
    }




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var val = options.value
    console.log(val)
    this.setData({
      searchValue: val
    })
    var jing=options.jing
    var wei=options.wei
    this.setData({
      jing:jing,
      wei:wei
    })
    api._post('/QianYi/selectHomeTopSearch?type=2&page=1').then(res => {
      console.log(res)
      this.setData({
        hot: res.data.hotSearchList,

      })

    }).catch(e => {
      console.log(e)
    })
    this.openHistorySearch()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
   
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