// Libraries
import Vuetify from 'vuetify'

// Components
import EnemyFigure from '@/components/global/EnemyFigure'

// Utilities
/* eslint-disable no-unused-vars */
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('EnemyFigure.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountWrapper = (fn, options) => {
    return fn(EnemyFigure, {
      vuetify,
      localVue,
      ...options
    })
  }

  it('render an enemy figure to test atk type color presets', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEnemyParameter (...args) {
              return {
                unit_id: 200700,
                name: '木魂',
                resist_status_id: 0
              }
            },
            getUnitEnemyData (...args) {
              return {
                atk_type: 2,
                comment: '【魔法】中距离攻击投掷魔力弹，攻击偏后方的朽木魔物。'
              }
            }
          }
        }
      },
      propsData: {
        enemyid: 200700
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    const img = wrapper.get('v-img-stub')
    expect(img.attributes('src')).toBe(`/image/enemies/icon_unit_${wrapper.vm.$store.getters.getEnemyParameter().unit_id}.png`)
    expect(img.attributes('alt')).toBe(wrapper.vm.$store.getters.getEnemyParameter().name)

    const atkTypeLabel = wrapper.get('v-dialog-stub > v-card-stub > v-row-stub > v-chip-stub')
    const atkTypeColor = wrapper.vm.$store.getters.getUnitEnemyData().atk_type === 1 ? 'pink' : 'indigo'
    const atkTypeText = wrapper.vm.$store.getters.getUnitEnemyData().atk_type === 1 ? '物理' : '魔法'
    expect(atkTypeLabel.attributes('color')).toBe(atkTypeColor)
    expect(atkTypeLabel.text()).toBe(atkTypeText)
  })

  it('render an enemy figure to test stats values', () => {
    const wrapper = mountWrapper(shallowMount, {
      mocks: {
        $store: {
          state: {
            CDNBaseURL: ''
          },
          getters: {
            getEnemyParameter (...args) {
              return {
                unit_id: 200700,
                name: '木魂',
                resist_status_id: 0,
                level: 15,
                atk: 100,
                hp: 1000,
                def: 10
              }
            },
            getUnitEnemyData (...args) {
              return {
                atk_type: 2,
                comment: '【魔法】中距离攻击投掷魔力弹，攻击偏后方的朽木魔物。'
              }
            }
          }
        }
      },
      propsData: {
        enemyid: 200700
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()

    wrapper.findAll('v-list-item-stub').wrappers.forEach(list => {
      const statsName = list.get('v-list-item-stub > v-chip-stub:first-child').text()
      const statsValue = Number(list.get('v-list-item-stub > v-chip-stub:last-child').text())
      switch (statsName) {
        case '等级':
          expect(statsValue).toBe(wrapper.vm.$store.getters.getEnemyParameter().level)
          break
        case '生命值':
          expect(statsValue).toBe(wrapper.vm.$store.getters.getEnemyParameter().hp)
          break
        case '物理攻击力':
          expect(statsValue).toBe(wrapper.vm.$store.getters.getEnemyParameter().atk)
          break
        case '物理防御力':
          expect(statsValue).toBe(wrapper.vm.$store.getters.getEnemyParameter().def)
          break
        default:
          break
      }
    })
  })
})
