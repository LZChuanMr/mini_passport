//logs.js
var request = require('../../utils/request.js')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontImage: '',
    list2:[],
    btuBottom: "",
    idArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var idArray = that.data.idArray
    that.setData({
      idArray: options
    })
    let result = app.init();
    //console.info(result)

    let isPhone = app.globalData.isIpx;
    if (isPhone) {
      this.setData({
        btuBottom: "68rpx;"
      })
    }
  },
  goToMessage(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  goToSaveMessage() {
    var that = this;
    var ids = JSON.stringify(that.data.idArray);
    console.log(ids)
    var list2= JSON.stringify(that.data.list2);
    console.log(list2)
    request.request('POST', app.data.api_da + 'wx_papers/update_visitor_info?phoneNum='+phone+'&ids='+ids+'&list2'+list2).then((sres) => {
      console.log(sres)
      if (sres.data.code == 0) {
        wx.navigateTo({
          url: '../message/message',
        })
      } 
    }).catch((fres) => { })   
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
        wx.showToast({
            title: '加载中！请稍后',
            icon: 'none',
            duration: 8000
        })
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
              url: app.data.base_url + 'passport',
              data: {
                imagePath: data.data.dizhi,
              },
              success: function (res) {
                //console.log(res)
                if (res.data.code== 500) {
                  wx.showToast({
                    title: 'Internal Server Error',
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
                that.setData({
                  list2: res.data.data
                })
              }
            })
          }
        })
      }
    })
  },
  resolveIdCard_front() {
    wx.request({
      url: app.data.base_url + "number",

      success: (response) => {
        //console.info(response)
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