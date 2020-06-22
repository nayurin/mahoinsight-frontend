import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'

import About from '@/views/about/Connect'
import Joinus from '@/views/about/Joinus'
import Issue from '@/views/about/Issue'
import Link from '@/views/about/Link'

import Item from '@/views/Item'
import ItemDetail from '@/views/detail/ItemDetail'

import Princess from '@/views/Princess'
import PrincessDetail from '@/views/detail/PrincessDetail'

import Quest from '@/views/Quest'

import Arena from '@/views/arena/Connect'
import Calculator from '@/views/arena/Calculator'

import ClanBattle from '@/views/clanbattle/Connect'
import ClanBattlePeriods from '@/views/clanbattle/Periods'
import ClanBattleDetail from '@/views/clanbattle/Detail'

import Profile from '@/views/profile/Connect'
import ProfileManager from '@/views/profile/Manager'
import ProfilePrincess from '@/views/profile/Princess'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      icon: 'mdi-home',
      breadcrumb: [
        {
          name: 'Home',
          disabled: true
        }
      ]
    }
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: {
      title: '道具',
      icon: 'mdi-sack',
      breadcrumb: [
        {
          name: 'Item',
          disabled: true
        }
      ]
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
      breadcrumb: [
        {
          name: 'Item',
          to: { name: 'Item' }
        },
        {
          name: ':itemName',
          disabled: true
        }
      ],
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
      breadcrumb: [
        {
          name: 'Princess',
          disabled: true
        }
      ]
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
      breadcrumb: [
        {
          name: 'Princess',
          to: { path: '/princess' }
        },
        {
          name: ':princessName',
          disabled: true
        } 
      ],
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
      icon: 'mdi-sword',
      breadcrumb: [
        {
          name: 'Quest',
          disabled: true
        }
      ]
    }
  },
  {
    path: '/arena',
    name: 'Arena',
    component: Arena,
    meta: {
      title: '竞技场',
      icon: 'mdi-sword-cross'
    },
    children: [
      {
        path: 'calculator',
        name: 'Calculator',
        component: Calculator,
        meta: {
          title: '排名奖励计算器',
          icon: 'mdi-chess-queen',
          breadcrumb: [
            {
              name: 'Calculator',
              disabled: true
            }
          ]
        }
      }
    ]
  },
  {
    path: '/clanbattle',
    name: 'ClanBattle',
    component: ClanBattle,
    meta: {
      title: '团队战',
      icon: 'mdi-calendar-check-outline',
    },
    children: [
      {
        path: 'periods',
        name: 'ClanBattlePeriods',
        component: ClanBattlePeriods,
        meta: {
          title: '活动计划',
          icon: 'mdi-progress-clock',
          breadcrumb: [
            {
              name: 'ClanBattlePeriods',
              disabled: true
            }
          ]
        }
      },
      {
        path: 'periods/:clanBattlePhase',
        name: 'ClanBattleDetail',
        component: ClanBattleDetail,
        meta: {
          title: '团队战详细阶段',
          hidden: true,
          breadcrumb: [
            {
              name: 'ClanBattlePeriods',
              to: { name: 'ClanBattlePeriods' }
            },
            {
              name: ':clanBattlePhase',
              disabled: true
            }
          ]
        }
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '用户档案',
      icon: 'mdi-account-box'
    },
    children: [
      {
        path: 'manager',
        name: 'ProfileManager',
        component: ProfileManager,
        meta: {
          title: '用户档案管理',
          icon: 'mdi-account-cog',
          breadcrumb: [
            {
              name: 'ProfileManager',
              disabled: true
            }
          ]
        }
      },
      {
        path: 'princess',
        name: 'ProfilePrincess',
        component: ProfilePrincess,
        meta: {
          title: '角色管理',
          icon: 'mdi-account-plus',
          breadcrumb: [
            {
              name: 'ProfilePrincess',
              disabled: true
            }
          ]
        }
      }
    ]
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
          breadcrumb: [
            {
              name: 'Joinus',
              disabled: true
            }
          ],
        }
      },
      {
        path: 'issues',
        name: 'Issues',
        component: Issue,
        meta: {
          title: '问题报告',
          icon: 'mdi-bug-outline',
          breadcrumb: [
            {
              name: 'Issues',
              disabled: true
            }
          ]
        }
      },
      {
        path: 'links',
        name: 'Links',
        component: Link,
        meta: {
          title: '友情链接',
          icon: 'mdi-link-variant',
          breadcrumb: [
            {
              name: 'Links',
              disabled: true
            }
          ]
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
