const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
add1:'',
new1:'',
good1:'',
middle1:'',
laji1:'',
zhuijia1:'',
tu1:'',
type:'',
Id:'',
// she:false
  },
  onfrash: function (pageNo) {

    var that = this
   
    var userId = wx.getStorageSync('user').loginId || 0
    api._post('/QianYi_Shop/selectShopComments?page='+pageNo+'&goodsId=' + that.data.Id + '&sortType=0' ).then(res => {
      console.log(res)

      this.setData({
        page: pageNo, //当前的页号
        pages: res.data.pageSize, //总页数
        comment1: this.data.comment1.concat(res.data.commentslist)
      })

    }).catch(e => {
      console.log(e)
    })
  },
all:function(e){
  var pageNo = 1
  var that=this
console.log(e.currentTarget.dataset.id)
this.setData({
  all1: e.currentTarget.dataset.id
})
  api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.all1).then(res => {
    console.log(res)
    if(res.isSuc==true){
      that.setData({

        she: res.isSuc,
        comment1: res.data.commentslist


      })
      console.log(this.data.she)
    }else{
      that.setData({

        she: res.isSuc


      })
    }
  


  }).catch(e => {
    console.log(e)
  })
},
  new1: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      new1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.new1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  laji: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      laji1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.laji1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  good: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      good1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.good1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  middle: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      middle1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.middle1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  tu: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      tu1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.tu1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  zhuijia: function (e) {
    var pageNo = 1
    var that = this

    console.log(e.currentTarget.dataset.id)
    this.setData({
      zhuijia1: e.currentTarget.dataset.id
    })
    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=' + this.data.zhuijia1).then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


      })


    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pageNo = 1
    var id=options.id
    this.setData({
      Id:id
    })
    console.log(id)
    var that = this

    api._get('/QianYi_Shop/selectShopComments?page=' + pageNo +'&goodsId=' + that.data.Id + '&sortType=0').then(res => {
      console.log(res)
      that.setData({

        leng: res.data.commentslist.length,
        comment1: res.data.commentslist


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
    this.onfrash(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})