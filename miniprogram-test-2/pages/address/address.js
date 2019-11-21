const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    list1:'',
    consigneeName:'',
    consigneePhone:"",
    areaIdPath:"",
    address:'',
    index1:'',
    show:false,
    status:false
  },
add:function(){
wx.navigateTo({
  url: '/pages/addressAdd/addressAdd',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
  edit: function (e) {
    var that = this
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
  radio:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      index1: e.currentTarget.dataset.id
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    var that=this

    that.setData({
      list1: that.data.list[e.detail.value]
   
    })
  },
  sure:function(e){
     
  console.log(this.data.index1)
  console.log(this.data.list1)
    wx.setStorageSync('list', this.data.list1);
    // wx.navigateBack();
  

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
    api._get('/QianYi_Shop/selectAddressByUserId?page=1&userId='+userId).then(res => {
      if (res.isSuc==false){
        that.setData({
          // list: res.data.shopAddressList,
          status: res.isSuc
        })
      console.log(this.data.status)

      }else{
        that.setData({
          list: res.data.shopAddressList,
          status: res.isSuc
        })
      }
     
  
    }).catch(e => {
      
      console.log(e)
    })
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    console.log(prevpage.route)
    if (prevpage.route=='pages/mine/mine'){
      this.setData({
        show:true
      })
    }else{
      this.setData({
        show: false
      })
    }


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
this.onLoad()
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