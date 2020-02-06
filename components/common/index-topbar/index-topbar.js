// components/common/index-topbar/index-topbar.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    position: app.globalData.position
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
        success: res => {
          console.log(res)
        }
      })
    }
  }
})
