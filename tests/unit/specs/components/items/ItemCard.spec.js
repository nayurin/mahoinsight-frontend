// Libraries
import Vuetify from 'vuetify'

// Components
import ItemCard from '@/components/items/ItemCard'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('ItemCard.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemCard, {
      vuetify,
      localVue,
      ...options
    })
  }

  it('render an item card with a title of item name', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEquipmentData (...args) {
              return {
                equipment_name: '铁剑',
                description: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
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

    const title = wrapper.get('v-card-title-stub')
    expect(title.text()).toBe(wrapper.vm.$store.getters.getEquipmentData().equipment_name)
  })

  it('render an item card with a figure of item', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEquipmentData (...args) {
              return {
                equipment_name: '铁剑',
                description: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
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

    const img = wrapper.get('v-img-stub')
    expect(img.attributes('src')).toBe(`${wrapper.vm.$store.state.CDNBaseURL}/image/equipments/icon_equipment_${wrapper.props('id')}.png`)
  })

  it('render an item card with a description of the item', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEquipmentData (...args) {
              return {
                equipment_name: '铁剑',
                description: '随处可见的廉价剑。\\n对大部分学剑之人来说是重要的入门武器。'
              }
            }
          }
        }
      },
      stubs: ['ItemStatus'],
      propsData: {
        id: 101011
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const desc = wrapper.get('.v-card > .v-card__text')
    expect(desc.text()).toBe(wrapper.vm.$store.getters.getEquipmentData().description.replace(/\\n/g, ''))
  })
})
