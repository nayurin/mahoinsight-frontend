export default {
  ChangeAttackPattern (action) {
    let detail
    const type = Number(action.action_detail_1)
    const duration = action.action_value_1
    const pattern = Number(action.action_detail_2) % 10

    switch (type) {
      case 1:
        detail = `改变为攻击模式 ${pattern}，持续 ${duration} 秒`
        break
      case 2:
        detail = `改变技能视觉效果，持续 ${duration} 秒`
        break
      default:
        break
    }
    
    return detail
  }
}
