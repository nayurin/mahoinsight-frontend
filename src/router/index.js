import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld';
import Item from '@/views/Item.vue'
import Princess from '@/views/Princess.vue'
import ItemDetail from '@/views/detail/ItemDetail.vue'
import PrincessDetail from '@/views/detail/PrincessDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
    meta: {
      title: '首页',
      breadcrumb: ['Home']
    }
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: {
      title: '道具',
      breadcrumb: ['Item']
    }
  },
  {
    path: '/item/detail/:itemName',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true,
    meta: {
      title: '道具详情',
      hidden: true,
      breadcrumb: ['Item', ':itemName']
    }
  },
  {
    path: '/princess',
    name: 'Princess',
    component: Princess,
    meta: {
      title: '角色',
      breadcrumb: ['Princess']
    }
  },
  {
    path: '/princess/detail/:princessName',
    name: 'PrincessDetail',
    component: PrincessDetail,
    props: true,
    meta: {
      title: '角色详情',
      hidden: true,
      breadcrumb: ['Princess', ':princessName']
    }
  },
  {
    path: '/quest',
    name: 'Quest',
    component: () => import('../views/Quest.vue'),
    meta: {
      title: '关卡',
      breadcrumb: ['Quest']
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
