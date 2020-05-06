<template>
  <div :class="{ hidden: hidden }" class="pagination-containerZ">
    <el-pagination
      v-bind="$attrs"
      v-on="$listeners"
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "Pagination",
})
export default class extends Vue {
  @Prop({ required: true }) private total!: number;
  @Prop({ default: 20 }) private limit!: number;
  @Prop({ default: 1 }) private page!: number;
  @Prop({ default: () => [10, 20, 50, 100] }) private pageSizes!: number[];
  @Prop({ default: 'total, sizes, prev, pager, next, jumper' }) private layout!: string
  @Prop({ default: true }) private background!: boolean;
  @Prop({ default: false }) private hidden!: boolean;

  get pageSize() {
    return this.limit;
  }
  set pageSize(value) {
    this.$emit("update:limit", value);
  }

  get currentPage() {
    return this.page;
  }
  set currentPage(value) {
    this.$emit("update:page", value);
  }
}
</script>

<style lang="scss" scoped>
.pagination-container.hidden {
  display: none;
}
</style>
