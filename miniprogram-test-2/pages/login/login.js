const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pads: ''
  },
  login: function() {
    wx.navigateTo({
      url: '/pages/loginway/loginway',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  login1: function() {
    wx.navigateTo({
      url: '/pages/login1/login1',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  userphone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  password: function(e) {
    this.setData({
      pads: e.detail.value
    })
  },
  submit(e) {
    var that = this;
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var info = e.detail.value;
    var tel = info.tel;
    var pad = info.pad;
    console.log(info)

    if (!myreg.test(tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    } else {

      api._post('/QianYi/login?loginPhone=' + tel + '&loginPwd=' + pad).then(res => {
        console.log(res)
        if (res.isSuc == true) {
          wx.setStorageSync("user", res.data.userInfo);



          wx.navigateBack({
            delta: 2,
          })

        } else {
          if (res.code == 800) {
            wx.showToast({
              title: '账号已冻结',
              icon:'none'
            })
          } else {
            console.log('111')
            wx.showToast({
              title: '请检查密码',
              icon: 'none'

            })
          }

        }

      }).catch(e => {
        console.log(e)
      })

    }



  },
  onLoad: function(options) {

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