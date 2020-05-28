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
    menuBP: app.globalData.menuBP,
    iphone: '',
    password: '',
    checked: true,
    loginModel: false,
    userId: '',
    userPwd: '',
    autograph: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 登录
  async login() {
    const { iphone, password } = this.data
      , params = {
        iphone,
        password,
      }
    if (!this.isCheckInfo()) return
    util.loading('登录中...')
    try {
      const res = await util.reqAsync(api.login, params)
      if (res.data.code == 200) {
        app.globalData.userInfo = res.data.data
        wx.setStorageSync('userInfo', res.data.data)
        util.toastSuccess(res.data.msg)
        wx.navigateBack()
      } else {
        util.toast(res.data.msg)
      }
    } catch (err) {
      util.toast('网络异常!,请检查网络是否连接!')
      console.log(err)
    }
  },

  // 登录校验
  isCheckInfo() {
    const { iphone, password } = this.data
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
    }
    return true
  },

  // 授权用户信息
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    const { userInfo } = e.detail
    this.setData({
      name: userInfo.nickName,
      userPic: userInfo.avatarUrl,
      loginModel: true
    })
  },

  onChangePassword(e) {
    this.setData({
      password: e.detail
    })
  },

  onChangeIphone(e) {
    this.setData({
      iphone: e.detail
    })
  },

  onChangeRgIphone(e) {
    this.setData({
      rgIphone: e.detail
    })
  },

  onChangeAutograph(e) {
    this.setData({
      autograph: e.detail
    })
  },
  
  onChangeRgPassword(e) {
    this.setData({
      rgPassword: e.detail
    })
  },

  onClose() {
    this.setData({ 
      loginModel: false 
    })
  },

  // 注册
  async register() {
    const { userId, userPwd, autograph, name, userPic } = this.data
      , params = {
        iphone: userId,
        password: userPwd,
        autograph,
        name,
        userPic,
        id: userId,
      }
    try {
      const res = await util.reqAsync(api.register, params)
    } catch (err) {
      util.toast('网络异常！，请检查网络是否连接！')
      console.log(err)
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

})