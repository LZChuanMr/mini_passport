const app = getApp()
const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{
      name: '最新订单',
      index: 0
    }, {
      name: '证照不全',
      index: 1
    }, {
      name: '没有证照',
      index: 2
    }],
    team: [], //信息
    showModalStatus: false,
    valueSer:'',
    num :3

  },
  /* 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceH: res.windowHeight
        })
      }
    })
    var mobile = 13426259755;
    var num = that.data.num
    //console.log(num)
    var valueSer = that.data.valueSer
    request.request('POST', app.data.api_da + 'wx_papers/get_order_by_mobile?num=' + num + '&mobile=' + mobile +'&likeParam='+valueSer).then((sres) => {
      var list = sres.data.data
      var status = that.data.status
      console.log(list)
      that.setData({
        team: list
      })
    }).catch((fres) => { }) 
    //this.onPullDownRefresh();
  },
  toCamera: function(e) {
    var idcardid = e.currentTarget.dataset.idcardid;
    var ordervisitorid = e.currentTarget.dataset.ordervisitorid;
    var passportid = e.currentTarget.dataset.passportid;
    request.request('POST', app.data.api_da + 'wx_papers/get_visitor_by_id?idcardid=' + idcardid + 'orderVisitorId=' + orderVisitorId).then((sres) => {
      console.log(sres)
      if (sres.data.code == 300) {
        wx.navigateTo({
          url: '../logs/logs?idcardid=' + idcardid + "&ordervisitorid=" + ordervisitorid + "&passportid=" + passportid,
        })
      } else {
        wx.navigateTo({
          url: '../camera/camera?idcardid=' + idcardid + "&ordervisitorid=" + ordervisitorid + "&passportid=" + passportid,
        })
      }
    }).catch((fres) => { }) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
    this.orderShow()
  },

  /**
   * 选项卡点击切换
   */
  tabSwitch: function(e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
    if (that.data.currtab == 1) {
      that.setData({
        num : 1
      })
      that.onLoad();
    } else if (that.data.currtab == 2) {
      that.setData({
        num : 0
      })
      that.onLoad();
    } else if (that.data.currtab == 0) {
      that.setData({
        num : 3
      })
      that.onLoad();
    }
  },
  tabChange: function(e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },

  orderShow: function() {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function() {
    this.setData({
      alreadyOrder: [{}],
    })
  },
  waitPayShow: function() {
    this.setData({
      waitPayOrder: [{}],
    })
  },
  lostShow: function() {
    this.setData({
      lostOrder: [{}],
    })
  },
  mohuSer:function(event){
  var that = this;
  var valueSer = that.data.valueSer
   that.setData({
     valueSer:event.detail.value
   })
  },
  gotoSer:function(){
    var that = this;
    that.onLoad();
  }
})