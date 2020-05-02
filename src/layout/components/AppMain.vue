<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: "AppMain"

})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  margin-top: 50px;
}
</style>