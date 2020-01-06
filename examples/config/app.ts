import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

// axios({
//   method: 'post',
//   url: '/config/post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

// axios({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function (data) {
//       if(typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   method: 'post',
//   url: '/config/post',
//   data: {
//     a: '1'
//   }
// }).then((res) => {
//   console.log(res.data)
// }).catch((e) => {
//   console.log(e)
// })

let instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if(typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
})

instance({
  method: 'post',
  url: '/config/post',
  data: {
    a: '1'
  }
}).then((res) => {
  console.log(res.data)
}).catch((e) => {
  console.log(e)
})
