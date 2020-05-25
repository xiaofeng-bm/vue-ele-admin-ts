<template>
  <div class="app-container">
    <div>
      <h3>当前登录者为{{ currentName }}</h3>
      <span>拥有权限为{{ currentRoles }}， admin具有全部权限</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserModule } from '@/store/modules/user';

@Component({
  name: "name"
})
export default class extends Vue {
  private currentName = UserModule.name;
  private currentRoles = UserModule.roles
}
</script>

<style lang="scss" scoped>

</style>