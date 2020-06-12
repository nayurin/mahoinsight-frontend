import axios from 'axios'
import state from '@/store/state'

const request = axios.create({
  baseURL: state.backendBaseURL,
  timeout: 2000,
  withCredentials: true
})

export default {
  // GetData (data = {}) {
  //   return request.post('/api/data', data)
  // },

  // GetList (type) {
  //   return request.post('/api/data', {
  //     type: type
  //   })
  // },

  // GetDetail (type, id, key = '') {
  //   return request.post('/api/data', {
  //     type: type,
  //     id: id,
  //     key: key
  //   })
  // },

  PostNewIssue (data) {
    return request.post('/newissue', data)
  }
}
