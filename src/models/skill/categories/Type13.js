export default {
  CastSilence (action, skillLevel) {
    let detail

    const chance = {
      value: Number(action.action_value_3) + Number(action.action_value_4) * skillLevel,
      formula: `${action.action_value_3} + ${action.action_value_4}*技能等级`
    }
    const duration = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    detail = `有 ${chance.value} %【 ${chance.formula} 】几率令 $t 沉默，持续 ${duration.value} 【 ${duration.formula} 】秒`

    return detail
  }
}
