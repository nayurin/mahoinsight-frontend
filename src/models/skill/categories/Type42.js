export default {
  LoopTrigger (action, skillLevel) {
    const trigger = Number(action.action_detail_1)
    const chance = {
      value: Number(action.action_value_1) + Number(action.action_value_2) * skillLevel,
      formula: `${action.action_value_1} + ${action.action_value_2}*技能等级`
    }
    const timeout = action.action_value_4
    const cast = Number(action.action_detail_2) % 10
    
    switch (trigger) {
      case 1: // dodge
        return
      case 2: // damaged
        return `条件分支：${timeout} 秒内受到伤害时有 ${chance.value} %【 ${chance.formula} 】 几率使用 ${cast}`
      case 3: // hp
        return
      case 4: // dead
        return
      case 5: // critical damaged
        return
      case 6: // critical damaged with summon
        return
      default:
        return
    }
  }
}
