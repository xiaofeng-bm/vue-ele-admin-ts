<template>
  <div> 
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "tableEdit"
})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>

</style>