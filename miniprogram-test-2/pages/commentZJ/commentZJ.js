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
    img1: [],
    com: []
    

  },
  success: function () {
    wx.navigateTo({
      url: '/pages/success/success',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },




  pictureUploadqiniuMethod: function (fileHead, imageArray) {
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

  delete: function (e) {
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


  bindKeyInput: function (event) {
    var that = this;
    var value = event.detail.value
    var id = event.currentTarget.dataset.id
    var updateData = {
      inputValue: value
    };
    this.data.com[id].commentsContents = value;
    updateData['tips[' + id + '].value'] = value;
    console.log(updateData.inputValue)
    this.setData({
      txt: updateData.inputValue
    })

  },
  handleChange: function (e) {
    console.log(e.detail.value)
    var id = e.currentTarget.dataset.id
    this.data.com[id].commodityScore = e.detail.value;

    this.setData({
      star: e.detail.value


    })

  },
  handleChange1: function (e) {
    console.log(e.detail.value)
    var id = e.currentTarget.dataset.id
    this.data.com[id].logisticsScore = e.detail.value;

    this.setData({
      star: e.detail.value


    })

  },
  handleChange2: function (e) {
    console.log(e.detail.value)
    var id = e.currentTarget.dataset.id
    this.data.com[id].serviceScore = e.detail.value;

    this.setData({
      star: e.detail.value


    })

  },
  chooseImage(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(e.detail.name)
    this.data.com[id].commentsImagePath = e.detail.name.join(',');

    this.setData({
      img: e.detail.name,
      img1: e.detail.img1
    })
    console.log(this.data.img1)

    that.pictureUploadqiniuMethod(e.detail.name, that.data.img1)




  },




  submit: function () {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0



    wx.request({
      url: 'https://dev.app.qianyipan.com/QianYi_Shop/insertBatchShopComments?orderId=' + this.data.ding1 + '&type=2',


      method: "POST",
      data: that.data.com,
      header: {
        'content-type': 'application/json',
        // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.isSuc==true){
        
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          console.log('55555')
          wx.navigateTo({
            url: '/pages/success/success?id=' + that.data.goods1[0].goodsId,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
     
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url
    })
    var id = options.id
    var ding = options.ding
    this.setData({
      id1: id,
      ding1: ding
    })
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/selectShopCommentId?userId=' + userId + '&orderId=' + this.data.ding1).then(res => {
      console.log(res)
      that.setData({


        shopCommentsId: res.data.shopCommentsId


      })
      console.log(this.data.shopCommentsId)

    }).catch(e => {
      console.log(e)
    })


    var that = this;
    api._post('/QianYi_Shop/selectOrderInfo?id=' + this.data.ding1).then(res => {
      console.log(res)
      that.setData({


        goods1: res.data.orderGoodsList


      })
      for (var i = 0; i < that.data.goods1.length; i++) {
        var temp = {
          commentsContents: '',
     
          commentsImagePath: '',
          goodsId: this.data.goods1[i].goodsId,
          creatorId: userId,
          additionalEvaluation: 1,
      
          parentId: this.data.shopCommentsId[i],

        };
        that.data.com.push(temp);
        console.log(that.data.com)
      }

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})