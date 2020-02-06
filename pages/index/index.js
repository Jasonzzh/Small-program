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
    console.log('成功')
    this.getArticleLsit()
  },
  /* 获取列表数据 */
  getArticleLsit () {
    const _this = this
    const params = {
      page: this.data.page,
      nums: this.data.nums,
      category_id: this.data.category,
    }
    util.reqAsync(api.indexList,params).then(res => {
      console.log(res.data)
      if(res.data.code == 200) {
        let isDataCompleted = false
        if(res.data.data.length < this.data.nums) {
          isDataCompleted = true
        }
        _this.setData({
          newsList: [...this.data.newsList,...res.data.data],
          isDataCompleted,
        })
      }
    })
  },
  // tab切换回调
  onChangeTab(e) {
    let { name, index } = e.detail
    if(name == this.data.category) return
    console.log(e.detail)
    this.setData({
      page: 0,
      category: parseInt(name),
      newsList: [],
      isDataCompleted: false,
    })
    this.getArticleLsit()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isDataCompleted) {
      this.setData({
        page: this.data.page + 1
      })
      this.getArticleLsit()
    }
  },
})
