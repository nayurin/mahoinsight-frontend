export default {
  Delayed (action) {
    const delay = action.action_value_1
    return `回合开始后 ${delay} 秒入场`
  }
}
