import Actions from '@/models/skill/index'

function targetAnalyzer (action, dependAction) {
  const targetAssignmentMap = {
    1: ['enemy', '【敌方】'],
    2: ['ally', '【己方】'],
    3: ['both', '【双方】'],
    default: ['unknown', '']
  }

  const targetTypeMap = {
    0: ['zero', '【最近的$1$2】'],
    1: ['none', '【被上一个效果影响的或最近的$1$2】'],
    2: ['random', '【随机$1】'],
    3: ['near', Number(action.target_number) === 0 || Number(action.target_count) === 1 ? '【最近的$1$2】' : '【$2近的$1】'],
    4: ['far', '【最远的$1$2】'],
    5: ['hpAscending', '【 HP 百分比最低的$1$2】'],
    6: ['hpDescending', '【 HP 百分比最高的$1$2】'],
    7: ['self', '【自身】'],
    8: ['randomOnce', '【首次随机】'],
    9: ['forward', '【最靠后的$1$2】'],
    10: ['backward', '【最靠前的$1$2】'],
    11: ['absolute', '【范围内的目标】'],
    12: ['tpDescending', '【 TP 最多的$1$2】'],
    13: ['tpAscending', '【 TP 最少的$1$2】'],
    14: ['atkDescending', '【物理攻击力最高的$1$2】'],
    15: ['atkAscending', '【物理攻击力最低的$1$2】'],
    16: ['magicSTRDescending', '【魔法攻击力最高的$1$2】'],
    17: ['magicSTRAscending', '【魔法攻击力最低的$1$2】'],
    18: ['summon', '【$1随从】'],
    19: ['tpReducing', '【 TP 最少的$1$2】'],
    20: ['physics', '【$1物理系】'],
    21: ['magic', '【$1法系】'],
    22: ['allSummonRandom', '【随机随从】'],
    23: ['selfSummonRandom', '【自己的随机随从】'],
    24: ['boss', '【$1首领级】'],
    25: ['hpAscendingOrNear', '【 HP 百分比最低的$1$2】'],
    26: ['hpDescendingOrNear', '【 HP 百分比最高的$1$2】'],
    27: ['tpDescendingOrNear', '【 TP 最多的$1$2】'],
    28: ['tpAscendingOrNear', '【 TP 最少的$1$2】'],
    29: ['atkDescendingOrNear', '【物理攻击力最高的$1$2】'],
    30: ['atkAscendingOrNear', '【物理攻击力最低的$1$2】'],
    31: ['magicSTRDescendingOrNear', '【魔法攻击力最高的$1$2】'],
    32: ['magicSTRAscendingOrNear', '【魔法攻击力最低的$1$2】'],
    33: ['shadow', '【$1暗影】'],
    34: ['nearWithoutOwner', '【除自己外最近的$1$2】'],
    default: ['unknown', '']
  }

  const targetCountMap = {
    0: ['zero', ''],
    1: ['one', '一个'],
    2: ['two', '两个'],
    3: ['three', '三个'],
    4: ['four', '四个'],
    99: ['all', '全部'],
    default: ['unknown', '']
  }

  const targetNumberMap = {
    0: ['first', '第一位'],
    1: ['second', '第二位'],
    2: ['third', '第三位'],
    3: ['fourth', '第四位'],
    4: ['fifth','第五位'],
    default: ['unknown', '']
  }

  const targetRangeMap = {
    infinite: [-1, -1],
    zero: [0, 0],
    finite: [1, 2159],
    all: [2160, Number.MAX_SAFE_INTEGER]
  }

  const targetAreaMap = {
    1: ['front', '【前方】'],
    2: ['frontAndBack', '【前方和后方】'],
    3: ['all', '【全体】'],
    default: ['unknown', '']
  }

  const targetAssignment = targetAssignmentMap[Number(action.target_assignment)] || targetAssignmentMap.default
  const targetType = targetTypeMap[Number(action.target_type)] || targetTypeMap.default
  const targetCount = targetCountMap[Number(action.target_count)] || targetCountMap.default
  const targetNumber = targetNumberMap[Number(action.target_number)] || targetNumberMap.default
  const targetRange = Object.keys(targetRangeMap).filter(range => Number(action.target_range) >= targetRangeMap[range][0] && Number(action.target_range) <= targetRangeMap[range][1])[0] || 'unknown'
  const targetArea = targetAreaMap[Number(action.target_area)] || targetAreaMap.default

  const hasRelationPhrase = !['self', 'absolute'].includes(targetType[0])
  const hasCountPhrase = !['self', 'none', 'zero'].includes(targetType[0])
  const hasRangePhrase = targetRange === 'finite'
  const hasPositionPhrase = ['second', 'third', 'fourth', 'fifth'].includes(targetNumber[0])
  const hasAreaPhrase = targetArea[0] === 'front' && (hasRangePhrase || targetCount[0] === 'all')
  const hasTargetType = !['unknown', 'magic', 'physics', 'summon', 'boss', 'nearWithoutOwner'].includes(targetType[0]) && targetCount[0] === 'all' ? false : true
  const hasDependAction = dependAction !== 0 && targetType[0] !== 'absolute' && [1, 3, 23, 28, 46].includes(Number(dependAction.action_type))

  const ignoresOne = !['unknown', 'random', 'randomOnce', 'absolute', 'summon', 'selfSummonRandom', 'allSummonRandom', 'magic', 'physics'].includes(targetType[0])

  const generatePhrase = () => {
    let targetPhraseTags = {
      custom: [],
      count: '',
      area: '',
      range: '',
      targetType: '',
      number: '',
      relation: ''
    }

    if (hasDependAction) {
      if ([1, 46].includes(Number(dependAction.action_type))) {
        targetPhraseTags.custom.push(`【被效果 ${dependAction.action_id % 10} 伤害到的】`)
      } else {
        targetPhraseTags.custom.push(`【效果 ${dependAction.action_id % 10} 的目标】`)
      }
      return targetPhraseTags
    }

    if (hasCountPhrase) {
      switch (targetCount) {
        case 'zero':
          break
        case 'one':
          if (!ignoresOne) targetPhraseTags.count = targetCount[1]
          break
        default:
          targetPhraseTags.count = targetCount[1]
      }
    }

    if (hasAreaPhrase) {
      if (targetArea[0] === 'front') {
        if (targetAssignment === 'ally') {
          targetPhraseTags.area = targetArea[1]
        } else {
          targetPhraseTags.custom.push('【前方】')
        }
      }
    }

    if (targetRange === 'finite') {
      targetPhraseTags.range = `【距离 ${action.target_range} 】`
    }

    if (hasTargetType) {
      targetPhraseTags.targetType = targetType[1]
    }

    if (hasPositionPhrase) {
      targetPhraseTags.number = targetNumber[1]
    }

    if (hasRelationPhrase) {
      targetPhraseTags.relation = targetAssignment[1]
    } else {
      targetPhraseTags = {
        custom: [],
        count: '',
        area: '',
        range: '',
        targetType: '',
        number: '',
        relation: ''
      }
      targetPhraseTags.targetType = targetType[1]
    }

    targetPhraseTags.custom.join('')
    return targetPhraseTags
  }

  const phrase = generatePhrase()
  phrase.targetType = phrase.targetType.replace(/\$1/, phrase.count)
  phrase.targetType = phrase.targetType.replace(/\$2/, phrase.number)

  const pattern = `${phrase.custom}${phrase.area}${phrase.range}${phrase.relation}${phrase.targetType}`
  return pattern
}

export default {
  getSkillActionDetails: ({ action, dependAction, unitAtk, unitMAtk, unitLevel, skillLevel }) => {
    let detail
    skillLevel = skillLevel || unitLevel
    switch (action.action_type) {
      case 1:
        detail = Actions.Type1.DealDamage(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 2:
        detail = Actions.Type2.Move(action)
        break
      case 3:
        detail = Actions.Type3.Knock(action)
        break
      case 4:
        detail = Actions.Type4.DealHeal(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 6:
        detail = Actions.Type6.SetBarrier(action, skillLevel)
        break
      case 7:
        detail = Actions.Type7.Reflexive(action)
        break
      case 8:
        detail = Actions.Type8.DealAilment(action, skillLevel)
        break
      case 9:
        detail = Actions.Type9.DealDamageOverTime(action, skillLevel)
        break
      case 10:
        detail = Actions.Type10.CastAura(action, skillLevel)
        break
      case 11:
        detail = Actions.Type11.CastCharm(action, skillLevel)
        break
      case 12:
        detail = Actions.Type12.CastDarkness(action, skillLevel)
        break
      case 13:
        detail = Actions.Type13.CastSilence(action, skillLevel)
        break
      case 14:
        detail = Actions.Type14.ChangeMode(action)
        break
      case 15:
        detail = Actions.Type15.Summon(action).detail
        break
      case 16:
        detail = Actions.Type16.ChangeEnergy(action, skillLevel)
        break
      case 17:
        detail = Actions.Type17.Trigger(action)
        break
      case 18:
        detail = Actions.Type18.ChargingDamage(action, skillLevel)
        break
      case 20:
        detail = Actions.Type20.SetDecoy(action, skillLevel)
        break
      case 21:
        detail = Actions.Type21.Invulnerable(action, skillLevel)
        break
      case 22:
        detail = Actions.Type22.ChangeAttackPattern(action)
        break
      case 23:
        detail = Actions.Type23.IfForChildren(action)
        break
      case 24:
        detail = Actions.Type24.CastResurrect(action)
        break
      case 26:
        detail = Actions.Type26.Additive(action, skillLevel)
        break
      case 27:
        detail = Actions.Type27.Multiple(action, skillLevel)
        break
      case 28:
        detail = Actions.Type28.IfForAll(action)
        break
      case 30:
        detail = Actions.Type30.CastInstantDeath()
        break
      case 32:
        detail = Actions.Type32.EnchantLifeSteal(action, skillLevel)
        break
      case 33:
        detail = Actions.Type33.SetCounterBackBarrier(action, skillLevel)
        break
      case 34: 
        detail = Actions.Type34.AccumulativeDamage(action, skillLevel)
        break
      case 35:
        detail = Actions.Type35.SetMark(action)
        break
      case 36:
        detail = Actions.Type36.DealFieldDamage(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 37:
        detail = Actions.Type37.DealFieldHeal(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 38:
        detail = Actions.Type38.CastFieldAura(action, skillLevel)
        break
      case 42:
        detail = Actions.Type42.LoopTrigger(action, skillLevel)
        break
      case 44:
        detail = Actions.Type44.Delayed(action)
        break
      case 45:
        detail = Actions.Type45.SkillCounter(action)
        break
      case 46:
        detail = Actions.Type46.DealRatioDamage(action, skillLevel)
        break
      case 47:
        detail = Actions.Type47.DealLimitedDamage(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 48:
        detail = Actions.Type48.DealRegeneration(action, unitAtk, unitMAtk, unitLevel, skillLevel)
        break
      case 49:
        detail = Actions.Type49.CastDispel(action, skillLevel)
        break
      case 50:
        detail = Actions.Type50.ChannelingAura(action, skillLevel)
        break
      case 52:
        detail = Actions.Type52.ChangeWidth(action)
        break
      case 53:
        detail = Actions.Type53.FieldCondition(action)
        break
      case 90:
        detail = Actions.Type90.PassiveSkill(action, skillLevel)
        break
      default:
        return
    }
    return {
      detail,
      target: targetAnalyzer(action, dependAction)
    }
  }
}
