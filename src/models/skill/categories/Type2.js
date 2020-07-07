export default {
  Move (action) {
    let detail

    const position = Number(action.action_value_1)
    const velocity = action.action_value_2
    switch (Number(action.action_detail_1)) {
      case 1:
        detail = `自身移动到 ${position}，技能结束后返回原位置`
        break
      case 2:
        detail = position > 0 ? `自身向前移动 ${position}，技能结束后返回原位置` : `自身向后移动 ${-position}，技能结束后返回原位置`
        break
      case 3:
        detail = `自身移动到 ${position}`
        break
      case 4: case 7:
        detail = position > 0 ? `自身向前移动 ${position}` : `自身向后移动 ${-position}`
        break
      case 5:
        detail = position > 0 ? `以每秒 ${velocity} 的速度移动到 $t 前 ${position} 的位置` : `以每秒 ${velocity} 的速度移动到 $t 后 ${-position} 的位置`
        break
      case 6:
        detail = position > 0 ? `以每秒 ${velocity} 的速度向前移动 ${position}` : `以每秒 ${velocity} 的速度向后移动 ${-position}`
        break
      default:
        return
    }

    return detail
  }
}
