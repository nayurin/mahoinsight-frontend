export default {
  Reflexive (action) {
    let type

    const targetAreaMap = {
      1: ['front', '【前方】'],
      2: ['frontAndBack', '【前方和后方】'],
      3: ['all', '【全体】'],
      default: ['unknown', '']
    }

    const targetArea = targetAreaMap[Number(action.target_area)] || targetAreaMap.default
    const range = Number(action.action_value_1)
    switch (Number(action.action_detail_1)) {
      case 1:
        type = 'normal'
        break
      case 2:
        type = 'search'
        break
      case 3:
        type = 'position'
        break
      default:
        break
    }

    if (Number(action.target_type) === 11) {
      return `向 ${targetArea[1]} 移动自身视角，距离 ${range}`
    }

    if (type === 'search') {
      return `搜寻并将自身视角切换到 $t`
    }

    return `切换自身视角到 $t`
  }
}
