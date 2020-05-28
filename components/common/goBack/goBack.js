// components/common/goBack/goBack.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuBP: app.globalData.menuBP
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 返回上一页 
    goback() {
      wx.navigateBack({
        delta: 1
      })
    }
    
  }
})
