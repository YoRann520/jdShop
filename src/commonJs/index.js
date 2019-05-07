// h5 虚拟键盘向上弹起
export const inputSIVI = () => {
    function $ (id) {
        return document.getElementById(id)
      }
      window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
          window.setTimeout(function () {
            document.activeElement.scrollIntoViewIfNeeded()
          }, 0)
        }
        $('iq-input').blur(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        })
      })
}