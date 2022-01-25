import { watch, getTable } from './utils'

function Podtable(tableEl, config = {}) {
    /**
     * default config options
     * @type Object
     */
    let defaultOptions = {
        keepCell: [],
        priority: [],
        method: null
    }

    /**
     * config options
     */
    let options = Object.assign({}, defaultOptions, config)

    /**
     * The associated table that podtable will render
     * @returns HTMLTableElement
     */
    const table = getTable(tableEl)

    /**
     * This is the squishitude determinant row
     * @type HTMLTableRowElement
     */
    let targetRow

    /**
     * A wrapper for the render table
     * @returns HTMLElement
     */
    let tableContainer

    /**
     * Perform an health check on the passed table
     * @returns void
     */
    healthCheck(table)

    /**
     * Cache container width after health check passed
     */
    let oldTableContainerWidth = tableContainer.clientWidth

    /**
     * This is store for currently hidden cells
     * @type Array
     */
    let hiddenCells = []

    /**
     * Constant index of cells generated from target row
     * @type Array
     */
    let constIndex = []

    /**
     * This is the podtable instance
     */
    let _this = this

    /**
     * This holds the current cell that is hidden
     * @returns Number
     */
    _this.current

    /**
     * Process the config options passed
     * @returns void
     */
    processConfig()

    /**
     * Attach event listeners for control toggle
     * @returns void
     */
    setToggleCell(table)

    /**
     * Renders the table for the first instance
     * @returns void
     */
    render()

    /**
     * Starts a mutation observer
     * @returns void
     */
    ayncRedraw(table)

    /**
     * Set rendering target row
     * @param {HTMLTableElement} table 
     */
    function setTargetRow(table) {
        if (table.tBodies[0].rows.length <= 0) {
            targetRow = table.tHead.rows[0]
        } else {
            targetRow = table.tBodies[0].rows[0]
        }
    }
    
    /**
     * set the wrapper for podtable
     */
    function setWrapper() {
        tableContainer = document.createElement('div')
        tableContainer.setAttribute('id', 'podtable-container')
        table.parentNode.insertBefore(tableContainer, table)
        tableContainer.appendChild(table)
    }

    /**
     * Perform health check and if it fail will throw an error
     * And set the proper target row
     * @param {HTMLTableElement} table 
     */
    function healthCheck(table) {
        if (!(table instanceof HTMLTableElement) || table == null || table.tHead == null) {
            throw new Error('Invalid HTMLTableElement')
        }

        if (table.tHead.rows.length <= 0 || table.tHead.rows[0].cells.length < 0) {
            throw new Error('Invalid tHead HTMLTableRowElement')
        }

        if (table.tBodies.length <= 0 || table.tBodies.length > 1) {
            throw new Error('Table should have only one TBODY')
        }

        setTargetRow(table)
        setWrapper()
    }

    /**
     * Sets the control cells CSS clasess
     * @param {String} tableEl 
     */
    function setToggleCell(table) {
        table.tHead.rows[0].lastElementChild.classList.add('main-toggle')

        for (let row of table.tBodies[0].rows) {
            row.lastElementChild.classList.add('toggle')
        }
    }

    /**
     * The method process the config options
     * - Set cell hidden priority from the right
     * - Set indexes of cells to keep
     */
    function processConfig() {
        let tempConst = []

        for (let ci = 0; ci < targetRow.cells.length; ci++) {
            tempConst.push(ci)
        }

        if (Array.isArray(options.priority) && options.priority.length > 0 ) {
            constIndex = Array.from(new Set(options.priority.concat(tempConst.reverse())))
        } else {
            constIndex = tempConst.reverse()
        }

        if (! Array.isArray(options.keepCell)) {
            throw TypeError('keepCell is not an array') 
        } else {
            options.keepCell.push(0, tempConst.length - 1)
        }
    }

    /**
     * Create HTMLTableRowElement element & append cell column data
     * @param {HTMLCollection} cells 
     * @returns HTMLTableRowElement
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
     * Create HTMLElement to append to child row
     * @param {HTMLTableCellElement} el
     * @returns HTMLElement
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
     * @param {event} e
     */
    function toggle(e) {
        if (hiddenCells.length <= 0) { return }
        
        let parent = e.currentTarget.parentElement

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
     * @param {event} e
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
     * child row are redrawn on each control toggle.
     */
    function childRowListener () {
        let childRows = document.querySelectorAll('tr.child')
        
        if(childRows.length > 0) {
            let parentRows = []

            for (let row of childRows) {
                parentRows.push(row.previousElementSibling)
            }

            // Iterate from parents elements down to child elements
            for (let p = 0; p < parentRows.length; p++) {
                let isHidden = []
                
                for (let cell of parentRows[p].cells) {
                    if (cell.classList.contains('hidden')) {
                        isHidden.push(gridCol(cell))
                    }
                }

                // we will remove the existing child row and put another one with new data
                // we also check if the hidden cells length > 0 before inserting a new child row
                // so as to avoid empty child rows and orphaned child rows
                parentRows[p].nextElementSibling.remove()
                
                if(hiddenCells.length > 0) {
                    parentRows[p].after(childRow(isHidden))
                }

                doTogglerScreen()
            }
        }
    }

    /**
     * Hide cells that falls into maximum squishitude
     * Dispatch event for the current hidden cells index
     * @param {Number} index 
     */
    function hideMain(index, pt = table) {
        hiddenCells.push(index)

        for (let row of pt.rows) {
            if (!row.classList.contains('child')) {
                row.cells[index].classList.add('hidden')
            }
        }

        eventDispatch(index)
    }

    /**
     * Here we remove the hidden class and flush the hidden cells 
     * array so as to restart procedure for the current viewport.
     */
    function flush() {
        for (let i = 0; i < hiddenCells.length; i++) {
            for (let row of table.rows) {
                if (!row.classList.contains('child')) {
                    row.cells[hiddenCells[i]].classList.remove('hidden')
                }
            }
        }

        hiddenCells = []
    }

    /**
     * Recalculate Cells thats needs to be hidden after flushing
     */
    function recalc() {
        flush()
        
        for (let i = 0; i < constIndex.length; i++) {
            if (targetRow.clientWidth > tableContainer.clientWidth) {
                if (!hiddenCells.includes(constIndex[i])) {
                    if (! options.keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                        childRowListener()
                    } 
                }
            }
        }
        
        doTogglerScreen()
    }

    /**
     * This method recalculate which cells to hide or show and dispatch
     * event with negative index to indicate there are no hiddenCells
     */
    function resize() {
        recalc()
        
        if (hiddenCells.length <= 0) {
            eventDispatch(-1)
            childRowListener()
        }
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
                    if (! options.keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                    } 
                }
            }
        }
        doTogglerScreen()
    }

    /**
     * This is the resize counterpart for window resize event
     * or element watcher event
     * @see resize
     */
    function observeResize() {
        recalc()
        if (hiddenCells.length <= 0) {
            eventDispatch(-1)
            childRowListener()
        }
    }

    /**
     * Here we will start new observer or attach resize listener base on
     * client browser support for observer api.
     */
    function observed() {
        let connected = false

        try {
            const observer = new ResizeObserver((entries) => {
                if (entries[0].target.clientWidth !== oldTableContainerWidth) {
                    observeResize()
                }
    
                oldTableContainerWidth = entries[0].target.clientWidth
            })

            observer.observe(tableContainer)
            connected = true
        } catch (error) {
            connected = false
        }

        return connected
    }


    /**
     * Here we will do a mount, this will be at podtable instance
     * then we will add child row event listeners after which we will
     * use three ways in checking for resize on podtable
     * * Resize observer which doesnt work on all browser
     * * A custom watcher to watch element size
     * * Lastly we fallback to window resize listener.
     */
    function render() {
        mount()
        addToggleListener()

        if (!observed()) {
            try {
                watch(tableContainer, resize).start()
            } catch (err) {
                window.addEventListener('resize',  () => resize()) 
            }
        }
    }

    /**
     * On body rows child list mutation essential row attributes and events
     * will be lost hence the need to reset attriubtes and re attach necessary 
     * events listeners and also redispatch event.
     * @param {HTMLTableElement} table 
     */
    function ayncRedraw(table) {
        let bodyNode = table.tBodies[0]

        function doAttributes(node) {
            node.lastElementChild.classList.add('toggle')
            node.lastElementChild.addEventListener('click', (e) => toggle(e))
        }

        const callback = (mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length == 1) {
                    if (mutation.addedNodes[0].tagName.toUpperCase() == 'TR' && !mutation.addedNodes[0].classList.contains('child')) {
                        doAttributes(mutation.addedNodes[0])
                        shouldPing()
                    }                    
                } else if (mutation.type === 'childList' && mutation.removedNodes.length == 1) {
                    if (mutation.removedNodes[0].tagName.toUpperCase() == 'TR' &&
                        !mutation.removedNodes[0].classList.contains('child') &&
                        mutation.removedNodes[0].classList.contains('has-child')) {
                        mutation.nextSibling.remove()
                    }
                }
            }

            setTargetRow(table)
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

        if (options.method) { shouldPing() }
    }

    /**
     * Call the user attached method only if the event key is in the config 
     * object and it is set to true and we will  also wrap the function call 
     * in a try catch block to avoid code execution failure.
     */
    function shouldPing() {
        if (options.method) {
            try {
                options.method(_this)
            } catch (err) {
                console.error(err)
            }
        }
    }

    if (options.method) { return _this }
}

export default Podtable