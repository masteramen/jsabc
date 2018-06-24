const  axios = require('axios');
const headers = {
  // 'referer': 'https://feedly.com',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
  'Connection': 'close',
  //   'Accept-Language': 'zh-CN'
}


axios.interceptors.request.use(
  config => {
   // config.headers = headers;
    return config
  },
  err => {
    return Promise.reject(err)
  })

axios.defaults.timeout = 5000
// 在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }

  // Increase the retry count
  config.__retryCount += 1

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve()
    }, config.retryDelay || 1)
  })

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config)
  })
});
module.exports = axios;


