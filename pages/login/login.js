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
    rgIphone: '',
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
    if (!this.isCheckInfo(iphone, password)) return
    util.loading('登录中...')
    try {
      const res = await util.reqAsync(api.login, params)
      wx.hideToast()
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
  isCheckInfo(iphone, password) {
    const regPhone = /^1[3456789]\d{9}$/
    if (typeof iphone == "undefined" || iphone == null || iphone == '') {
      util.toast('请输入账号ID(手机号)')
      return false
    } else if (!regPhone.test(iphone)) {
      util.toast('请输入正确的手机号')
    } else if (typeof password == "undefined" || password == null || password == '') {
      util.toast('请输入密码')
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
    const { rgIphone, rgPassword, autograph, name, userPic } = this.data
      , params = {
        iphone: rgIphone,
        password: rgPassword,
        autograph,
        name,
        userPic,
        id: rgIphone,
      }
    if (!this.isCheckInfo(rgIphone, rgPassword)) return
    try {
      util.loading('注册中')
      const res = await util.reqAsync(api.register, params)
      wx.hideToast()
      if (res.data.code == 200) {
        util.toastSuccess('注册成功!')
        this.setData({
          iphone: rgIphone,
          password: rgPassword,
        })
        this.login()
      } else {
        util.toast(res.data.msg)
      }
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