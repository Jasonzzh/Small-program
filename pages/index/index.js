// index.js
import util from '../../utils/util.js'
import api from '../../utils/api.js'
// 获取应用实例
const app = getApp()

Page({
  data: {
    position: app.globalData.position,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300,
    newsList: [], // 新闻列表数据
    page: 0,
    isDataCompleted: false, // 数据是否加载完毕
    nums: 16,
    category: 6,
  },

  onLoad: function () {
    this.getInit()
  },

  async getInit() {
    util.loading('加载中')
    const p1 = this.getArticleLsit()
    Promise.all([p1])
    wx.hideToast()
  },

  /* 获取列表数据 */
  async getArticleLsit () {
    const { page, nums, category, newsList } = this.data
      , params = {
        page,
        nums,
        category_id: category,
      }
    try {
      const res = await util.reqAsync(api.indexList, params)
      if (res.data.code == 200) {
        let isDataCompleted = false
          , { data } = res.data
        if (data.length < nums) isDataCompleted = true
        this.setData({
          newsList: [ ...newsList, ...data ],
          isDataCompleted,
        })
      }
    } catch (err) {
      util.toast('数据获取失败!请检查网络!')
    }
  },

  // tab切换回调
  async onChangeTab(e) {
    let { name, index } = e.detail
      , { category } = this.data
    if (name == category) return
    this.setData({
      page: 0,
      category: parseInt(name),
      newsList: [],
      isDataCompleted: false,
    })
    await this.getArticleLsit()
  },

  // 跳转文章详情
  goArticleDetail(e) {
    const { id, category } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id=' + id,
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({
      page: 1,
      newsList: [],
      isDataCompleted: false,
    })
    await this.getArticleLsit()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    const { isDataCompleted, page } = this.data
    if (isDataCompleted) return
    this.setData({
      page: page + 1
    })
    await this.getArticleLsit()
  },
})
