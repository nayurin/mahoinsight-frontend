// Libraries
import Vuetify from 'vuetify'

// Components
import ItemRequirement from '@/components/items/ItemRequirement'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

const $route = {
  name: 'ItemDetail',
  path: '/item/detail/:itemName'
}

describe('ItemRequirement.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(ItemRequirement, {
      vuetify,
      localVue,
      ...options
    }) 
  }

  it('render a single figure to test chara figure', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitPromotionEX (...args) {
              return [
                {
                  unitId: 100101,
                  amount: 1,
                  promotionLevel: 1
                }
              ]
            },
            getRankColor (...args) {
              return 'blue'
            },
            getUnitData (...args) {
              return true
            }
          }
        }
      },
      propsData: {
        id: 101011
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const pFigure = wrapper.get('princessfigure-stub')
    expect(pFigure.attributes('id')).toBe(String(wrapper.vm.$store.getters.getUnitPromotionEX()[0].unitId))
  })

  it('render a single figure to test figure and promotion rank', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitPromotionEX (...args) {
              return [
                {
                  unitId: 100101,
                  amount: 1,
                  promotionLevel: 1
                }
              ]
            },
            getRankColor (...args) {
              return 'blue'
            },
            getUnitData (...args) {
              return true
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        id: 101011
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const rankLabel = wrapper.findAll('button.v-btn').at(1)
    expect(rankLabel.classes()).toContain(wrapper.vm.$store.getters.getRankColor())

    const rankLabelSpan = wrapper.get('button.v-btn > span.v-btn__content')
    expect(rankLabelSpan.text()).toBe(`Rank ${wrapper.vm.$store.getters.getUnitPromotionEX()[0].promotionLevel}`)
  })

  it('render a set of figures to test their promotion rank', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitPromotionEX (...args) {
              return [
                {
                  unitId: 100101,
                  amount: 1,
                  promotionLevel: 1
                },
                {
                  unitId: 100201,
                  amount: 2,
                  promotionLevel: 2
                }
              ]
            },
            getRankColor (...args) {
              return 'blue'
            },
            getUnitData (...args) {
              return true
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        id: 101011
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const charaCardList = wrapper.findAll('div.v-card > router-link-stub')
    expect(charaCardList.length).toBe(wrapper.vm.$store.getters.getUnitPromotionEX().length)

    for (let i = 0; i < charaCardList.length; i++) {
      expect(charaCardList.at(i).get('button.v-btn > span.v-btn__content').text()).toBe(`Rank ${wrapper.vm.$store.getters.getUnitPromotionEX()[i].promotionLevel}`)
    }
  })
})
