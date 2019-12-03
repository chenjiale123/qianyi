const api = require('../../utils/api.js')
var util = require('../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    jindian1:'',
    jindian2: '',
    jindian3: '',
    jindian4: '',
     leng:''

  },
  again: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail/id=' + e.currentTarget.dataset.in,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  buy: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    var openid = wx.getStorageSync('openid')
    var can = {
      orderId: e.currentTarget.dataset.id,
      type: 1,
      tradeType: "JSAPI",
      openid: openid
    }



    wx.request({
      url: api.baseUrl + '/QianYi_Shop/pay/wechat/createOrder',
      method: 'POST',
      data: can,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {

        console.log(res.data.appId)
        var sting = "appId=" + res.data.appId + "&nonceStr=" + res.data.noncestr + "&package=prepay_id=" + res.data.prepayid + "&signType=MD5&timeStamp=" + String(res.data.timestamp) + "&key=qwertyuiopasdfghjklzxcvbnm123456"
        wx.requestPayment({
          'appId': res.data.appId,
          'timeStamp': String(res.data.timestamp),
          'nonceStr': res.data.noncestr,
          'package': 'prepay_id=' + res.data.prepayid,
          'signType': 'MD5',
          'paySign': util.hexMD5(sting).toUpperCase(),
          'success': function (res) {

            console.log(util.hexMD5(sting).toUpperCase())
            console.log(res)
            wx.navigateTo({
              url: '/pages/success1/success1',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          'fail': function (res) {
            console.log(util.hexMD5(sting).toUpperCase())
            console.log(sting)
            console.log(e.currentTarget.dataset.in)
            wx.navigateTo({
              url: '/pages/zhifu1/zhifu1?id=' + e.currentTarget.dataset.id ,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })

          },
          'complete': function (res) { }
        })


      },
      fail: (err) => {
        console.log(err)
      }
    })





  },
  zhifu: function (e) {
    console.log(e.currentTarget.dataset.in)
    wx.navigateTo({
      url: '/pages/zhifu1/zhifu1?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jdDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/spDetail/spDetail?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  shanchu: function (e) {
    api._post('/QianYi/updateScenicOrder?orderId=' + e.currentTarget.dataset.in + '&orderStauts=-5').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
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
  quxiao: function (e) {
    api._post('/QianYi/updateScenicOrder?orderId=' + e.currentTarget.dataset.in + '&orderStauts=-2').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.showToast({
          title: '取消订单成功',
          icon: 'success'
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
  tuikuan:function(e){
    wx.showModal({
      title: '提示',
      content: '确认退款？',
      success: function (res) {
        if (res.confirm) {
          api._post('/QianYi/updateRefundScenicOrder?orderId=' + e.currentTarget.dataset.in + '&refund=1').then(res => {
            console.log(res)
              if(res.isSuc==true){
                wx.showToast({
                  title: '退款成功',
                  
                })
              }else{
                wx.showToast({
                  title: res.msg,
                   icon:"none"
                })
              }

          }).catch(e => {
            console.log(e)
          })
          // console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  jindu: function (e) {
    wx.navigateTo({
      url: '/pages/tuikuanDetail/tuikuanDetail?id=' + e.currentTarget.dataset.in,
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
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectScenicOrder?creatorId='+userId+'&orderStauts=0&page=1').then(res => {
      console.log(res)
      for (var i = 0; i < res.data.scenicOrderParamList.length; i++) {
        var item = res.data.scenicOrderParamList[i];
        if (item.orderStatus == 1) {
          item.orderStatus = "待支付";
        }
      
        if (item.orderStatus == 3) {
          item.orderStatus = "待评价";
        }
        if (item.orderStatus == 5) {
          item.orderStatus = "退款中";
        }
        if (item.orderStatus == 4) {
          item.orderStatus = "未使用";
        }
    
        if (item.orderStatus == 2) {
          item.orderStatus = "用户取消";
        }

      }

      this.setData({
        jindian: res.data.scenicOrderParamList,
        leng: res.data.scenicOrderParamList.length
      })

    }).catch(e => {
      console.log(e)
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectScenicOrder?creatorId='+userId+'&orderStauts=1&page=1').then(res => {
      console.log(res)
      this.setData({
        jindian1: res.data.scenicOrderParamList,
   

      })



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi/selectScenicOrder?creatorId='+userId+'&orderStauts=3&page=1').then(res => {
      console.log(res)
      this.setData({
        jindian2: res.data.scenicOrderParamList,


      })



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi/selectScenicOrder?creatorId=' + userId+'&orderStauts=4&page=1').then(res => {
      console.log(res)
      this.setData({
        jindian3: res.data.scenicOrderParamList,


      })



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi/selectScenicOrder?creatorId='+userId+'&orderStauts=5&page=1').then(res => {
      console.log(res)
      this.setData({
        jindian4: res.data.scenicOrderParamList,


      })
      console.log(this.data.jindian4.length)


    }).catch(e => {
      console.log(e)
    })

  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    console.log(e.target)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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