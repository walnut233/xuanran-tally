import http from '@/http/httpClient'

/** GET 请求测试 */
export const getTestApi: any = query => {
  return http.get('/getTest', { query })
}

/** POST 请求测试 */
export const postTestApi: any = (data, query) => {
  return http.post('/postTest', { data, query })
}

/* await-to-js 简洁用法 */
export const awaitToJsTestApi: any = query => {
  return (
    http
      .post('/postTest', { query }) // 返回正常
      // .post('/error', { query }) // 返回错误
      .then(
        data => [data, null],
        e => [null, e]
      )
  )
}

/** 分页 请求测试 */
export const getUserListApi: any = query => {
  return http.get('/testList', { query })
}

/** 长时间请求 请求测试 */
export const getLongRequestApi: any = () => {
  return http.get('/longRequest')
}
