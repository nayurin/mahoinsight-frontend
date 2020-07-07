export default {
  DealRatioDamage (action, skillLevel) {

    const total = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`,
    }

    switch (Number(action.action_detail_1)) {
      case 1:
        return `对 $t 造成其最大 HP ${total.value} %【 ${total.formula} 】 的伤害`
      case 2:
        return `对 $t 造成其当前 HP ${total.value} %【 ${total.formula} 】 的伤害`
      default:
        return
    }
  }
}
