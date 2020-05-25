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

  },
  cancle() {
    wx.navigateBack()
  },

  async saveProfile() {
    const { id, name, autograph } = this.data.userInfo
      , params = {
        id,
        name,
        autograph,
      }
    util.loading('保存中...')
    try {
      const res = await util.reqAsync(api.updateProfile, params)
      if (res.data.code == 200) {
        util.toastSuccess(res.data.msg)
        const { data } = res.data
        this.setData({
          userInfo: data
        })
        wx.setStorageSync('userInfo', data)
      } else {
        util.toastFail(res.data.msg)
      }
    } catch (err) {
      console.log(err)
    }
  },

  onChangeName(e) {
    this.setData({
      'userInfo.name': e.detail,
    })
  },

  onChangeAutograph(e) {
    this.setData({
      'userInfo.autograph': e.detail,
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
      userInfo: wx.getStorageSync('userInfo')
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