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
    component: HelloWorld
  },
  {
    path: '/item',
    name: 'Item',
    component: Item
  },
  {
    path: '/item/detail/:itemName',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true
  },
  {
    path: '/princess',
    name: 'Princess',
    component: Princess
  },
  {
    path: '/princess/detail/:princessName',
    name: 'PrincessDetail',
    component: PrincessDetail,
    props: true
  },
  {
    path: '/quest',
    name: 'Quest',
    component: () => import('../views/Quest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
