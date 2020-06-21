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

  getPrincessPositionByName: (state) => (name) => {
    const saw = state.chara[name].status.search_area_width
    if (saw < state.widthThreshold[0]) return 1
    else if (saw >= state.widthThreshold[1]) return 3
    else return 2
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
  
  getItemStatsById: (state) => (id) => {
    let stats
    for (const key of Object.keys(state.item)) {
      if (state.item[key].id == id) {
        const item = state.item[key]
        stats = {
          生命值: parseFloat(item.detail.hp),
          物理攻击力: parseFloat(item.detail.atk),
          魔法攻击力: parseFloat(item.detail.magic_str),
          物理防御力: parseFloat(item.detail.def),
          魔法防御力: parseFloat(item.detail.magic_def),
          物理暴击: parseFloat(item.detail.physical_critical),
          魔法暴击: parseFloat(item.detail.magic_critical),
          生命值自动回复: parseFloat(item.detail.wave_hp_recovery),
          技能值自动回复: parseFloat(item.detail.wave_energy_recovery),
          回避: parseFloat(item.detail.dodge),
          物理穿透: parseFloat(item.detail.physical_penetrate),
          魔法穿透: parseFloat(item.detail.magic_penetrate),
          生命值吸收: parseFloat(item.detail.life_steal),
          回复量上升: parseFloat(item.detail.hp_recovery_rate),
          技能值上升: parseFloat(item.detail.energy_recovery_rate),
          技能值消耗降低: parseFloat(item.detail.energy_reduce_rate),
          命中: parseFloat(item.detail.accuracy)
        }
        for (const key of Object.keys(stats)) {
          if (stats[key] === 0) {
            delete stats[key]
          }
        }
        break
      }
    }
    return stats
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

  getQuestInfoById: (state) => (id) => {
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) return state.quest[diff][id].quest_info
    }
  },

  getQuestRewardById: (state) => (id) => {
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) return state.quest[diff][id].reward_info
    }
  },

  getQuestEnemyById: (state) => (id) => {
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) return state.quest[diff][id].enemy_info
    }
  },

  getQuestEnemyIdById: (state) => (id) => {
    const enemy_id = []
    for (const diff of state.difficulties) {
      if (state.quest[diff][id] && state.quest[diff][id].id === id) {
        for (const wave of Object.keys(state.quest[diff][id].enemy_info)) {
          for (const key of Object.keys(state.quest[diff][id].enemy_info[wave])) {
            enemy_id.push({
              [`${key}_in_${wave}`]: state.quest[diff][id].enemy_info[wave][key].enemy_id
            })        
          }
        }
      }
    }
    return enemy_id
  },

  getQuestEnemyInfoByEnemyId: (state) => (id) => {
    for (const diff of state.difficulties) {
      for (const quest of Object.values(state.quest[diff])) {
        for (const wave of Object.values(quest.enemy_info)) {
          for (const enemy of Object.values(wave)) {
            if (enemy.enemy_id === id) return enemy
          }
        }
      }
    }
  },

  getQuestEnemyResistanceByEnemyId: (state) => (id) => {
    for (const diff of state.difficulties) {
      for (const quest of Object.values(state.quest[diff])) {
        for (const wave of Object.values(quest.enemy_info)) {
          for (const enemy of Object.values(wave)) {
            if (enemy.enemy_id === id) return {
              减速: enemy.resist_status[0],
              加速: enemy.resist_status[1],
              麻痹: enemy.resist_status[2],
              冻结: enemy.resist_status[3],
              束缚: enemy.resist_status[4],
              睡眠: enemy.resist_status[5],
              眩晕: enemy.resist_status[6],
              石化: enemy.resist_status[7],
              拘留α: enemy.resist_status[8], //拘留
              拘留β: enemy.resist_status[9], //拘留(造成伤害)
              毒: enemy.resist_status[10],
              烧伤: enemy.resist_status[11],
              诅咒: enemy.resist_status[12],
              魅惑: enemy.resist_status[13],
              黑暗: enemy.resist_status[14],
              沉默: enemy.resist_status[15],
              即死: enemy.resist_status[16],
              击退: enemy.resist_status[17],
              混乱: enemy.resist_status[18],
              猛毒: enemy.resist_status[19]
            }
          }
        }
      }
    }
  },

  getQuestEnemyUnitIdByEnemyId: (state) => (id) => {
    for (const diff of state.difficulties) {
      for (const quest of Object.values(state.quest[diff])) {
        for (const wave of Object.values(quest.enemy_info)) {
          for (const enemy of Object.values(wave)) {
            if (enemy.enemy_id === id) return enemy.unit_id
          }
        }
      }
    }
  },

  getQuestEnemyNameByEnemyId: (state) => (id) => {
    for (const diff of state.difficulties) {
      for (const quest of Object.values(state.quest[diff])) {
        for (const wave of Object.values(quest.enemy_info)) {
          for (const enemy of Object.values(wave)) {
            if (enemy.enemy_id === id) return enemy.name
          }
        }
      }
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
  },

  getClanBattleScheduleById: (state) => (id) => {
    return state.clanbattle[Number(id)].period.schedule
  },

  getClanBattleRewardById: (state) => (id) => {
    const reward = []
    for ( let i = 1; i <= 3; i++) {
      reward.push(state.clanbattle[Number(id)].period.reward[0][`reward_id_${i}`])
    }
    return reward
  },

  getClanBattleMapById: (state) => (id) => {
    return state.clanbattle[Number(id)].mapdata
  },

  getClanBattleBossGroup: (state) => (id, phase) => {
    return state.clanbattle[Number(id)].mapdata[Number(phase)].clan_battle_boss_group
  }
}

export default getters
