//index.js
//获取应用实例
const app = getApp()
let goodsList = [{
  actEndTime: '2019/10/01 00:00:43'
}]
const api = require('../../utils/api.js')

// 单个请求


Page({
  data: {
    currentTab: 0,
    countDownList: [],
    actEndTimeList: [],
    Id: '',
    data2: "",
    data3: '',
    array: [],
    one:'',
    two:"",
    three:""

  },
  // 点击特效
  containerTap: function (res) {
    var that = this
    var x = res.touches[0].pageX-10;
    var y = res.touches[0].pageY + 38;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function () {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }, 200)
  },
  listTC: function() {
    wx.navigateTo({
      url: '/pages/listTC/listTC',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  detailMS: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);

    var Id = e.currentTarget.dataset.id;
    this.data.array.unshift({
      id: Id,
      name: e.currentTarget.dataset.in.goodsName,
      img: e.currentTarget.dataset.in.imageThumb,
      price: e.currentTarget.dataset.in.discountPrice
    })
    console.log(this.data.array)
    wx.setStorageSync('array', this.data.array)
    wx.navigateTo({
      url: '/pages/detailMS/detailMS?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  ab: function() {
    wx.navigateTo({
      url: '/pages/spList/spList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //事件处理函数
  onShareAppMessage(options) {

  },
  detail: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);

    var Id = e.currentTarget.dataset.id;

    console.log(Id)
    this.data.array.unshift({
      id: Id,
      name: e.currentTarget.dataset.in.goodsName,
      img: e.currentTarget.dataset.in.imageThumb,
      price: e.currentTarget.dataset.in.discountPrice
    })

    wx.setStorageSync('array', this.data.array)

    wx.navigateTo({
      url: '/pages/detailTC/detailTC?id=' + Id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  sousuo: function() {
    wx.navigateTo({
      url: '/pages/sousuo/sousuo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  search: function() {
    wx.navigateTo({
      url: '/pages/news/news',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  miaosha: function() {
    wx.navigateTo({
      url: '/pages/miaosha/miaosha',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(that.data.endDate2);//设置截止时间
    var end = endDate.getTime();
    var leftTime = that.data.time--; 

    //时间差

    var d, h, m, s, ms;
    if (leftTime >= 0) {
      setTimeout(function () {
        // leftTime--;
        that.countTime()
      }, 1000);
      d = parseInt(leftTime / (60 * 60 * 24));
      h = parseInt(leftTime % (60 * 60 * 24) / 3600);
      m = parseInt(leftTime % (60 * 60 * 24) % 3600 / 60);
      s = parseInt(leftTime % (60 * 60 * 24) % 3600 % 60);
 
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown: d + "：" + h + "：" + m + "：" + s,
      })
      // //递归每秒调用countTime方法，显示动态时间效果
 
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00:00'
      })
    }

  },
  onLoad: function() {
    var that = this
    that.setData({
      api:api.url
    })
    console.log(that.data.api)
    api._post('/QianYi_Shop/selectArticle?page=1').then(res => {
      console.log(res)
      this.setData({
        aritle: res.data.ArticleList[0].title
      })

    }).catch(e => {
      console.log(e)
    })
    var userId = wx.getStorageSync('user').loginId || 0
    api._get('/QianYi_Shop/selectShopSeckillNperGoods?page=1&userId=' + userId).then(res => {

      that.setData({
        data: res.data.shopSeckillsNperList[0].shopSeckillList,
        one: res.data.shopSeckillsNperList[0].shopSeckillList[0],
        two: res.data.shopSeckillsNperList[0].shopSeckillList[1],
        three: res.data.shopSeckillsNperList[0].shopSeckillList[2],
        time: res.data.shopSeckillsNperList[0].toTime,
        time1: res.data.shopSeckillsNperList[1].toTime,
        endDate2: new Date().getTime() + res.data.shopSeckillsNperList[0].toTime,
        
      })
      this.countTime()

    }).catch(e => {
      console.log(e)
    })

    api._get('/QianYi_Shop/selectShufflingFigure?page=1&pageSize=3&type=0').then(res => {

      that.setData({
        data1: res.data.pictureList
      })
      console.log(res.data.pictureList)

    }).catch(e => {
      console.log(e)
    })

    api._get('/QianYi_Shop/selectClassifyGoods?page=1').then(res => {

      that.setData({
        data2: res.data.shopGoods,

      })
      console.log(res.data)

    }).catch(e => {
      console.log(e)
    })

    api._get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {

      that.setData({
        data3: res.data.goodsList
      })
      console.log(res.data)

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
  }



})


// tab