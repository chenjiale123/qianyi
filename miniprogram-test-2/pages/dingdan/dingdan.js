const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    num: "",
    Id: '',
    shopId: '',
    detail: '',
    number: '',
    all: '',
    all_: '',
    yunfei: "",
    ad: '',
    show: false,
    currentTab: 0,
    able: '',
    unable: '',
    newArr: [],
    countMoney: 0,
    yan1: '',
    id1: '',
    id2: '',
    show2: false,
    xianshi: false,
    guiId:''
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
  yan: function(e) {
    this.setData({
      yan1: e.detail.value
    })
  },
  buy: function() {
    this.setData({
      show1: !this.data.show1
    })
  },
  close1: function() {
    this.setData({
      show1: false
    })
  },
  add: function() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  radio: function(e) {
    console.log(e.currentTarget.dataset.id)
   
  },
  radioChange(e) {
    console.log(e.detail.value)
    var that = this

    that.setData({
      list1: that.data.list[e.detail.value],
      index1: e.detail.value
    })
  },
  sure: function(e) {

    console.log(this.data.index1)
    console.log(this.data.list1)
    // wx.setStorageSync('list', this.data.list1);
    this.setData({
      ad: this.data.list1,
      xianshi: false
    })
  },
 
  edit: function (e) {
    var that=this
    console.log(e)
 
    console.log(e.currentTarget.dataset.id)
    var li = e.currentTarget.dataset.id
    console.log(that.data.list[li])
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit?name=' + that.data.list[li].consigneeName + '&phone=' + that.data.list[li].consigneePhone + '&path=' + that.data.list[li].areaIdPath + '&detail=' + that.data.list[li].address + '&moren=' + that.data.list[li].isDefault + '&id=' + that.data.list[li].id + '&type=' + that.data.list[li].type,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  address: function() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  address1: function() {
    this.setData({
      xianshi: true
    })
  },
  dingdan: function(e) {
    var that = this

    console.log(e)
    console.log(this.data.ad.id)
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/placeShopOrderGoods?userId='+userId+'&goodsSpecId='+this.data.guiId+'&addressId=' + this.data.ad.id + '&goodsId=' + this.data.Id + '&shopId=' + this.data.shopId + '&goodsNumber=' + this.data.number + '&couponsId=' + this.data.id1 + '&shopCarId=0&paymentAmount=' + this.data.all_ + '&orderRemarks=' + this.data.yan1).then(res => {
      console.log(res)
      api._post('/QianYi_Shop/pay/wechat/createOrder?orderId=' + res.data.shopOrderId + '&type=0').then(res => {
        console.log(res)
        that.setData({
          appid: res.appid,
          timestamp: res.timestamp,
          noncestr: res.noncestr,
          package: res.package,
          sign: res.sign




        })
        console.log(res.timestamp.toString())

        wx.requestPayment({
          // "appId": res.appid,
          'timeStamp': res.timestamp.toString(),
          'nonceStr': res.noncestr,
          'package': res.package,
          'signType': 'MD5',
          'paySign': res.sign,
          'success': function(res) {
            // console.log("2222")
          },
          'fail': function(res) {
            console.log(res)
            wx.navigateTo({
              url: '/pages/success1/success1',
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
    // zhifu


  },

  goodsdagou: function(e) {
    // console.log(e)
    var that = this
    var num = that.data.num
    var cardTeams = that.data.unable
    var index = e.currentTarget.dataset.checkid
    console.log(index)
    console.log(cardTeams[index].id)

    var arr = that.data.newArr
    var selected = cardTeams[index].selected
    console.log(selected)
    cardTeams[index].selected = !selected
    if (!selected) {
      arr.push(index)
    } else {
      arr.pop()
    }
    console.log(arr)
    console.log(arr.length)

    that.setData({
      cardTeams: cardTeams,
      newArr: arr,
      id1: cardTeams[index].id
    })

  },
  srue: function(e) {
    var index = e.currentTarget.dataset.checkid
    var cardTeams = this.data.unable
    var total = 0
    for (var i = 0; i < cardTeams.length; i++) {
      if (cardTeams[i].selected) {
        total += cardTeams[i].couponMoney
      }
    }
    this.setData({
      cardTeams: cardTeams,

      countMoney: total.toFixed(2),
      show1: false
    })
    // this.again()
    this.getTotalPrice()
    console.log(this.data.id1)

  },
  getPlus: function(e) {
    var that = this

    that.data.number++
      that.setData({
        number: that.data.number
      })
    this.again()
    this.getTotalPrice()
  },
  // 购物车-
  getMain: function(e) {
    var that = this
    that.data.number--

      // console.log(index)

      if (that.data.number <= 0) {
        that.data.number = 1
        // that.delItem(e)
      }

    that.setData({
      number: that.data.number
    })
    that.again()
    this.getTotalPrice()

  },
  getTotalPrice() {
    var number = this.data.number
    var pri = this.data.detail.specPrice
    var total = 0

    var price = number * pri

    this.setData({
      all: price,

      all_: price - this.data.countMoney + this.data.yunfei
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  again: function() {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectIstest?userId='+userId+'&goodsSpecId=' + this.data.guiId +'&shopId=' + this.data.shopId + '&goodsId=' + this.data.Id + '&goodsNum=' + this.data.number + '&type=1').then(res => {
      console.log(res)
      that.setData({
        unable: res.data.shopCouponsList

      })


    }).catch(e => {
      console.log(e)
    })
  },
  onLoad: function(options) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectAddressByUserId?page=1&userId='+userId).then(res => {
      
      that.setData({
        list: res.data.shopAddressList

      })
    

    }).catch(e => {
      console.log(e)
    })
 

    this.setData({
      price: options.price,
      num: options.num,
      Id: options.id,
      shopId: options.shopId,
      guiId:options.guiId
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectIstest?userId='+userId+'&goodsSpecId=' + this.data.guiId +'&shopId=' + this.data.shopId + '&goodsId=' + this.data.Id + '&goodsNum=' + this.data.num + '&type=2').then(res => {
      console.log(res)
      that.setData({
        able: res.data.shopCouponsList

      })


    }).catch(e => {
      console.log(e)
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectIstest?userId='+userId+'&goodsSpecId=' + this.data.guiId +'&shopId=' + this.data.shopId + '&goodsId=' + this.data.Id + '&goodsNum=' + this.data.num + '&type=1').then(res => {
      console.log(res)
      that.setData({
        unable: res.data.shopCouponsList

      })


    }).catch(e => {
      console.log(e)
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/insertSingleShopOrderGoods?userId='+userId+'&goodsSpecId=' + this.data.guiId +'&shopId=' + this.data.shopId + '&goodsId=' + this.data.Id +
      '&number=' + this.data.num).then(res => {
      console.log(res)


      that.setData({
        detail: res.data.orderEdit[0].specificationGoodsList,
        number: res.data.orderEdit[0].number,
        all: res.data.calculationAmount.goodsMoneyAll,
        all_: res.data.calculationAmount.MoneyAll,
        yunfei: res.data.calculationAmount.freightMoneyAll,

        ad: res.data.orderEdit[0].shopAddressList

      })



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