const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendCode: false,
    time: 60,
    phone: '',
    usercode: ''
  },
  userphone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  yanzhengma: function(e) {
    this.setData({
      usercode: e.detail.value
    })
  },
  sendCode: function(e) {
    var that = this
    var timer1 = setInterval(function() {
      if (that.data.time > 0) {

        var time = that.data.time - 1
        that.setData({
          code: true,
          time: time,
        })
      } else {
        that.setData({
          code: false,
          time: 60,
        })
        clearInterval(timer1);

      }
    }, 1000)


    api._post('/QianYi/getVerificationCode?phone=' + this.data.phone).then(res => {
      console.log(res)

    }).catch(e => {
      console.log(e)
    })


  },
  submit(e) {
    var that = this;
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var info = e.detail.value;
    var tel = info.tel;
    var code = info.code;
    console.log(info)

    if (!myreg.test(tel)) {
      wx.showToast({
        title: '请输入合法的手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (code.length != 4) {
      wx.showToast({
        title: '请输入四位数验证码',
        icon: 'none',
        duration: 2000
      })
    } else {
      api._post('/QianYi/checkSmsCode?phone=' + tel + '&smsCode=' + code).then(res => {
        console.log(res)
        if (res.isSuc == true) {
        api._post('/QianYi/validation?loginPhone=' + tel).then(res => {
          console.log(res)
          if (res.isSuc == true) {
            wx.setStorageSync("user", res.data.userInfo);

            wx.login({
              success: function (res) {
                if (res.code) {

                  console.log(res, info)

                   

                  wx.request({


                    url: api.baseUrl + '/QianYi/getWechatAppletOpenid',
                    data: {

                      jsCode: res.code

                    },
                    method: 'GET',
                    success: function (res) {


                      console.log("111")
                      console.log(res.data)
                      console.log(JSON.parse(res.data))
                      var res = JSON.parse(res.data)

                      that.setData({
                        openid: res.openid,
                        key1: res.session_key
                      })
                      wx.setStorageSync("openid", res.openid);

                      wx.request({
                        url: api.baseUrl + '/QianYi/appletLogin?loginType=weixinApplet&identifier=' + res.openid,

                        // 判断是否需要绑定手机号
                        success: function (res) {
                          console.log(res)


                          if (res.data.code == 700) {
                            that.setData({
                              show: true,

                            })
                          } else if (res.data.code == 800) {
                            wx.showToast({
                              title: '此账号被冻结',
                            })
                          } else {
                            wx.setStorageSync("user", res.data.data.userInfo);
                            wx.navigateBack({
                              delta: 1,
                            })
                          }

                        }
                      })
                    }
                  })





                } else {
                  console.log("授权失败");
                }
              },
            })

  
            wx.navigateBack({
              delta: 3,
            })

        



          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }

        }).catch(e => {
          console.log(e)
        })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }).catch(e => {
        console.log(e)
      })



    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
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