// pages/tictorPrice/tictorPrice.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
 salesNum :"",
 xm1:'',
sj1:'',
xvalue:'',
svalue:'',
    price2:''
  },
  clear:function(e){
this.setData({
  'xvalue':'',
  'svalue':''
})
    console.log(e)
  },
  xm:function(e){
   this.setData({
     xm1:e.detail.value
   })
  },
  sj: function (e) {
    this.setData({
      sj1: e.detail.value
    })
  },
  getPlus: function (e) {
    var that = this
    var salesNum = 1
    that.data.salesNum++
    that.setData({
      salesNum: that.data.salesNum
    })
    that.getTotalPrice()
  },
  // 购物车-
  getMain: function (e) {
    var that = this
    that.data.salesNum--

    // console.log(index)

    if (that.data.salesNum <= 0) {
      that.data.salesNum = 1
      // that.delItem(e)
    }

    that.setData({
      salesNum: that.data.salesNum
    })
    that.getTotalPrice()
  },
  getTotalPrice() {
    var salesNum = this.data.salesNum
    var price = this.data.price
    var total = 0

    var price2 = salesNum * price

    this.setData({
      price2: Number(price2.toFixed(2)) ,
      // countMoney: total.toFixed(2)
    })
    console.log(this.data.price2)
  },
  sub:function(){
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/createOrder?ticketNumId=' + this.data.id + '&creatorId=' + userId + '&price=' + this.data.price2 + '&ticketNum=' + this.data.salesNum + '&buyers=' + this.data.xm1 + '&buyersPhone=' + this.data.sj1 + '&orderStatus=1' + "&effectiveDate=" + this.data.time +'&scenicSpotId=' +this.data.sceId).then(res => {
      console.log(res)
    

    }).catch(e => {
      console.log(e)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
var id=options.id
var name=options.name
var price=options.price
var time=options.time
    var sceId = options.sceId
this.setData({
  salesNum:1,
  id:id,
  name:name,
  price:price,
  time:time,
  sceId:sceId
})
    this.getTotalPrice()

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