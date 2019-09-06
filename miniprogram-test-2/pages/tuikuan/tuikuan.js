const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: '',
    show: false,
    show1: false,
    zhi:'',
    images: [],
    pathsTmp: [],

    imgList: [],
    uploadToken: '',
    goods1:'',
    img1:'',
    price1:'',
    yun1:'',
    status1:'',
    gui1:'',
    shuru1:'',
    shuru4:'',
    id2:'',
    zhi2:''

  },
  yuanyin: function() {
    this.setData({
      show: true
    })
  },
  close: function() {
    this.setData({
      show: false
    })
  },
  close1: function () {
    this.setData({
      show1: false
    })
  },
  btn1:function(e){
  console.log(e)
  this.setData({
    show: false,
    zhi: e.currentTarget.dataset.in,
    she: e.currentTarget.dataset.value1
  })
    console.log(this.data.zhi)

  },
  btn2: function (e) {
    console.log(e)
    this.setData({
      show: false,
      zhi: e.currentTarget.dataset.in,
      she: e.currentTarget.dataset.value1

   
    })
  },
load(){
this.setData({
  show1:true
})
},
  // 
  photo: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType:  ['camera'],
      success: function (res) {
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
          images: that.data.images.concat(res.tempFilePaths),
          show1: false
        });
        //打印上传图片的数组
        console.log(that.data.images)
      }
    })
  },


  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
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
          images: that.data.images.concat(res.tempFilePaths),
          show1:false
        });
        //打印上传图片的数组
        console.log(that.data.images)
      }
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

  uploadImgSubmit: function () {
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
      that.pictureUploadqiniuMethod(that.data.pathsTmp, that.data.images)
      console.log('lll')
      var list = {
        goodsId: this.data.goods1[0].goodsId,
        commentsContents: this.data.shuru1,
        creatorId: 84,
        commodityScore: this.data.one_1,
        logisticsScore: this.data.one_2,
        serviceScore: this.data.one_3,
        additionalEvaluation: 0,
        commentsImagePath: that.data.images.join(',')
      }
      wx.request({
        url: 'https://dev.app.qianyipan.com/QianYi_Shop/insertBatchShopComments?orderId=' + this.data.ding1 + '&type=1',

        method: "POST",
        data: [list],
        header: {
          'content-type': 'application/json',
          // 默认值
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack()
        }
      })

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
  shuru:function(e){
    this.setData({
      shuru1: e.detail.value
    })
    console.log(this.data.shuru1)
  },
  shuru3: function (e) {
    this.setData({
      shuru4: e.detail.value
    })
  },
  tijiao:function(){
    var that = this;
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/insertShopOrderRefund?orderId=' + this.data.id2 + '&refundToId='+userId+'&refundReson=' + this.data.zhi + '&userProofUrl=' + that.data.pathsTmp.join(',') + '&refundRemark=' + this.data.shuru4).then(res => {
      console.log(res)
      wx.showToast({
        title: '退款成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack()


    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var goods = options.goods

    var price = options.price
    var yun = options.yun
    var status = options.status

    var id1 = options.id1

    if (status==0){
      status= '待发货'
    } else if (status == -3){
      status = '用户拒收'
    } else if (status == -2) {
      status = '未付款'
    } else if (status == -1) {
      status = '用户取消'
    } else if (status == 1) {
      status = '配送中'
    } else if (status == 2) {
      status = '确认收货'
    }
    this.setData({
      id1: id,
      goods1: JSON.parse(goods),

      price1: price,
      yun1: yun,
      status1: status,

      id2:id1
    })
 
console.log(this.data.goods1)


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