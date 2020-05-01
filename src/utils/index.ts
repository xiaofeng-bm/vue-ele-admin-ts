const toString = Object.prototype.toString;
export function isObject(val: Record<string, any>) {
  return toString.call(val) === "[object Object]";
}
