export function watch(element, fn) {
    let _this = {}
    let obj = document.createElement('object')

    /**
     * Event listener to the docs object
     */
    function resizeEvent () {
        this.contentDocument.defaultView.addEventListener('resize', fn)
    }

    /**
     * Attach event listener to object
     */
    _this.start = () => {
        obj.classList.add('pt-object')
        obj.type = 'text/html'
        obj.data = 'about:blank'
        obj.onload = resizeEvent
        element.appendChild(obj)
    }

    /**
     * dettach event listener and remove object
     */
    _this.stop = () => {
        obj.contentDocument.defaultView.removeEventListener('resize', fn)
        element.removeChild(obj)
    }

    return _this
}

/**
 * Returns the target table element
 * @param {String|HTMLTableElement} tableEl 
 * @returns HTMLTableElement
 */
export function getTable(tableEl) {
    if (typeof tableEl === 'string' || tableEl instanceof String) {
        return document.querySelector(tableEl)
    } else {
        return tableEl
    }
}