const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTeams: "",
    checked_all: true,     //全选
    newArr: [],            //复选框选中
    countMoney: 0  ,
    goodsList:"" ,
    carId:'',
    shopId:'' ,
    selected:true,
    jiage:true ,
    show:true,
    dl:true   ,
    array:[] ,
    she:false //结算价格
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
  zhuanhua:function(){
   this.setData({
     jiage:false,
     show:false
   })
  },
  zhuanhua1: function () {
    this.setData({
      jiage: true,
      show: true
    })
    this.getTotalPrice()
  },

  // 购物车+
  getPlus: function (e) {
    var that = this
    var cardTeams = that.data.cardTeams
    var index = e.currentTarget.dataset.index
  
  
    var cartNum = cardTeams[index].cartNum

    cartNum++

    cardTeams[index].cartNum = cartNum
    that.setData({
      cardTeams: cardTeams
    })
    that.getTotalPrice()
  },
  // 购物车-
  getMain: function (e) {
    var that = this
    var cardTeams = that.data.cardTeams
    var index = e.currentTarget.dataset.index
    // console.log(index)
    cardTeams[index].cartNum--
    if (cardTeams[index].cartNum <= 0) {
      cardTeams[index].cartNum = 1
      // that.delItem(e)
    }
    console.log(cardTeams[index].cartNum)
    that.setData({
      cardTeams: cardTeams
    })
    that.getTotalPrice()
  },
  // 单选
  goodsdagou: function (e) {
    // console.log(e)
    var that = this
    var num = that.data.num
    var cardTeams = that.data.cardTeams
    var index = e.currentTarget.dataset.checkid
    console.log(index)
    var arr = that.data.newArr
    var selected = cardTeams[index].selected
    // console.log(selected)
    cardTeams[index].selected = !selected
    var a = []
    if (!selected) {
      arr.push(index)

    } else {
      arr.pop()

    }
    console.log(cardTeams.length)
    console.log(arr.length)
    if (arr.length == cardTeams.length) {
      
      this.setData({
        checked_all: true
      })
      console.log(this.data.checked_all)
      
    } else {
      that.setData({
        checked_all: false
      })
    }
    that.setData({
      cardTeams: cardTeams,
      newArr: arr
    })

    var a = []

    for (var index in arr) {
      a.push(cardTeams[index].id)

    }
    console.log(a)
    that.setData({
      carId: a.join(',')
    })
console.log(this.data.carId)
    that.getTotalPrice()
  },
  // 全选
  checkedAll: function () {
    var that = this
    var checked_all = that.data.checked_all
    checked_all = !checked_all
    var cardTeams = that.data.cardTeams
    var arr = []
    console.log(checked_all)
    for (var i = 0; i < cardTeams.length; i++) {
      cardTeams[i].selected = checked_all
      console.log(checked_all)
      if (checked_all) {
        arr.push(i)
      } else {
        arr = []
      }
    }
    console.log(arr)
    that.setData({
      cardTeams: cardTeams,
      checked_all: checked_all,
      newArr: arr
    })
    var b = []

    for (var index in arr) {
      b.push(cardTeams[index].id)

    }
    console.log(b)
    that.setData({
      carId: b.join(',')
    })
    console.log(this.data.carId)


    that.getTotalPrice()
  },

  // 计算商品价格
  getTotalPrice() {
    var cardTeams = this.data.cardTeams
    var total = 0
    for (var i = 0; i < cardTeams.length; i++) {
      if (cardTeams[i].selected) {
        total += cardTeams[i].cartNum * cardTeams[i].shopGoodsSpecid.specPrice
      }
    }
    this.setData({
      cardTeams: cardTeams,
      countMoney: total.toFixed(2)
    })
  },
  // 删除
  delItem: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var cardTeams = that.data.cardTeams
    console.log(cardTeams)
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      cancelText: '否',
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {
    
          console.log(index)
          console.log(cardTeams)
        
          api._post('/QianYi_Shop/delGoodsCarts?ids=' + cardTeams[index].id).then(res => {
          cardTeams.splice(index, 1);
         
            that.setData({
              cardTeams: cardTeams
            });
            that.getTotalPrice()
          }).catch(e => {
            console.log(e)
            console.log(cardTeams[index].id)
          })

         
     
        }
      }
    })
  },
  dingdan1:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cardTeams = that.data.cardTeams
    api._get('/QianYi_Shop/delGoodsCarts?ids='+this.data.carId).then(res => {
      cardTeams.splice(index, 1);
      
      console.log(res)
      wx.switchTab({
        url: '../gouwu/gouwu',
      })
      this.onLoad()

    }).catch(e => {
      console.log(e)
    })
  },
  dingdan:function(){
    console.log(this.data.carId)
    if(this.data.carId!==""){
      wx.navigateTo({
        url: '/pages/dingdan1/dingdan1?shopCarId=' + this.data.carId + '&shopId=' + this.data.shopId,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      console.log(this.data.carId)
    }

  },
  onLoad: function () {

    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 0

    if (userId == 0) {
    this.setData({
      dl:true
    })
    } else {
      this.setData({
        dl: false
      })

    api._get('/QianYi_Shop/selectCartsByUid?userId='+userId+'&page=1').then(res => {
      console.log(res)

  if( res.isSuc==true){
    that.setData({
      she: res.isSuc,
      cardTeams: res.data.cartsList,
      shopId: res.data.cartsList[0].shopGoodsWithBLOBs.storeId,
      checked_all:false
    })
  }else{
    that.setData({
      she:res.isSuc,
      // cardTeams: res.data.cartsList,
    })
  }
    

    }).catch(e => {
      console.log(e)
    })
    api._get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {

      that.setData({
        goodsList: res.data.goodsList
      })
      console.log(res)

    }).catch(e => {
      console.log(e)
    })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
this.onLoad()

    var that = this

   
    var cardTeams = that.data.cardTeams
    var arr = that.data.newArr
    for (var i = 0; i < cardTeams.length; i++) {
      if (that.data.checked_all) {
        cardTeams[i].selected = true
        arr.push(i)
      } else {
        cardTeams[i].selected = false
        arr = []
      }
    }
    that.setData({
      cardTeams: [],
      newArr: []
    })
    console.log(that.data.cardTeams)
    console.log(that.data.newArr)
    console.log(that.data.checked_all)
    that.getTotalPrice()     //合计
  },
  //滑动删除
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.cardTeams.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cardTeams: this.data.cardTeams
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });

    that.data.cardTeams.forEach(function (v, i) {
      v.isTouchMove = false

      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }

    })
    //更新数据
    // console.log(that.data.cardTeams)
    that.setData({
      cardTeams: that.data.cardTeams
    })

  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  drawEnd: function () {

  },

})
