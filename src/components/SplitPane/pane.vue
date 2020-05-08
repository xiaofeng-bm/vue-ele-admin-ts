<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "PaneItem",
})
export default class extends Vue {
  @Prop({ default: "" }) private className!: string;
  @Prop({
    required: true,
    validator: (value) => {
      return ["vertical", "horizontal"].indexOf(value) >= 0;
    },
  })
  private split!: string;

  get classes() {
    const classList = [this.split, this.className];
    return classList.join(" ");
  }
}
</script>

<style lang="scss" scoped>
.splitter-pane.vertical.splitter-paneL {
  position: absolute;
  left: 0px;
  height: 100%;
  padding-right: 3px;
}

.splitter-pane.vertical.splitter-paneR {
  position: absolute;
  right: 0px;
  height: 100%;
  padding-left: 3px;
}

.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
  padding-bottom: 3px;
}

.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-top: 3px;
}
</style>
