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
    one: '',
    two: "",
    three: "",
    page: 1,
    pages: 0,
    currentTab: 0,
    data2: [],
    price: false,
    mrc: '综合',
    id: 1,
    sousuo: false,
    di1: '',
    gao1: '',
    array: []

  },

  // 点击特效
  containerTap: function(res) {
    var that = this
    var x = res.touches[0].pageX - 10;
    var y = res.touches[0].pageY + 38;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function() {
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
    var endDate = new Date(that.data.endDate2); //设置截止时间
    var end = endDate.getTime();
    var leftTime = that.data.time--;

    //时间差

    var d, h, m, s, ms;
    if (leftTime >= 0) {
      setTimeout(function() {
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
      api: api.url
    })
    this.onfrash(1)
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
    api._get('/QianYi/selectAppVersion?device=3').then(res => {
           
      if (res.data[0].version == 2) {
 
        api._post('/QianYi_Shop/selectGoodsByCondition',{
          choseId:1,
          type:3,
          goodsName:'',
          page:'',
          beginPrice:'',
          endPrice:''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,
      

          })
          console.log(res)

        }).catch(e => {
          console.log(e)

        })
      } else {
   
        api._post('/QianYi_Shop/selectGoodsByCondition',{
          chooseId: 1,
          goodsName: '',
          page: '',
          beginPrice: '',
          endPrice: ''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,
            hidden1: true
          })
          console.log(res.data)

        }).catch(e => {
          console.log(e)

        })

      }



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
  videoPlay: function (e) {
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    console.log(this.data._index)
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(_index + "")
    videoContextPrev.stop();

    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)
  },



  clickTab: function (e, pageNo) {
    console.log(e.target)
    var pageNo = 1
    var that = this;

    this.setData({
      id: e.currentTarget.dataset.id
    })

    api._get('/QianYi/selectAppVersion?device=3').then(res => {

      if (res.data[0].version == 2) {

        api._post('/QianYi_Shop/selectGoodsByCondition', {
          choseId: 1,
          type: 3,
          goodsName: '',
          page: '',
          beginPrice: '',
          endPrice: ''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,


          })
          console.log(res.data)

        }).catch(e => {
          console.log(e)

        })
      } else {
        api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice= &endPrice= ').then(res => {
          console.log(res)

          this.setData({
            page: pageNo, //当前的页号
            pages: res.data.pageSize,
            data2: res.data.shopGoods
          })

        }).catch(e => {
          console.log(e)
        })
      }



    }).catch(e => {
      console.log(e)
    })

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  clickTab1: function () {
    this.setData({
      price: true
    })
  },
  clickTab2: function () {
    this.setData({
      sousuo: true
    })
  },
  show: function (e, pageNo) {
    var pageNo = 1
    this.setData({
      price: false,
      mrc: e.currentTarget.dataset.in,
      id: e.currentTarget.dataset.id
    })

    api._get('/QianYi/selectAppVersion?device=3').then(res => {

      if (res.data[0].version == 2) {

        api._post('/QianYi_Shop/selectGoodsByCondition', {
          choseId: 1,
          type: 3,
          goodsName: '',
          page: '',
          beginPrice: '',
          endPrice: ''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,


          })
          console.log(res.data)

        }).catch(e => {
          console.log(e)

        })
      } else {

        api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice= &endPrice= ').then(res => {
          console.log(res)

          this.setData({
            page: pageNo, //当前的页号
            pages: res.data.pageSize,
            data2: res.data.shopGoods
          })

        }).catch(e => {
          console.log(e)
        })
      }



    }).catch(e => {
      console.log(e)
    })
   
  },
  di: function (e) {
    this.setData({
      di1: e.detail.value
    })
  },
  gao: function (e) {
    this.setData({
      gao1: e.detail.value
    })
  },
  sure: function (e) {
    console.log(this.data.gao1)
    var pageNo = 1
    this.setData({
      sousuo: false,
      id: e.currentTarget.dataset.id
    })


    api._get('/QianYi/selectAppVersion?device=3').then(res => {

      if (res.data[0].version == 2) {

        api._post('/QianYi_Shop/selectGoodsByCondition', {
          choseId: 1,
          type: 3,
          goodsName: '',
          page: '',
          beginPrice: '',
          endPrice: ''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,


          })
          console.log(res.data)

        }).catch(e => {
          console.log(e)

        })
      } else {

        api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice=' + this.data.di1 + '&endPrice=' + this.data.gao1).then(res => {
          console.log(res)

          this.setData({
            page: pageNo, //当前的页号
            pages: res.data.pageSize,
            data2: res.data.shopGoods
          })

        }).catch(e => {
          console.log(e)
        })
      }



    }).catch(e => {
      console.log(e)
    })


  
  },
  detail: function (e) {

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
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onfrash: function (pageNo) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi/selectAppVersion?device=3').then(res => {

      if (res.data[0].version == 2) {

        api._post('/QianYi_Shop/selectGoodsByCondition', {
          choseId: 1,
          type: 3,
          goodsName: '',
          page: '',
          beginPrice: '',
          endPrice: ''
        }).then(res => {

          that.setData({
            data2: res.data.shopGoods,


          })
          console.log(res.data)

        }).catch(e => {
          console.log(e)

        })
      } else {

        api._post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.data.id + '&beginPrice=' + this.data.di1 + '&endPrice=' + this.data.gao1).then(res => {
          console.log(res)

          this.setData({
            page: pageNo, //当前的页号
            pages: res.data.pageSize, //总页数
            data2: this.data.data2.concat(res.data.shopGoods)
          })

        }).catch(e => {
          console.log(e)
        })
      }



    }).catch(e => {
      console.log(e)
    })


  },
  onReachBottom: function () {
    this.onfrash(this.data.page + 1)

  },

})


// tab