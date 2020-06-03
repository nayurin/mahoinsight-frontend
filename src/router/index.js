import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import About from '@/views/About'
import Item from '@/views/Item.vue'
import Princess from '@/views/Princess.vue'
import Quest from '@/views/Quest.vue'
import ItemDetail from '@/views/detail/ItemDetail.vue'
import PrincessDetail from '@/views/detail/PrincessDetail.vue'
import Joinus from '@/views/Joinus'
import Issue from '@/views/Issue'
import Link from '@/views/Link'

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
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      icon: 'mdi-badge-account-horizontal'
    },
    children: [
      {
        path: 'joinus',
        name: 'Joinus',
        component: Joinus,
        meta: {
          title: '加入我们',
          icon: 'mdi-account-multiple',
          breadcrumb: ['Joinus'],
        }
      },
      {
        path: 'issues',
        name: 'Issues',
        component: Issue,
        meta: {
          title: '提交Issue',
          icon: 'mdi-bug-outline',
          breadcrumb: ['Issues']
        }
      },
      {
        path: 'links',
        name: 'Links',
        component: Link,
        meta: {
          title: '友情链接',
          icon: 'mdi-link-variant',
          breadcrumb: ['Links']
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
