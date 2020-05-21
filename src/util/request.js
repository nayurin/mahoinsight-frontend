import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:23333',
  withCredentials: true
})

export default {
  GetData (data = {}) {
    return request.post('/api/data', data)
  },

  GetList (type) {
    return request.post('/api/data', {
      type: type
    })
  },

  GetDetail (type, id, key = '') {
    return request.post('/api/data', {
      type: type,
      id: id,
      key: key
    })
  }
}
