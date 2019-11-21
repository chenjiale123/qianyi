const api = require('../../utils/api.js')
const app = getApp()
let goodsList = [{
  actEndTime: '2019/10/01 00:00:43'
}
]
Page({
  data: {
    goods:'',
    currentTab: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    data1:'',
    data2:'',
    time:'',
    countdown: '',
    endDate2: ""

  },
  //事件处理函数

  detailMS: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);

    var Id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/detailMS/detailMS?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    console.log(e.currentTarget)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },

  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  countTime() {
    var that = this;
    var leftTime = that.data.time--; //时间差


    var d, h, m, s, ms;
    if (leftTime >= 0) {
      setTimeout(function () {
     
        that.countTime()
      }, 1000);
      d = Math.floor(leftTime  / 60 / 60 / 24);
      h = Math.floor(leftTime  / 60 / 60 % 24);
      m = Math.floor(leftTime  / 60 % 60);
      s = Math.floor(leftTime  % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown: d + "：" + h + "：" + m + "：" + s ,
      })
      //递归每秒调用countTime方法，显示动态时间效果
    
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00:00'
      })
    }

  },
  countTime1() {
    var that = this;
  
    var leftTime = that.data.time1--; //时间差

    var d, h, m, s, ms;
    if (leftTime >= 0) {
      setTimeout(function () {
        // leftTime--;
        that.countTime1()
      }, 1000);
      d = Math.floor(leftTime  / 60 / 60 / 24);
      h = Math.floor(leftTime  / 60 / 60 % 24);
      m = Math.floor(leftTime  / 60 % 60);
      s = Math.floor(leftTime  % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown1: d + "：" + h + "：" + m + "：" + s,
      })
      //递归每秒调用countTime方法，显示动态时间效果

    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00:00'
      })
    }

  },
onLoad:function(){
  var that = this
  that.setData({
    api: api.url
  })
  var userId = wx.getStorageSync('user').loginId || 0

  api._post('/QianYi_Shop/selectShopSeckillNperGoods?page=1&userId='+userId).then(res => {
    console.log(res)

      this.setData({
        goods: res.data.shopSeckillsNperList[0].shopSeckillList,
        goods1: res.data.shopSeckillsNperList[1].shopSeckillList,
        data1: res.data.shopSeckillsNperList[0].beginTime,
        data2: res.data.shopSeckillsNperList[1].beginTime,
        time: res.data.shopSeckillsNperList[0].toTime,
        time1: res.data.shopSeckillsNperList[1].toTime,
        endDate2: new Date().getTime() + res.data.shopSeckillsNperList[0].toTime,
        endDate3: new Date().getTime() + res.data.shopSeckillsNperList[1].toTime
      })

      
    console.log(res.data.shopSeckillsNperList[0].toTime)
    console.log(this.data.endDate3)
  
    this.countTime()
    this.countTime1()

    
 
  

  }).catch(e => {
    console.log(e)
  })


},






})
