import Vue from 'vue'
import Vuex from 'vuex'

import state from '@/store/state'
import getters from '@/store/getters'
import FileLoader from '@/util/FileLoader'
import path from 'path'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    // deprecated, use the async one instead
    loadObjects (state, file) {
      const loader = new FileLoader(file)
      loader.loadSync()
      Vue.set(state, file, loader.objects)
    },

    // update vuex state props excludes database tables
    updateState (state, { key, value }) {
      Vue.set(state, key, value)
    },

    // update vuex state of database tables
    updateDatabase (state, { key, value, database }) {
      if (database) {
        if (!Object.prototype.hasOwnProperty.call(state.database, database)) {
          Vue.set(state.database, database, {})
        }
        Vue.set(state.database[database], key, value)
      } else {
        Vue.set(state.database, key, value)
      }
    },

    // insert a row in a vuex database table
    // THIS METHOD WILL ONLY INSERT AN NEW ROW AND WILL NOT UPDATE AN EXISTED ROW
    insertDatabaseRow (state, { key, value, database, table }) {
      if (state.database[database] && state.database[database][table]) {
        if (!Object.prototype.hasOwnProperty.call(state.database[database][table], key)) {
          Vue.set(state.database[database][table], key, value)
        }
      }
    },

    // update vuex state of plate's context
    updateContext (state, { key, value }) {
      if (value) {
        Vue.set(state.context, key, {...state.context[key], ...value})
      } else {
        Vue.delete(state.context, key)
      }
    }
  },
  actions: {
    // async func of load single file object
    loadObjects (context, { file, database }) {
      const loader = new FileLoader(file)
      loader.loadAsync().then(resp => {
        if (database) {
          const separatedName = path.basename(file).split('.')
          if (separatedName.length > 1) separatedName.pop()
          const tblName = separatedName.join('_')
          context.commit('updateDatabase', { key: tblName, value: resp, database: database })
        } else {
          context.commit('updateState', { key: file, value: resp })
        }
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
