export default {
  ChangeMode (action) {
    let detail, pattern, duration
    pattern = Number(action.action_detail_2) % 10
    switch (Number(action.action_detail_1)) {
      case 1:
        duration = Number(action.action_value_1)
        detail = `攻击模式变更为 ${pattern}，持续 ${duration} 秒`
        break
      case 2:
        duration = Number.floor(action.action_value_1)
        detail = `攻击模式变更为 ${pattern}，每秒消耗 TP ${duration} 至 TP 为空`
        break
      case 3:
        detail = `效果结束后，攻击模式变回 ${pattern}`
        break
      default:
        break
    }

    return detail
  }
}
