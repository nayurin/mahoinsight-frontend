export default {
  DealAilment (action, skillLevel) {
    let detail

    const effect = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_3) + Number(action.action_value_4) * skillLevel,
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }
    
    switch (Number(action.action_detail_1)) {
      case 1: // 对应ailment字段顺序
        detail = `使 $t 行动速度降低至 ${effect.value} 【 ${effect.formula} 】倍，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 2:
        detail = `使 $t 行动速度提高至 ${effect.value} 【 ${effect.formula} 】倍，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 3:
        detail = `对 $t 造成麻痹效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 4:
        detail = `对 $t 造成冻结效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 5:
        detail = `对 $t 造成束缚效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 6:
        detail = `对 $t 造成睡眠效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 7:
        detail = `对 $t 造成眩晕效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 8:
        detail = `对 $t 造成石化效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      case 9:
        detail = `对 $t 造成拘留效果，持续 ${duration.value} 【 ${duration.formula} 】秒`
        break
      default:
        detail = `对 $t 造成未知效果。行动速度改变至原先的 ${effect} 【 ${effect.formula} 】倍，持续 ${duration.value} 【 ${duration.formula} 】秒`
    }

    return detail
  }
}
