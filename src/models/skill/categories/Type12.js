export default {
  CastDarkness (action, skillLevel) {
    let detail

    const chance = {
      value: Number(action.action_value_3) + Number(action.action_value_4) * skillLevel,
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const darkness = 100 - Number(action.action_detail_1)

    detail = `有 ${chance.value} %【 ${chance.formula} 】几率令 $t 致盲，物理攻击将有 ${darkness} % 几率未命中，持续 ${duration.value} 【 ${duration.formula} 】秒`

    return detail
  }
}
