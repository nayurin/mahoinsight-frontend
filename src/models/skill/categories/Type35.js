export default {
  SetMark (action) {
    let detail

    const maxamount = Math.floor(Number(action.action_value_1))
    const markid = Math.floor(Number(action.action_value_2))
    const duration = action.action_value_3
    const marks = Math.floor(Number(action.action_value_4))

    if (marks >= 0) {
      detail = `对 $t 施加 ${marks} 层标记（最大 ${maxamount} 层，ID：${markid}），持续 ${duration} 秒`
    } else {
      detail = `移除 $t ${-marks} 层标记（ID：${markid}）`
    }
    
    return detail
  }
}
