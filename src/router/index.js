import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import(`@/views/Index`)
    },
    {
      path: '/th1-01',
      name: 'F2E1th01',
      component: () => import(`@/views/F2E1th01`)
    },
    {
      path: '/th1-02',
      name: 'F2E1th02',
      component: () => import(`@/views/F2E1th02`)
    },
    {
      path: '/th1-03',
      name: 'F2E1th03',
      component: () => import(`@/views/F2E1th03`)
    },
    {
      path: '/th1-04',
      name: 'F2E1th04',
      component: () => import(`@/views/F2E1th04`)
    },
    {
      path: '/th1-05',
      name: 'F2E1th05',
      component: () => import(`@/views/F2E1th05`)
    },
    {
      path: '/th1-06',
      name: 'F2E1th06',
      component: () => import(`@/views/F2E1th06`)
    },
    {
      path: '/th1-07',
      name: 'F2E1th07',
      component: () => import(`@/views/F2E1th07`)
    },
    {
      path: '/th1-08',
      name: 'F2E1th08',
      component: () => import(`@/views/F2E1th08`)
    },
    {
      path: '/th1-09',
      name: 'F2E1th09',
      component: () => import(`@/views/F2E1th09`)
    },
    {
      path: '/th2-01',
      name: 'F2E2th01',
      component: () => import(`@/views/F2E2th01`)
    },
    {
      path: '/th2-02',
      name: 'F2E2th02',
      component: () => import(`@/views/F2E2th02`)
    },
    {
      path: '/th2-03',
      name: 'F2E2th03',
      component: () => import(`@/views/F2E2th03`)
    },
    {
      path: '/th2-04',
      name: 'F2E2th04',
      component: () => import(`@/views/F2E2th04`)
    },
    {
      path: '/th2-05',
      name: 'F2E2th05',
      component: () => import(`@/views/F2E2th05`)
    },
    {
      path: '/th2-06',
      name: 'F2E2th06',
      component: () => import(`@/views/F2E2th06`)
    },
    {
      path: '/th2-07',
      name: 'F2E2th07',
      component: () => import(`@/views/F2E2th07`)
    },
    {
      path: '/th2-08',
      name: 'F2E2th08',
      component: () => import(`@/views/F2E2th08`)
    },
    {
      path: '/th2-09',
      name: 'F2E2th09',
      component: () => import(`@/views/F2E2th09`)
    },
    {
      path: '/th2-10',
      name: 'F2E2th10',
      component: () => import(`@/views/F2E2th10`)
    },
    {
      path: '/th3-01',
      name: 'F2E3th01',
      component: () => import(`@/views/F2E3th01`)
    },
    {
      path: '/th3-02',
      name: 'F2E3th02',
      component: () => import(`@/views/F2E3th02`)
    },
    {
      path: '/th3-03',
      name: 'F2E3th03',
      component: () => import(`@/views/F2E3th03`)
    }
  ]
})
