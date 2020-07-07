export default {
  ChargingDamage (action, skillLevel) {
    let detail

    const total = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const delay = action.action_value_3
    
    detail = `蓄力 ${delay} 秒，接下来造成 ${total.value} 【 ${total.formula} 】 * 所受伤害 的额外伤害`

    return detail
  }
}
