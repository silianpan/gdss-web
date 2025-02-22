import _ from 'lodash'
export default {
  /**
   * 构建路由信息
   * @param {*} menu
   */
  buildRoute (menu) {
    const route = {
      path: menu.path,
      name: menu.name,
      component: () => import('@/views' + menu.component),
      props: true
    }
    if (menu.redirect) {
      route.redirect = menu.redirect
    }
    if (!_.isNil(menu.children) && !_.isEmpty(menu.children)) {
      route.children = this.convertToRoutes(menu.children)
    }
    return route
  },

  /**
   * 将后端返回的菜单信息转换成前端需要的route信息
   * @param {*} menus
   */
  convertToRoutes (menus) {
    const routes = []
    menus.forEach(menuItem => {
      const route = this.buildRoute(Object.assign({}, menuItem))
      routes.push(route)
    })
    return routes
  }
}
