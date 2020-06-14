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
    loadObjects (state, type) {
      const box = new ObjectBox(type)
      box.load()
      state[type] = box.objects
    },
    loadGitCommit (state, hash) {
      state['gitcommit'] = hash
    },
    updateCurrentRank (state, rank) {
      if (parseInt(Number(rank)) > 0 && parseInt(Number(rank)) <= state.maxRank) {
        state.curRank = parseInt(Number(rank))
      }
    },
    updateCurrentLevel (state, level) {
      if (parseInt(Number(level)) > 0 && parseInt(Number(level)) <= state.maxLevel) {
        state.curLevel = parseInt(Number(level))
      }
    },
    updateCurrentAtk (state, atk) {
      state['curAtk'] = Number(atk)
    },
    change2MobileMode (state) {
      state['mobile'] = true
    }
  },
  actions: {
  },
  modules: {
  }
})
