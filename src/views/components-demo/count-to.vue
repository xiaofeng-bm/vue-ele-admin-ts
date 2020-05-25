<template>
  <div class="app-container">
    <count-to
      ref="count"
      :start-val="startVal"
      :end-val="endVal"
      :duration="duration"
      :decimals="decimals"
      :separator="separator"
      :prefix="prefix"
      :suffix="suffix"
      :autoplay="false"
      class="count"
    />

    <el-form class="data-container" size="small" :inline="true" label-width="auto">
      <el-form-item label="startVal:">
        <el-input v-model.number="startVal"></el-input>
      </el-form-item>
      <el-form-item label="endVal:">
        <el-input v-model.number="endVal"></el-input>
      </el-form-item>
      <el-form-item label="duration:">
        <el-input v-model.number="duration"></el-input>
      </el-form-item>
      <el-form-item label="decimals:">
        <el-input v-model.number="decimals"></el-input>
      </el-form-item>
      <el-form-item label="separator:">
        <el-input v-model="separator"></el-input>
      </el-form-item>
      <el-form-item label="suffix:">
        <el-input v-model="suffix"></el-input>
      </el-form-item>
      <el-form-item label="prefix:">
        <el-input v-model="prefix"></el-input>
      </el-form-item>

      <el-button type="primary" plain @click="handleBegin">开始</el-button>
      <el-button type="danger" plain @click="pauseResume">暂停/继续</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import countTo from 'vue-count-to';

@Component({
  name: "CountTo",
  components: {
    countTo
  }
})
export default class extends Vue {
  private startVal = 0
  private endVal = 2017
  private duration = 4000
  private decimals = 0
  private separator = ','
  private suffix = ' rmb'
  private prefix = '¥ '


  private handleBegin() {
    (this.$refs['count'] as any).start();
  }

  private pauseResume() {
    (this.$refs['count'] as any).pauseResume();
  }
}
</script>

<style lang="scss" scoped>
.count {
  color: #f6416c;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
  display: block;
  text-align: center;
}
.data-container {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
