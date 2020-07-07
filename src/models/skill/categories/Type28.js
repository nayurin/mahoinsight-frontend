export default {
  IfForAll (action) {
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

      switch (true) {
        case ifValue >=0 && ifValue < 100:
          return `${ifValue} % 几率使用 ${ifThen % 10}`
        case ifValue === 100: case ifValue === 710:
          if (ifType) {
            return singleFlag ? `如果 $t 处于 ${ifType[1]} 状态，则对其使用 ${ifThen % 100}` : `如果任何一个 $t 处于 ${ifType[1]} 状态，则对其使用 ${ifThen % 100}`
          } else {
            return ''
          }
        case ifValue === 599:
          return `如果 $t 有受到持续伤害的影响则使用 ${ifThen % 10}`
        case ifValue >= 600 && ifValue < 700:
          if (Number(action.action_value_3) === 0) {
            return `如果 $t 拥有标记（ID：${ifValue - 600}）则使用 ${ifThen % 10}`
          } else {
            return `如果 $t 拥有标记（ID：${ifValue - 600}）的层数大于等于 ${action.action_value_3}，则使用 ${ifThen % 10}`
          }
        case ifValue === 700:
          return `如果只剩下 $t，对其使用 ${ifThen % 10}`
        case ifValue > 700 && ifValue < 710:
          return `如果 $t（潜行单位除外）的数量等于 ${ifValue - 700} 则使用 ${ifThen % 10}`
        case ifValue === 720:
          return `如果 $t（潜行单位除外）中存在单位（ID：${action.action_value_3}）则使用 ${ifThen % 10}`
        case ifValue >= 901 && ifValue < 1000:
          return singleFlag ? `如果 $t 的 HP 低于 ${ifValue - 900} %，使用 ${ifThen % 10}` : `如果任意一个 $t 的 HP 低于 ${ifValue - 900} %，使用 ${ifThen % 10}`
        case ifValue === 1000:
          return `上一个效果成功击杀目标则使用 ${ifThen % 10}`
        case ifValue === 1001:
          return `如果这个技能暴击则使用 ${ifThen % 10}`
        case ifValue >= 1200 && ifValue < 1300:
          return `计数器大于等于 ${ifValue % 10} 时使用 ${ifThen % 10}`
        default:
          return ''
      }
    }

    const negative = (ifThen) => {
      if (ifThen === 0) return ''

      switch (true) {
        case ifValue >=0 && ifValue < 100:
          return `${100 - ifValue} % 几率使用 ${ifThen % 10}`
        case ifValue === 599:
          return `如果 $t 没有受到持续伤害的影响则使用 ${ifThen % 10}`
        case ifValue >= 600 && ifValue < 700:
          if (Number(action.action_value_3) === 0) {
            return `如果 $t 没有标记（ID：${ifValue - 600}）则使用 ${ifThen % 10}`
          } else {
            return `如果 $t 拥有标记（ID：${ifValue - 600}）的层数小于 ${action.action_value_3}，则使用 ${ifThen % 10}`
          }
        case ifValue === 700:
          return `如果没有只剩下 $t，对其使用 ${ifThen % 10}`
        case ifValue > 700 && ifValue < 710:
          return `如果 $t（潜行单位除外）的数量不等于 ${ifValue - 700} 则使用 ${ifThen % 10}`
        case ifValue === 710:
          if (ifType) {
            return singleFlag ? `如果 $t 不处于 ${ifType[1]} 状态，则对其使用 ${ifThen % 100}` : `如果任何一个 $t 不处于 ${ifType[1]} 状态，则对其使用 ${ifThen % 100}`
          } else {
            return ''
          }
        case ifValue === 720:
          return `如果 $t（潜行单位除外）中不存在单位（ID：${action.action_value_3}）则使用 ${ifThen % 10}`
        case ifValue >= 901 && ifValue < 1000:
          return singleFlag ? `如果 $t 的 HP 不低于 ${ifValue - 900} %，使用 ${ifThen % 10}` : `如果任意一个 $t 的 HP 不低于 ${ifValue - 900} %，使用 ${ifThen % 10}`
        case ifValue === 1000:
          return `上一个效果没有击杀目标则使用 ${ifThen % 10}`
        case ifValue === 1001:
          return `如果这个技能没有暴击则使用 ${ifThen % 10}`
        case ifValue >= 1200 && ifValue < 1300:
          return `计数器小于 ${ifValue % 10} 时使用 ${ifThen % 10}`
        default:
          return ''
      }
    }
    
    return positive(Number(action.action_detail_2)) || negative(Number(action.action_detail_3)) ?
      `排他条件分支：${[positive(Number(action.action_detail_2)), negative(Number(action.action_detail_3))].filter(x => x).join('，')}` :
      ''
  }
}
