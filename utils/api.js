const api = {
  login: 'controller=getIndex&method=login', // 登录接口
  indexList: 'controller=getIndex&method=followBlogList', // 列表
  indexSearch: 'controller=getIndex&method=search', // 首页分类查询列表
  updateProfile: 'controller=getIndex&method=update_profile', // 个人资料修改
  articleDetail: 'controller=getIndex&method=article_detail', // 文章详情查询
  getComments: 'controller=comment&method=getComments', // 文章评论查询
  releaseComments: 'controller=comment&method=releaseComments', // 文章评论发布
}

export default api