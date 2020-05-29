const api = {
  login: 'getIndex/login', // 登录接口
  indexList: 'getIndex/followBlogList', // 列表
  indexSearch: 'getIndex/search', // 首页分类查询列表
  updateProfile: 'getIndex/updateProfile', // 个人资料修改
  articleDetail: 'getIndex/articleDetail', // 文章详情查询
  getComments: 'comment/getComments', // 文章评论查询
  releaseComments: 'comment/releaseComments', // 文章评论发布
  register: 'user/registerUser', // 用户注册
  getAboutMe: 'getIndex/getAboutMe', // 关于我
  getArticleCategroy: 'getIndex/getArticleCategory', // 获取文章分类
}

export default api