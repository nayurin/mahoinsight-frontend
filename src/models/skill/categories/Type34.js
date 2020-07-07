export default {
  AccumulativeDamage (action, skillLevel) {
    let detail

    const additional = {
      value: Number(action.action_value_2) + Number(action.action_value_3) * skillLevel,
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级`
    }
    const stack = {
      value: Number(action.action_value_4) + Number(action.action_value_5) * skillLevel,
      formula: `${action.action_value_4} + ${action.action_value_5}*技能等级`
    }

    detail = `对当前目标的每次攻击附加额外 ${additional.value}【 ${additional.formula} 】 伤害，此效果最多叠加 ${stack.value}【 ${stack.formula} 】层`
    return detail
  }
}
