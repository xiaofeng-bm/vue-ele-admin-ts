<template>
  <div class="app-container">
    <aside>
      基于<a href="http://www.sortablejs.com/">sortablejs</a
      >库，表格可以上下拖拽
    </aside>

    <bm-table :config="config" ref="dragTable" border></bm-table>

    <div class="show-order">
      <el-tag>默认顺序</el-tag>
      {{ oldList }}
    </div>

    <div class="show-order">
      <el-tag>拖拽后顺序</el-tag>
      {{ newList }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IConfig } from "@/api/types";
import Sortable from "sortablejs";
import { Form } from "element-ui";
import { addHosp, getHospList } from "@/api/hospital";

@Component({
  name: "DragTable",
})
export default class extends Vue {
  private config: IConfig = {
    config: [],
    table: [],
  };

  private addHisDialogInfo = {
    visible: false,
    model: {
      hosCode: "",
      hosName: "",
      level: "",
      province: "",
      city: "",
      address: "",
    },
    rules: {
      hosCode: [
        { required: true, message: "医院编码不能为空", trigger: "blur" },
      ],
      hosName: [
        { required: true, message: "医院名称不能为空", trigger: "blur" },
      ],
      level: [{ required: true, message: "行政级别不能为空", trigger: "blur" }],
      province: [{ required: true, message: "省份不能为空", trigger: "blur" }],
      city: [{ required: true, message: "城市不能为空", trigger: "blur" }],
    },
  };

  private oldList: number[] = [];
  private newList: number[] = [];
  private sortable: Sortable | null = null;

  created() {
    this.getList();
  }

  private async getList() {
    this.config = {
      config: [
        { type: "index" },
        { label: "医院编码", prop: "hosCode" },
        { label: "医院名称", prop: "hosName" },
        { label: "行政级别", prop: "level" },
        { label: "省份", prop: "province" },
        { label: "市区", prop: "city" },
        { label: "地址", prop: "address", "show-overflow-tooltip": true },
      ],
      table: [
        {
          id: 1,
          hosCode: "9141",
          hosName: "中国人民解放军第306医院（北京第306医院）",
          level: "三级医院",
          province: "北京市",
          city: "北京市",
          address: "",
        },
        {
          id: 2,
          hosCode: "9156",
          hosName: "北京市丰台区妇幼保健院（丰台妇幼保健院）",
          level: "二级医院",
          province: "北京市",
          city: "北京市",
          address: "",
        },
        {
          id: 3,
          hosCode: "9246",
          hosName: "北京市南苑医院",
          level: "二级医院",
          province: "北京市",
          city: "北京市",
          address: "",
        },
        {
          id: 4,
          hosCode: "50978",
          hosName: "北京市人民医院（北京大学人民医院）",
          level: "二级医院",
          province: "北京市",
          city: "北京市",
          address: "",
        },
        {
          id: 5,
          hosCode: "38328",
          hosName: "北京协和医院",
          level: "三级医院",
          province: "北京市",
          city: "北京市",
          address:
            "东单院区）北京市东城区帅府园一号，100730；（西单院区）北京市西城区大木仓胡同41号，100032",
        },
      ],
    };
    this.oldList = this.config.table.map((v: any) => v.id);
    this.newList = this.oldList.slice();
    this.$nextTick(() => {
      this.setSort();
    });
  }

  private setSort() {
    this.$nextTick(() => {
      const el = (this.$refs.dragTable as Vue).$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0] as HTMLElement;
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // drop placeholder的css类名
        onEnd: (evt: any) => {
          // oldIndex:移动前位置。newIndex：移动后位置
          if (
            typeof evt.oldIndex !== "undefined" &&
            typeof evt.newIndex !== "undefined"
          ) {
            const targetRow = this.config.table.splice(evt.oldIndex, 1)[0];
            this.config.table.splice(evt.newIndex, 0, targetRow);
            // for show the changes, you can delete in you code
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
            this.newList.splice(evt.newIndex, 0, tempIndex);
          }
        },
      });
    });
  }

  // 新增医院
  private handleAddHis() {
    (this.$refs.addHisForm as Form).validate(async (valid: boolean) => {
      if (valid) {
        await addHosp(this.addHisDialogInfo.model);
        this.addHisDialogInfo.visible = false;
        this.getList();
      }
    });
  }
}
</script>
<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
<style lang="scss" scoped>
.show-order {
  margin: 10px 0;
}
</style>
