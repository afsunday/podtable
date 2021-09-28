function Podtable(tableEl, config = {}) {
    /**
     * The associated table that podtable will render
     * @type HTMLTableElement
     */
    let table = document.querySelector(tableEl)

    /**
     * This is the target row which enables squishitude
     * @type HTMLTableRowElement
     */
    let targetRow

    /**
     * Error messages for table health check failure
     * @returns String
     */
    let errorMessage

    /**
     * This is the store for cells that currently hidden
     * @type Array
     */
    let hiddenCells = []

    /**
     * This is constant index of cells generated from target row
     * @type Array
     */
    let constIndex = []

    /**
     * These are cells that wont be hidden
     * @type Array
     */
    let keepCell = [0]

    /**
     * This is the podtable instance
     */
    let _this = this

    /**
     * This holds the current cell been hidden
     * @returns Number
     */
    _this.current

    /**
     * Perform an health check and if check fails we will throw an error
     * but if its case empty tbody rows then we will assume no data 
     * and we then select the right element for target row
     */
    if (healthCheck(table) === false) {
        throw new Error(errorMessage)
    } else if (healthCheck(table) === -1) {
        targetRow = document.querySelector(`${tableEl} thead tr`)
    } else if (healthCheck(table)) {
        targetRow = document.querySelector(`${tableEl} tbody tr`)
    }

    /**
     * A wrapper for the render table
     */
    let tableContainer = document.createElement('div')
    tableContainer.setAttribute('id', 'podtable-container')
    table.parentNode.insertBefore(tableContainer, table)
    tableContainer.appendChild(table)

    

    /**
     * Set the cells that will not be hidden
     * @returns void
     */
    setKeepCell(config)

    /**
     * Attach event listener for control toggle
     * @returns void
     */
    setToggleCell(tableEl)

    /**
     * Set the cell index for 
     */
    setCellIndex(tableEl)

    render()
    ayncRedraw(tableEl)

    /**
     * Performs an Health check on the target table
     * @param {HTMLTableElement} table 
     * @returns Boolean
     */
    function healthCheck(table) {
        if (table === null) {
            errorMessage = 'Unable to access target HTMLTableElement'
            return false
        }

        if (!(table instanceof HTMLTableElement)) {
            errorMessage = 'Element is not a HTMLTableElement'
            return false
        }

        if (table.tHead === null) {
            errorMessage = 'Table should have only one THEAD'
            return false
        }

        if (table.tBodies.length <= 0) {
            errorMessage = 'Table should have only one TBODY'
            return false
        }

        if (table.tBodies[0].rows.length <= 0) {
            return -1
        }

        return true
    }

    /**
     * Add css class to control cells
     * @param {String} tableEl 
     */
    function setToggleCell(tableEl) {
        document.querySelector(`${tableEl} thead tr > th:last-child`).classList.add('main-toggle')
        document.querySelectorAll(`${tableEl} tbody tr:not(tr.child) > td:last-child`).forEach(el => {
            el.classList.add('toggle')
        })
    }

    /**
     * Add data attribute to elements to serve as cell index and we will
     * Reverse cell index array to hide cells from the right and also make
     * sure we reserve the toggle cell from being hidden along with others
     * @param {String} tableElement
     * @returns void 
     */
    function setCellIndex(tableEl) {
        let rows = document.querySelectorAll(`${tableEl} tr`)
        let tempConst = []

        for (let ci = 0; ci < targetRow.children.length; ci++) {
            tempConst.push(ci)
        }

        if (Object.prototype.hasOwnProperty.call(config, 'priority') &&
            Array.isArray(config.priority) &&
            config.priority.length > 0) {
            
            constIndex = Array.from(new Set(config.priority.concat(tempConst.reverse())))
        } else {
            constIndex = tempConst.reverse()
        }

        keepCell.push(tempConst.length - 1)
    }

    /**
     * Merge config option with the existing keep cell array
     * @param {Object} config 
     */
    function setKeepCell(config) {
        if(Object.prototype.hasOwnProperty.call(config, 'keepCell')) {
            if (! Array.isArray(config.keepCell)) {
                throw TypeError('keep cell must be of type array') 
            } else {
                keepCell = [...keepCell, ...config.keepCell]
            }
        }
    }

    /**
     * Create tr element and append cell column data
     * @param {HTMLCollection} cells 
     * @returns Element Node
     */
    function childRow (cells) {
        let tr = document.createElement('tr')
        let gridTD = document.createElement('td')
        let gridRow = document.createElement('div')
        
        gridTD.colSpan = constIndex.length
        gridRow.classList.add('child-grid-row')
        tr.classList.add('child')
    
        for (let i = 0; i < cells.length; i++) {
            gridRow.append(cells[i])
        }
        
        gridTD.append(gridRow)
        tr.append(gridTD)
    
        return tr
    }

    /**
     * Create grid column div Element to append to child row
     * @param {el} el
     * @returns Element Node
     */
    function gridCol(el) {
        let gridCol = document.createElement('div')
        gridCol.classList.add('child-grid-col')
    
        let dataColName = document.createElement('div')
        let dataColDesc = document.createElement('div')
        dataColName.innerHTML = table.tHead.rows[0].cells[el.cellIndex].innerHTML
        dataColDesc.innerHTML = el.innerHTML
    
        gridCol.append(dataColName)
        gridCol.append(dataColDesc)
        
        return gridCol
    }

    /**
     * Toggle single child row and calculate hidden element for the row 
     * @param {event} event
     */
    function toggle(e) {
        if (hiddenCells.length <= 0) { return }
        
        let parent = e.target.parentElement

        if(parent.classList.contains('has-child')) {
            parent.classList.remove('has-child')
            parent.nextElementSibling.remove()
        } else {
            parent.classList.add('has-child')
            let isHidden = []
            for (let i = 0; i < parent.cells.length; i++) {
                if (parent.cells[i].classList.contains('hidden')) {
                    isHidden.push(gridCol(parent.cells[i]))
                }
            }

            parent.parentNode.insertBefore(childRow(isHidden), parent.nextSibling)
        }
    }

    /**
     * Handles toggle all child rows event by checking which rows 
     * has child to close and which rows has no child to open
     * @param {event} event
     */
    function toggleAll(e) {
        if (hiddenCells.length <= 0) { return }

        let toggleEls = document.querySelectorAll('.toggle')
        let toggler = e.currentTarget

        if(toggler.classList.contains('expanded')) {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement
                if (togsParent.classList.contains('has-child')) {
                    toggleEls[i].click()
                }
            }
            toggler.classList.remove('expanded')
        } else {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement
                if (! togsParent.classList.contains('has-child')) {
                    toggleEls[i].click()
                }
            }
            toggler.classList.add('expanded')
        }
    }

    /**
     * Adds click Event listener to rows with css class of 
     * toggle and main-toggle so as to toggle child rows
     */
    function addToggleListener () {
        let togElements = document.querySelectorAll('.toggle')
        for (let i = 0; i < togElements.length; i++) {
            togElements[i].addEventListener('click', (e) => {
                toggle(e)
            })
        }

        let mainToggle = document.querySelector('.main-toggle')
        mainToggle.addEventListener('click', (e) => {
            toggleAll(e)
        })
    }

    /**
     * Check if there are hidden elements ands determine when to show
     * child row toggle button and also clean up unused css class.
     */
    function doTogglerScreen () {
        if(hiddenCells.length > 0) {
            table.classList.add('show-toggle')
        } else {
            document.querySelectorAll('.has-child').forEach(el => {
                el.classList.remove('has-child')
            })

            table.classList.remove('show-toggle')
            table.tHead.rows[0].cells[table.tHead.rows[0].cells.length - 1].classList.remove('expanded')
        }
    }

    /**
     * Check for open child rows to enable reactivity as window resizes
     * then apply changes, item are remove and added every time window resize
     * and its like this so as to get an updated data from the cells
     * parent row child row are redrawn on each control toggle.
     */
    function childRowListener () {
        let openChildRow = document.querySelectorAll('.child')
        
        if(openChildRow.length > 0) {
            let openChildParent = []

            for (let i = 0; i < openChildRow.length; i++) {
                openChildParent.push(openChildRow[i].previousElementSibling)
            }

            // Iterate from parents elements down to child elements
            for (let p = 0; p < openChildParent.length; p++) {
                let isHidden = []
                
                for (let cell of openChildParent[p].cells) {
                    if (cell.classList.contains('hidden')) {
                        isHidden.push(gridCol(cell))
                    }
                }

                // we will remove the existing child row and put another one with new data
                // we also check if the hidden cells length > 0 before inserting a new child row
                // so as to avoid empty child rows and orphaned child rows
                openChildParent[p].nextElementSibling.remove()
                
                if(hiddenCells.length > 0) {
                    openChildParent[p].after(childRow(isHidden))
                }

                doTogglerScreen()
            }
        }
    }

    /**
     * Hide the next vertical cells that falls into the maximum squishitude
     * using index from the cells constant index array and we dispatch an event 
     * which will take in the currently hidden index for that particular viewport.
     * @param {Number} index 
     */
    function hideMain(index, pt = table) {
        hiddenCells.push(index)

        for (let row of pt.rows) {
            row.cells[index].classList.add('hidden')
        }

        eventDispatch(index)
    }

    /**
     * Here we will check if the window resize is an increase or decrease 
     * and determine which column to show base on the maximum squishitude 
     * of cell rows and also all necessary listeners to enable reactivity. 
     * when window size increases and there are no hidden cells we will need 
     * to dispatch event as well that there are currently no hidden cells.
     */
    function resize() {
        recalc()
        
        if (hiddenCells.length <= 0) {
            eventDispatch(-1)
            childRowListener()
        }
    }

    /**
     * Recalculate Cells thats needs to be hidden after flushing
     */
    function recalc() {
        flush()
        
        for (let i = 0; i < constIndex.length; i++) {
            if (targetRow.clientWidth > tableContainer.clientWidth) {
                if (!hiddenCells.includes(constIndex[i])) {
                    if (!keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                        childRowListener()
                    } 
                }
            }
        }
        
        doTogglerScreen()
    }

    /**
     * Here we remove the hidden class and flush the hidden cells 
     * array so as to restart procedure for the current viewport.
     */
    function flush() {
        for (let i = 0; i < hiddenCells.length; i++) {
            for (let row of table.rows) {
                row.cells[hiddenCells[i]].classList.remove('hidden')
            }
        }

        hiddenCells = []
    }

    /**
     * On page load calculate cells which  can fit into the current
     * maximum squishitude: apply visibility, attach necessary listeners.
     */
    function mount() {
        hiddenCells = []
        let ilength = constIndex.length
        
        for (let i = 0; i < ilength; i++) {

            if (targetRow.clientWidth > tableContainer.clientWidth) {
                if(! hiddenCells.includes(constIndex[i])) {
                    if (!keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                    } 
                }
            }
        }
        doTogglerScreen()
    }


    /**
     * Initialize table process
     */
    function render() {
        mount()
        addToggleListener()
        window.addEventListener('resize',  () => resize())
    }

    /**
     * On body rows child list mutation essential row attributes and events
     * will be lost hence the need to reset attriubtes and re attach necessary 
     * events listeners and also redispatch cells event but only the attached method
     * @param {String} tableEl 
     */
    function ayncRedraw(tableEl) {
        let bodyNode = document.querySelector(`${tableEl} tbody`)

        function doAttributes(node) {
            node.lastElementChild.classList.add('toggle')
            node.lastElementChild.addEventListener('click', (e) => toggle(e))
        }

        const callback = (mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length === 1) {
                    if (mutation.addedNodes[0].tagName == 'TR' && !mutation.addedNodes[0].classList.contains('child')) {
                        doAttributes(mutation.addedNodes[0])
                        shouldPing()
                    }
                } else if (mutation.type === 'childList' && mutation.removedNodes.length === 1) {
                    if (mutation.removedNodes[0].tagName == 'TR' &&
                        !mutation.removedNodes[0].classList.contains('child') &&
                        mutation.removedNodes[0].classList.contains('has-child')) {
                        mutation.nextSibling.remove()
                    }
                }
            }

            if (document.querySelector(`${tableEl} tbody`).rows.length <= 0) {
                targetRow = document.querySelector(`${tableEl} thead tr`)
            } else {
                targetRow = document.querySelector(`${tableEl} tbody tr`)
            }

            flush()
            mount()
        }

        const observer = new MutationObserver(callback)

        observer.observe(bodyNode, { childList: true })
    }

    /**
     * For every cells hidden this method will be called which check
     * if events want to be received also attach hidden index to return object.
     * @param {Number} index 
     */
    function eventDispatch(index) {
        _this.current = index

        if (config.event) { shouldPing() }
    }

    /**
     * Call the user attached method only if the event key is in the config 
     * object and it is set to true and we will  also wrap the function call 
     * in a try catch block to avoid code execution failure.
     */
    function shouldPing() {
        if (config.event) {
            try {
                config.method(_this)
            } catch (error) {
                console.error(error)
            }
        }
    }

    if (config.event) { return _this }
}

export default Podtable