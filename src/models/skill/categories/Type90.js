export default {
  PassiveSkill (action, skillLevel) {
    let detail
    
    const typeMap = {
      1: '生命值',
      2: '物理攻击力',
      3: '物理防御力',
      4: '魔法攻击力',
      5: '魔法防御力',
      default: '未知属性'
    }

    const type = typeMap[action.action_detail_1] || typeMap.default
    const total = {
      value: Math.floor(Number(action.action_value_2) + Number(action.action_value_3) * skillLevel),
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级`
    }
    
    detail = `提升自身 ${type} ${total.value} 【 ${total.formula} 】`
    
    return detail
  }
}
