const api = require('../../utils/api.js')
var util = require('../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods1: "",
    price1: "",
    code1: "",
    time1: "",
    // listData: [],
    countdown: '',
    endDate2: new Date().getTime()+1800000,
    id:''
  },


  pay:function(){
var that=this
    var openid = wx.getStorageSync('openid')
    api._post('/QianYi_Shop/pay/wechat/createOrder?orderId=' + this.data.id + '&type=0' + '&tradeType=JSAPI&openid=' + openid)
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
          'success': function (res) {

            console.log(util.hexMD5(sting).toUpperCase())
            console.log(res)
            console.log(goods)

            wx.navigateTo({
              url: '/pages/success1/success1?price=' + that.data.price1,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          'fail': function (res) {
            console.log(util.hexMD5(sting).toUpperCase())
            console.log(sting)
            console.log(goods)
            wx.navigateTo({
              url: '/pages/zhifu/zhifu?id=' + spid,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })

          },
          'complete': function (res) { }
        })
      }).catch(e => {
        console.log(e)
      })

  },
  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(that.data.endDate2);//设置截止时间
    var end = endDate.getTime();
    var leftTime = end - now; //时间差
                            
    var d, h, m, s, ms;
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown:  m + "：" + s ,
      })
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 100);
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00'
      })
    }

  },
  quxiao: function (e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + this.data.id + '&status=-1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.showToast({
          title: '取消订单成功',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      api: api.url
    })
    that.countTime()

    var id = JSON.parse(options.id) 
   
   this.setData({
     id:id
   })
    api._get('/QianYi_Shop/selectOrderInfo?id=' + id).then(res => {
      console.log(res)
     this.setData({
       goods1: res.data.orderGoodsList,
       price1: res.data.goodsMoney,
       code1: res.data.orderNo,
       time1: res.data.createTime

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