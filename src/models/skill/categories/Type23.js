export default {
  IfForChildren (action) {
    let detail
    const ifTypeMap = {
      100: ['controlled', '被控制'],
      200: ['blind', '黑暗'],
      300: ['convert', '魅惑或混乱'],
      400: ['decoy', '吸引其他目标攻击'],
      500: ['burn', '烧伤'],
      501: ['curse', '诅咒'],
      502: ['poison', '中毒'],
      503: ['venom', '猛毒'],
      512: ['poisonOrVenom', '中毒或猛毒'],
      710: ['break', 'Break']
    }
    const ifValue = Number(action.action_detail_1)
    const ifType = ifTypeMap[ifValue]
    const singleFlag = Number(action.target_count) === 1

    const positive = (ifThen) => {
      if (ifThen === 0) return ''

      if (ifType) {
        return singleFlag ? `如果 $t 处于 ${ifType[1]} 状态，对其使用 ${ifThen % 100}` : `如果任意一个 $t 处于 ${ifType[1]} 状态，对其使用 ${ifThen % 100}`
      } else {
        switch (true) {
          case ifValue >= 600 && ifValue < 700:
          case ifValue === 710:
            return singleFlag ? `如果 $t 有标记【ID：${ifValue - 600}】，对其使用 ${ifThen % 10}` : `如果任意一个 $t 有标记【ID：${ifValue - 600}】，对其使用 ${ifThen % 10}`
          case ifValue === 700:
            return `如果只剩下 $t，对其使用 ${ifThen % 10}`
          case ifValue >= 901 && ifValue < 1000:
            return singleFlag ? `如果 $t 的 HP 低于 ${ifValue - 900} %，使用 ${ifThen % 10}` : `如果任意一个 $t 的 HP 低于 ${ifValue - 900} %，使用 ${ifThen % 10}`
          case ifValue === 1300:
            return `如果 $t 是物理单位则使用 ${ifThen % 10}`
          default:
            return ''
        }
      }
    }

    const negative = (ifThen) => {
      if (ifThen === 0) return ''
      
      if (ifType) {
        return singleFlag ? `如果 $t 不处于 ${ifType[1]} 状态，对其使用 ${ifThen % 100}` : `如果任意一个 $t 不处于 ${ifType[1]} 状态，对其使用 ${ifThen % 100}`
      } else {
        switch (true) {
          case ifValue >= 600 && ifValue < 700:
          case ifValue === 710:
            return singleFlag ? `如果 $t 没有标记【ID：${ifValue - 600}】，对其使用 ${ifThen % 10}` : `如果任意一个 $t 没有标记【ID：${ifValue - 600}】，对其使用 ${ifThen % 10}`
          case ifValue === 700:
            return `如果没有只剩下 $t，对其使用 ${ifThen % 10}`
          case ifValue >= 901 && ifValue < 1000:
            return singleFlag ? `如果 $t 的 HP 未低于 ${ifValue - 900} %，使用 ${ifThen % 10}` : `如果任意一个 $t 的 HP 未低于 ${ifValue - 900} %，使用 ${ifThen % 10}`
          case ifValue === 1300:
            return `如果 $t 是魔法单位则使用 ${ifThen % 10}`
          default:
            return ''
        }
      }
    }


    switch (true) {
      case ifValue === 100:
      case ifValue === 200:
      case ifValue === 300:
      case ifValue >= 500 && ifValue <= 503:
      case ifValue === 512:
      case ifValue >= 600 && ifValue < 900:
      case ifValue >= 901 && ifValue < 1000:
      case ifValue === 1300:
        // 和初音笔记不一致 初音笔记的positive分支是action_detail_2 而negative分支是action_detail_3
        detail = `条件分支：${[positive(Number(action.action_detail_3)), negative(Number(action.action_detail_2))].filter(x => x).join('，')}`
        break
      case ifValue >= 0 && ifValue < 100:
        if (Number(action.action_detail_2 !== 0) && Number(action.action_detail_3 !== 0)) {
          detail = `随机事件：${ifValue} % 几率使用 ${action.action_detail_2 % 10}，否则使用 ${action.action_detail_3 % 10}`
        } else if (Number(action.action_detail_2 !== 0)) {
          detail = `随机事件：${ifValue} % 几率使用 ${action.action_detail_2 % 10}`
        } else if (Number(action.action_detail_3 !== 0)) {
          detail = `随机事件：${ifValue} % 几率使用 ${action.action_detail_3 % 10}`
        }
        break
      default:
        break
    }
    
    return detail
  }
}
