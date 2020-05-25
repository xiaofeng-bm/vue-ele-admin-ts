<template>
  <el-row>
    <el-col :span="colSize">
      <div class="app-container">
        <el-card>
          <div slot="header" class="filter-container">
            <el-input
              v-model="listQuery.hosName"
              placeholder="请输入医院名称..."
              clearable
            ></el-input>
            <el-select
              v-model="listQuery.province.select"
              placeholder="省份"
              clearable
              @change="provinceGetCity"
            >
              <el-option
                v-for="item in listQuery.province.options"
                :key="item.code"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
            <el-select
              v-model="listQuery.city.select"
              placeholder="城市"
              clearable
            >
              <el-option
                v-for="item in listQuery.city.options"
                :key="item.code"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>

            <el-button type="primary" icon="el-icon-search" @click="getList"
              >搜索</el-button
            >

            <el-button type="primary" icon="el-icon-plus" @click="handleAddBtn"
              >新增</el-button
            >

            <!-- <el-button type="primary" icon="el-icon-download">导出</el-button> -->
          </div>

          <div class="table-container">
            <bm-table v-loading="tableLoading" :config="config">
              <template v-slot:append>
                <el-table-column width="150" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="handleEdit(scope.row)"
                      >编辑</el-button
                    >
                    <el-button type="danger" @click="handleDel(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </template>
            </bm-table>

            <bm-pagination
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              :total="listQuery.total"
              @pagination="getList"
            />
          </div>
        </el-card>

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
              <el-select
                v-model="addHisDialogInfo.model.province.select"
                filterable
                placeholder="请选择省份"
                clearable
                @change="handleGetCity"
              >
                <el-option
                  v-for="item in addHisDialogInfo.model.province.options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.province"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-select
                v-model="addHisDialogInfo.model.city.select"
                filterable
                placeholder="请选择城市"
                clearable
              >
                <el-option
                  v-for="item in addHisDialogInfo.model.city.options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.city"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="医院地址">
              <el-input
                v-model.trim="addHisDialogInfo.model.address"
                placeholder="请输入医院地址"
              ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer">
            <el-button @click="addHisDialogInfo.visible = false"
              >返回</el-button
            >
            <el-button type="primary" @click="handleAddHis">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>

    <router-view></router-view>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { IConfig, IResponse } from "@/api/types";
import { defaultAddHospitalData } from "@/api/hospital";
import { getHospList, addHosp, delHops } from "@/api/hospital";
import { getProvince, getCity } from "@/api/province";
import { deepClone } from "@/utils/index";
import { scrollTo } from "@/utils/scroll-to";
import { Route } from 'vue-router';

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
    limit: 20,
    total: 0,
    hosName: "",
    province: {
      select: "",
      options: [],
    },
    city: {
      select: "",
      options: [],
    },
  };

  private tableLoading = false;

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

  @Watch('$route')
  private onRouteChange(route: Route) {
    if(route.params.refresh) {
      this.getList();
    }
  }

  created() {
    this.getList();
    this.getInitProvince();
  }

  get colSize() {
    return this.$route.meta.shrink ? 16 : 24;
  }

  private async getList() {
    this.tableLoading = true;
    const { data } = await getHospList({
      page: this.listQuery.page,
      limit: this.listQuery.limit,
      hosName: this.listQuery.hosName,
      province: this.listQuery.province.select,
      city: this.listQuery.city.select,
    });
    this.tableLoading = false;
    this.config = data.config;
    this.listQuery.page = data.page;
    this.listQuery.total = data.total;
  }

  private async getInitProvince() {
    const { data } = await getProvince();
    this.listQuery.province.options = data;
  }
  // 通过省份获取城市
  private async provinceGetCity(province: string) {
    if (province) {
      this.listQuery.city.select = '';
      this.listQuery.city.options = [];
      const provinceItem: any = this.listQuery.province.options.find((item: any) => {
        return item.name === province;
      })
      const { data } = await getCity({ province: provinceItem.province });
      this.listQuery.city.options = data;
    }
  }

  private resetFormData() {
    this.addHisDialogInfo.model = deepClone(defaultAddHospitalData);
  }

  // ----------------------------------新增相关------------------------
  // 新增按钮
  private handleAddBtn() {
    this.resetFormData();
    this.addHisDialogInfo.visible = true;
    this.getProvince();
  }

  // 获取省份信息
  private async getProvince() {
    const { data } = await getProvince();
    this.addHisDialogInfo.model.province.options = data;
  }
  // 根据省份信息获取城市信息
  private async handleGetCity(province: string) {
    const { data } = await getCity({ province: province });
    this.addHisDialogInfo.model.city.options = data;
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

  // -----------------------------编辑&删除-----------------------------
  private handleEdit(row: any) {
    this.$router.push({
      path: "/table/complex-table/edit",
      query: {
        hosCode: row.hosCode,
      },
    });
    scrollTo(0, 800);
  }
  private async handleDel(row: any) {
    const res: any = await delHops({ id: row.id });
    if (res.code === 0) {
      this.getList();
    }
  }

  // ---------------------------- 分页相关 -----------------------------
  private handleSizeChange(val: number) {
    this.listQuery.limit = val;
    this.getList();
  }
  private handleCurrentChange(val: number) {
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
