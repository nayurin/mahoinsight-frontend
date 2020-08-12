// Libraries
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

// Components
import ItemFigure from '@/components/global/ItemFigure'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VueRouter)

const $route = {
  name: 'ItemDetail',
  path: '/item/detail/:itemName/:itemId'
}

describe('ItemFigure.vue', () => {
  let vuetify, router

  beforeEach(() => {
    vuetify = new Vuetify()
    router = new VueRouter({
      routes: [$route]
    })
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemFigure, {
      vuetify,
      router,
      localVue,
      ...options
    }) 
  }

  // it('render from a correct figure source', () => {
  //   const wrapper = mountWrapper(shallowMount, {
  //     mocks: {
  //       $store: {
  //         state: {
  //           CDNBaseURL: ''
  //         },
  //         getters: {
  //           getEquipmentStatsById (...args) {
  //             return {}
  //           },
  //           getCraftedEquipmentNameByItemId (...args) {
  //             return '铁剑'
  //           },
  //           getEquipmentData (...args) {
  //             return {
  //               equipment_name: '铁剑'
  //             }
  //           }
  //         }
  //       }
  //     },
  //     propsData: {
  //       id: 101011
  //     }
  //   })

  //   expect(wrapper.html()).toMatchSnapshot()

  //   const img = wrapper.get('v-img-stub')
  //   expect(img.attributes('src')).toBe(`${wrapper.vm.$store.state.CDNBaseURL}/image/equipments/icon_equipment_${wrapper.props('id')}.png`)
  // })

  it('render a figure without route', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEquipmentStatsById (...args) {
              return {}
            },
            getCraftedEquipmentNameByItemId (...args) {
              return '铁剑'
            },
            getEquipmentData (...args) {
              return {
                equipment_name: '铁剑'
              }
            }
          }
        }
      },
      propsData: {
        id: 101011,
        noRoute: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.html()).not.toContain('</a>')

    const img = wrapper.get('.v-image')
    expect(img.attributes('aria-label')).toBe(wrapper.vm.$store.getters.getEquipmentData().equipment_name)
    expect(img.attributes('role')).toBe('img')
  })

  it('render a figure with a route', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEquipmentStatsById (...args) {
              return {}
            },
            getCraftedEquipmentNameByItemId (...args) {
              return '铁剑'
            },
            getEquipmentData (...args) {
              return {
                equipment_name: '铁剑'
              }
            }
          }
        }
      },
      propsData: {
        id: 101011,
        noRoute: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const link = wrapper.get('a.v-card--link')
    expect(link.attributes('href')).toBe(`#/item/detail/${encodeURI(wrapper.vm.$store.getters.getEquipmentData().equipment_name)}/${wrapper.props('id')}`)

    const img = wrapper.get('.v-image')
    expect(img.attributes('aria-label')).toBe(wrapper.vm.$store.getters.getEquipmentData().equipment_name)
    expect(img.attributes('role')).toBe('img')
  })
})
