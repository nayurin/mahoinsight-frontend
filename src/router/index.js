import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Item from '@/views/Item.vue'
import Princess from '@/views/Princess.vue'
import Quest from '@/views/Quest.vue'
import ItemDetail from '@/views/detail/ItemDetail.vue'
import PrincessDetail from '@/views/detail/PrincessDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      icon: 'mdi-home',
      breadcrumb: ['Home']
    }
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: {
      title: '道具',
      icon: 'mdi-sack',
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
      breadcrumb: ['Item', ':itemName'],
      parent: 'Item'
    }
  },
  {
    path: '/princess',
    name: 'Princess',
    component: Princess,
    meta: {
      title: '角色',
      icon: 'mdi-heart',
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
      breadcrumb: ['Princess', ':princessName'],
      parent: 'Princess'
    }
  },
  {
    path: '/quest',
    name: 'Quest',
    component: Quest,
    props: true,
    meta: {
      title: '关卡',
      icon: 'mdi-sword-cross',
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
