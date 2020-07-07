export default {
  CastResurrect (action) {
    const recoverPercent = Math.round(action.action_value_2) * 100
    return `复活 $t 并恢复 HP 至 ${recoverPercent} %`
  }
}
