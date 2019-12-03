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
    array: []
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



  clickTab: function (e, pageNo) {
    console.log(e.target)
    var pageNo = 1
    var that = this;

    this.setData({
      id: e.currentTarget.dataset.id
    })
    api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice= &endPrice= ').then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pageSize,
        data2: res.data.shopGoods
      })

    }).catch(e => {
      console.log(e)
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  clickTab1: function () {
    this.setData({
      price: true
    })
  },
  clickTab2: function () {
    this.setData({
      sousuo: true
    })
  },
  show: function (e, pageNo) {
    var pageNo = 1
    this.setData({
      price: false,
      mrc: e.currentTarget.dataset.in,
      id: e.currentTarget.dataset.id
    })
    api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice= &endPrice= ').then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pageSize,
        data2: res.data.shopGoods
      })

    }).catch(e => {
      console.log(e)
    })
  },
  di: function (e) {
    this.setData({
      di1: e.detail.value
    })
  },
  gao: function (e) {
    this.setData({
      gao1: e.detail.value
    })
  },
  sure: function (e) {
    console.log(this.data.gao1)
    var pageNo = 1
    this.setData({
      sousuo: false,
      id: e.currentTarget.dataset.id
    })
    api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice=' + this.data.di1 + '&endPrice=' + this.data.gao1).then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pageSize,
        data2: res.data.shopGoods
      })

    }).catch(e => {
      console.log(e)
    })
  },
  detail: function (e) {

    var index = parseInt(e.currentTarget.dataset.index);

    var Id = e.currentTarget.dataset.id;

    console.log(Id)
    this.data.array.unshift({
      id: Id,
      name: e.currentTarget.dataset.in.goodsName,
      img: e.currentTarget.dataset.in.imageThumb,
      price: e.currentTarget.dataset.in.discountPrice
    })

    wx.setStorageSync('array', this.data.array)

    wx.navigateTo({
      url: '/pages/detailTC/detailTC?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url,

    })
    this.onfrash(1)
  },
  onfrash: function (pageNo) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0
    api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice=' + this.data.di1 + '&endPrice=' + this.data.gao1).then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pageSize, //总页数
        data2: this.data.data2.concat(res.data.shopGoods)
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
    this.onfrash(this.data.page + 1)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})