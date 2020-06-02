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

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      return data[key];
    })
  );
