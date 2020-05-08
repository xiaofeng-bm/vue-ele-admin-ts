<template>
  <div
    :style="{ cursor, userSelect }"
    class="vue-splitter-container clearfix"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <pane
      class="splitter-pane splitter-paneL"
      :split="split"
      :style="{ [type]: percent + '%' }"
    >
      <slot name="paneL"></slot>
    </pane>

    <resizer
      :className="className"
      :style="{ [resizeType]: percent + '%' }"
      :split="split"
      @mousedown.native="onMouseDown"
      @click.native="onClick"
    ></resizer>

    <pane
      class="splitter-pane splitter-paneR"
      :split="split"
      :style="{ [type]: 100 - percent + '%' }"
    >
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Pane from "./pane.vue";
import Resizer from "./resizer.vue";

@Component({
  name: "SplitPane",
  components: {
    Pane,
    Resizer,
  },
})
export default class extends Vue {
  @Prop({ default: 10 }) private minPercent!: number;
  @Prop({ default: 50 }) private defaultPercent!: number;
  @Prop({ default: "" }) private className!: string;
  @Prop({
    required: true,
    validator: (value) => {
      return ["vertical", "horizontal"].indexOf(value) >= 0;
    },
  })
  private split!: string;

  // data数据
  private active = false;
  private hasMoved = false;
  private height = null;
  private percent = this.defaultPercent;
  private type = this.split === "vertical" ? "width" : "height";
  private resizeType = this.split === "vertical" ? "left" : "top";

  get userSelect() {
    return this.active ? "none" : "";
  }
  get cursor() {
    return this.active
      ? this.split === "vertical"
        ? "col-resize"
        : "row-resize"
      : "";
  }

  @Watch("defaultPercent")
  private onDefaultPercentChange(value: number) {
    this.percent = value;
  }

  private onClick() {
    if (!this.hasMoved) {
      this.percent = 50;
      this.$emit("resize", this.percent);
    }
  }

  private onMouseDown() {
    this.active = true;
    this.hasMoved = false;
  }

  private onMouseUp() {
    this.active = false;
  }

  private onMouseMove(e: any) {
    if (e.buttons === 0 || e.which === 0) {
      this.active = false;
    }

    if (this.active) {
      let offset = 0;
      let target = e.currentTarget;
      if (this.split === "vertical") {
        while (target) {
          offset += target.offsetLeft;
          target = target.offsetParent;
        }
      } else {
        while (target) {
          offset += target.offsetTop;
          target = target.offsetParent;
        }
      }

      const currentPage = this.split === "vertical" ? e.pageX : e.pageY;
      const targetOffset =
        this.split === "vertical"
          ? e.currentTarget.offsetWidth
          : e.currentTarget.offsetHeight;
      const percent =
        Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100;

      if (percent > this.minPercent && percent < 100 - this.minPercent) {
        this.percent = percent;
      }

      this.$emit("resize", this.percent);
      this.hasMoved = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-splitter-container {
  height: 100%;
  position: relative;
}

.splitter-pane-resizer.vertical {
  width: 11px;
  height: 100%;
  position: absolute;
  z-index: 1;
  cursor: col-resize;
}
.splitter-paneL {
  position: absolute;
  left: 0;
}
.splitter-paneR {
  position: absolute;
  right: 0;
}

.splitter-pane {
  height: 100%;
}
</style>
