export default {
  DealRegeneration (action, unitAtk, unitMAtk, unitLevel, skillLevel) {
    let detail, atk, type
    switch (action.action_detail_1) {
      case 1:
        atk = unitAtk
        break
      case 2:
        atk = unitMAtk
        break
      default:
        return
    }
    switch (Number(action.action_detail_2)) {
      case 1:
        type = 'HP'
        break
      case 2:
        type = 'TP'
        break
      default:
        type = '未知数值'
    }

    const total = {
      value: Math.floor(
        Number(action.action_value_1) +
        (Number(action.action_value_2) * skillLevel) +
        (Number(action.action_value_3) * atk) +
        (Number(action.action_value_4) * atk * unitLevel)
      ),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级 + (${action.action_value_3} + ${action.action_value_4}*自身等级) *atk`
    }
    const duration = {
      value: Number(action.action_value_5) + Number(action.action_value_6) * skillLevel,
      formula: `${action.action_value_5} + ${action.action_value_6}*技能等级`
    }
    
    detail = `每秒恢复 ${type} ${total.value} 【${total.formula}】，持续 ${duration.value}【${duration.formula}】秒`
    
    return detail
  }
}
