<template>
  <div class="app-container">
    <h1>当前登陆者为{{ name }}, 拥有{{ roles }}权限</h1>
    <div class="content-wrapper">
      <span v-permission="['admin']" class="permission-alert">
        只有拥有
        <el-tag class="permission-tag">admin</el-tag>
        权限能看到
      </span>
      <el-tag v-permission="['admin']" class="permission-sourceCode">
        v-permission="['admin']"
      </el-tag>

      <span v-permission="['RMD']" class="permission-alert">
        只有拥有
        <el-tag class="permission-tag">RMD-全国总监</el-tag>
        权限能看到
      </span>
      <el-tag v-permission="['RMD']" class="permission-sourceCode">
        v-permission="['RMD']"
      </el-tag>

      <span v-permission="['TA']" class="permission-alert">
        只有拥有
        <el-tag class="permission-tag">TA-区域经理</el-tag>
        权限能看到
      </span>
      <el-tag v-permission="['TA']" class="permission-sourceCode">
        v-permission="['TA']"
      </el-tag>

      <span v-permission="['RM']" class="permission-alert">
        只有拥有
        <el-tag class="permission-tag">RM-大区经理</el-tag>
        权限能看到
      </span>
      <el-tag v-permission="['RM']" class="permission-sourceCode">
        v-permission="['RM']"
      </el-tag>

      <span v-permission="['DM']" class="permission-alert">
        只有拥有
        <el-tag class="permission-tag">DM-地区经理</el-tag>
        权限能看到
      </span>
      <el-tag v-permission="['DM']" class="permission-sourceCode">
        v-permission="['DM']"
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserModule } from '@/store/modules/user';

@Component({
  name: "Directive"
})
export default class extends Vue {
  private roles = UserModule.roles;
  private name = UserModule.name;
}
</script>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}
.permission-sourceCode {
  margin-left: 15px;
}
.permission-tag {
  background-color: #ecf5ff;
}
</style>