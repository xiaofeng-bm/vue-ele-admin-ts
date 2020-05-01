<template>
  <div class="app-container">
    <aside>通过修改右边的json就可以动态的修改左边表格</aside>

    <div class="content-wrapper">
      <div class="table-container">
        <bm-table :config="config" border size="mini"></bm-table>
      </div>
      <div class="eidtor-container">
        <json-editor ref="jsonEditor" v-model="value"> </json-editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import JsonEditor from "@/components/JsonEditor/index.vue";

const jsonData = `{"config":{"show":["name","age"],"title":{"name":"姓名","age": {"label": "年龄", "width": 100, "show-overflow-tooltip": true} }},"table":[{"name":"摆明","age":22},{"name":"刘浩","age":122222222222222222222222}]}`;

@Component({
  name: "ConfigTable",
  components: {
    JsonEditor,
  },
})
export default class extends Vue {
  private value = JSON.parse(jsonData);
  private config = JSON.parse(jsonData);


  @Watch('value')
  private onValueChange(val: string) {
    this.config = JSON.parse(val);
  }
  // get config() {
  //   if (typeof this.value === "string") {
  //     return JSON.parse(this.value);
  //   } else {
  //     return this.value;
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .table-container,
  .eidtor-container {
    flex: 1;
  }
}
</style>
