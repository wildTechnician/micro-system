export enum RequestType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  FORM = 'application/x-www-form-urlencoded',
  HTML = 'text/html',
}

export enum NetState {
  'OK' = 2000,
  'FAIL' = 500,
  'NO_AUTH' = 6200,
}

export enum NetStateMsg {
  'OK' = 'ok',
  'FAIL' = '请求失败',
  'NO_AUTH' = '暂无权限',
}
