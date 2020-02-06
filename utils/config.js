// 环境
const env = 'prod'

// 请求地址
const url = {
  dev: 'http://localhost/newBlog/api/Jason_Blog/index.php?', // 本地
  prod: 'http://www.zhangqinblog.com:8080/API/index.php?' // 线上
}

export default {
  url: url[env],
}