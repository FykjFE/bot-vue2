/**
 * 数组转化成树工具方法
 * @param list
 * @param options
 * @returns {*}
 */
export default function list2tree(list, options) {
  const option = { id: "id", pid: "pid", children: "children", ...options };
  return list.reduce((prev, curr) => {
    const obj = list.find(item => item[option.id] === curr[option.pid]);
    if (obj) {
      !Object.prototype.hasOwnProperty.call(obj, option.children) &&
        (obj[option.children] = []);
      obj[option.children].push(curr);
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
}
