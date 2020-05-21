import Vue from 'vue'
import Vuex from 'vuex'

import ObjectBox from '@/util/ObjectBox'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    item: {},
    chara: {},
    quest: {}
  },
  mutations: {
    loadObjects (state, type) {
      const box = new ObjectBox(type)
      box.load()
      state[type] = box.objects
    }
  },
  actions: {
  },
  modules: {
  }
})
