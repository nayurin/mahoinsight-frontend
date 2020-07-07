export default {
  ChannelingAura (action, skillLevel) {
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
      value: Math.ceil(Number(action.action_value_2) + Number(action.action_value_3) * skillLevel),
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_4) + Number(action.action_value_5) * skillLevel,
      formula: `${action.action_value_4} + ${action.action_value_5}*技能等级`
    }
    const interception = action.action_detail_3

    if (Number(action.action_detail_2) === 1) {
      detail = `引导施法 ${duration.value} 【 ${duration.formula} 】秒，受到 ${interception} 次伤害时中断，${effect} $t ${typeMap[type]} ${stats.value} ${percentMark} 【 ${stats.formula} 】`
    } else {
      detail = `令 $t 的 ${typeMap[type]} ${effect} ${stats.value} ${percentMark} 【 ${stats.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
    }
    return detail
  }
}
