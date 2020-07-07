export default {
  DealLimitedDamage (action, unitAtk, unitMAtk, unitLevel, skillLevel) {
    let atk
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

    return `对 $t 造成伤害 ${total.value} 【 ${total.formula} 】，伤害上限【未知】`
  }
}
