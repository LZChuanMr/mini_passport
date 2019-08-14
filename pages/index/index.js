//index.js
var request = require('../../utils/request.js')
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',//手机号
    verifyCode: '',//验证码
    codename: '获取验证码',
    disabled: false
  },
  //获取input输入框的值
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  //获取验证码
  getVerificationCode() {
    var that = this;
    var phone = that.data.phone;
    request.request('GET', app.data.api_ + 'sendSmsForLogin?phoneNum='+phone).then((sres) => {
      console.log(sres)
    }).catch((fres) => { })
    var num = 61;
    var _this = this;
    var timer = setInterval(function () {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        _this.setData({
          codename: '重新发送',
          disabled: false
        })

      } else {
        _this.setData({
          codename: num + "s"
        })
      }
    }, 1000)
  },
  //提交表单信息
  save: function () {

    var that = this;
    var phone = that.data.phone;
    wx.setStorageSync('phone', phone)
    var verifyCode = that.data.verifyCode;
    request.request('GET', app.data.api_ + 'checkForLogin?phoneNum=' + phone + '&verifyCode=' + verifyCode).then((sres) => {
      console.log(res)
      if (res.data.code == 200) {
        wx.navigateTo({
          url: '../message/message',
        })
      } else {
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch((fres) => { })
    var myreg = /^(14[0-9]|13[0-9]|16[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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