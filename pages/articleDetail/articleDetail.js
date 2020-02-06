// pages/articleDetail/articleDetail.js
import util from '../../utils/util.js'
import api from '../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultPortrait: '/images/default-image.png',
    isIphoneX: app.globalData.isIphoneX,
    isFocus: false,
    commentList: [],
    pageNo: 0,
    pageSize: 6,
    loadingStatus: false,
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getData().then(() => {
      wx.hideLoading()
    })
  },
  // 获取数据
  async getData() {
    this.getArticle()
    this.getComments()
  },
  // 获取文章详情
  async getArticle() {
    const params = {
      id: this.data.id
    }
    const res = await util.reqAsync(api.articleDetail, params)
    if (res.data.code == 200) {
      this.setData({
        articleData: res.data.data
      })
    } else {
      util.toastFail(res.data.msg)
    }
  },
  // 获取文章评论
  async getComments() {
    const { id, pageNo, pageSize } = this.data
    const params = {
      id,
      pageNo,
      pageSize,
    }
    const res = await util.reqAsync(api.getComments, params)
    let loadingStatus = false
    if(res.data.code == 200) {
      if(res.data.data.length < pageSize) {
        loadingStatus = true
      }
      this.setData({
        commentList: [...this.data.commentList, ...res.data.data],
        loadingStatus,
      })
    } else {
      util.toastFail(res.data.msg)
    }
  },
  // 聚焦input
  openKeyboard() {
    this.setData({
      isFocus: true
    })
  },
  // 失焦
  closeKeyboard() {
    this.setData({
      isFocus: false
    })
  },
  // 输入
  changeInput(e) {
    const { value } = e.detail
    this.setData({
      inputValue: value
    })
  },
  // 发布
  async sendText() {
    if(!this.isLogin()) return
    const { id, inputValue, } = this.data
    ,regu = "^[ ]+$"
    ,re = new RegExp(regu)
    console.log(inputValue)
    if (inputValue == '' || re.test(inputValue)) {
      this.toast('内容不能为空!')
      return false
    }
    wx.showLoading()
    const params = {
      userId: wx.getStorageSync('userInfo').id,
      content: inputValue.replace(/'/g,'’'),
      articleId: id
    }
    const res = await util.reqAsync(api.releaseComments, params)
    wx.hideLoading()
    if(res.data.code == 200) {
      this.setData({
        pageNo: 0,
        commentList: [],
        inputValue: ''
      })
      this.getComments()
      util.toastSuccess('评论成功')
    } else {
      util.toastFail(res.data.msg)
    }
  },
  // 是否登录
  isLogin() {
    if(!wx.getStorageSync('userInfo')) {
      wx.showModal({
        title: '提示',
        content: '请您先登录！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
            return true
          } else {
            return false
          }
        }
      })
    }
    return true
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
    if(this.data.loadingStatus) return
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    this.getComments()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})