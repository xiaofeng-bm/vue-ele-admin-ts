<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.hosName"
        placeholder="请输入医院名称..."
        clearable
      ></el-input>
      <el-select
        v-model="listQuery.province.select"
        placeholder="省份"
        clearable
      >
        <el-option
          v-for="item in listQuery.province.options"
          :key="item"
          :value="item"
          :label="item"
        ></el-option>
      </el-select>
      <el-select v-model="listQuery.city.select" placeholder="城市" clearable>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="getList"
        >搜索</el-button
      >

      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleAddBtn"
        >新增</el-button
      >

      <el-button type="primary" icon="el-icon-download">导出</el-button>
    </div>

    <div class="table-container">
      <bm-table :config="config"></bm-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="listQuery.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
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
        <el-form-item label="医院编码" prop="hosCode">
          <el-input
            v-model.trim="addHisDialogInfo.model.hosCode"
            placeholder="请输入医院编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院名称" prop="hosName">
          <el-input
            v-model.trim="addHisDialogInfo.model.hosName"
            placeholder="请输入医院名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="行政级别" prop="level">
          <el-input
            v-model.trim="addHisDialogInfo.model.level"
            placeholder="请输入行政级别"
          ></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input
            v-model.trim="addHisDialogInfo.model.province"
            placeholder="请选择省份"
          ></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input
            v-model.trim="addHisDialogInfo.model.city"
            placeholder="请选择城市"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院地址">
          <el-input
            v-model.trim="addHisDialogInfo.model.address"
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
import { Form } from "element-ui";
import { IConfig } from "@/api/types";
import { defaultAddHospitalData } from '@/api/hospital';
import { getHospList, addHosp } from "@/api/hospital";
import { deepClone } from '@/utils/index';

@Component({
  name: "ComplexTable",
})
export default class extends Vue {
  private config: IConfig = {
    config: {},
    table: [],
  };
  private listQuery = {
    page: 1,
    pageSize: 10,
    limit: 10,
    total: 0,
    hosName: "",
    province: {
      select: "",
      options: ["北京市"],
    },
    city: {
      select: "",
      options: ["北京市"],
    },
  };

  private addHisDialogInfo = {
    visible: false,
    model: defaultAddHospitalData,
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

  created() {
    this.getList();
  }

  private async getList() {
    const { data } = await getHospList({
      page: this.listQuery.page,
      limit: this.listQuery.limit,
      hosName: this.listQuery.hosName,
      province: this.listQuery.province.select,
      city: this.listQuery.city.select,
    });
    this.config = data.config;
    this.listQuery.page = data.page;
    this.listQuery.total = data.total;
  }

  private resetFormData() {
    this.addHisDialogInfo.model = deepClone(defaultAddHospitalData);
  }
  // 新增按钮
  private handleAddBtn() {
    this.resetFormData();
    this.addHisDialogInfo.visible = true;
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

  // ---------------------------- 分页相关 -----------------------------
  handleSizeChange(val: number) {
    this.listQuery.limit = val;
    this.getList();
  }
  handleCurrentChange(val: number) {
    this.listQuery.page = val;
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  div + div,
  div + button {
    margin-left: 10px;
  }
  & > .el-input {
    width: 200px;
  }
}
</style>
