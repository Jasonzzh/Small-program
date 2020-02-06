// pages/profile/profile.js
import util from '../../utils/util.js'
import api from '../../utils/api.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast.js';
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '个人资料',
    position: app.globalData.position,
    defaultImg: '/images/default-image.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.userInfo.name,
      autograph: app.globalData.userInfo.autograph,
      uploadImg: app.globalData.userInfo.userPic,
      userInfo: app.globalData.userInfo,
    })
  },
  cancle() {
    wx.navigateBack()
  },
  saveProfile() {
    const params = {
      id: this.data.userInfo.id,
      name: this.data.name,
      autograph: this.data.autograph
    }
    Toast.loading({
      message: '保存中...',
      duration: 0
    });
    util.reqAsync(api.updateProfile,params).then(res => {
      console.log(res)
      if(res.data.code == 200) {
        app.globalData.userInfo = res.data.data
        Toast.success({
          message: res.data.msg,
          duration: 500
        })
      } else {
        Toast.fail({
          message: res.data.msg,
          duration: 500
        })
      }
    })
  },
  onChangeName(event) {
    this.setData({
      name: event.detail
    })
  },
  onChangeAutograph(event) {
    this.setData({
      autograph: event.detail
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