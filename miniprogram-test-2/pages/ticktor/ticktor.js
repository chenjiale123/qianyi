// pages/ticktor/ticktor.js
const api = require('../../utils/api.js')
var that
var list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    img: '',
    jindian: '',
    array: ['南昌','九江','上饶','抚州','宜春','吉安','赣州','景德镇','萍乡','新余','鹰潭'],
    index:0,
      index1:0,
      find:true,
  
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
  change:function(){
    var that=this
     that.setData({
       page:that.data.page+1
     })
    api._post('/QianYi/forYourChoice?city=' + that.data.array[that.data.index1] + '&page='+that.data.page+'&startLonLat=' + that.data.longitude + ',' + that.data.latitude).then(res => {
      console.log(res)
      that.setData({
        jindian: res.data.scenicList,
        // img: res.data.scenicList.pictureUrl.split(',')[0]
      })
     
    }).catch(e => {
      console.log(e)
    })




  },
  top: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  cleck:function(e){
   this.setData({
     find:false
   })
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectHomeSearchBykeyword?keyword=' + e.currentTarget.dataset.in + '&type=2&page=1&userId=' + userId + '&longitude=' + this.data.longitude + '&latitude=' + this.data.latitude).then(res => {
      console.log(res)
   

      this.setData({
        goodsList1: res.data.scenicList,
        // img: res.data.scenicList.pictureUrl.split(',')[0]
      })
     
    }).catch(e => {
      console.log(e)
    })
  },
  ms:function(){
 wx.navigateTo({
   url: '/pages/listJD/listJD?id=3&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
   success: function(res) {},
   fail: function(res) {},
   complete: function(res) {},
 })
  },
  zr: function () {
    wx.navigateTo({
      url: '/pages/listJD/listJD?id=1&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  wq: function () {
    wx.navigateTo({
      url: '/pages/listJD/listJD?id=2&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  qz: function () {
    wx.navigateTo({
      url: '/pages/listJD/listJD?id=6&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  wh: function () {
    wx.navigateTo({
      url: '/pages/listJD/listJD?id=7&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tj: function () {
    wx.navigateTo({
      url: '/pages/listJD/listJD?id=8&city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  price: function() {
    wx.navigateTo({
      url: '/pages/tictorPrice/tictorPrice',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  detail: function(e) {
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
      wx.navigateTo({
        url: '/pages/loginway/loginway',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    }
  },
  sousuo1: function(e) {
    wx.navigateTo({
      url: '/pages/sousuo1/sousuo1?jing=' + this.data.longitude + '&wei=' + this.data.latitude,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changeCountry: function(e) {
    this.setData({
      index1: e.detail.value,
      find:true
    })
    console.log(e, this.data.index1)

    api._post('/QianYi/forYourChoice?city=' + this.data.array[this.data.index1] + '&page=1&startLonLat=' + this.data.longitude + ',' + this.data.latitude).then(res => {
      console.log(this.data.index1)
 
      if(res.isSuc==true){
        var shit = []
        this.setData({
          jindian: res.data.scenicList,
          // img: res.data.scenicList.pictureUrl.split(',')[0]
        })
        for (let key in this.data.jindian) {
          this.setData({
            img: this.data.jindian[key]["pictureUrl"].split(',')[0]


          })
          shit.push(this.data.img)

        }
        console.log(shit)
        this.setData({
          shit: shit
        })
      }else{
        this.setData({
          jindian: null,
        })
      }
   
    }).catch(e => {
      console.log(e)
    })

  },




  onLoad: function(options) {
    // wx.hideTabBar({
 
    // })
    var that = this
    that.setData({
      api: api.url
    })

    api._post('/QianYi_Shop/selectShufflingFigure',{
      page:1,
      pageSize:2,
      type:2

    }).then(res => {

      that.setData({
        data1: res.data.pictureList
      })
      console.log(res.data)

    }).catch(e => {
      console.log(e)
    })
    api._get('/QianYi/selectHotLabels?page=1').then(res => {

      that.setData({
        list: res.data.scenicList
      })
      console.log(res.data)

    }).catch(e => {
      console.log(e)
    })

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        // wx.showModal({
        //   title: '当前位置',
        //   content: '经度' + res.latitude + '纬度' + res.longitude,
        // })
        console.log(res.longitude)
        api._post('/QianYi/forYourChoice?city=南昌&page=1&startLonLat=' + res.longitude + ',' + res.latitude).then(res => {
          console.log(res)
          var shit = []
          this.setData({
            jindian: res.data.scenicList,
            // img: res.data.scenicList.pictureUrl.split(',')[0]
          })
          for (let key in this.data.jindian) {
            this.setData({
              img: this.data.jindian[key]["pictureUrl"].split(',')[0]


            })
            shit.push(this.data.img)

          }
          console.log(shit)
          this.setData({
            shit: shit
          })

        }).catch(e => {
          console.log(e)
        })
      }

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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})