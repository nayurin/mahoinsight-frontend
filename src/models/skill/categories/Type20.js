export default {
  SetDecoy (action, skillLevel) {
    let detail

    const duration = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    detail = `令 $t 吸引敌人的攻击，持续 ${duration.value} 【 ${duration.formula} 】秒`
    return detail
  }
}
