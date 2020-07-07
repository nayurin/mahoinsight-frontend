export default {
  DealHeal (action, unitAtk, unitMAtk, unitLevel, skillLevel) {
    let detail, atk
    const percentMark = Number(action.action_value_1) === 1 ? '' : '%'
    switch (Number(action.action_detail_1)) {
      case 1:
        atk = unitAtk
        break
      case 2:
        atk = unitMAtk
        break
      default:
        return
    }
    const total = {
      value: Math.floor(
        Number(action.action_value_2) + 
        (Number(action.action_value_3) * skillLevel) + 
        (Number(action.action_value_4) * atk) +
        (Number(action.action_value_5) * atk * unitLevel)
      ),
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级 + (${action.action_value_4} + ${action.action_value_5}*自身等级) *atk`
    }
    
    detail = `治疗 $t ${total.value} ${percentMark} 【 ${total.formula} 】`
    
    return detail
  }
}
