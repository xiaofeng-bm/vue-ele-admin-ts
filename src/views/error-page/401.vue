<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="back-btn" @click="back"
      >返回</el-button
    >

    <el-row>
      <el-col :span="12">
        <h2>您无权查看此页面</h2>
        <h5>如有疑问，请联系管理员</h5>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" alt="401" width="313" height="428" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import errGif from "@/assets/401-images/401.gif";

@Component({
  name: "Error401",
})
export default class extends Vue {
  private errGif = errGif + "?" + +new Date();

  private back() {
    if (this.$route.query.noGoBack) {
      this.$router.push({ path: "/dashboard" });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
}
</style>
