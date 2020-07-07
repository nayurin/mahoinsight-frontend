export default {
  DealFieldHeal (action, unitAtk, unitMAtk, unitLevel, skillLevel) {
    let detail, atk
    const percentMark = Number(action.action_detail_2) === 1 ? '' : '%'
    const fieldType = Number(action.action_detail_1) <= 2 ? 'normal' : 'repeat'
    switch (action.action_detail_1) {
      case 1:
        atk = unitAtk
        break
      case 2:
        atk = unitMAtk
        break
      case 3:
        atk = unitAtk
        break
      default:
        return
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
    const radius = action.action_value_7
    
    if (fieldType === 'normal') {
      detail = `在范围 ${radius} 的区域里恢复 ${total.value}【${total.formula}】${percentMark} HP`
    } else {
      if (Number(action.target_type) === 11) {
        detail = `展开一片半径为 ${radius} 的区域，每秒恢复 $t ${total.value}【${total.formula}】${percentMark} HP，持续 ${duration.value}【${duration.formula}】 秒`
      } else {
        detail = `在 $t 的位置展开一片半径为 ${radius} 的区域，每秒恢复 ${total.value}【${total.formula}】${percentMark} HP，持续 ${duration.value}【${duration.formula}】秒`
      }
    }

    return detail
  }
}
