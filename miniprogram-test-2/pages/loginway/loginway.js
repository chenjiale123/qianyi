const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    openid:''
  },

  login1: function() {
    wx.navigateTo({
      url: '/pages/login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindGetUserInfo(res) {
    var that = this
    let info = res;
    console.log(JSON.parse(res.detail.rawData));
    this.setData({
      name: JSON.parse(res.detail.rawData).nickName,
      touxiang: JSON.parse(res.detail.rawData).avatarUrl
    })
    if (info.detail.userInfo) {
  
      console.log("点击了同意授权");
      // console.log(res.detail.encryptedData)
      wx.login({
        success: function(res) {
          if (res.code) {
    
            console.log(res, info)
      
        
             
            wx.request({

              //获取openid接口  
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: 'wx99ea433caea5a1c7',
                secret: '71376261788531283f32ec11e2368f1e',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              method: 'GET',
              success: function(res) {

           
                console.log("111") 
                console.log(res)
                that.setData({
                      openid: res.data.openid,
                  key1: res.data.session_key
                })
                wx.setStorageSync("openid", res.data.openid);

                wx.request({
                  url: 'https://dev.app.qianyipan.com/QianYi/appletLogin?loginType=weixinApplet&identifier=' + res.data.openid,

                  // 判断是否需要绑定手机号
                  success: function (res) {
                    console.log(res)


                    if (res.data.code == 700) {
                      that.setData({
                        show: true,

                      })
                    } else if (res.data.code == 800){
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

    } else {
      console.log("点击了拒绝授权");
    }
  },
  jujue:function(){
    wx.request({
      url: api.baseUrl+'/QianYi/appletLogin',
      method: 'POST',
      data:{
        nickName: this.data.name,
        infoIcon: this.data.touxiang,
        loginType: weixinApplet,
        identifier: this.data.openid
      },
      success: function (res) {
        console.log(res)
        wx.setStorageSync("user", res.data.data.userInfo);
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  getPhoneNumber: function(res) {
    var that = this


    that.setData({
      show: false
    })
    console.log(res)

    wx.request({
      url: api.baseUrl +'/QianYi/appletLogin',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },

      data:{
        encrypted: res.detail.encryptedData,
        sessionKey: this.data.key1,
        iv: res.detail.iv,
        nickName: this.data.name,
        infoIcon: this.data.touxiang,
        loginType: 'weixinApplet',
        identifier: this.data.openid
      },
      success: function(res) {
        console.log(res)
        wx.setStorageSync("user", res.data.data.userInfo);
        wx.navigateBack({
          delta: 1,
        })
      }
    })




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