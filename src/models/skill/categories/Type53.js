export default {
  FieldCondition (action) {
    const condIf = Number(action.action_detail_2)
    const condElse = Number(action.action_detail_3)

    if (condIf && condElse) {
      return `条件分支：如果指定的场地效果存在则使用 ${condIf % 10}，否则使用 ${condElse % 10}`
    } else if (condIf) {
      return `条件分支：如果指定的场地效果存在则使用 ${condIf % 10}`
    } else {
      return
    }
  }
}
