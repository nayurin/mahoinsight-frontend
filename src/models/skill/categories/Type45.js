export default {
  SkillCounter (action) {
    const count = action.action_value_1
    return `使计数器增加 ${count}`
  }
}
