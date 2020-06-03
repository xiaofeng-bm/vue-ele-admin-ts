<template>
  <el-col :span="8" class="edit-container">
    <el-card v-loading="loading">
      <div slot="header">
        <span>编辑</span>
      </div>
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
              :value="item.name"
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
              :value="item.name"
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

      <div class="text-right">
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" @click="handleEditHis">确定</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defaultAddHospitalData } from "@/api/hospital";
import { getProvince, getCity } from "@/api/province";
import { hospDetail, editHops } from "@/api/hospital";

@Component({
  name: "tableEdit",
})
export default class extends Vue {
  private loading = false;

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
    this.getHospInfo();
  }
  // 获取单条医院详情
  private async getHospInfo() {
    this.loading = true;
    const { data } = await hospDetail({ hosCode: this.$route.query.hosCode });
    this.loading = false;
    this.addHisDialogInfo.model.hosCode = data.hospInfo.hosCode;
    this.addHisDialogInfo.model.hosName = data.hospInfo.hosName;
    this.addHisDialogInfo.model.level = data.hospInfo.level;
    this.addHisDialogInfo.model.province.select = data.hospInfo.province;
    this.addHisDialogInfo.model.city.select = data.hospInfo.city;

    this.addHisDialogInfo.model.province.options = data.provinceList;
    this.addHisDialogInfo.model.city.options = data.cityList;
  }
  // 获取省份信息
  private async getProvince() {
    const { data } = await getProvince();
    this.addHisDialogInfo.model.province.options = data;
  }
  // 根据省份信息获取城市信息
  private async handleGetCity(province: string) {
    this.addHisDialogInfo.model.city.select = '';
    const provinceItem: any = this.addHisDialogInfo.model.province.options.find((item: any) => {
      return item.name === province;
    })
    const { data } = await getCity({ province: provinceItem.province });
    this.addHisDialogInfo.model.city.options = data;
  }

  private async handleEditHis() {
    await editHops({
      hosCode: this.addHisDialogInfo.model.hosCode,
      hosName: this.addHisDialogInfo.model.hosName,
      level: this.addHisDialogInfo.model.level,
      province: this.addHisDialogInfo.model.province.select,
      city: this.addHisDialogInfo.model.city.select,
      address: this.addHisDialogInfo.model.address
    });
    this.goBack({ refresh: true });
  }

  private goBack(params?: any) {

    this.$router.push({
      name: 'complex-table',
      params: {position: this.$route.query.position, ...params}
    })
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding-left: 20px;
}
.text-right {
  text-align: right;
}
</style>
