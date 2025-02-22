export default {
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * api服务前缀
   */
  ServerApiPrefix: '/api-gdss',

  title: '文档检索服务平台',

  /**
   *token 存放在header中的field
   */
  TokenHeader: 'token',
  /** 水印开关 **/
  watermark: true,
  company: '公文检索服务平台'
}
