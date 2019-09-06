var amapFile = require('../../utils/amap-wx.js')
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '9e2944bddd32448b3c71a369c7af463e' });
    myAmapFun.getPoiAround({
      iconPathSelected: '../../image/dwbiao@2x.png', //如：..­/..­/img/marker_checked.png
      iconPath: '../../image/dwbiao@2x.png', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        var latitude=options.wei
        var longitude=options.jing
        console.log(latitude, longitude)
        that.setData({
          latitude: latitude
        });
        that.setData({
          longitude: longitude
        });
       
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../image/dwbiao@2x.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../image/dwbiao@2x.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})