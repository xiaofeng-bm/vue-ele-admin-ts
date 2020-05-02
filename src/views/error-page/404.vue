<template>
  <div class="errPage-container">
    <div class="pic-404">
      <el-row>
        <el-col :span="12">
          <img
            class="pic-404__parent"
            src="@/assets/404-images/404.png"
            alt="404"
          />
        </el-col>
        <el-col :span="12">
          <h2>页面找不到了</h2>
          <el-button icon="el-icon-arrow-left" class="back-btn" @click="back"
            >返回</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Error404",
})
export default class extends Vue {
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
  width: 70%;
  margin: 100px auto;

  .pic-404 {
    position: relative;
    width: 100%;
    float: left;
    overflow: hidden;

    &__parent {
      width: 100%;
    }
  }
}
.back-btn {
  background: #008489;
  color: #fff;
  border: none !important;
}
</style>
