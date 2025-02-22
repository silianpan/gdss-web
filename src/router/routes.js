const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: solve => require(['@/views/login'], solve)
  },
  {
    path: '/single/page/preview',
    name: 'single',
    component: solve => require(['@/components/on-line'], solve),
    props: true
  },
  {
    path: '/error',
    component: solve => require(['@/views/layout/04'], solve),
    children: [
      {
        path: '/errorPage/:code/:msg',
        name: 'errorPage',
        component: () => import('@/views/error-page/index-page')
      },
      {
        path: '/error/offnet',
        name: 'errorOffNet',
        component: () => import('@/views/error-page/off-net-page')
      },
      {
        path: '/error/developing',
        name: 'errorDeveloping',
        component: () => import('@/views/error-page/developing-page')
      }

    ]
  },
  {
    path: '/search',
    name: 'biotown_search_route',
    component: () => import('@/views/bio-search')
  },
  {
    path: '/layou04',
    component: () => import('@/views/layout/04'),
    redirect: '/search',
    children: [
      {
        path: '/zhengce/search',
        name: 'zheng_ce_fa_gui_search_route',
        component: () => import('@/views/bio-search/zheng-ce-fa-gui')
      },
      {
        path: '/zixun/search',
        name: 'hang_ye_zi_xun_search_route',
        component: () => import('@/views/bio-search/hang-ye-zi-xun')
      },
      {
        path: '/medical/instrument/search',
        name: 'medical_qi_xie_search_route',
        component: () => import('@/views/bio-search/medical-qi-xie')
      },
      {
        path: '/others/search',
        name: 'others_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown')
      },
      {
        path: '/guangu/search',
        name: 'guangu_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/guang-gu')
      },
      {
        path: '/njbpv/search',
        name: 'njbpv_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/njbpv')
      },
      {
        path: '/bioasis/search',
        name: 'bioasis_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/bioasis')
      },
      {
        path: '/biobay/search',
        name: 'biobay_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/biobay')
      },
      {
        path: '/bybp/search',
        name: 'bybp_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/bybp')
      },
      {
        path: '/cqbiocity/search',
        name: 'cqbiocity_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/cqbiocity')
      },
      {
        path: '/shimsp/search',
        name: 'shimsp_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/shimsp')
      },
      {
        path: '/dadiaep/search',
        name: 'dadiaep_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/dadiaep')
      },
      {
        path: '/biomedical/search',
        name: 'bio_medical_search_route',
        component: () => import('@/views/bio-search/bio-medical')
      },
      {
        path: '/biology/search',
        name: 'bio_logy_search_route',
        component: () => import('@/views/bio-search/bio-logy')
      },
      {
        path: '/enterprise/search',
        name: 'ru_zhu_qi_ye_search_route',
        component: () => import('@/views/bio-search/ru-zhu-qi-ye')
      },
      {
        path: '/search/detail',
        name: 'detailSearch',
        component: () => import('@/views/bio-search/detail.vue')
      },
      {
        path: '/medical/server',
        name: 'medical_server_manage_route',
        component: () => import('@/views/bio-search/medical-server')
      },
      {
        path: '/bjcbp/search',
        name: 'bjcbp_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/bjcbp')
      },
      {
        path: '/biozgc/search',
        name: 'biozgc_biotown_search_route',
        component: () => import('@/views/bio-search/others-biotown/biozgc')
      }
    ]
  }, {
    path: '/admin',
    component: solve => require(['@/views/layout/01'], solve),
    children: [
      {
        path: '/admin/user',
        name: 'manage_user',
        meta: {
          // 用户管理
        },
        component: () => import('@/views/sys-manage/user/manage-page.vue')
      },
      {
        path: '/admin/role',
        name: 'manage_role',
        meta: {
          // 角色管理
        },
        component: () => import('@/views/sys-manage/role/manage-page.vue')
      },
      {
        path: '/admin/menu',
        name: 'manage_menu',
        meta: {
          // 菜单管理
        },
        component: () => import('@/views/sys-manage/menu/manage-page.vue')
      },
      {
        path: '/admin/vue/router',
        name: 'manage_vue_router',
        meta: {
          // 路由管理
        },
        component: () => import('@/views/sys-manage/router/manage-page.vue')
      },
      {
        path: '/admin/dept',
        name: 'manage_dept',
        meta: {
          // 部门管理
        },
        component: () => import('@/views/sys-manage/dept/manage-page.vue')
      }, {
        path: '/admin/post',
        name: 'manage_post',
        meta: {
          // 岗位管理
        },
        component: () => import('@/views/sys-manage/post/manage-page.vue')
      }
    ]
  }

]

export default routes
