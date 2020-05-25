// pages/mine/mine.js
import util from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultPortrait: '/images/default-image.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 跳转登录
  goLogin() {
    wx.navigateTo({
      url: '../login/login',
      success: function (res) {
        console.log(res)
      }
    })
  },

  // 跳转设置
  goSetup() {
    wx.navigateTo({
      url: '../setup/setup',
      success: function (res) {
        console.log(res)
      }
    })
  },

  // 跳转个人资料
  goProfile() {
    const { userInfo } = this.data
    if (!userInfo) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) {
          console.log(res)
        }
      })
    } else {
      wx.navigateTo({
        url: '../profile/profile',
        success: function (res) {
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || null
    })
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