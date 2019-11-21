// pages/addressAdd/addressAdd.js
const api = require('../../utils/api.js')
var tcity = require("../../utils/citys.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  people1:'',
  phone1:'',
  ad1:"",
  detail1:'',
  qian1:'',
  kai1:false,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    condition1: false,

    city:'',
    county:'',
    index1:'',
    bq:'',
    index2:'',
    bqId: ''

  },
  people:function(e){
 this.setData({
   people1:e.detail.value
 })
  },
  phone: function (e) {
    this.setData({
      phone1: e.detail.value
    })
  },
radio:function(e){
  console.log(e.currentTarget.dataset.id)
  this.setData({
    index2: e.currentTarget.dataset.id
  })
  console.log(this.data.index2)
},
  radioChange(e) {
    console.log(e.currentTarget.dataset.id)
    console.log(e.detail.value)
    var that = this
     
    that.setData({
    //   list1: that.data.list[e.detail.value],
      index1: e.detail.value
    })
  },
srue:function(){
  this.setData({
    condition1:false,
    bq:this.data.index1,
    bqId:this.data.index2
  })
  console.log(this.data.bqId)
},
quxiao:function(){
  this.setData({
    condition1: false

  })
},
  detail: function (e) {
    this.setData({
      detail1: e.detail.value
    })
  },
  qian: function (e) {
    this.setData({
      qian1: e.detail.value
    })
  },
  kai:function(e){
    this.setData({
      kai1:e.detail.value
    })
  },

  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  open1: function () {
    this.setData({
      condition1: !this.data.condition1
    })
  },
  save:function(){
    var that = this
    if(this.data.kai1==false){
      this.data.kai1=0
    }else{
      this.data.kai1 = 1
    }
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('/QianYi_Shop/addShopAddress?userId='+userId+'&consigneeName=' + this.data.people1 + '&consigneePhone=' + this.data.phone1 + '&areaIdPath=' + this.data.province+','+ this.data.city+','+ this.data.county + '&address=' + this.data.detail1 + '&isDefault=' + this.data.kai1 + '&effectiveState=1&type='+this.data.bqId).then(res => {
      console.log(res)

 
    wx.showToast({
      title: res.msg,
      icon:'none'
    })

    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

    console.log("onLoad");
    var that = this
    that.setData({
      api: api.url
    })

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');



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