// pages/setup/setup.js
import util from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设置',
    position: app.globalData.position, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin()
  },
  // 退出和登录
  loginOut() {
    if(this.data.loginState) {
      app.globalData.userInfo = null
      wx.navigateBack()
    } else {
      wx.navigateTo({
        url: '../login/login',
        success: function(res) {
          console.log(res)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  isLogin() {
    let loginState = false
    if(app.globalData.userInfo) {
      loginState = true
    }
    this.setData({
      loginState,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isLogin()
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