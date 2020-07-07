export default {
  Invulnerable (action, skillLevel) {
    let detail
    const typeMap = {
      1: 'nodamage',
      2: 'physics',
      3: 'all',
      4: 'abnormal',
      5: 'debuff',
      6: 'break',
      default: 'unknown'
    }

    const type = typeMap[action.action_detail_1] || typeMap.default
    const duration = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }

    switch (type) {
      case 'nodamage':
        detail = `令 $t 完全回避所有伤害，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 'physics':
        detail = `令 $t 完全回避物理伤害，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 'break':
        detail = `令 $t 完全回避 Break 效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      default:
        detail = `令 $t 完全回避未知类型的伤害或状态，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
    }
    
    return detail
  }
}
