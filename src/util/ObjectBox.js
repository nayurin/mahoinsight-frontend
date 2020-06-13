import path from 'path'

class ObjectBox {
  constructor (type) {
    this.type = type
    this.objects = {}
    const filemap = {
      chara: 'cache_princess.json',
      item: 'cache_item.json',
      quest: 'cache_quest.json',
      events: 'gameevents.json'
    }
    this.cachefile = path.join('/cached', filemap[type])
  }

  load () {
    const xhr = new XMLHttpRequest()
    const okStatus = document.location.protocol === 'file:' ? 0 : 200
    xhr.open('GET', this.cachefile, false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    this.objects = xhr.status === okStatus ? JSON.parse(xhr.responseText) : null
  }
}

export default ObjectBox
