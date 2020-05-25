<template>
  <div class="app-container">
    <aside>修改右边json数据后按Ctrl+S保存就能动态修改左边表格</aside>

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

const jsonData = `{
  "config":{
    "show":["type", "hosCode", "hosName", "level", "province", "city", "address"],
    "title":{
      "type": {
        "type": "selection",
        "align": "center",
        "width": 60,
        "fixed": "left"
      },
      "hosCode":"医院编码",
      "hosName": {"label": "医院名称", "width": "200"},
      "level": { "label": "行政级别", "width": "100"},
      "province": { "label": "省份", "width": "100"},
      "city": { "label": "城市", "width": "100"},
      "address": { "label": "医院地址", "show-overflow-tooltip": true, "width": "400"}
    }
  },
  "table":[{
    "id": 1,
    "hosCode": "9141",
    "hosName": "中国人民解放军第306医院（北京第306医院）",
    "level": "三级医",
    "province": "北京市",
    "city": "北京市",
    "address": ""
  }, {
    "id": 2,
    "hosCode": "9156",
    "hosName": "北京市丰台区妇幼保健院（丰台妇幼保健院）",
    "level": "二级医院",
    "province": "北京市",
    "city": "北京市",
    "address": ""
  }, {
    "id": 3,
    "hosCode": "9246",
    "hosName": "北京市南苑医院",
    "level": "二级医院",
    "province": "北京市",
    "city": "北京市",
    "address": ""
  }, {
    "id": 4,
    "hosCode": "50978",
    "hosName": "北京市人民医院（北京大学人民医院）",
    "level": "二级医院",
    "province": "北京市",
    "city": "北京市",
    "address": ""
  }, {
    "id": 5,
    "hosCode": "38328",
    "hosName": "北京协和医院",
    "level": "三级医院",
    "province": "北京市",
    "city": "北京市",
    "address": "东单院区）北京市东城区帅府园一号，100730；（西单院区）北京市西城区大木仓胡同41号，100032"
  }]
}`;

@Component({
  name: "ConfigTable",
  components: {
    JsonEditor,
  },
})
export default class extends Vue {
  private value = JSON.parse(jsonData);
  private config = JSON.parse(jsonData);

  @Watch("value")
  private onValueChange(val: string) {
    this.config = JSON.parse(val);
  }

}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  min-width: 100%;
  height: 100%;

  .table-container,
  .eidtor-container {
    flex: 1;
    overflow: auto;
  }
}
</style>
