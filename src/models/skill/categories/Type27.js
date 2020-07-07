export default {
  Multiple (action, skillLevel) {
    const total = {
      value: Number(action.action_value_2) + Number(action.action_value_3) * skillLevel,
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级`
    }
    const mark = Number(action.action_value_1)
    const effect = Number(action.action_detail_1) % 10
    const effectValue = action.action_detail_2
    switch (true) {
      case mark === 0:
        return `使效果 ${effect} 的数值 ${effectValue} 乘以 【 ${total.value}（${total.formula}） * 当前 HP 百分比 】`
      case mark === 1:
        return `使效果 ${effect} 的数值 ${effectValue} 乘以 【 ${total.value}（${total.formula}） * 已损失的 HP 百分比 】`
      case mark === 2:
        return `使效果 ${effect} 的数值 ${effectValue} 乘以 【 ${total.value}（${total.formula}） * 击杀个数 】`
      case mark >= 200 && mark < 300:
        return `使效果 ${effect} 的数值 ${effectValue} 乘以 【 ${total.value}（${total.formula}） * 标记（ID：${mark % 200}）的层数 】`
      default:
        return
    }
  }
}
