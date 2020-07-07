export default {
  CastDispel (action, skillLevel) {
    const type = Number(action.action_detail_1)
    const chance = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }

    switch (type) {
      case 1:
        return `有 ${chance.value} %【 ${chance.formula} 】 几率清除 $t 的所有增益`
      case 2:
        return `有 ${chance.value} %【 ${chance.formula} 】 几率清除 $t 的所有减益`
      default:
        return
    }
  }
}
