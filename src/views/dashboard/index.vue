<template>
  <div class="app-container">
    <aside class="dashboard-container">
      <div class="introduction-container">
        <h2>简介</h2>
      <hr>
      <p>vue-ele-admin-ts是一个个人项目，包含前后端，前端技术栈包括vue全家桶、element-ui、typescript等。很多地方借鉴了
        <a href="https://github.com/Armour/vue-typescript-admin-template">vue-typescript-admin-template</a>的写法。后端主要用到express、包含jwt权限校验、mysql数据库操作等。
      </p>
      </div>
      <div class="progress-container">
        <h2>进度</h2>
        <hr>
        <p>
          目前已完成功能如下：
          <ol>
            <li>权限认证功能：用户输入账号密码登录后，后端匹配后返回token，前端在之后的请求header中携带token进行权限校验，token有效期一个小时</li>
            <li>侧边栏：左侧的侧边栏借鉴了vue-element-admin中的实现方式。可以在mate中进行配置，目前支持title，icon，hidden，roles(角色权限)，shrink(是否缩放)等功能。并且支持多级嵌套</li>
            <li><span>表格模块</span>
              <ol>
                <li>
                  拖拽表格：使用sortablejs开发，可以进行拖拽改变表格排列
                  <router-link to="/table/drag-table">试一试</router-link>
                </li>
                <li>可配置表格：后台管理系统中往往会有大量的表格展示页面，于是基于el-table进行了二次封装，传入一个配置对象就可直接生成表格。
                  <router-link to="/table/config-table">试一试</router-link>
                </li>
                <li>
                  综合表格：包含前后端完整的新增、搜索、编辑、删除等功能。
                  <router-link to="/table/complex-table">试一试</router-link>
                </li>
              </ol>
            </li>
            <li>错误页面，401,404页面</li>
            <li>
              <span>组件</span>
              <ol>
                <li>
                  拖拽组件：可以通过拖拽中间的线进行左右拖拽动态改变宽度
                  <router-link to="/components/split-pane">试一试</router-link>
                </li>
              </ol>
            </li>
          </ol>
        </p>
        <p>
          优化：
          <ol>
            <li>资源开启gzip压缩，提高首页速度</li>
          </ol>
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: "Dashboard"

})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.dashboard-container {
  li {
    margin: 10px 0;
  }
  a {
    color: #409eff;
  }
}


</style>