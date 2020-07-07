export default {
  Trigger (action) {
    let detail

    const chance = Number(action.action_value_1)
    const cond = action.action_value_3
    
    switch (Number(action.action_detail_1)) {
      case 1: // dodge
        break
      case 2: // damage
        detail = `触发条件：受到伤害时 ${chance} % 触发`
        break
      case 3: // hp
        detail = `触发条件：生命值低于 ${cond} %`
        break
      case 4: // dead
        detail = `触发条件：死亡时 ${chance} % 触发`
        break
      case 5: // critical
        detail = `触发条件：受到暴击时 ${chance} % 触发`
        break
      case 6: // critical with summon
        break
      case 7: // limit time
        detail = `触发条件：战斗时间剩余 ${cond} 秒`
        break
      case 8: // stealth free
        detail = `触发条件：潜行时 ${chance} % 触发`
        break
      case 9: // break
        detail = `触发条件：Break 时 ${chance} % 触发，持续 ${cond} 秒`
        break
      case 10: // dot
        detail = `触发条件：受到持续伤害时 ${chance} % 触发`
        break
      case 11: // all break
        detail = `触发条件：所有部位 Break 时 ${chance} % 触发`
        break
      default:
        return
    }

    return detail
  }
}
