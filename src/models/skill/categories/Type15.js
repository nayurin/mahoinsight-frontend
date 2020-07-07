export default {
  Summon (action) {
    let detail, side, type

    switch (Number(action.action_detail_3)) {
      case 1:
        side = ['ours', '己方']
        break
      case 2:
        side = ['other', '敌方']
        break
      default:
        side = ['unknown', '']
    }

    switch (Number(action.action_value_5)) {
      case 1:
        type = ['normal', '普通随从']
        break
      case 2:
        type = ['phantom', '幽灵随从']
        break
      default:
        type = ['unknown', '']
    }

    const minionid = action.action_detail_2
    if (action.action_value_7 > 0) {
      detail = `在 $t 前方 ${action.action_value_7} 的位置召唤一个随从【 ID：${minionid} 】`
    } else if (action.action_value_7 < 0) {
      detail = `在 $t 后方 ${-Number(action.action_value_7)} 的位置召唤一个随从【 ID：${minionid} 】`
    } else {
      detail = `在 $t 的位置召唤一个随从【 ID：${minionid} 】`
    }
    
    return {
      detail,
      side,
      type
    }
  }
}
