const api = require('../../utils/api.js')

var util = require('../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    id4: '',
    goods1: '',
    leng1: '',
    goods2: '',
    leng2: '',
    goods3: '',
    leng4: '',
    leng3: '',
    goods5: '',
    leng5: '',
    goods6: '',
    leng6: '',
    goods7: '',
    leng7: '',
    goods8: '',
    leng8: '',
    leng: ''
  },
  again:function(e){
      wx.navigateTo({
        url: '/pages/detailTC/detailTC/id='+e.currentTarget.dataset.in,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  buy: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    var openid = wx.getStorageSync('openid')
    var can = {
      orderId: e.currentTarget.dataset.id,
      type: 0,
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
          'success': function(res) {

            console.log(util.hexMD5(sting).toUpperCase())
            console.log(res)
            wx.navigateTo({
              url: '/pages/success1/success1',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          'fail': function(res) {
            console.log(util.hexMD5(sting).toUpperCase())
            console.log(sting)
            console.log(e.currentTarget.dataset.in)
            wx.navigateTo({
              url: '/pages/zhifu/zhifu?id=' + e.currentTarget.dataset.id + '&goods=' + JSON.stringify(e.currentTarget.dataset.in.orderGoodsList) + '&price=' + e.currentTarget.dataset.in.realTotalMoney + '&time=' + e.currentTarget.dataset.in.createTime + '&code=' + e.currentTarget.dataset.in.orderNo,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })

          },
          'complete': function(res) {}
        })


      },
      fail: (err) => {
        console.log(err)
      }
    })





  },
  zhifu: function(e) {
    console.log(e.currentTarget.dataset.in)
    wx.navigateTo({
      url: '/pages/zhifu/zhifu?id=' + e.currentTarget.dataset.in + '&goods=' + JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList) + '&price=' + this.data.goods[e.currentTarget.dataset.in].realTotalMoney + '&time=' + this.data.goods[e.currentTarget.dataset.in].createTime + '&code=' + this.data.goods[e.currentTarget.dataset.in].orderNo + '&id1=' + e.currentTarget.dataset.id1 + '&id2=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tixing: function(e) {
    api._post('/QianYi_Shop/RemindTheDelivery?orderNo=' + e.currentTarget.dataset.in).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.showToast({
          title: '提醒发货成功',
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
  detail: function(e) {
    this.setData({
      id4: e.currentTarget.dataset.in
    })
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + e.currentTarget.dataset.id + '&ding=' + e.currentTarget.dataset.in,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.currentTarget.dataset.id)
  },
  detail1: function(e) {
    this.setData({
      id4: e.currentTarget.dataset.in
    })
    wx.navigateTo({
      url: '/pages/commentZJ/commentZJ?id=' + e.currentTarget.dataset.id + '&ding=' + e.currentTarget.dataset.in,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.currentTarget.dataset.id)
  },
  jdDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/jdDetail/jdDetail?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  wuliu: function(e) {
    wx.navigateTo({
      url: '/pages/wuliu/wuliu',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jindu: function(e) {
    wx.navigateTo({
      url: '/pages/tuikuanDetail/tuikuanDetail?id=' + e.currentTarget.dataset.in,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  shanchu: function(e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=-3').then(res => {
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
  quxiao: function(e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=-1').then(res => {
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
  sure: function(e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=2').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.showToast({
          title: '确认收货成功',
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
  kuaidi: function(e) {
    wx.navigateTo({
      url: '/pages/kuaidi/kuaidi?id=' + e.currentTarget.dataset.in,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tuikuan: function(e) {
    console.log(JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList))
    wx.navigateTo({
      url: '/pages/tuikuan/tuikuan?id=' + e.currentTarget.dataset.in + '&goods=' + JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList) + '&price=' + this.data.goods[e.currentTarget.dataset.in].realTotalMoney + '&yun=' + this.data.goods[e.currentTarget.dataset.in].deliverMoney + '&status=' + this.data.goods[e.currentTarget.dataset.in].orderStatus + '&id1=' + e.currentTarget.dataset.id1,
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
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=4&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        for (var i = 0; i < res.data.orderList.length; i++) {
          var item = res.data.orderList[i];
          if (item.orderStatus == -2) {
            item.orderStatus = "待支付";
          }
          if (item.orderStatus == 0) {
            item.orderStatus = "待发货";
          }
          if (item.orderStatus == 1) {
            item.orderStatus = "待收货";
          }
          if (item.orderStatus == 2) {
            item.orderStatus = "待评价";
          }
          if (item.orderStatus == 3) {
            item.orderStatus = "退款中";
          }
          if (item.orderStatus == 5) {
            item.orderStatus = "已评价";
          }
          if (item.orderStatus == 6) {
            item.orderStatus = "已追评";
          }
          if (item.orderStatus == -1) {
            item.orderStatus = "用户取消";
          }

        }
        this.setData({
          goods: res.data.orderList,
          leng: res.data.orderList.length

        })
        // this.onLoad()
        console.log(this.data.leng)
      } else {
        this.setData({
          leng: 0
        })
      }




    }).catch(e => {
      console.log(e)
    })

    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=-2&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods1: res.data.orderList,
          leng1: res.data.orderList.length

        })
      } else {
        this.setData({
          leng1: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=-1&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods2: res.data.orderList,
          leng2: res.data.orderList.length

        })
      } else {
        this.setData({
          leng2: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=0&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods3: res.data.orderList,
          leng3: res.data.orderList.length

        })
      } else {
        this.setData({
          leng3: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=1&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods4: res.data.orderList,
          leng4: res.data.orderList.length

        })
      } else {
        this.setData({
          leng4: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=2&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods5: res.data.orderList,
          leng5: res.data.orderList.length

        })
      } else {
        this.setData({
          leng5: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=3&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods6: res.data.orderList,
          leng6: res.data.orderList.length

        })
      } else {
        this.setData({
          leng6: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=5&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods7: res.data.orderList,
          leng7: res.data.orderList.length

        })
        console.log(this.data.leng7)
      } else {
        this.setData({
          leng7: 0
        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=6&page=1').then(res => {
      console.log(res)
      if (res.isSuc == true) {
        this.setData({
          goods8: res.data.orderList,
          leng8: res.data.orderList.length

        })
      } else {
        this.setData({
          leng7: 0
        })
      }


    }).catch(e => {
      console.log(e)
    })


  },

  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
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