var qiniuUploader = require('../../utils/qiniu.min.js');
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    one_1: 4,
    two_1: 1,
    one_2: 5,
    two_2: 0,
    one_3: 5,
    two_3: 0,
    images: [],
    pathsTmp: [],

    imgList: [],
    uploadToken: '',
    id1: '',
    good1: '',
    shuru1: "",
    ding1: '',
    current: 0,
    max: 140,

  },
  success: function() {
    wx.navigateTo({
      url: '/pages/success/success',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  in_xin: function(e) {
    var shangpin_in = e.currentTarget.dataset.in;
    var one_1;
    if (shangpin_in === 'use_sc1') {
      one_1 = Number(e.currentTarget.id);
    } else {
      one_1 = Number(e.currentTarget.id) + this.data.one_1;
    }
    this.setData({
      one_1: one_1,
      two_1: 5 - one_1,

    })
    console.log(one_1)
  },

  maijia_in: function(e) {
    var maijia_in = e.currentTarget.dataset.in;
    var one_2;
    if (maijia_in === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
    console.log(one_2)

  },

  wuliu_in: function(e) {
    var wuliu_in = e.currentTarget.dataset.in;
    var one_3;
    if (wuliu_in === 'use_sc3') {
      one_3 = Number(e.currentTarget.id);
    } else {
      one_3 = Number(e.currentTarget.id) + this.data.one_3;
    }
    this.setData({
      one_3: one_3,
      two_3: 5 - one_3
    })
    console.log(one_3)

  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        //文件重命名并拼接数组--目的是上传七牛
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var suiji = Math.floor(Math.random() * 100000)
          var year = new Date().getFullYear();
          var month = new Date().getMonth() + 1;
          var day = new Date().getDate();
          var path = year + '/' + month + '/' + day + '/' + suiji + '.jpg';
          that.data.pathsTmp = that.data.pathsTmp.concat(path)
        }
        //打印文件名称
        console.log(that.data.pathsTmp)
        that.setData({
          //将上传的图片拼接成数组--目的是批量上传至七牛
          images: that.data.images.concat(res.tempFilePaths)
        });
        //打印上传图片的数组
        console.log(that.data.images)
      }
    })
  },

  pictureUploadqiniuMethod: function(fileHead, imageArray) {
    var that = this;
    console.log(fileHead, imageArray)
    for (var i = 0; i < imageArray.length; i++) {
      var filePath = imageArray[i];
      qiniuUploader.upload(filePath, (res) => {
          //上传成功，上传成功一张图片，进入一次这个方法，也就是返回一次
          //七牛上传成功重新组成数组imgList
          console.log(res.key)
          that.setData({
            imgList: that.data.imgList.concat(res.key),
          });
          console.log("imgList：" + that.data.imgList)
          console.log("qn：" + that.data.imgList.length)
          console.log("qn：" + imageArray.length)
          //检测是否上传完毕（本地上传的图片长度===上传七牛成功的图片长度）
          if (imageArray.length === that.data.imgList.length) {
            //   // 第三步：上传服务器
            // that.uploadserver();
            console.log('七牛上传完毕')
          }
        },
        (error) => {
          //图片上传失败，可以在七牛的js里面自己加了一个err错误的返回值
          console.log('error: ' + error)
        }, {
          uploadURL: 'https://up-z2.qiniup.com', //华北
          domain: 'http://dev.static.qianyipan.com', //图片地址
          region: 'SCN',
          key: fileHead[i], //图片命名
          uptoken: that.data.uploadToken, //在onLoad中执行获取uploadToken
          // uptokenURL: 'UpTokenURL.com/uptoken', //获取upToken的url
        });
    }
  },

  uploadImgSubmit: function() {
    var that = this;
    if (that.data.images.length == 0) {
      wx.showToast({
        title: '请上传手机照片',
        // image: '../../image/error.png',
        duration: 1500
      })
    } else {
      //上传图片到七牛
      //将图片地址和图片命名传入
      var userId = wx.getStorageSync('user').loginId || 0

      that.pictureUploadqiniuMethod(that.data.pathsTmp, that.data.images)
      console.log('lll')
      var list = {
        goodsId: this.data.goods1[0].goodsId,
        commentsContents: this.data.shuru1,
        creatorId: userId,
        commodityScore: this.data.one_1,
        logisticsScore: this.data.one_2,
        serviceScore: this.data.one_3,
        additionalEvaluation: 0,
        commentsImagePath: that.data.pathsTmp.join(',')
      }
      wx.request({
        url: 'https://dev.app.qianyipan.com/QianYi_Shop/insertBatchShopComments?orderId=' + this.data.ding1 + '&type=1',

        method: "POST",
        data: [list],
        header: {
          'content-type': 'application/json',
          // 默认值
        },
        success: function(res) {
          console.log(res.data)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        wx.navigateTo({
          url: '/pages/success/success',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        }
      })

    }
  },


  delete: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    //图片命名数组
    var pathsTmp = that.data.pathsTmp;
    pathsTmp.splice(index, 1);
    that.setData({
      images: images,
      pathsTmp: pathsTmp
    });
    console.log(that.data.images)
    console.log(that.data.pathsTmp)
  },

  shuru: function(e) {
    this.setData({
      shuru1: e.detail.value
    })
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.max) {
      return;
    }

    this.setData({
      current: length
    });
  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var ding = options.ding
    this.setData({
      id1: id,
      ding1: ding
    })

    var that = this;
    api._post('/QianYi_Shop/selectOrderInfo?id=' + this.data.ding1).then(res => {
      console.log(res)
      that.setData({


        goods1: res.data.orderGoodsList


      })


    }).catch(e => {
      console.log(e)
    })
    api._get('/QianYi/getIconToken').then(res => {
      console.log(res)
      that.setData({


        uploadToken: res.data.token


      })


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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})