<template>
  <div class="app-container">
    <el-button type="primary" @click="openDialog">打开弹框</el-button>
    <el-dialog
      v-el-draggable-dialog
      :visible.sync="drag_dialog_info.visible"
      title="可拖拽弹框"
      @onDialogDrag="handleDialogDrag"
    >

    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "DraggableDialog"
})
export default class extends Vue {
  private drag_dialog_info = {
    visible: false
  }


  private openDialog() {
    this.drag_dialog_info.visible = true;
  }

  private handleDialogDrag() {
    // todo
  }
}
</script>

<style lang="scss" scoped>

</style>