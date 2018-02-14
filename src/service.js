const invokeService = (requestData) => {
  return new Promise((resolve, reject) => {
    const res = require('../data/' + requestData + '.json')
    resolve(res)
  })
}

export default invokeService
