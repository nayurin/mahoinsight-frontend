export default {
  DealDamage (action, unitAtk, unitMAtk, unitLevel, skillLevel) {
    let detail, atk
    const critFlag = Number(action.action_value_5) ? true : false
    const critModifier = Number(action.action_value_6) * 2
    switch (Number(action.action_detail_1)) {
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

    detail = `对 $t 造成伤害 ${total.value} 【 ${total.formula} 】`
    if (critFlag) {
      detail += `【本次伤害必定暴击】`
    }
    if (critModifier) {
      detail += `【暴击伤害倍率提升至 ${critModifier} 】`
    }
    return detail
  }
}
