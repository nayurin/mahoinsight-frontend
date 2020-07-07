export default {
  ChangeEnergy (action, skillLevel) {
    let detail

    const total = {
      value: Math.ceil(Number(action.action_value_1) + Number(action.action_value_2) * skillLevel),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    if (Number(action.action_detail_1) === 1) {
      detail = `恢复 $t ${total.value} 【 ${total.formula} 】 TP`
    } else {
      detail = `削减 $t ${total.value} 【 ${total.formula} 】 TP`
    }
    
    return detail
  }
}
