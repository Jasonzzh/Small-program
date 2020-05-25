const api = {
  login: 'smartApi/getIndex/login', // 登录接口
  indexList: 'smartApi/getIndex/followBlogList', // 列表
  indexSearch: 'smartApi/getIndex/search', // 首页分类查询列表
  updateProfile: 'smartApi/getIndex/update_profile', // 个人资料修改
  articleDetail: 'smartApi/getIndex/article_detail', // 文章详情查询
  getComments: 'smartApi/comment/getComments', // 文章评论查询
  releaseComments: 'smartApi/comment/releaseComments', // 文章评论发布
}

export default api