const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
goods:'',
leng:'',
    jindian1: '',
    leng1: '',

  },
  zhifu: function (e) {
    console.log(e.currentTarget.dataset.in)
    wx.navigateTo({
      url: '/pages/zhifu/zhifu?id=' + e.currentTarget.dataset.in + '&goods=' + JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList) + '&price=' + this.data.goods[e.currentTarget.dataset.in].realTotalMoney + '&time=' + this.data.goods[e.currentTarget.dataset.in].createTime + '&code=' + this.data.goods[e.currentTarget.dataset.in].orderNo + '&id1=' + e.currentTarget.dataset.id1,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  detail: function (e) {
    this.setData({
      id4: e.currentTarget.dataset.in
    })
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + e.currentTarget.dataset.id + '&ding=' + e.currentTarget.dataset.in,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(e.currentTarget.dataset.id)
  },
  detail1: function (e) {
    this.setData({
      id4: e.currentTarget.dataset.in
    })
    wx.navigateTo({
      url: '/pages/commentZJ/commentZJ?id=' + e.currentTarget.dataset.id + '&ding=' + e.currentTarget.dataset.in,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(e.currentTarget.dataset.id)
  },
  jdDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/jdDetail/jdDetail?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  wuliu: function (e) {
    wx.navigateTo({
      url: '/pages/wuliu/wuliu',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  shanchu: function (e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=-3').then(res => {
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  quxiao: function (e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=-1').then(res => {
      console.log(res)
      wx.showToast({
        title: '取消订单成功',
        icon: 'success'
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  sure: function (e) {
    api._post('/QianYi_Shop/updateShopOrderStatus?id=' + e.currentTarget.dataset.in + '&status=2').then(res => {
      console.log(res)
      wx.showToast({
        title: '确认收货成功',
        icon: 'success'
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  kuaidi: function (e) {
    wx.navigateTo({
      url: '/pages/kuaidi/kuaidi?id=' + e.currentTarget.dataset.in,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tuikuan: function (e) {
    console.log(JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList))
    wx.navigateTo({
      url: '/pages/tuikuan/tuikuan?id=' + e.currentTarget.dataset.in + '&goods=' + JSON.stringify(this.data.goods[e.currentTarget.dataset.in].orderGoodsList) + '&price=' + this.data.goods[e.currentTarget.dataset.in].realTotalMoney + '&yun=' + this.data.goods[e.currentTarget.dataset.in].deliverMoney + '&status=' + this.data.goods[e.currentTarget.dataset.in].orderStatus + '&id1=' + e.currentTarget.dataset.id1,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },



  zhifu1: function (e) {
    console.log(e.currentTarget.dataset.in)
    wx.navigateTo({
      url: '/pages/zhifu1/zhifu1?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jdDetail1: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/spDetail/spDetail?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  shanchu1: function (e) {
    api._post('/QianYi/updateScenicOrder?orderId=' + e.currentTarget.dataset.in + '&orderStauts=-5').then(res => {
      console.log(res)
      if(res.isSuc==true){
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
  quxiao1: function (e) {
    api._post('/QianYi/updateScenicOrder?orderId=' + e.currentTarget.dataset.in + '&orderStauts=-2').then(res => {
      console.log(res)
      if(res.isSuc==true){
        wx.showToast({
          title: '取消订单成功',
          icon: 'success'
        })
      }else{
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
  tuikuan1: function (e) {
    wx.showModal({
      title: '提示',
      content: '确认退款？',
      success: function (res) {
        if (res.confirm) {
          api._post('/QianYi/updateRefundScenicOrder?orderId=' + e.currentTarget.dataset.in + '&refund=1').then(res => {
            console.log(res)
            if (res.isSuc == true) {
              wx.showToast({
                title: '退款成功',

              })
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none"
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
  jindu1: function (e) {
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



    api._post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=4&page=1').then(res => {
      console.log(res)
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
        leng1: res.data.orderList.length

      })

  


    }).catch(e => {
      console.log(e)
    })
      api._post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=0&page=1').then(res => {
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