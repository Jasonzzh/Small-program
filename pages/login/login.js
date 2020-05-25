// pages/login/login.js
import util from '../../utils/util.js'
import api from '../../utils/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '登录',
    position: app.globalData.position,
    iphone: '',
    password: '',
    checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onChangeCheck(event) {
    this.setData({
      checked: event.detail
    });
  },

  login() {
    const { iphone, password } = this.data
    const params = {
      iphone,
      password,
    }
    if (typeof iphone == "undefined" || iphone == null || iphone == '') {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
      })
      return false
    } else if (typeof password == "undefined" || password == null || password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      })
      return false
    } else {
      wx.showToast({
        title: '登陆中...',
        icon: 'loading'
      })
      util.reqAsync(api.login,params).then(res => {
        console.log(res)
        if(res.data.code == 200) {
          app.globalData.userInfo = res.data.data
          wx.setStorageSync('userInfo', res.data.data)
          wx.set
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          })
          wx.navigateBack()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
    console.log('登录')
  },

  onChangePassword(event) {
    this.setData({
      password: event.detail
    })
  },

  onChangeIphone(event) {
    this.setData({
      iphone: event.detail
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