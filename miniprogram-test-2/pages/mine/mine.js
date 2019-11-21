const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: false,
    name: '',
    touxiang: '',
    array:[],
    huiyuan:''
  },
  all: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/all/all',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  wuliu:function(){
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
  url: '/pages/wuliu/wuliu',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
    }
  },
  zhuxiao: function() {
    wx.clearStorageSync()
    this.onLoad()
    wx.navigateTo({
      url: '/pages/loginway/loginway',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  yuan: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/yuan/yuan',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  pingjia: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/pingjia/pingjia',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  coupon: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/coupon/coupon',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  lasty: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/lasty/lasty',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  address: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/address/address',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  techan: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/spList/spList',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  show: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  jingdian: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/jdList/jdList',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
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
  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    if (wx.getStorageSync('user')) {

      that.setData({
        name: wx.getStorageSync('user').infoNickname,
        user: true,
        touxiang: api.url + wx.getStorageSync('user').infoIcon,
        huiyuan: wx.getStorageSync('user').membersLevel
      })
    }else{
      that.setData({
        name: "暂未登录",
        user: true,
        touxiang: "",
        huiyuan: ""
      })
    }
    that.onLoad()

    console.log(that.data.huiyuan)
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