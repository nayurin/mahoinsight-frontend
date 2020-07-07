export default {
  SetBarrier (action, skillLevel) {
    let detail
    
    const total = {
      value: Math.floor(
        Number(action.action_value_1) +
        (Number(action.action_value_2) * skillLevel)
      ),
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`,
      duration: action.action_value_3
    }

    switch (Number(action.action_detail_1)) {
      case 1:
        detail = `为 $t 设置一个可无效化物理伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      case 2:
        detail = `为 $t 设置一个可无效化魔法伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      case 3:
        detail = `为 $t 设置一个可吸收物理伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      case 4:
        detail = `为 $t 设置一个可吸收魔法伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      case 5:
        detail = `为 $t 设置一个可吸收物理魔法伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      case 6:
        detail = `为 $t 设置一个可无效化物理魔法伤害 ${total.value} 【 ${total.formula} 】 的护盾，持续【 ${total.duration} 】秒`
        break
      default:
        detail = `为 $t 设置一个类型未知的护盾，持续【 ${total.duration} 】秒`
    }
    return detail
  }
}
