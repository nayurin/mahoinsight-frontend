// Libraries
import Vuetify from 'vuetify'

// Components
import ItemStatus from '@/components/items/ItemStatus'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('ItemStatus.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemStatus, {
      vuetify,
      localVue,
      ...options
    }) 
  }

  it('render an list with stats values', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          getters: {
            getEquipmentStatsById (...args) {
              return {
                生命值: 100,
                物理攻击力: 20,
                物理防御力: 5
              }
            }
          }
        }
      },
      propsData: {
        id: 101011
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.findAll('v-list-item-stub').wrappers.forEach(listitem => {
      const statsType = listitem.get('v-list-item-stub > v-btn-stub:first-child').text()
      const originalValue = Number(listitem.get('v-list-item-stub > v-btn-stub:nth-child(2)').text())
      const enhancedValue = Number(listitem.get('v-list-item-stub > v-btn-stub:last-child').text())

      expect(originalValue).toBe(wrapper.vm.$store.getters.getEquipmentStatsById()[statsType])
      expect(enhancedValue).toBe(originalValue * 2)
    })
  })

  it('render an list without stats values', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          getters: {
            getEquipmentStatsById (...args) {
              return {}
            }
          }
        }
      },
      propsData: {
        id: 101011
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.html()).toBe('')
  })
})
