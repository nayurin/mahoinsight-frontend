// Libraries
import Vuetify from 'vuetify'

// Components
import ItemSource from '@/components/items/ItemSource'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('ItemSource.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemSource, {
      vuetify,
      localVue,
      ...options
    }) 
  }

  it('render a list which has not duplicated sources', () => {
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
            getEquipmentData (...args) {
              return {
                craft_flg: 0
              }
            },
            getEquipmentSource (...args) {
              return [
                {
                  quest: [{
                    quest_id: 10001001
                  }]
                },
                {
                  quest: [
                    {
                      quest_id: 10001002
                    },
                    {
                      quest_id: 10001003
                    }
                  ]
                }
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

    const quests = wrapper.vm.$store.getters.getEquipmentSource()
      .reduce((t, v) => (t.push(v.quest), t), [])
      .flat()
    const sourceList = wrapper.findAll('v-row-stub > v-col-stub > questreward-stub').wrappers


    for (let i = 0; i < quests.length; i++) {
      expect(sourceList[i].attributes('id')).toBe(String(quests[i].quest_id))
      expect(sourceList[i].attributes('target')).toBe(String(wrapper.props('id')))
      expect(sourceList[i].attributes('link')).toBeTruthy()
    }
  })

  it('render a list which has duplicated sources', () => {
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
            getEquipmentData (...args) {
              return {
                craft_flg: 0
              }
            },
            getEquipmentSource (...args) {
              return [
                {
                  quest: [{
                    quest_id: 10001001
                  }]
                },
                {
                  quest: [
                    {
                      quest_id: 10001001
                    },
                    {
                      quest_id: 10001002
                    }
                  ]
                }
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

    const quests = wrapper.vm.$store.getters.getEquipmentSource()
      .reduce((t, v) => (t.push(v.quest), t), [])
      .flat()
      .reduce((t, v) => (t = t.includes(v.quest_id) ? [...t] : [...t, v.quest_id], t), [])

    const sourceList = wrapper.findAll('v-row-stub > v-col-stub > questreward-stub').wrappers

    for (let i = 0; i < quests.length; i++) {
      expect(sourceList[i].attributes('id')).toBe(String(quests[i]))
      expect(sourceList[i].attributes('target')).toBe(String(wrapper.props('id')))
      expect(sourceList[i].attributes('link')).toBeTruthy()
    }
  })

  it('render a list of the one crafted', () => {
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
            getEquipmentData (...args) {
              return {
                craft_flg: 1
              }
            },
            getEquipmentCraftBy (...args) {
              return [[123456, 1]]
            },
            getEquipmentSource (...args) {
              return [
                {
                  quest: [{
                    quest_id: 10001001
                  }]
                },
                {
                  quest: [
                    {
                      quest_id: 10001001
                    },
                    {
                      quest_id: 10001002
                    }
                  ]
                }
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

    wrapper.findAll('v-row-stub > v-col-stub > questreward-stub').wrappers.forEach(item => {
      expect(item.attributes('target')).toBe(String(wrapper.vm.$store.getters.getEquipmentCraftBy()[0][0]))
      expect(item.attributes('link')).toBeTruthy()
    })
  })
})
