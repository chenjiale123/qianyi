const api = require('../../utils/api.js')
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
        countdown: d + "：" + h + "：" + m + "：" + s + ":" + ms,
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
    that.countTime()

    var goods = JSON.parse(options.goods) 
    var price=options.price
    var code=options.code
    var time=options.time
    var id=options.id2
    this.setData({
      goods1:goods,
      price1:price,
      code1:code,
      time1:time,
      id:id
      // listData: list


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