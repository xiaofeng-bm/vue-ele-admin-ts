const toString = Object.prototype.toString;
export function isObject(val: Record<string, any>) {
  return toString.call(val) === "[object Object]";
}

export function deepClone(source: any) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments deepClone");
  }
  const targetObj: any = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
