// pages/camera/camera.js
let app = getApp();
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontImage:'',
    reverseImage: '',
    list:[],
    list1:[],
    btuBottom:"",
    idArray:[],
    phone:''
    
  },
  //获取input手机号
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    var that = this;
    var idArray = that.data.idArray
    that.setData({
      idArray:options
    })
    //console.log(that.data.idArray)
  //iphoneX识别
   let result = app.init();
  //  console.info(result)
    let isPhone = app.globalData.isIpx;
    if(isPhone){
      this.setData({
        btuBottom:"68rpx;"
      })
    }
  },
  goToLogs(){
    var that = this;
    var phone = that.data.phone;
    //console.log(phone)
    //console.log(that.data.idArray)
    var ids = JSON.stringify(that.data.idArray);
    //console.log(ids)
    var list = JSON.stringify(that.data.list);
    //console.log(list)
    var list1 = JSON.stringify(that.data.list1);
    //console.log(list1)
    request.request('POST', app.data.api_da + 'wx_papers/update_visitor_info?phoneNum=' + phone + '&ids=' + ids +'&list='+list+'&list1='+list1).then((sres) => {
      console.log(sres)
      if (sres.data.code == 0) {
        wx.navigateTo({
          url: '../logs/logs?ids=' + ids,
        })
      } else {
        wx.showToast({
          title: '信息有误！请确认',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch((fres) => { })   
  },
  goTomessage(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  btn_idCard() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera', 'album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.data.base_url + 'wx_upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = JSON.parse(res.data);
            //console.info(data.data.dizhi)
            that.setData({
              frontImage: app.data.base_url + "image/" + data.data.dizhi
            })
            // do something
            wx: wx.request({
              url: app.data.base_url + 'idcard',
              data: {
                imagePath: data.data.dizhi,
                type: 'front'
              },
              success: function (res) {
                //console.log(res)
                if (res.data.code == 500) {
                  wx.showToast({
                    title: '上传的图片不包含身份证',
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
                that.setData({
                  list: res.data.data
                })
              }
            })
          }
        })
      }
    })
  },
  btn_idCard2() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera', 'album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.data.base_url + 'wx_upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = JSON.parse(res.data);
           // console.info(data.data.dizhi)
            that.setData({
              reverseImage: app.data.base_url + "image/" + data.data.dizhi
            })
            // do something
            wx: wx.request({
              url: app.data.base_url + 'idcard',
              data: {
                imagePath: data.data.dizhi,
                type: 'back'
              },
              success: function (res) {
                //console.log(res)
                if (res.data.code== 500) {
                  wx.showToast({
                    title: '上传的图片不包含身份证',
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
                that.setData({
                  list1: res.data.data
                })
              }
            })
          }
        })
      }
    })
  },
resolveIdCard_front(){
  wx.request({
    url: app.data.base_url +"idcard",
    success: (response) => {
      // console.info(response)
    }
  });
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