export default {
  DealDamageOverTime (action, skillLevel) {
    let detail

    const dot = {
      value: Math.ceil(Number(action.action_value_1) + Number(action.action_value_2) * skillLevel),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_3) + Number(action.action_value_4) * skillLevel,
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }

    switch (Number(action.action_detail_1)) {
      case 1:
        detail = `每秒给予 $t 毒伤害 ${dot.value} 【 ${dot.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 2:
        detail = `每秒给予 $t 烧伤伤害 ${dot.value} 【 ${dot.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 3:
        detail = `每秒给予 $t 诅咒伤害 ${dot.value} 【 ${dot.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 4:
        detail = `每秒给予 $t 猛毒伤害 ${dot.value} 【 ${dot.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      default:
        detail = `每秒给予 $t 未知类型持续伤害 ${dot.value} 【 ${dot.formula} 】，持续 ${duration.value} 【 ${duration.formula} 】秒`
    }

    return detail
  }
}
