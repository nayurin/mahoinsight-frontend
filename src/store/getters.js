const getters = {
  curRank: state => {
    return state.curRank ? state.curRank : state.maxRank
  },

  curLevel: state => {
    return state.curLevel ? state.curLevel : state.maxLevel
  },

  getPrincessByName: (state) => (name) => {
    return state.chara[name]
  },

  getPrincessIdByName: (state) => (name) => {
    return state.chara[name].id
  },

  getPrincessById: (state) => (id) => {
    for (const key of Object.keys(state.chara)) {
      if (state.chara[key].id === id) return state.chara[key]
    }
  },

  getPrincessByRarity: (state) => (rarity) => {
    return Object.values(state.chara).filter(chara => chara.status.rarity === rarity)
  },

  getItemByName: (state) => (name) => {
    return state.item[name]
  },

  getItemById: (state) => (id) => {
    for (const key of Object.keys(state.item)) {
      if (state.item[key].id == id) return state.item[key]
    }
  },

  getItemIdByName: (state) => (name) => {
    return state.item[name].id
  },

  getItemNameById: (state) => (id) => {
    for (const key of Object.keys(state.item)) {
      if (state.item[key].id == id) return state.item[key].detail.equipment_name
    }
  },
  
  getRankColor: (state) => (rank) => {
    return state.rankColor[rank]
  }
}

export default getters