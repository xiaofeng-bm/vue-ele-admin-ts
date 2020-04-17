<template>
  <div class="navbar">
    this is navbar
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: "NavBar"

})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
</style>