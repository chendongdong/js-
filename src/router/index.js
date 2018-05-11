import Vue from 'vue'
import Router from 'vue-router'
const lazyLoading = (name) => () => import('@/components/' + name)

Vue.use(Router)

const menus = [
  {
    path: '/listener-event',
    name: 'ListenerEvent',
    component: lazyLoading('ListenerEvent')
  },
  {
    path: '/scroller-text',
    name: 'ScrollerText',
    component: lazyLoading('ScrollerText')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: lazyLoading('Main')
    },
    {
      path: '*',
      redirect: '/'
    },
    ...generateRoute(menus)
  ]
})

function generateRoute (menu = [], routes = []) {
  menu.forEach(item => {
    if (item.path) {
      routes.push(item)
    }
    if (item.children && item.children.length > 0) {
      generateRoute(item.children, routes)
    }
  })
  return routes
}
