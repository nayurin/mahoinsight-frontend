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
    updateState (state, { key, value }) {
      state[key] = value
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
      const list = ['events', 'chara', 'quest', 'item', 'clanbattle'].map(x => {
        const box = new ObjectBox(x)
        return box.loadAsync().then(resp => {
          context.commit('updateState', { key: x, value: resp })
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
