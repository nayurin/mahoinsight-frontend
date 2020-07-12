import Vue from 'vue'
import Vuex from 'vuex'

import state from '@/store/state'
import getters from '@/store/getters'
import ObjectBox from '@/util/ObjectBox'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    // deprecated, use the async one instead
    loadObjects (state, type) {
      const box = new ObjectBox(type)
      box.loadSync()
      state[type] = box.objects
    },

    // update vuex state props excludes database tables
    updateState (state, { key, value }) {
      state[key] = value
    },

    // update vuex state of database tables
    updateDatabase (state, { key, value }) {
      state.database[key] = value
    }
  },
  actions: {
    // async func of load single file object
    loadObjects (context, type) {
      const box = new ObjectBox(type)
      box.loadAsync().then(resp => {
        context.commit('updateState', { key: type, value: resp })
      }).catch(e => {
        console.log(e)
      })
    },

    // async func of load files with Promise.all()
    loadAll (context) {
      // const list = ['events', 'chara', 'quest', 'item', 'clanbattle'].map(x => {
      const list = [
        'gameevents',
        'clan_battle_map_data',
        'clan_battle_boss_group',
        'clan_battle_period',
        'clan_battle_period_rank_reward',
        'wave_group_data',
        'enemy_parameter',
        'unit_enemy_data',
        'enemy_reward_data',
        'resist_data',
        'unit_attack_pattern',
        'unit_skill_data',
        'unit_data',
        'unit_profile',
        'unit_background',
        'unit_rarity',
        'unit_promotion',
        'unit_promotion_status',
        'chara_story_status',
        'skill_data',
        'skill_action',
        'item_data',
        'equipment_data',
        'equipment_craft',
        'unique_equipment_data',
        'unique_equipment_enhance_rate',
        'quest_data',
        'quest_area_data'
      ].map(x => {
        const box = new ObjectBox(x)
        return box.loadAsync().then(resp => {
          switch (x) {
            case 'gameevents':
              context.commit('updateState', { key: 'events', value: resp })
              break
            default:
              context.commit('updateDatabase', { key: x, value: resp })
          }
        })
      })
      Promise.all(list).then(() => {
        context.commit('updateState', { key: 'loaded', value: true })
      })
    }
  },
  modules: {
  }
})
