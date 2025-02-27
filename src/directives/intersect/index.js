function inserted (el, binding) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { handler, options } =
    typeof value === 'object' ? value : { handler: value, options: {} }
  const observer = new IntersectionObserver((entries = [], observer) => {
    /* istanbul ignore if */
    if (!el._observe) return // Just in case, should never fire
    // If is not quiet or has already been
    // initted, invoke the user callback

    if (handler && (!modifiers.quiet || el._observe.init)) {
      const isIntersecting = Boolean(
        entries.find(entry => entry.isIntersecting)
      )
      handler(entries, observer, isIntersecting)
    } // If has already been initted and
    // has the once modifier, unbind

    if (el._observe.init && modifiers.once) unbind(el)
    // Otherwise, mark the observer as initted
    else el._observe.init = true
  }, options)
  el._observe = {
    init: false,
    observer
  }
  observer.observe(el)
}

function unbind (el) {
  /* istanbul ignore if */
  if (!el._observe) return

  el._observe.observer.unobserve(el)

  delete el._observe
}

export const Intersect = {
  inserted,
  unbind
}
export default Intersect
// # sourceMappingURL=index.js.map
