// pages/setup/setup.js
import util from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设置',
    menuBP: app.globalData.menuBP, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 退出和登录
  loginOut() {
    const { userInfo } = this.data
    if (!userInfo) {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    wx.removeStorage({
      key: 'userInfo',
    })
    wx.navigateBack()
  },

  // 跳转关于我
  goAboutMe() {
    wx.navigateTo({
      url: '../aboutMe/aboutMe',
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
    return {
      title: '这是一个不错的小程序、推荐给你',
      path: '/pages/index/index',
      imageUrl: '/images/shareImg.jpg'
    }
  }
})