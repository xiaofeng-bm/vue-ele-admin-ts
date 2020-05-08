const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// 最后面哪个setTimeout是为了兼容不支持requestAnimationFrame的浏览器。
const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// 这里不太好检测滚动是哪个元素，所以干脆都移动了
function move(amount: number) {
  document.documentElement.scrollTop = amount;
  (document.body.parentNode as HTMLElement).scrollTop = amount;
  document.body.scrollTop = amount;
}
function position() {
  return (
    document.documentElement.scrollTop ||
    (document.body.parentNode as HTMLElement).scrollTop ||
    document.body.scrollTop
  );
}
export function scrollTo(to: number, duration: number, callback?: Function) {
  // 开始滚动的位置
  const start = position();
  // 需要滚动的距离
  const change = to - start;
  // 当前时间
  let currentTime = 0;
  // 每次增长时间
  // 注：vue-element-admin中这个值是20，如果不考虑兼容性，我个人觉得应该设置为17毫秒，因为按照requestAnimationFrame回调函数每秒执行60此来算，每次花费16.666666毫秒，猜测设置为20毫秒是为了防止setTimeout出现延时造成问题吧。
  const increment = 20;
  // 持续时间，默认500毫秒
  duration = typeof duration === "undefined" ? 500 : duration;

  const animateScroll = function() {
    currentTime += increment;
    // 计算移动的距离
    const val = easeInOutQuad(currentTime, start, change, duration);
    // 移动
    move(val);

    if (currentTime < duration) {
      // 递归调用
      requestAnimFrame(animateScroll);
    }
  };
  animateScroll();
}
