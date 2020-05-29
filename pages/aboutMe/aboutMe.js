// pages/aboutMe/aboutMe.js
import util from '../../utils/util.js'
import api from '../../utils/api.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuBP: app.globalData.menuBP,
    src: 'https://github.com/Jasonzzh/Small-program'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  // 获取数据
  async getData() {
    try {
      util.loading('加载中')
      const res = await util.reqAsync(api.getAboutMe)
      wx.hideToast()
      if (res.data.code == 200) {
        const { data } = res.data
        data.content = data.content.replace(/<img/g,'<img class="img"')
        this.setData({
          aboutMe: data
        })
      } else {
        util.toast(res.data.msg)
      }
    } catch (err) {
      util.toast('网络异常!,请检查网络是否连接!')
      console.log(err)
    }
  },

  // 点击复制
  copyUrl(e) {
    const { src } = e.currentTarget.dataset
    wx.setClipboardData({
      data: src,
      success: (res) => {
        wx.getClipboardData({
          success: (res) => {
            console.log(res.data)
          }
        })
      }
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