const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiage: true ,
    show: true,
    goods: "",
    checked_all: false,     //全选
    newArr: [],            //复选框选中
    countMoney: 0,
    goodsList: "",
    carId: '',
    shopId: '',
    selected: true,
    jiage: true,
    show: true,
    dl: true 
  },
  zhuanhua: function () {
    this.setData({
      jiage: false,
      show: false
    })
  },
  zhuanhua1: function () {
    this.setData({
      jiage: true,
      show: true
    })
  },
  gouwu1:function(){

  },

  goodsdagou: function (e) {
    // console.log(e)
    var that = this
  
    var goods = that.data.goods
    var index = e.currentTarget.dataset.checkid
    console.log(index)
    var arr = that.data.newArr
    var selected = goods[index].selected
   
    goods[index].selected = !selected
    if (!selected) {
      arr.push(index)
    } else {
      arr.pop()
    }
    console.log(goods.length)
    console.log(arr.length)
    if (arr.length == goods.length) {

      this.setData({
        checked_all: true
      })
      console.log(this.data.checked_all)

    } else {
      that.setData({
        checked_all: false
      })
    }
    that.setData({
      goods: goods,
      newArr: arr
    })

    var a = []

    for (var index in arr) {
      a.push(goods[index].id)

    }
    console.log(a)
    that.setData({
      carId: a.join(',')
    })

  },
  // 全选
  checkedAll: function () {
    var that = this
    var checked_all = that.data.checked_all
    checked_all = !checked_all
    var goods = that.data.goods
    var arr = []
    console.log(checked_all)
    for (var i = 0; i < goods.length; i++) {
      goods[i].selected = checked_all
      console.log(checked_all)
      if (checked_all) {
        arr.push(i)
      } else {
        arr = []
      }
    }
    console.log(arr)
    that.setData({
      goods: goods,
      checked_all: checked_all,
      newArr: arr
    })
    var a = []

    for (var index in arr) {
      a.push(goods[index].id)

    }
    console.log(a)
    that.setData({
      carId: a.join(',')
    })
    console.log(this.data.carId)


  },
  delItem: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var goods = that.data.goods
    console.log(goods)
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      cancelText: '否',
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {

          console.log(index)
          console.log(goods)
          var userId = wx.getStorageSync('user').loginId || 0

          api._post('/QianYi_Shop/deleteGoodsCollection?goodsId=' + that.data.carId+'&userId='+userId).then(res => {
            goods.splice(index, 1);

            that.setData({
              goods: goods
            });
            that.onLoad()
            console.log("111")
         
          }).catch(e => {
            console.log(e)
            console.log(goods[index].id)
          })



        }
      }
    })
  },
  dingdan1: function () {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/delGoodsCarts?ids=' + this.data.goods[index].id + '&userId=' + userId).then(res => {


      console.log(res)
      this.onLoad()

    }).catch(e => {
      console.log(e)
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
    api._get('/QianYi_Shop/selectMyWishList?userId='+userId+'&page=1').then(res => {
      if (res.isSuc == true) {
        that.setData({
          she: res.isSuc,
          goods: res.data.shopGoodsList
        })
        // that.onLoad()
      } else {
        that.setData({
          she: res.isSuc,
          // cardTeams: res.data.cartsList,
        })
      }
  

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