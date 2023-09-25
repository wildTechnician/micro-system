/**
 * 格式化时间
 * YYYY-MM-DD HH:mm:ss w
 * @param formatter
 * @param t
 * @returns
 */
export function dateFormatter(formatter: string, t?: Date) {
  const weekList = ['天', '一', '二', '三', '四', '五', '六'];
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    w = date.getDay();
  return formatter
    .replace(/YYYY|yyyy/g, Y)
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
    .replace(/w/g, '星期' + weekList[w]);
}
