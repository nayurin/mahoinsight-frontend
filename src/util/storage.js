export default {
  setItem ({ profile, key, value }) {
    const event = document.createEvent('StorageEvent')
    const set = function (k, v) {
      if (['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(v))) {
        v = JSON.stringify(v)
      }
      window.localStorage.setItem(k, v)
      event.initStorageEvent('setItemEvent', false, false, k, null, v, null, null)
      window.dispatchEvent(event)
    }
    let val
    if (!profile) {
      return set(key, value)
    } else {
      const pStr = window.localStorage.getItem(profile)
      if (!pStr) {
        val = JSON.stringify({ key: value })
      } else {
        val = JSON.parse(pStr)
        val[key] = {...val[key], ...value}
        val = JSON.stringify(val)
      }
      return set(profile, val)
    }
  },
  
  removeItem ({ profile, key, path }) {
    const event = document.createEvent('StorageEvent')
    const remove = function (k) {
      window.localStorage.removeItem(k)
      event.initStorageEvent('setItemEvent', false, false, null, null, null, null, null)
      window.dispatchEvent(event)
    }
    const set = function (k, v) {
      if (['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(v))) {
        v = JSON.stringify(v)
      }
      window.localStorage.setItem(k, v)
      event.initStorageEvent('setItemEvent', false, false, k, null, v, null, null)
      window.dispatchEvent(event)
    }
    if (!profile) {
      return remove(key)
    } else {
      try {
        const val = JSON.parse(window.localStorage.getItem(profile))
        let prop = ''
        for (let i = 0; i < path.length - 1; i++) {
          prop = `${prop}['${path[i]}']`
        }
        const _o = eval(`val${prop}`)
        const _key = path.pop()
        delete _o[_key]
        return set(profile, val)
      } catch {
        return
      }
    }
  }
}
