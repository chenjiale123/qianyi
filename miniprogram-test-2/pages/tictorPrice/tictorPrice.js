// pages/tictorPrice/tictorPrice.js
const api = require('../../utils/api.js')
var util = require('../../utils/md5.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesNum: "",
    xm1: '',
    sj1: '',
    xvalue: '',
    svalue: '',
    price2: '',
    scid: ''
  },
  clear: function(e) {
    this.setData({
      'xvalue': '',
      'svalue': ''
    })
    console.log(e)
  },
  xm: function(e) {
    this.setData({
      xm1: e.detail.value
    })
  },
  sj: function(e) {
    this.setData({
      sj1: e.detail.value
    })
  },
  getPlus: function(e) {
    var that = this
    var salesNum = 1
    that.data.salesNum++
      that.setData({
        salesNum: that.data.salesNum
      })
    that.getTotalPrice()
  },
  // 购物车-
  getMain: function(e) {
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
      price2: Number(price2.toFixed(2)),
      // countMoney: total.toFixed(2)
    })
    console.log(this.data.price2)
  },
  sub: function(e) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0
    var openid = wx.getStorageSync('openid')
    console.log(e)
    if (this.data.xm1 == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else if (this.data.sj1 == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'

      })
    } else {
      api._post('/QianYi/createOrder?ticketNumId=' + this.data.id + '&creatorId=' + userId + '&price=' + this.data.price2 + '&ticketNum=' + this.data.salesNum + '&buyers=' + this.data.xm1 + '&buyersPhone=' + this.data.sj1 + '&orderStatus=1' + "&effectiveDate=" + this.data.time + '&scenicSpotId=' + this.data.sceId).then(res => {
    
         var scid= res.data.scenicOrderId
       
        api._post('/QianYi_Shop/pay/wechat/createOrder?orderId=' + res.data.scenicOrderId + '&type=1' + '&tradeType=JSAPI&openid=' + openid)
          .then(res => {
            console.log(res)
            that.setData({
              appid: res.appId,
              timestamp: res.timestamp,
              noncestr: res.noncestr,
              package: res.package,
              sign: res.sign
            })
            console.log(res)
            var sting = "appId=" + res.appId + "&nonceStr=" + res.noncestr + "&package=prepay_id=" + res.prepayid + "&signType=MD5&timeStamp=" + res.timestamp.toString() + "&key=qwertyuiopasdfghjklzxcvbnm123456"
            wx.requestPayment({
              'appId': res.appId,
              'timeStamp': res.timestamp.toString(),
              'nonceStr': res.noncestr,
              'package': 'prepay_id=' + res.prepayid,
              'signType': 'MD5',
              'paySign': util.hexMD5(sting).toUpperCase(),
              'success': function(res) {

                console.log(util.hexMD5(sting).toUpperCase())
                console.log(res)
                wx.navigateTo({
                  url: '/pages/success1/success1?price=' + e.currentTarget.dataset.in,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              },
              'fail': function(res) {
                console.log(util.hexMD5(sting).toUpperCase())
                console.log(sting)
                wx.navigateTo({
                  url: '/pages/zhifu1/zhifu1?id=' + scid,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })

              },
              'complete': function(res) {}
            })
          }).catch(e => {
            console.log(e)
          })


      }).catch(e => {
        console.log(e)
      })
    }



  },
  //微信授权
  bindGetUserInfo(res) {
    var that = this
    let info = res;
    console.log(JSON.parse(res.detail.rawData));
    this.setData({
      name: JSON.parse(res.detail.rawData).nickName,
      touxiang: JSON.parse(res.detail.rawData).avatarUrl
    })
    if (info.detail.userInfo) {

      console.log("点击了同意授权");
      // console.log(res.detail.encryptedData)
      wx.login({
        success: function(res) {
          if (res.code) {

            console.log(res, info)



            wx.request({

              //获取openid接口  
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: 'wx99ea433caea5a1c7',
                secret: '71376261788531283f32ec11e2368f1e',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              method: 'GET',
              success: function(res) {


                console.log("111")
                console.log(that)
                that.setData({
                  openid: res.data.openid,
                  key1: res.data.session_key
                })

                wx.setStorageSync("openid", res.data.openid);
                that.sub($event)
              }
            })




          } else {
            console.log("授权失败");
          }
        },
      })

    } else {
      console.log("点击了拒绝授权");
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
    })
    var id = options.id
    var name = options.name
    var price = options.price
    var time = options.time
    var sceId = options.sceId
    this.setData({
      salesNum: 1,
      id: id,
      name: name,
      price: price,
      time: time,
      sceId: sceId
    })
    this.getTotalPrice()

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