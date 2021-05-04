const getters = {
  curRank: state => ({ from=false, to=false }) => {
    if (from && !to) {
      return state.rankFrom ? String(state.rankFrom) : String(state.maxRank)
    } else if (to && !from) {
      return state.rankTo ? String(state.rankTo) : String(state.maxRank)
    } else {
      return state.curRank ? String(state.curRank) : String(state.maxRank)
    }
  },

  curLevel: state => {
    return state.curLevel ? state.curLevel : state.maxLevel
  },

  // get raw data of chara_story_status by storyid
  // returns: object
  getCharaStoryStatus: (state) => (storyId) => {
    return state.database['master'].chara_story_status[storyId]
  },

  // packaged methods of get story bonus by chara name or chara baseid
  // priority: baseid > name
  // returns: object
  // suggested
  getCharaStoryStatusEX: (state) => ({name, baseid}) => {
    baseid = Number(baseid)
    const result = {}
    const re = /(.*?)的小故事/
    const statusmap = {
      1: '生命值',
      2: '物理攻击力',
      3: '物理防御力',
      4: '魔法攻击力',
      5: '魔法防御力',
      6: '物理暴击',
      7: '魔法暴击',
      8: '回避',
      9: '生命值吸收',
      10: '生命值自动回复',
      11: '技能值自动回复',
      12: '物理穿透',
      13: '魔法穿透',
      14: '技能值上升',
      15: '回复量上升',
      16: '技能值消耗降低',
      17: '命中'
    }
    const addStories = (id) => {
      for (const story of Object.values(state.database['master'].chara_story_status)) {
        for (let i = 1; i <= 10; i++) {
          if (story[`chara_id_${i}`] === id) {
            const bonusstats = {}
            for (let i = 1; i <= 5; i++) {
              if (story[`status_type_${i}`]) {
                bonusstats[statusmap[story[`status_type_${i}`]]] = story[`status_rate_${i}`]
              }
            }
            result[story.unlock_story_name] = bonusstats
          }
        }
      }
    }

    if (baseid) {
      addStories(baseid)
    } else {
      let _baseid
      for (const story of Object.values(state.database['master'].chara_story_status)) {
        if (story.unlock_story_name.match(re)[1] === name) {
          _baseid = (story.story_id - story.story_id % 1000) / 1000
          break
        }
      }
      if (_baseid) {
        addStories(_baseid)
      }
    }
    return result
  },

  // get raw data of clan_battle_boss_group by clanbattlebossgroupid and ordernum
  // returns: object
  getClanBattleBossGroup: (state) => (clanBattleBossGroupId, orderNum) => {
    return state.database['master'].clan_battle_boss_group[`${clanBattleBossGroupId}#${orderNum}`]
  },

  // get raw data of clan_battle_map_data by clanbattleid
  // returns: object[]
  getClanBattleMapData: (state) => (clanBattleId) => {
    return Object.values(state.database['master'].clan_battle_map_data).filter(x => x.clan_battle_id === Number(clanBattleId))
  },

  // get raw data of clan_battle_s_map_data by clanbattleid
  // returns: object[]
  getClanBattle2MapData: (state) => (clanBattleId) => {
    return Object.values(state.database['master'].clan_battle_2_map_data).filter(x => x.clan_battle_id === Number(clanBattleId))
  },

  // get raw data of clan_battle_period by clanbattleid
  // returns: object
  getClanBattlePeriod: (state) => (clanBattleId) => {
    return state.database['master'].clan_battle_period[`${clanBattleId}#1`]
  },

  // get reward itemid from clan_battle_period_rank_reward by clanbattleid
  // returns: number[]
  getClanBattlePeriodRankReward: (state) => (clanBattleId) => {
    clanBattleId = Number(clanBattleId)
    let reward = []
    const rankList = Object.values(state.database['master'].clan_battle_period_rank_reward).filter(x => x.clan_battle_id === clanBattleId)
    if (rankList.length) {
      reward.push(rankList[0].reward_id_1, rankList[0].reward_id_2, rankList[0].reward_id_3)
    } else {
      switch (clanBattleId) {
        case 1004:
          reward = [91002, 90006, 31018]
          break
        case 1005:
          reward = [91002, 90006, 31025]
          break
        case 1006:
          reward = [91002, 90006, 31043]
          break
        case 1007:
          reward = [91002, 90006, 31022]
          break
        case 1008:
          reward = [91002, 90006, 31042]
          break
        case 1009:
          reward = [91002, 90006, 31018]
          break
        case 1010:
          reward = [91002, 90006, 31025]
          break
        case 1011:
          reward = [91002, 90006, 31043]
          break
        case 1012:
          reward = [91002, 90006, 31022]
          break
        case 1013:
          reward = [91002, 90006, 31042]
          break
        default:
          break
      }
    }
    return reward
  },

  // get raw data of enemy_parameter by enemyid
  // returns: object
  getEnemyParameter: (state) => (enemyId) => {
    return state.database['master'].enemy_parameter[enemyId]
  },

  // get raw data of enemy_reward_data by droprewardid
  // returns: object
  getEnemyRewardData: (state) => (dropRewardId) => {
    return state.database['master'].enemy_reward_data[dropRewardId]
  },

  // get raw data of equipment_craft by equipmentid
  // returns: object
  getEquipmentCraft: (state) => (equipmentId) => {
    return state.database['master'].equipment_craft[equipmentId]
  },

  // get array-format equipment craft data by equipmentid
  // returns: [number, number][]
  getEquipmentCraftBy: (state) => (equipmentId) => {
    const craft = state.database['master'].equipment_craft[equipmentId]
    if (!craft) return []
    const by = []
    for (let i = 1; i <= 10; i++) {
      if (craft[`condition_equipment_id_${i}`]) {
        by.push([craft[`condition_equipment_id_${i}`], craft[`consume_num_${i}`]])
      }
    }
    return by
  },

  // get raw data of equipment_data by equipmentid
  // returns: object
  getEquipmentData: (state) => (equipmentId) => {
    return state.database['master'].equipment_data[equipmentId]
  },

  // get raw data of item_data by itemid
  // returns: object
  getItemData: (state) => (itemId) => {
    return state.database['master'].item_data[itemId]
  },

  // get raw data of quest_area_data by areaid
  // returns: object
  getQuestAreaData: (state) => (areaId) => {
    return state.database['master'].quest_area_data[areaId]
  },

  // get raw data of quest_data by questid
  // returns: object
  getQuestData: (state) => (questId) => {
    return state.database['master'].quest_data[questId]
  },

  // get resistance of resiststatusid
  // returns: object
  getResistData: (state) => (resistStatusId) => {
    const resist = state.database['master'].resist_data[resistStatusId]
    return {
      减速: resist?.ailment_1,
      加速: resist?.ailment_2,
      麻痹: resist?.ailment_3,
      冻结: resist?.ailment_4,
      束缚: resist?.ailment_5,
      睡眠: resist?.ailment_6,
      眩晕: resist?.ailment_7,
      石化: resist?.ailment_8,
      拘留α: resist?.ailment_9, //拘留
      拘留β: resist?.ailment_10, //拘留(造成伤害)
      毒: resist?.ailment_11,
      烧伤: resist?.ailment_12,
      诅咒: resist?.ailment_13,
      魅惑: resist?.ailment_14,
      黑暗: resist?.ailment_15,
      沉默: resist?.ailment_16,
      即死: resist?.ailment_17,
      击退: resist?.ailment_18,
      混乱: resist?.ailment_19,
      猛毒: resist?.ailment_20
    }
  },

  // get raw data of skill_action by actionid
  // returns: object
  getSkillAction: (state) => (actionId) => {
    return state.database['master'].skill_action[actionId]
  },

  // get raw data of skill_data by skillid
  // returns: object
  getSkillData: (state) => (skillId) => {
    return state.database['master'].skill_data[skillId]
  },

  // get raw data of unique_equipment_data by equipmentid
  // returns: object
  getUniqueEquipmentData: (state) => (equipmentId) => {
    return state.database['master'].unique_equipment_data[equipmentId]
  },

  // get raw data of unique_equipment_enhance_rate by equipmentid
  // returns: object
  getUniqueEquipmentEnhanceRate: (state) => (equipmentId) => {
    return state.database['master'].unique_equipment_enhance_rate[equipmentId]
  },

  // get raw data of unique_equipment_rankup by equipmentid
  // returns: object[]
  getUniqueEquipmentRankup: (state) => (equipmentId) => {
    return Object.values(state.database['master'].unique_equipment_rankup).filter(x => x.equip_id === Number(equipmentId))
  },

  // get filtered data of unique_equipment_rankup by equipmentid and rank
  // returns: object[]
  getUniqueEquipmentRankupEX: (state) => (equipmentId, equipmentLevel) => {
    return Object.values(state.database['master'].unique_equipment_rankup).filter(x => x.equip_id === Number(equipmentId) && x.unit_level < Number(equipmentLevel))
  },

  // get raw data of unique_equipment_enhance_data by equipmentlevel
  // returns: object
  getUniqueEquipmentEnhanceData: (state) => (equipmentLevel) => {
    return state.database['master'].unique_equipment_enhance_data[equipmentLevel]
  },

  // get filtered data of unique_equipment_enhance_data from level 1 to the specified level
  // returns: object[]
  getUniqueEquipmentEnhanceDataEX: (state) => (equipmentLevel) => {
    return Object.values(state.database['master'].unique_equipment_enhance_data).filter(x => x.enhance_level <= Number(equipmentLevel))
  },

  // get raw data of unit_attack_pattern by unit_id
  // returns: object[]
  getUnitAttackPattern: (state) => (unitId) => {
    return Object.values(state.database['master'].unit_attack_pattern).filter(x => x.unit_id === Number(unitId))
  },

  // get chara fullname by unitid
  // returns: string
  getUnitBackground: (state) => (unitId) => {
    return state.database['master'].unit_background[unitId]?.unit_name
  },

  // get raw data of unit_data by unitid
  // returns: object
  getUnitData: (state) => (unitId) => {
    return state.database['master'].unit_data[unitId]
  },

  // get raw data of unit_enemy_data by unitid
  // returns: object
  getUnitEnemyData: (state) => (unitId) => {
    return state.database['master'].unit_enemy_data[unitId]
  },

  // get raw data of unit_profile by unitid
  // returns: object
  getUnitProfile: (state) => (unitId) => {
    return state.database['master'].unit_profile[unitId]
  },

  // get raw data of unit_promotion by unitid and promotionlevel
  // returns: object
  getUnitPromotion: (state) => (unitId, promotionLevel) => {
    return state.database['master'].unit_promotion[`${unitId}#${promotionLevel}`]
  },

  // get unitid, promotionlevel and amounts of promotion data with equipmentid
  // return: object[]
  getUnitPromotionEX: (state) => (equipmentId, ng=false) => {
    const arr = []
    const database = ng ? state.database['ng'] : state.database['master']
    Object.values(database.unit_promotion).map(x => {
      let count = 0
      for (let i = 1; i <= 6; i++) {
        if (x[`equip_slot_${i}`] === Number(equipmentId)) count++
      }
      if (count) {
        arr.push({
          unitId: x.unit_id,
          promotionLevel: x.promotion_level,
          amount: count
        })
      }
    })
    return arr
  },

  // get unit promotion's full data by unitid
  // returns: object
  getUnitPromotionFull: (state) => (unitId) => {
    const data = {}
    for (const promotion of Object.values(state.database['master'].unit_promotion).filter(x => x.unit_id === Number(unitId))) {
      data[promotion.promotion_level] = promotion
    }
    return data
  },

  // get unit promotion's full data by unitid within database ng
  // returns: object
  getUnitPromotionFullNG: (state) => (unitId) => {
    const data = {}
    for (const promotion of Object.values(state.database['ng'].unit_promotion).filter(x => x.unit_id === Number(unitId))) {
      data[promotion.promotion_level] = promotion
    }
    return data
  },

  // get raw data of unit_promotion_status by unitid and promotionlevel
  // returns: object
  getUnitPromotionStatus: (state) => (unitId, promotionLevel) => {
    return state.database['master'].unit_promotion_status[`${unitId}#${promotionLevel}`]
  },

  // get raw data of unit_rarity by unitid and rarity
  // returns: object
  getUnitRarity: (state) => (unitId, rarity) => {
    return state.database['master'].unit_rarity[`${unitId}#${rarity}`]
  },

  // get raw data of unit_skill_data by unitid
  // returns: object
  getUnitSkillData: (state) => (unitId) => {
    return state.database['master'].unit_skill_data[unitId]
  },

  // get raw data of wave_group_data by unitid
  // returns: object[]
  getWaveGroupData: (state) => (waveGroupId) => {
    return Object.values(state.database['master'].wave_group_data).filter(x => x.wave_group_id === Number(waveGroupId))
  },

  // returns: string[]
  princessIdList: (state) => {
    return Object.keys(state.database['master'].unit_data).filter(x => x[0] === '1' && x[1] !== '9')
  },

  // returns: string[]
  equipmentIdList: (state) => {
    return Object.keys(state.database['master'].equipment_data)
  },

  // filtered equipments which need not craft
  // returns: string[]
  equipmentIdListEX: (state) => {
    return Object.keys(state.database['master'].equipment_data).filter(x => x[1] === '0')
  },

  // returns: string[]
  questIdList: (state) => {
    return Object.keys(state.database['master'].quest_data)
  },

  // returns: object[]
  getQuestsByAreaId: (state) => (areaId) => {
    return Object.values(state.database['master'].quest_data).filter(x => x.area_id === Number(areaId))
  },

  // get position of a princess by unitid
  // returns: number
  getPrincessPosition: (state) => (unitId) => {
    const saw = state.database['master'].unit_data[unitId].search_area_width
    if (saw < state.widthThreshold[0]) return 1
    else if (saw >= state.widthThreshold[1]) return 3
    else return 2
  },

  //get unitid by unitname
  // returns: number
  getPrincessIdByName: (state) => (name) => {
    const chara = Object.values(state.database['master'].unit_data).filter(x => x.unit_name === name)[0]
    if (!chara) return
    return chara.unit_id
  },

  // get equipment stats by equipmentid
  // returns object
  getEquipmentStatsById: (state) => (equipmentId, ignoreCraftFlag) => {
    let equip
    switch (String(equipmentId)[1]) {
      case '1': case '2':
        if (ignoreCraftFlag) {
          equip = state.database['master'].equipment_data[`${Number(equipmentId) % 10000 + 100000}`]
        } else {
          return {}
        }
        break
      case '3':
        equip = state.database['master'].unique_equipment_data[equipmentId]
        break
      default:
        equip = state.database['master'].equipment_data[equipmentId]
    }
    const stats = {
      生命值: equip?.hp,
      物理攻击力: equip?.atk,
      魔法攻击力: equip?.magic_str,
      物理防御力: equip?.def,
      魔法防御力: equip?.magic_def,
      物理暴击: equip?.physical_critical,
      魔法暴击: equip?.magic_critical,
      生命值自动回复: equip?.wave_hp_recovery,
      技能值自动回复: equip?.wave_energy_recovery,
      回避: equip?.dodge,
      物理穿透: equip?.physical_penetrate,
      魔法穿透: equip?.magic_penetrate,
      生命值吸收: equip?.life_steal,
      回复量上升: equip?.hp_recovery_rate,
      技能值上升: equip?.energy_recovery_rate,
      技能值消耗降低: equip?.energy_reduce_rate,
      命中: equip?.accuracy
    }
    for (const key of Object.keys(stats)) {
      if (!stats[key]) {
        delete stats[key]
      }
    }
    return stats
  },

  // get crafted equipment name from item or equipment id
  // returns: string
  getCraftedEquipmentNameByItemId: (state) => (id) => {
    if (String(id).length === 5) {
      if ([91001, 91002].includes(Number(id))) {
        return '宝石'
      } else {
        return state.database['master'].item_data[id]?.item_name
      }
    } else if (String(id).length === 6) {
      switch (String(id)[1]) {
        case '1': case '2':
          return state.database['master'].equipment_data[`${Number(id) % 10000 + 100000}`]?.equipment_name
        case '3':
          return state.database['master'].unique_equipment_data[id]?.equipment_name
        default:
          return state.database['master'].equipment_data[id]?.equipment_name
      }
    }
  },

  // get rank color
  // returns: string
  getRankColor: (state) => (rank) => {
    return state.rankColor[rank]
  },

  // get enemy details by enemyid
  // returns: object
  getEnemyDetailsByEnemyId: (state) => (enemyId) => {
    const unitid = state.database['master'].enemy_parameter[enemyId]?.unit_id
    if (!unitid) return {}
    const skill = state.database['master'].unit_skill_data[unitid]
    const parameter = {...state.database['master'].enemy_parameter[enemyId], ...state.database['master'].unit_enemy_data[unitid]}
    return {
      skill,
      parameter
    }
  },

  // get unit skill details by unitid
  // returns: object
  getUnitSkillDataEX: (state) => (unitId) => {
    const unitSkill = JSON.parse(JSON.stringify(state.database['master'].unit_skill_data[unitId]))
    if (!unitSkill) return
    delete unitSkill.unit_id
    for (const key of Object.keys(unitSkill)) {
      if (unitSkill[key]) {
        unitSkill[key] = state.database['master'].skill_data[unitSkill[key]]
      } else {
        delete unitSkill[key]
      }
    }
    return unitSkill
  },

  // get quest data from quest diff
  // returns: object
  getQuestDataByDiff: (state) => {
    return {
      normal: Object.values(state.database['master'].quest_data).filter(x => String(x.area_id).substring(0, 2) === '11'),
      hard: Object.values(state.database['master'].quest_data).filter(x => String(x.area_id).substring(0, 2) === '12').map(x => { const y = JSON.parse(JSON.stringify(x)); y.quest_name = `${y.quest_name}(H)`; return y }),
      vh: Object.values(state.database['master'].quest_data).filter(x => String(x.area_id).substring(0, 2) === '13').map(x => { const y = JSON.parse(JSON.stringify(x)); y.quest_name = `${y.quest_name}(VH)`; return y }),
      other: Object.values(state.database['master'].quest_data).filter(x => !['11', '12', '13'].includes(String(x.area_id).substring(0, 2)))
    }
  },

  // get quest data from quest diff
  // returns: object
  getQuestAreaDataByDiff: (state) => {
    return {
      normal: Object.values(state.database['master'].quest_area_data).filter(x => String(x.area_id).substring(0, 2) === '11'),
      hard: Object.values(state.database['master'].quest_area_data).filter(x => String(x.area_id).substring(0, 2) === '12').map(x => { const y = JSON.parse(JSON.stringify(x)); y.area_name = `${y.area_name}(H)`; return y }),
      vh: Object.values(state.database['master'].quest_area_data).filter(x => String(x.area_id).substring(0, 2) === '13').map(x => { const y = JSON.parse(JSON.stringify(x)); y.area_name = `${y.area_name}(VH)`; return y }),
      other: Object.values(state.database['master'].quest_area_data).filter(x => !['11', '12', '13'].includes(String(x.area_id).substring(0, 2))) 
    }
  },

  // get equipment id by equipment name
  // returns: number
  getEquipmentIdByName: (state) => (name) => {
    return Object.values(state.database['master'].equipment_data).filter(x => x.equipment_name === name).map(x => x.equipment_id)[0]
  },

  // get equipment source by equipmentid
  // returns: object[]
  getEquipmentSource: (state) => (equipmentId) => {
    if (state.database['master'].equipment_data[equipmentId].craft_flg) return
    const source = []
    Object.values(state.database['master'].enemy_reward_data)
      .filter(x => {
        return [
          x.reward_id_1,
          x.reward_id_2,
          x.reward_id_3,
          x.reward_id_4,
          x.reward_id_5
        ].includes(Number(equipmentId))
      })
      .map(reward => {
        const data = {}
        for (let i = 1; i <= 5; i++) {
          if (reward[`reward_id_${i}`] === Number(equipmentId)) {
            data.drop_count = reward.drop_count,
            data.reward_num = reward[`reward_num_${i}`]
            data.odds = reward[`odds_${i}`]
            data.quest = []
          }
        }
        for (const wavegroup of Object.values(state.database['master'].wave_group_data)) {
          for (let i = 1; i <= 5; i++) {
            if (wavegroup[`drop_reward_id_${i}`] === reward.drop_reward_id) {
              data.odds *= wavegroup.odds / 100
              const quest = Object.values(state.database['master'].quest_data).filter(y => [
                y.wave_group_id_1,
                y.wave_group_id_2,
                y.wave_group_id_3
              ].includes(wavegroup.wave_group_id))
              switch (quest.length) {
                case 0:
                  break
                case 1:
                  data.quest.push({
                    quest_id: quest[0].quest_id,
                    area_id: quest[0].area_id,
                    quest_name: quest[0].quest_name,
                    stamina: quest[0].stamina
                  })
                  break
                default:
                  throw new Error('Over 1 matched results!')
              }
            }
          }
        }
        source.push(data)
      })
    return source
  },

  // get rewards of a quest by questid
  // returns: object[]
  getQuestRewardById: (state) => (questId) => {
    const rewards = []
    const waves = [
      state.database['master'].quest_data[questId]?.wave_group_id_1,
      state.database['master'].quest_data[questId]?.wave_group_id_2,
      state.database['master'].quest_data[questId]?.wave_group_id_3
    ]
    for (const wavegroupid of waves) {
      for (const wave of Object.values(state.database['master'].wave_group_data).filter(x => x.wave_group_id === wavegroupid)) {
        [
          wave.drop_reward_id_1,
          wave.drop_reward_id_2,
          wave.drop_reward_id_3,
          wave.drop_reward_id_4,
          wave.drop_reward_id_5,
        ]
          .filter(x => x)
          .map(x => {
            const reward = state.database['master'].enemy_reward_data[x]
            const combinedReward = []
            for (let i = 1; i <= 5; i++) {
              if (reward[`odds_${i}`]){
                combinedReward.push({
                  itemid: reward[`reward_id_${i}`],
                  odds: reward[`odds_${i}`] * wave.odds / 100,
                  reward_num: reward[`reward_num_${i}`],
                  drop_count: reward.drop_count
                })
              }
            }
            rewards.push(combinedReward)
          })
      }
    }
    return rewards
  },

  // get a list of equipment which is used to be the 1st position in rank promotion
  // returns: number[]
  get1stEquipmentList: (state) => (ng=false) => {
    const database = ng ? state.database['ng'] : state.database['master']
    const data = Object.values(database.unit_promotion)
      .filter(x => String(x.unit_id)[0] === '1')
      .reduce((t, v) => (t.push(v.equip_slot_1), t), [])
      .filter(x => x !== 999999)
    return Array.from(new Set(data))
  }
}

export default getters
