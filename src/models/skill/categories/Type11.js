export default {
  CastCharm (action, skillLevel) {
    let detail

    const chance = {
      value: (Number(action.action_value_3) + Number(action.action_value_4) * skillLevel ) * 100,
      formula: `(${action.action_value_3} + ${action.action_value_4}*技能等级) * 100`
    }
    const duration = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }

    detail = Number(action.action_detail_1 === 0) ?
      `有 ${chance.value} %【 ${chance.formula} 】 几率魅惑 $t，持续 ${duration.value} 【 ${duration.formula} 】秒` :
      `有 ${chance.value} %【 ${chance.formula} 】 几率令 $t 混乱，持续 ${duration.value} 【 ${duration.formula} 】秒`

    return detail
  }
}
