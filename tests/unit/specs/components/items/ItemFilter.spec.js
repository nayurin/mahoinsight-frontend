// Libraries
import Vuetify from 'vuetify'

// Components
import ItemFilter from '@/components/items/ItemFilter'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('ItemFilter.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemFilter, {
      vuetify,
      localVue,
      ...options
    }) 
  }

  it('check the filter with a phrase', async () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          getters: {
            getEquipmentData (...args) {
              return {
                equipment_id: 666666,
                equipment_name: '光剑',
                atk: 99999,
                def: 0,
                dodge: 23333
              }
            },
            equipmentIdListEX: [666666]
          }
        }
      },
      propsData: {
        search: '剑'
      }
    })

    let items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(1)
    expect(items[0]).toBe(String(wrapper.vm.$store.getters.getEquipmentData().equipment_id))

    await wrapper.setProps({ search: '枪' })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(0)
  })

  it('check the filter with a group of stats', async () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          getters: {
            getEquipmentData (id) {
              return id === 666666 ? {
                equipment_id: 666666,
                equipment_name: '光剑',
                atk: 99999,
                def: 0,
                dodge: 23333
              } : {
                equipment_id: 777777,
                equipment_name: '光束步枪',
                atk: 77777,
                dodge: 0
              }
            },
            equipmentIdListEX: [666666, 777777]
          }
        }
      },
      propsData: {
        filter: []
      }
    })

    let items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toEqual(wrapper.vm.$store.getters.equipmentIdListEX.length)
    expect(items).toEqual(wrapper.vm.$store.getters.equipmentIdListEX.map(x => String(x)).sort((x, y) => Number(y) - Number(x)))

    await wrapper.setProps({ filter: ['atk'] })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items).toEqual(wrapper.vm.$store.getters.equipmentIdListEX.map(x => String(x)).sort((x, y) => Number(y) - Number(x)))

    await wrapper.setProps({ filter: ['def'] })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(0)

    await wrapper.setProps({ filter: ['dodge'] })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(1)
    expect(items).toEqual(['666666'])
  })

  it('check the filter with both stats and phrase', async () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          getters: {
            getEquipmentData (id) {
              return id === 666666 ? {
                equipment_id: 666666,
                equipment_name: '光剑',
                atk: 99999,
                def: 0,
                dodge: 23333
              } : {
                equipment_id: 777777,
                equipment_name: '光束步枪',
                atk: 77777,
                dodge: 0
              }
            },
            equipmentIdListEX: [666666, 777777]
          }
        }
      },
      propsData: {
        filter: [],
        search: '光'
      }
    })

    let items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toEqual(wrapper.vm.$store.getters.equipmentIdListEX.length)
    expect(items).toEqual(wrapper.vm.$store.getters.equipmentIdListEX.map(x => String(x)).sort((x, y) => Number(y) - Number(x)))

    await wrapper.setProps({ filter: ['dodge'] })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(1)

    await wrapper.setProps({ search: '枪' })
    items = wrapper.findAll('itemfigure-stub').wrappers.map(item => item.attributes('id'))
    expect(items.length).toBe(0)
  })
})
