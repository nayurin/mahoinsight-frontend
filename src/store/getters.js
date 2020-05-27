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
  },

  getQuestIdByName: (state) => (name) => {
    const q = [], re = /^.*\((.*[A-Z])\)$/
    for (const diff of state.difficulties) {
      for (const questid of Object.keys(state.quest[diff])) {
        if (state.quest[diff][questid].quest_info.quest_name === name) q.push(questid)
      }
    }
    if (name.match(re) && name.match(re)[1] === "H") {
      return q[1]
    } else if (name.match(re) && name.match(re)[1] === "VH"){
      return q[2]
    } else {
      return q[0]
    }
  },

  getQuestNameById: (state) => (id) => {
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) {
        switch (String(id).substring(0, 2)) {
          case "12":
            return `${state.quest[diff][id].quest_info.quest_name} (H)`
          default:
            return state.quest[diff][id].quest_info.quest_name
        }
      }
    }
  },

  getQuestRewardById: (state) => (id) => {
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) return state.quest[diff][id].reward_info
    }
  },

  getQuestArea: (state) => () => {
    const obj = {
      normal: [],
      hard: [],
      other: []
    }
    for (const area of state.quest.area) {
      switch (String(area.area_id).substring(0, 2)) {
        case "11":
          obj.normal.push({
            area_id: area.area_id,
            area_name: area.area_name
          })
          break
        case "12":
          obj.hard.push({
            area_id: area.area_id,
            area_name: `${area.area_name} (H)`
          })
          break
        default:
          obj.other.push({
            area_id: area.area_id,
            area_name: area.area_name
          })
      }
    }
    return obj
  },

  getQuestListByArea: (state) => (areaid) => {
    const arr = []
    for (const diff of state.difficulties) {
      for (const quest of Object.values(state.quest[diff])) {
        if (quest.quest_info.area_id === areaid) {
          arr.push(quest.id)
        }
      }
    }
    return arr
  }
}

export default getters