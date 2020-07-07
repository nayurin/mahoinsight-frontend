export default {
  ChangeWidth (action) {
    const width = action.action_value_1
    return `改变模型宽度至 ${width}`
  }
}
