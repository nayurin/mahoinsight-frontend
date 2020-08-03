// Libraries
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

// Components
import PrincessFigure from '@/components/global/PrincessFigure'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VueRouter)

const $route = {
  name: 'PrincessDetail',
  path: '/princess/detail/:princessName'
}

describe('PrincessFigure.vue', () => {
  let vuetify, router

  beforeEach(() => {
    vuetify = new Vuetify()
    router = new VueRouter({
      routes: [$route]
    })
  })

  const mountWrapper = (fn, options) => {
    return fn(PrincessFigure, {
      vuetify,
      router,
      localVue,
      ...options
    }) 
  }

  it('render a figure with physical chara', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitData (...args) {
              return {
                unit_name: '珠希',
                atk_type: 1
              }
            }
          }
        }
      },
      propsData: {
        id: 104601
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const link = wrapper.get('a.v-card--link')
    expect(link.attributes('href')).toBe(`#/princess/detail/${encodeURI('珠希')}`)

    const img = wrapper.get('.v-image')
    expect(img.attributes('aria-label')).toBe('珠希')
    expect(img.attributes('role')).toBe('img')

    const namePlate = wrapper.get('div > button.v-btn')
    expect(namePlate.text()).toBe('珠希')
    expect(namePlate.classes()).toContain('pink')
  })

  it('render a figure with magic chara', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitData (...args) {
              return {
                unit_name: '真步',
                atk_type: 2
              }
            }
          }
        }
      },
      propsData: {
        id: 101001
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const link = wrapper.get('a.v-card--link')
    expect(link.attributes('href')).toBe(`#/princess/detail/${encodeURI('真步')}`)

    const img = wrapper.get('.v-image')
    expect(img.attributes('aria-label')).toBe('真步')
    expect(img.attributes('role')).toBe('img')

    const namePlate = wrapper.get('div > button.v-btn')
    expect(namePlate.text()).toBe('真步')
    expect(namePlate.classes()).toContain('indigo')
  })
})
