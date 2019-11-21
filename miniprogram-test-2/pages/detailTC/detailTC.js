const api = require('../../utils/api.js')
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    goods: '',
    goods1: '',
    img: "",
    comment: '',
    img1: '',
    leng: "",
    leng1: "",
    Id: "",
    shopId: '',
    dsc: '',
    show: false,
    show1: false,
    salesNum: 1,
    pri: '',
    price: '',
    model: false,
    show2: false,
    show3: false,
    store: '',
    ku: '',
    id3: '',
    currentTab: 0,
    moren: '',
    comment1: '',
    sh: true
  },
  look:function(e){
    var Id = e.currentTarget.dataset.id;



    wx.setStorageSync('array', this.data.array)

    wx.navigateTo({
      url: '/pages/detailTC/detailTC?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  click: function() {
 
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      // delay: 1000
    });
    animation.opacity(0).translate(0, -100).step()
    this.setData({
      ani: animation.export(),
      sh: false
    })




    var userId = wx.getStorageSync('user').loginId || 0
    if (userId==0){
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      this.setData({
        sh: false
      })
      api._get('/QianYi_Shop/insertGoodsCollection?userId=' + userId + '&recnoId=' + this.data.Id).then(res => {
        console.log(res)

        wx.showToast({
          title: '添加心愿单成功',
          icon: 'success',
          // duration: 2000
        })


      }).catch(e => {
        console.log(e)
      })
    }

    

  },
  click1: function() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      // delay: 1000
    });
    animation.opacity(1).translate(0, 0).step()
    this.setData({
      ani: animation.export(),
      sh: true
    })


    this.setData({
      sh: true
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/deleteGoodsCollection?userId='+userId+'&goodsId=' + this.data.Id).then(res => {
      console.log(res)
      wx.showToast({
        title: '移除心愿单成功',
        icon: 'success',
        // duration: 2000
      })



    }).catch(e => {
      console.log(e)
    })

  },
  clicktap(e) {

    var index = e.currentTarget.dataset.index;
    var id3 = e.currentTarget.dataset.id
    console.log(index, id3)
    this.setData({
      id3: e.currentTarget.dataset.id
    })
    this.setData({
      pri: this.data.goods[0].shopGoodsSpecList[index].specPrice,
      ku: this.data.goods[0].shopGoodsSpecList[index].specInventory,
      currentTab: e.currentTarget.dataset.index
    })

    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.leng1.length; i++) {
      console.log(this.data.leng1[i].id)
      if (this.data.leng1[i].id == id) {
        //当前点击的位置为true即选中
     
        this.data.leng1[i].checked = true;
        console.log(this.data.ku)
        if (this.data.ku == 0) {
          this.data.leng1[i].checked = false;
        }
      } else {
        //其他的位置为false
        this.data.leng1[i].checked = false;
      }
    }
    this.setData({
      leng1: this.data.leng1,
      msg: "id:" + id
    })

  },
  tz: function() {
    wx.navigateTo({
      url: '/pages/comDetail/comDetail?id=' + this.data.Id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  buy: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    this.setData({
      show1: !this.data.show1
    })
    }
  },
  cuxiao: function() {
    this.setData({
      show2: !this.data.show2
    })
  },
  close1: function() {
    this.setData({
      show1: false
    })
    console.log(this.data.show1)
  },
  close2: function() {
    this.setData({
      show2: false
    })
    console.log(this.data.show1)
  },
  close3: function() {
    this.setData({
      show3: false
    })
    console.log(this.data.show1)
  },
  dingdan: function() {
    console.log(this.data.price)
    var that = this
    if (this.data.id3 == "") {
      // this.data.id3 = this.data.moren
      wx.showToast({
        title: '请选择规格',
        icon: "none"

      })
    } else {
      this.data.id3 = this.data.id3
      wx.navigateTo({
        url: '/pages/dingdan/dingdan?price=' + this.data.price + '&num=' + this.data.salesNum + '&id=' + this.data.Id + '&shopId=' + this.data.shopId + '&guiId=' + this.data.id3,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
   
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
    var pri = this.data.pri
    var total = 0

    var price = salesNum * pri

    this.setData({
      price: price,
      countMoney: total.toFixed(2)
    })
  },
  onReachBottom: function() {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      show: !this.data.show
    })
    wx.hideLoading();
    console.log('111111')
  },
  tan: function() {
    this.setData({
      model: true
    })
  },
  gouwu1: function() {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {

    wx.switchTab({
      url: '/pages/gouwu/gouwu',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    }
  },
  dingdan1: function() {
    var that = this
    if (this.data.id3 == "") {
      // this.data.id3 = this.data.moren
      wx.showToast({
        title: '请选择规格',
        icon: "none"

      })
    } else {
      this.data.id3 = this.data.id3
      console.log(this.data.id3)
      var userId = wx.getStorageSync('user').loginId || 0

      api._get('/QianYi_Shop/insertGoodsCarts?creatorId=' + userId + '&goodsId=' + that.data.Id + '&goodsSpecidId=' + this.data.id3 + '&cartNum=' + this.data.salesNum).then(res => {
        console.log(res)
        that.setData({
          show3: false
        })
        this.tan()
        setTimeout(function () {
          that.setData({
            model: false

          })
        }, 1000)



      }).catch(e => {
        console.log(e)
      })
    }
   
  },
  gouwuche: function() {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    that.setData({
      show3: true
    })
    }
  },
  onDrow: function () {
    var distance = Math.sqrt(Math.pow(this.y - this.startY, 2) + Math.pow(this.x - this.startX, 2));
    this.radius = -distance / 15 + 20;

    // 当气泡拉到一定程度，断开链条且链条消失
    if (this.radius < 7) {

      // 不是很理解为何写了beginPath就把原来画的给清理了???
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
      this.ctx.setFillStyle('rgba(0,0,0,0)');
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.setFontSize(20)
      this.ctx.setFillStyle('red');
      this.ctx.fillText('❤', this.x - 10, this.y + 6);
      this.ctx.fill();

    } else {

      // 链条还没断开时候的状态
      var offsetX = this.radius * Math.sin(Math.atan((this.y - this.startY) / (this.x - this.startX)));
      var offsetY = this.radius * Math.cos(Math.atan((this.y - this.startY) / (this.x - this.startX)));

      var x1 = this.startX - offsetX;
      var y1 = this.startY + offsetY;

      var x2 = this.x - offsetX;
      var y2 = this.y + offsetY;

      var x3 = this.x + offsetX;
      var y3 = this.y - offsetY;

      var x4 = this.startX + offsetX;
      var y4 = this.startY - offsetY;


      // 画贝塞尔曲线
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.quadraticCurveTo(this.anchorX, this.anchorY, x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.quadraticCurveTo(this.anchorX, this.anchorY, x4, y4);
      this.ctx.lineTo(x1, y1);
      this.ctx.setFillStyle('rgba(0,0,0,0)');
      this.ctx.fill();

      // 画圆圈
      this.ctx.beginPath();
      this.ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI)
      this.ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI)
      this.ctx.setFillStyle('rgba(0,0,0,0)');
      this.ctx.fill();

      // 写字    如何让文字居中，暂时还没想到办法？？
      this.ctx.beginPath();
      this.ctx.setFontSize(20)
      this.ctx.setFillStyle('red');
      this.ctx.fillText('❤', this.x - 10, this.y + 6);
      this.ctx.fill();
    }



    this.ctx.draw();
  },
  touchmove: function (e) {

    this.x = e.changedTouches[0].x;
    this.y = e.changedTouches[0].y;
    this.anchorX = (e.changedTouches[0].x + this.startX) / 2;
    this.anchorY = (e.changedTouches[0].y + this.startY) / 2;
    this.onDrow();

  },
  touchend: function (e) {
    this.ctx.setFillStyle('transparent');
    this.ctx.draw();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      api: api.url
    })

    this.ctx = wx.createCanvasContext('myCanvas')

    this.radius = 20;

    // 手势坐标
    this.x = 300;
    this.y = 300;

    // 控制点坐标
    this.anchorX = 200;
    this.anchorY = 300;

    // 起点坐标
    this.startX = 100;
    this.startY = 100;

    this.lock = true; 

    // this.data.leng1[0].checked = true;
    this.setData({
      leng1: this.data.leng1,
    })
    var that = this
    this.setData({
      Id: options.id
    })

    console.log(this.data.Id)
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectProductsDetails?id=' + that.data.Id + '&userId='+userId).then(res => {

      that.setData({
        goods: res.data.productDetailsList,
        // moren: res.data.productDetailsList[0].shopGoodsSpecList[0].id,
        pri: res.data.productDetailsList[0].shopGoodsSpecList[0].specPrice,
        img: res.data.productDetailsList[0].imageUrl.split(","),
        dsc: res.data.productDetailsList[0].productDesc,
        leng1: res.data.productDetailsList[0].shopGoodsSpecList,
        shopId: res.data.productDetailsList[0].storeId,
        store: res.data.productDetailsList[0].discountStoresList,
        ku: res.data.productDetailsList[0].shopGoodsSpecList[0].specInventory
      })
        if (this.data.goods[0].isCollection==1){
          this.setData({
          sh:false
          })
        }else{
          this.setData({
            sh: true
          })
        }
      console.log(res)
      var article = that.data.dsc; //article是取到的数据



      WxParse.wxParse('article', 'html', article, that, 5);

    }).catch(e => {
      console.log(e)
    })

    api._get('/QianYi_Shop/selectShopComments?page=1&goodsId=' + that.data.Id + '&sortType=0').then(res => {
      console.log(res)
      that.setData({
        comment: res.data.commentslist.slice(0, 2),
        leng: res.data.total,
        comment1: res.data.commentslist
        // img1: res.data.commentslist.commentsImagePath.split(",")

      })


    }).catch(e => {
      console.log(e)
    })

    api._get('/QianYi_Shop/selectRecommendGoods?goodsId=' + that.data.Id + '&page=1').then(res => {

      that.setData({
        goods1: res.data.goodsList

      })
      console.log(res)

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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})