export default {
  EnchantLifeSteal (action, skillLevel) {
    let detail

    const additional = {
      value: Math.floor(Number(action.action_value_1) + Number(action.action_value_2) * skillLevel),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const stack = {
      value: Math.floor(Number(action.action_value_3) + Number(action.action_value_4) * skillLevel),
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }

    detail = `使 $t 的下 ${stack.value}【 ${stack.formula} 】 次攻击附加额外 ${additional.value}【 ${additional.formula} 】 生命值吸收`
    return detail
  }
}
