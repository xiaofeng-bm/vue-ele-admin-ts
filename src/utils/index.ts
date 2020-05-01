const toString = Object.prototype.toString;
export function isObject(val: any): val is Object {
  return toString.call(val) === "[object Object]";
}
