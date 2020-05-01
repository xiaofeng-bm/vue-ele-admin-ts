<template>
  <div class="app-container">
    <aside>
      sdasdsa
    </aside>

    <div class="filter-container">
      <el-input
        v-model="listQuery.search"
        class="search-item"
        placeholder="搜索..."
      ></el-input>

      <el-button type="primary" class="filter-item" icon="el-icon-search"
        >搜索</el-button
      >
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-plus"
        @click="addHisDialogInfo.visible = true"
        >新增</el-button
      >
    </div>

    <el-table ref="dragTable" :data="list" border row-key="id">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="医院编码"
        prop="hisCode"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医院编码"
        prop="hisName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医院编码"
        prop="level"
      ></el-table-column>
      <el-table-column
        align="center"
        label="省份"
        prop="province"
      ></el-table-column>
      <el-table-column
        align="center"
        label="城市"
        prop="city"
      ></el-table-column>
      <el-table-column
        align="center"
        label="地址"
        prop="address"
      ></el-table-column>
    </el-table>

    <!-- <el-pagination

      @current-change="getList"
    /> -->

    <div class="show-order">
      <el-tag>默认顺序</el-tag>
      {{ oldList }}
    </div>

    <div class="show-order">
      <el-tag>拖拽后顺序</el-tag>
      {{ newList }}
    </div>

    <el-dialog
      title="新增医院"
      width="30%"
      :visible.sync="addHisDialogInfo.visible"
    >
      <el-form
        ref="addHisForm"
        :model="addHisDialogInfo.model"
        :rules="addHisDialogInfo.rules"
        label-width="auto"
      >
        <el-form-item label="医院编码" prop="hisCode">
          <el-input
            v-model="addHisDialogInfo.model.hisCode"
            placeholder="请输入医院编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院名称" prop="hisCode">
          <el-input
            v-model="addHisDialogInfo.model.hisName"
            placeholder="请输入医院名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="行政级别" prop="hisCode">
          <el-input
            v-model="addHisDialogInfo.model.level"
            placeholder="请输入行政级别"
          ></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="hisCode">
          <el-input
            v-model="addHisDialogInfo.model.province"
            placeholder="请选择省份"
          ></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="hisCode">
          <el-input
            v-model="addHisDialogInfo.model.city"
            placeholder="请选择城市"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院地址">
          <el-input
            v-model="addHisDialogInfo.model.address"
            placeholder="请输入医院地址"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="addHisDialogInfo.visible = false">返回</el-button>
        <el-button type="primary" @click="handleAddHis">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Super } from "@/api/types";
import Sortable from "sortablejs";
import { Form } from "element-ui";
import { addHosp, getHospList } from "@/api/hospital";

@Component({
  name: "DragTable",
})
export default class extends Vue {
  private list: Super[] = [];

  private listQuery = {
    search: "",
    page: 1,
    limit: 20,
  };

  private addHisDialogInfo = {
    visible: false,
    model: {
      hisCode: "",
      hisName: "",
      level: "",
      province: "",
      city: "",
      address: "",
    },
    rules: {
      hisCode: [
        { required: true, message: "医院编码不能为空", trigger: "blur" },
      ],
      hisName: [
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
    const { data } = await getHospList();

    this.list = data.list;
    this.oldList = this.list.map((v) => v.id);
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
            const targetRow = this.list.splice(evt.oldIndex, 1)[0];
            this.list.splice(evt.newIndex, 0, targetRow);
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
