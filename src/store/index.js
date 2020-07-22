import Vue from 'vue'
import Vuex from 'vuex'

import state from '@/store/state'
import getters from '@/store/getters'
import FileLoader from '@/util/FileLoader'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    // deprecated, use the async one instead
    loadObjects (state, type) {
      const loader = new FileLoader(type)
      loader.loadSync()
      state[type] = loader.objects
    },

    // update vuex state props excludes database tables
    updateState (state, { key, value }) {
      state[key] = value
    },

    // update vuex state of database tables
    updateDatabase (state, { key, value, database }) {
      if (database) {
        if (!Object.prototype.hasOwnProperty.call(state.database, database)) {
          state.database[database] = {}
        }
        state.database[database][key] = value
      } else {
        state.database[key] = value
      }
    }
  },
  actions: {
    // async func of load single file object
    loadObjects (context, type) {
      const loader = new FileLoader(type)
      loader.loadAsync().then(resp => {
        context.commit('updateState', { key: type, value: resp })
      }).catch(e => {
        console.log(e)
      })
    },

    // async func of load files with Promise.all()
    loadAll (context) {
      const list = [
        {
          name: 'Ingame Events',
          source: '/cached/gameevents.json'
        },
        {
          name: 'FullDatabase CN',
          source: '/cached/master.json',
          database: {
            name: 'master',
            singletable: false
          }
        },
        {
          name: 'unit_promotion JP',
          source: '/cached/ng_master/unit_promotion.json',
          database: {
            name: 'ng',
            singletable: true,
            table: 'unit_promotion'
          }
        }
      ].map(x => {
        const loader = new FileLoader(x.source)
        return loader.loadAsync().then(resp => {
          if (x.database) {
            if (x.database.singletable) {
              context.commit('updateDatabase', { key: x.database.table, value: resp, database: x.database.name })
            } else {
              context.commit('updateDatabase', { key: x.database.name, value: resp })
            }
          } else {
            if (x.name === 'Ingame Events') {
              context.commit('updateState', { key: 'events', value: resp })
            }
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
