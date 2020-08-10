// Libraries
import Vuetify from 'vuetify'

// Components
import PrincessCard from '@/components/princesses/PrincessCard'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('PrincessCard.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(PrincessCard, {
      vuetify,
      localVue,
      ...options
    })
  }

  it('render an chara card', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitData (...args) {
              return {
                normal_atk_cast_time: '铁剑',
                comment: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
              }
            },
            getPrincessPosition (...args) {
              return 1
            }
          }
        }
      },
      propsData: {
        id: 101001
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const img = wrapper.get('v-card-stub > v-img-stub')
    expect(img.attributes('src')).toBe(`${wrapper.vm.$store.state.CDNBaseURL}/image/character_stills/still_unit_${wrapper.props('id') + 30}.png`)

    const nactValue = wrapper.get('v-col-stub > v-list-item-stub:first-child > v-btn-stub:last-child')
    expect(nactValue.text()).toBe(`${wrapper.vm.$store.getters.getUnitData().normal_atk_cast_time}s`)

    const posImg = wrapper.get('v-col-stub > v-list-item-stub:last-child > v-img-stub')
    const pos = {
      1: `${wrapper.vm.$store.state.CDNBaseURL}/image/bg/front.png`,
      2: `${wrapper.vm.$store.state.CDNBaseURL}/image/bg/middle.png`,
      3: `${wrapper.vm.$store.state.CDNBaseURL}/image/bg/behind.png`
    }
    expect(posImg.attributes('src')).toBe(pos[wrapper.vm.$store.getters.getPrincessPosition()])
  })

  it('render an chara card to check comment', () => {
    const wrapper = mountWrapper(mount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getUnitData (...args) {
              return {
                normal_atk_cast_time: '铁剑',
                comment: '随处可见的廉价剑。对大部分学剑之人来说是重要的入门武器。'
              }
            },
            getPrincessPosition (...args) {
              return 1
            }
          }
        }
      },
      propsData: {
        id: 101001
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    const comment = wrapper.get('.v-card__text')
    expect(comment.text()).toBe(wrapper.vm.$store.getters.getUnitData().comment.replace(/\\n/g, '<br/>'))
  })
})
