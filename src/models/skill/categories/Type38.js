export default {
  CastFieldAura (action, skillLevel) {
    let detail
    const percentMark = Number(action.action_value_1) === 1 ? '' : '%'
    const effect = Number(action.action_detail_1) % 10 === 0 ? '【上升】' : '【下降】'
    const type = Math.floor(Number(action.action_detail_1) / 10)
    const typeMap = {
      1: '物理攻击力',
      2: '物理防御力',
      3: '魔法攻击力',
      4: '魔法防御力',
      5: '回避',
      6: '物理暴击',
      7: '魔法暴击',
      8: '技能值上升',
      9: '生命值吸收',
      10: '移动速度',
      11: '物理暴击伤害',
      12: '魔法暴击伤害',
      13: '命中',
      default: ''
    }

    const stats = {
      value: Math.ceil(
        Number(action.action_value_1) + Number(action.action_value_2) * skillLevel
      ),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_3) + Number(action.action_value_4) * skillLevel,
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }
    const radius = action.action_value_5
    
    if (Number(action.target_type) === 11) {
      detail = `展开一片半径为 ${radius} 的区域，令 $t 的 ${typeMap[type]} ${effect} ${stats.value} ${percentMark} 【 ${stats.formula} 】，持续 ${duration.value}【${duration.formula}】 秒`
    } else {
      detail = `在 $t 的位置展开一片半径为 ${radius} 的区域，使得 ${typeMap[type]} ${effect} ${stats.value} ${percentMark} 【 ${stats.formula} 】，持续 ${duration.value}【${duration.formula}】秒`
    }
    
    return detail
  }
}
