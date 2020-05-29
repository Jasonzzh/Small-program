import config from './config.js'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// ajax请求封装
const reqAsync = (url,params) => {
  const p = new Promise((resolve,reject) => {
    wx.request({
      url: config.url + 'smartApi/' + url,
      method: 'POST',
      dataType: 'json',
      data: params,
      success: resolve,
      fail: reject
    })
  })
  return p
}

// tips 提示封装
const loading = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'loading'
  })
}

const toast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1200
  })
}

const toastSuccess = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 1200
  })
}

const error = (err) => {
  toast('数据获取失败!请检查网络!')
  console.log(err)
}

// 是否登录
const isLogin = () => {
  if (!wx.getStorageSync('userInfo')) {
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
    return false
  }
  return true
}

module.exports = {
  formatTime,
  reqAsync,
  loading,
  toast,
  toastSuccess,
  error,
  isLogin,
}
