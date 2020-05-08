<template>
  <div class="components-container">
    <split-pane split="vertical">
      <template slot="paneL">
        <div class="left-container"></div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">

            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">

            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SplitPane from "@/components/SplitPane/index.vue";

@Component({
  name: "SplitPaneDemo",
  components: {
    SplitPane
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.components-container {
  height: 100vh;
  padding: 20px;
}
.left-container {
  background-color: #F38181;
  height: 100%;
}


.top-container {
  height: 100%;
  background-color: #8ADE1D;
}
.bottom-container {
  height: 100%;
  background-color: #1DDEB1;
}
</style>
