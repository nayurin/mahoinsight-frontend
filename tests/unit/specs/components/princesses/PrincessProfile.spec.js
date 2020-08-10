// Libraries
import Vuetify from 'vuetify'

// Components
import PrincessProfile from '@/components/princesses/PrincessProfile'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
const charaFrags = {
  地下城商店: [31060, 31034, 31006, 31045, 31051, 31010, 31029],
  竞技场商店: [31001, 31004, 31046, 31053, 31011],
  公主竞技场商店: [31016, 31007, 31017, 31012, 31009],
  行会商店: [31025, 31022, 31042, 31043, 31018]
}

describe('PrincessProfile.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(PrincessProfile, {
      vuetify,
      localVue,
      ...options
    })
  }

  it('render an chara profile table', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: '',
            charaFragByTokens: charaFrags
          },
          getters: {
            getUnitProfile (...args) {
              return {
                birth_month: '铁剑',
                birth_day: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
              }
            },
            getUnitBackground (...args) {
              return '角色全名'
            },
            getQuestRewardById (...args) {
              return 
            },
            getQuestDataByDiff: {
              hard: []
            }
          }
        }
      },
      propsData: {
        id: 101001
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const tableData = wrapper.findAll('tbody > tr > td:last-child')
    expect(tableData.at(0).text()).toBe(wrapper.vm.$store.getters.getUnitBackground())
    expect(tableData.at(2).text()).toBe(`${wrapper.vm.$store.getters.getUnitProfile().birth_month}月${wrapper.vm.$store.getters.getUnitProfile().birth_day}日`)
  })

  it('render an chara profile table to check source of memory pieces', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: '',
            charaFragByTokens: charaFrags
          },
          getters: {
            getUnitProfile (...args) {
              return {
                birth_month: '铁剑',
                birth_day: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
              }
            },
            getUnitBackground (...args) {
              return '角色全名'
            },
            getQuestRewardById (...args) {
              return 
            },
            getQuestDataByDiff: {
              hard: []
            }
          }
        }
      },
      propsData: {
        id: 101001
      }
    })

    const setCharaId = async (id) => {
      if (id) {
        await wrapper.setProps({ id })
      } else {
        id = wrapper.props('id')
      }

      expect(wrapper.html()).toMatchSnapshot()

      const fragId = (id - id % 100) / 100 + 30000
      const sourceData = wrapper.get('tbody > tr:last-child > td:last-child')
      for (const tokenSource of Object.keys(charaFrags)) {
        if (charaFrags[tokenSource].includes(fragId)) {
          expect(sourceData.text()).toBe(tokenSource)
        }
      }
    }
    
    setCharaId()
    setCharaId(100101)
    setCharaId(100901)
    setCharaId(102201)
  })
})
