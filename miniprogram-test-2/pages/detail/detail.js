const api = require('../../utils/api.js')
var WxParse = require('../../wxParse/wxParse.js');

var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    id1: '',
    dsc:'',
    src:'',
    jing:'',
    wei:'',
    show2:false,
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    currentClickKey: '',
    pr1:'',
    date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
   
    show:true,
    tictor:'',
    cli:true,
    maxMonth: 7, //最多渲染月数
    dateList: [],
    systemInfo: {},
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
    checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
    markcheckInDate: false, //标记开始时间是否已经选择
    markcheckOutDate: false,
    etcPrice:"" ,
    mon:'',
    day1:'', 
    tictor1:'',
    sFtv: [
      {
        month: 1,
        day: 1,
        name: "元旦"
      },
      {
        month: 2,
        day: 14,
        name: "情人节"
      },
      {
        month: 3,
        day: 8,
        name: "妇女节"
      },
      {
        month: 3,
        day: 12,
        name: "植树节"
      },
   
      {
        month: 4,
        day: 1,
        name: "愚人节"
      },
      {
        month: 5,
        day: 1,
        name: "劳动节"
      },
      {
        month: 5,
        day: 4,
        name: "青年节"
      },
      {
        month: 5,
        day: 12,
        name: "护士节"
      },
      {
        month: 6,
        day: 1,
        name: "儿童节"
      },
      {
        month: 7,
        day: 1,
        name: "建党节"
      },
      {
        month: 8,
        day: 1,
        name: "建军节"
      },
      {
        month: 9,
        day: 10,
        name: "教师节"
      },
    
      {
        month: 10,
        day: 1,
        name: "国庆节"
      },
      {
        month: 10,
        day: 6,
        name: "老人节"
      },
    
      {
        month: 12,
        day: 24,
        name: "平安夜"
      },
      {
        month: 12,
        day: 25,
        name: "圣诞节"
      }
    ]
     
  },
  more:function(){
    this.setData({
      show:!this.data.show
    })
  },
  yuding:function(e){
    var that=this
    that.setData({
      show2:true,
      index: e.currentTarget.dataset.index
    })
   that.setData({
     tictor:that.data.scenic[e.currentTarget.dataset.index].ticketPrice
   })


    api._post('/QianYi/selectScenicPriceofcalender?ticketNumId=' + this.data.scenic[this.data.index].id + '&beginTime=' + this.data.begin + '&endTime=' + this.data.end).then(res => {
      var that = this
      if(res.isSuc==true){
  
        console.log(res.data.scenicPriceofcalenderList)
        var list1 = []
        for (let i = 0; i < res.data.scenicPriceofcalenderList.length; i++) {
          list1.push(res.data.scenicPriceofcalenderList[i].beginTime)
        }

        console.log(list1)


        that.setData({
          list1: list1,
          list: res.data.scenicPriceofcalenderList,
          Time: res.data.scenicPriceofcalenderList[0].beginTime,
          etcPrice: res.data.scenicPriceofcalenderList[0].activePrice
        })
      }else{
        that.setData({
          list1: [],
        })
      }
   
     
      
    

    }).catch(e => {
      console.log(e)
    })
  },
  close2: function () {
    this.setData({
      show2: false
    })
  },
map:function(){
wx.navigateTo({
  url: '/pages/map/map?jing='+this.data.jing+'&wei='+this.data.wei,
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
  add: function () {
    console.log(this.data.pr1)
    if(this.data.tictor1){
      wx.navigateTo({
        url: '/pages/tictorPrice/tictorPrice?id=' + this.data.scenic[this.data.index].id + '&name=' + this.data.scenic[this.data.index].ticketName + '&price=' + this.data.tictor1 + '&time=' + this.data.date +"&sceId="+this.data.sceId,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
     
    }else{
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    // 页面初始化 options为页面跳转所带来的参数
    this.createDateListData();
    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数

    var checkInDate = options.checkInDate ? options.checkInDate : Moment(new Date()).format('YYYY-MM-DD');
    var checkOutDate = options.checkOutDate ? options.checkOutDate : Moment(new Date()).add(1, 'day').format('YYYY-MM-DD');
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ systemInfo: res, checkInDate: checkInDate, checkOutDate: checkOutDate });
      }
    })


    var id = options.id
    this.setData({
      id1: id
    })
    console.log(id)
    var userId = wx.getStorageSync('user').loginId || 0

    api._post('/QianYi/selectScenic?id='+this.data.id1+'&userId='+userId).then(res => {
      var that=this
      console.log(res)
      // console.log(res.data.scenicTicketNums[that.data.index].ticketPrice)
      that.setData({
        jin: res.data,
        tictor: res.data.ticketPrice,
        jing: res.data.locationCode.split(',')[0],
        wei: res.data.locationCode.split(',')[1],
        leng: res.data.pictureUrl.split(','),
        dsc: res.data.playStrategy,
        src: res.data.ticketInformation,
        scenic: res.data.scenicTicketNums,
        sceId:res.data.id
      })
      var article = that.data.dsc; //article是取到的数据
      var article1 = that.data.src
      console.log(this.data.jing)


      WxParse.wxParse('article', 'html', article, that, 5);
      WxParse.wxParse('article1', 'html', article1, that, 5);

    }).catch(e => {
      console.log(e)
    })


   

  },
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    console.log(e.target)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  selectDataMarkLine: function () {
    let dateList = this.data.dateList;
    let {
      checkInDate,
      checkOutDate
    } = wx.getStorageSync("ROOM_SOURCE_DATE");
    let curreInid = checkInDate.substr(0, 4) + "-" + (checkInDate.substr(5, 2) < 10 ? checkInDate.substr(6, 1) : checkInDate.substr(5, 2)); //选择入住的id
    let curreOutid = checkOutDate.substr(0, 4) + "-" + (checkOutDate.substr(5, 2) < 10 ? checkOutDate.substr(6, 1) : checkOutDate.substr(5, 2)); //选择离店的id
    let dayIn = checkInDate.substr(8, 2) >= 10 ? checkInDate.substr(8, 2) : checkInDate.substr(9, 1); //选择入住的天id
    let dayOut = checkOutDate.substr(8, 2) >= 10 ? checkOutDate.substr(8, 2) : checkOutDate.substr(9, 1); //选择离店的天id
    let monthIn = checkInDate.substr(5, 2) >= 10 ? checkInDate.substr(5, 2) : checkInDate.substr(6, 1); //选择入店的月id
    let monthOut = checkOutDate.substr(5, 2) >= 10 ? checkOutDate.substr(5, 2) : checkOutDate.substr(6, 1); //选择离店的月id
    if (curreInid == curreOutid) { //入住与离店是当月的情况
      for (let i = 0; i < dateList.length; i++) {
        if (dateList[i].id == curreInid) {
          let days = dateList[i].days;
        
        }
      }
    } else { //跨月
      for (let j = 0; j < dateList.length; j++) {
        if (dateList[j].month == monthIn) { //入住的开始月份
          let days = dateList[j].days;
          for (let k = 0; k < days.length; k++) {
            if (days[k].day >= dayIn) {
              days[k].class = days[k].class + ' bgitem';
            }
            if (days[k].day == dayIn) {
              days[k].class = days[k].class + ' active';
              days[k].inday = true;
            }
          }
        } else { //入住跨月月份
          if (dateList[j].month < monthOut && dateList[j].month > monthIn) { //离店中间的月份
            let days = dateList[j].days;
            for (let k = 0; k < days.length; k++) {
              days[k].class = days[k].class + ' bgitem';
            }
          } else if (dateList[j].month == monthOut) { //离店最后的月份
            let days = dateList[j].days;
            for (let k = 0; k < days.length; k++) {
              if (days[k].day <= dayOut) {
                days[k].class = days[k].class + ' bgitem';
              }
              if (days[k].day == dayOut) {
                days[k].class = days[k].class + ' active';
                days[k].outday = true;
              }
            }
          }
        }
      }
    }
    this.setData({
      dateList: dateList
    })
  },

  createDateListData: function () {
    var that=this
    var dateList = [];
    var now = new Date();
    /*
      设置日期为 年-月-01,否则可能会出现跨月的问题
      比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
        原因是由于2月份没有31号，顺推下去变成了了03-03
    */
    now = new Date(now.getFullYear(), now.getMonth(), 1);
    for (var i = 0; i < this.data.maxMonth; i++) {
      var momentDate = Moment(now).add(this.data.maxMonth - (this.data.maxMonth - i), 'month').date;
      var year = momentDate.getFullYear();
      var month = momentDate.getMonth() + 1;

      var days = [];
      var totalDay = this.getTotalDayByMonth(year, month);
      var week = this.getWeek(year, month, 1);
      //-week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，
      //则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
      for (var j = -week + 1; j <= totalDay; j++) {
        var tempWeek = -1;
        if (j > 0)
          tempWeek = this.getWeek(year, month, j);
        var clazz = '';
        if (tempWeek == 0 || tempWeek == 6)
          clazz = 'week'
        if (j < DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
          //当天之前的日期不可用
          clazz = 'unavailable ' + clazz;
        else
          clazz = '' + clazz
        days.push({
          day: j,
          class: clazz
        })
      }
      var dateItem = {
        id: year + '-' + month,
        year: year,
        month: month,
        days: days
      }

      dateList.push(dateItem);
    }
    var sFtv = this.data.sFtv;
    for (let i = 0; i < dateList.length; i++) { //加入公历节日
      for (let k = 0; k < sFtv.length; k++) {
        if (dateList[i].month == sFtv[k].month) {
          let days = dateList[i].days;
          for (let j = 0; j < days.length; j++) {
            if (days[j].day == sFtv[k].day) {
              days[j].daytext = sFtv[k].name
            }
          }
        }
      }
    }
    this.setData({
      dateList: dateList,
      begin: dateList[0].id + '-1',
      end: dateList[dateList.length - 1].id + '-1'
    });
    DATE_LIST = dateList;

  },

  /*
   * 获取月的总天数
   */
  getTotalDayByMonth: function (year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
  },
  /*
   * 获取月的第一天是星期几
   */
  getWeek: function (year, month, day) {
    var d = new Date(year, month - 1, day);
    return d.getDay();
  },
  /**
   * 点击日期事件
   */
  onPressDate: function (e) {
    var that=this
    var {
      year,
      month,
      day
    } = e.currentTarget.dataset;
    //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
    if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0) return;

    var tempMonth = month;
    var tempDay = day;

    if (month < 10) tempMonth = '0' + month
    if (day < 10) tempDay = '0' + day

    var date = year + '-' + tempMonth + '-' + tempDay;
    console.log(tempMonth)
    //如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
  
    this.setData({
      mon: e.currentTarget.dataset.month,
      day1: e.currentTarget.dataset.day,
      date: e.currentTarget.dataset.year + "-" + e.currentTarget.dataset.month + "-" + e.currentTarget.dataset.day
   
    })

 
 

    var item=this.data.list1.indexOf(e.currentTarget.dataset.year + "-" + tempMonth + "-" + tempDay.trim())
    if (item!==-1){
            that.setData({
              tictor1: this.data.list[item].activePrice

      })
    } else {
       that.setData({
         tictor1:that.data.tictor

       })
      console.log("12")

     }


    this.renderPressStyle(year, month, day);
  },
  renderPressStyle: function (year, month, day) {
    this.createDateListData(); //重新点击时数据初始化
    var dateList = this.data.dateList;
    //渲染点击样式
    for (var i = 0; i < dateList.length; i++) {
      var dateItem = dateList[i];
      var id = dateItem.id;
      if (id === year + '-' + month) {
        var days = dateItem.days;
        for (var j = 0; j < days.length; j++) {
          var tempDay = days[j].day;
          if (tempDay == day) {
            days[j].class = days[j].class + ' active';
            days[j].inday = true;
            break;
          }
        }
        break;
      }
    }
    this.setData({
      dateList: dateList
    });

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
    this.selectDataMarkLine()
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