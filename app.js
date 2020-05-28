//app.js
App({
  onLaunch: function () {
    // 获取右上方按钮位置信息
    const menuBP = wx.getMenuButtonBoundingClientRect()
    this.globalData.menuBP = menuBP
    // iphoneX底部底部横条适配
    const systeminfo = wx.getSystemInfoSync()
    this.globalData.isIphoneX = systeminfo.model.indexOf("iPhone X")
  },
  globalData: {
    userInfo: null,
  }
})