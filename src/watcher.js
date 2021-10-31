function watcher(element, fn) {
    let container = element
    let callback = fn
    let _this = {}

    const requestFrame = (() => {
        let raf = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            ((fn) => window.setTimeout(fn, 20))

        return (fn) => raf(fn)
    })()

    const cancelFrame = (() => {
        let cancel = window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.clearTimeout

        return (id) => cancel(id)
    })()


    /**
     * The resize listener
     * @param {event} e 
     */
    function resizeListener(e) {
        let win = e.target || e.srcElement

        if (win.__resizeRAF__) {
            cancelFrame(win.__resizeRAF__)
        }

        win.__resizeRAF__ = requestFrame(() => {
            let trigger = win.__resizeTrigger__
            trigger.__resizeListeners__.forEach((fn) => {
                fn(trigger, e)
            })
        })
    }

    /**
     * Object document
     */
    function objectLoad() {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
        this.contentDocument.defaultView.addEventListener('resize', resizeListener)
    }

    /**
     * This method attaches the resize listener to the 
     * object element with other attributes which is then appended
     * to the target element which is to be watched
     * @param {HTMLDivElement} element 
     * @param {function} fn 
     */
    _this.start = (element = container, fn = callback) => {
        if (!element.__resizeListeners__) {
            element.__resizeListeners__ = []
            element.style.position = 'relative'

            let obj = element.__resizeTrigger__ = document.createElement('object')
            obj.classList.add('pt-object')
            obj.__resizeElement__ = element
            obj.type = 'text/html'
            obj.data = 'about:blank'
            obj.onload = objectLoad

            element.appendChild(obj)
        }

        element.__resizeListeners__.push(fn)
    }

    /**
     * This is the counterpart of the start method it dettach
     * event listener from window and element including object
     * @param {HTMLDivElement} element 
     * @param {function} fn 
     */
    _this.stop = (element = container, fn = callback) => {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)

        if (!element.__resizeListeners__.length) {
            element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener)
            element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
        }
    }

    return _this
}

export default watcher