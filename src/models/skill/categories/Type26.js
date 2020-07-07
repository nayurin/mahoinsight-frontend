export default {
  Additive (action, skillLevel) {
    const keyTypeMap = {
      7: '物理攻击力',
      8: '魔法攻击力',
      9: '物理防御力',
      10: '魔法防御力'
    }
    
    const total = {
      value: Number(action.action_value_2) + Number(action.action_value_3) * skillLevel,
      formula: `${action.action_value_2} + ${action.action_value_3}*技能等级`
    }
    const effect = Number(action.action_detail_1) % 10
    const effectValue = Number(action.action_detail_2)
    const keyType = Number(action.action_value_1)

    switch (true) {
      case keyType === 0:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* HP 】`
      case keyType === 1:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 损失的 HP 】`
      case keyType === 2:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 击杀数 】`
      case keyType === 4:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* $t 的个数 】`
      case keyType === 5:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 伤害到的个数 】`
      case keyType === 6:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 总伤害 】`
      case keyType >= 7 && keyType <= 10:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* $t 的 ${keyTypeMap[keyType]} 】`
      case keyType === 12:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 身后 $t 的数量 】`
      case keyType === 102:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* オメメ个数 】`
      case keyType >= 200 && keyType < 300:
        return `使效果 ${effect % 10} 的数值 ${effectValue} 提高 【 ${total.value}（ ${total.formula} ）* 标记（ID：${keyType % 200}）层数 】`
      default:
        return
    }
  }
}
