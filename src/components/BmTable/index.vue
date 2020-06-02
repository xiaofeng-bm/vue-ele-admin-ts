<template>
  <el-table
    class="bm-table-wrapper"
    :data="config.table"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 前置插槽预留 -->
    <slot name="prepend"></slot>
    <template v-for="column in config.config">
      <slot :name="column.prop || column.type">
        <el-table-column v-bind="column" :key="column.prop + column.type"></el-table-column>
      </slot>
    </template>
    <!-- 后置插槽预留 -->
    <slot name="append"></slot>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IConfig } from '@/api/types';

@Component({
  name: "BmTable",
})
export default class extends Vue {
  @Prop({ required: true }) private config!: IConfig;
}
</script>

<style lang="scss" scoped>
.bm-table-wrapper {
  transition: width 0.28s;
}
</style>
