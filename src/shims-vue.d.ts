declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.gif' {
  export const gif: any
}
// 去除vue-count-to的校验
declare module 'vue-count-to'