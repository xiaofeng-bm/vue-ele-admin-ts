import { DirectiveOptions } from 'vue';

export const elDraggableDialog: DirectiveOptions = {
  bind(el, _, vnode) {
    // 获取弹框元素
    const dragDom = el.querySelector('.el-dialog') as HTMLElement;
    // 获取弹框header
    const dialogHeaderEl = el.querySelector('.el-dialog__header') as HTMLElement;
    // dragDom.style.cssText += ';top:0px;'
    // 设置dialog-header样式为拖拽样式
    dialogHeaderEl.style.cssText += ";cursor:move";

    dialogHeaderEl.onmousedown = (e) => {
      // 弹框距左边屏幕距离，
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 拖拽元素的宽高
      const dragDomWidth = dragDom.offsetWidth;
      const dragDomHeight = dragDom.offsetHeight;

      // 屏幕的宽高
      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      console.log('disX=')
    }
  }
}