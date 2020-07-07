export default {
  Knock (action) {
    let detail

    const range = Number(action.action_value_1)
    switch (Number(action.action_detail_1)) {
      case 1:
        detail = `击飞 $t ，高度 ${range}`
        break
      case 3: case 6:
        detail = range >= 0 ? `击退 $t ，距离 ${range}` : `拉近 $t ，距离 ${range}`
        break
      default:
        detail = `击退效果未知`
    }

    return detail
  }
}
