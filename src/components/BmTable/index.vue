<template>
  <el-table
    :data="tableConfig.table"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 前置插槽预留 -->
    <slot name="prepend"></slot>
    <slot v-for="(key, index) in tableConfig.config.show">
      <el-table-column
        :key="`${key}${index}`"
        :type="getAttribute(tableConfig.config.title[key], 'type')"
        :label="getAttribute(tableConfig.config.title[key], 'label')"
        :fixed="getAttribute(tableConfig.config.title[key], 'fixed')"
        :prop="key"
        :width="getAttribute(tableConfig.config.title[key], 'width')"
        :align="getAttribute(tableConfig.config.title[key], 'align')"
        :min-width="getAttribute(tableConfig.config.title[key], 'min-width')"
        :sortable="getAttribute(tableConfig.config.title[key], 'sortable')"
        :show-overflow-tooltip="getAttribute(tableConfig.config.title[key], 'show-overflow-tooltip')"
      >

      </el-table-column>
    </slot>
    <slot name="append"></slot>
  </el-table>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { isObject } from '@/utils/index';

interface ITableConfig {
  config: {
    show: string[];
    title: any;
  };
  table: any[];
}
@Component({
  name: "BmTable"
})
export default class extends Vue {
  @Prop({ required: true }) private config!: ITableConfig;


  private name = '白敏'

  get tableConfig() {
    const _config = Object.assign({}, this.config);
    if (typeof _config.config === "undefined") {
      _config.config = {
        show: [],
        title: {},
      };
    }
    if (typeof _config.table === "undefined" || !Array.isArray(_config.table)) {
      _config.table = [];
    }
    return _config;
  }

  get titleList() {
    return this.tableConfig.config.show;
  }

  private getAttribute(data: any, type: string) {
    if(isObject(data)) {
      return data[type] ? data[type]: null
    } else {
      return type === 'label' ? data : null;
    }
  }
}
</script>

<style lang="scss" scoped></style>