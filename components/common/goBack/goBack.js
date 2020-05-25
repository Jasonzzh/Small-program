// components/common/goBack/goBack.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    position: null,
  },

  /**
   * 组件的初始数据
   */
  data: {
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
