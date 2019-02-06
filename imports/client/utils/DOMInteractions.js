export function toggleBodyOverflow() {
  document.querySelector('body').classList.toggle('overflow');
}

export function scrollToElement(ele, duration = 400) {
  const pageY = window.pageYOffset;
  const eleY = pageY + document.querySelector(ele).getBoundingClientRect().top;
  const targetY =
    document.body.scrollHeight - eleY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : eleY;
  const diff = targetY - pageY;
  const easing = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  let start;

  if (!diff) {
    return;
  }

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;

    let time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);

    window.scrollTo(0, pageY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
