// import path from 'path'

class FileLoader {
  constructor (file) {
    this.objects = {}
    // this.cachefile = path.join('/cached', `${name}.json`)
    this.cachefile = file
  }

  loadSync () {
    const xhr = new XMLHttpRequest()
    const okStatus = document.location.protocol === 'file:' ? 0 : 200
    xhr.open('GET', this.cachefile, false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    this.objects = xhr.status === okStatus ? JSON.parse(xhr.responseText) : null
  }

  loadAsync () {
    const xhr = new XMLHttpRequest()
    const OK = document.location.protocol === 'file:' ? 0 : 200
    const DONE = 4
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject('Error:', this.cachefile, xhr.readyState, xhr.status)
          }
        }
      }
      xhr.open('GET', this.cachefile, true)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
    })
  }
}

export default FileLoader
