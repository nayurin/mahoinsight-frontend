// Libraries
import Vuetify from 'vuetify'

// Components
import ItemCraft from '@/components/items/ItemCraft'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('ItemCraft.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemCraft, {
      vuetify,
      localVue,
      ...options
    }) 
  }

  it('render a card that shows crafts to an item', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            database: {
              master: {
                equipment_data: {
                  100000: {}
                }
              }
            }
          },
          getters: {
            getEquipmentData (id) {
              return id === 100000 ? {
                craft_flg: 1
              } : {
                craft_flg: 0
              }
            },
            getEquipmentCraftBy (...args) {
              return [
                [101281, 5]
              ]
            }
          }
        }
      },
      propsData: {
        id: 101281
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('v-card-title-stub#item-craft')
    expect(title.text()).toBe('能够合成的装备')

    const craftedItem = wrapper.get('v-col-stub > itemfigure-stub')
    expect(craftedItem.attributes('id')).toBe(String(Object.keys(wrapper.vm.$store.state.database.master.equipment_data)[0]))
  })

  it('render a card that shows an item which needs to be crafted', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            database: {
              master: {
                equipment_data: {}
              }
            }
          },
          getters: {
            getEquipmentData (id) {
              return id === 555555 ? {
                craft_flg: 0
              } : {
                craft_flg: 1
              }
            },
            getEquipmentCraftBy (...args) {
              return [
                [555555, 3]
              ]
            }
          }
        }
      },
      propsData: {
        id: 101281
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const title = wrapper.get('v-card-title-stub#item-craft')
    expect(title.text()).toBe('合成所需的素材')
    
    const craftedItem = wrapper.get('v-row-stub > itemfigure-stub')
    expect(craftedItem.attributes('id')).toBe(String(wrapper.vm.$store.getters.getEquipmentCraftBy()[0][0]))
  })
})
