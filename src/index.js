export class Podtable {
    constructor(tableEl, config = {}) {
        this.table = document.querySelector(tableEl);
        this.firstBodyRow = document.querySelector(`${tableEl} tbody tr`);

        this.tableContainer = document.createElement('div');
        this.tableContainer.setAttribute('id', 'breezetable-container')
        this.table.parentNode.insertBefore(this.tableContainer, this.table)
        this.tableContainer.appendChild(this.table)

        this.hiddenCells = [];
        this.constIndex = []; 
        this.breakPoint = {};
        this.breakPointOffset = {}
        this.keepCell = [0];
        this.oldWindowWidth = window.innerWidth;
        
        this.setKeepCell(config)
        this.setToggleCell(tableEl)
        this.setCellIndex(tableEl)

        this.render()

        this.ayncRedraw(tableEl);
    }

    setToggleCell(tableEl) {
        document.querySelector(`${tableEl} thead tr > th:last-child`).classList.add('main-toggle');
        document.querySelectorAll(`${tableEl} tbody tr:not(tr.child) > td:last-child`).forEach(el => {
            el.classList.add('toggle');
        })
    }


    /**
     * Add data attribute to elements to serve as index 
     * Reverse cell index array to hide cells from the back
     * back and make sure the toggle cell is being kept
     * @param {*} tableEl
     * @returns void 
     */
    setCellIndex(tableEl) {
        let rows = document.querySelectorAll(`${tableEl} tr`);

        for (let ci = 0; ci < this.firstBodyRow.children.length; ci++) {
            this.constIndex.push(ci)
        }

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i].children;

            for (let td = 0; td < row.length; td++) {
                row[td].setAttribute('data-cell-index', row[td].cellIndex);
            }
        }

        this.keepCell.push(this.constIndex.length - 1)
        this.constIndex.reverse()
    }

    /**
     * Merge config option with the existing keep cell array
     * @param {*} config 
     */
    setKeepCell(config) {
        if (config.hasOwnProperty('keepCell')) {
            if (! Array.isArray(config.keepCell)) {
                throw TypeError('keep cell must be of type array') 
            } else {
                this.keepCell = [...this.keepCell, ...config.keepCell];
            }
        }
    }

    /**
     * Create tr element and append cell column data
     * @param {cells} cells 
     * @returns Element Node
     */
    childRow (cells) {
        let tr = document.createElement('tr');
        let gridTD = document.createElement('td');
        let gridRow = document.createElement('div');
        
        gridTD.colSpan = this.constIndex.length;
        gridRow.classList.add('child-grid-row');
        tr.classList.add('child');
    
        for (let i = 0; i < cells.length; i++) {
            gridRow.append(cells[i])
        }
        
        gridTD.append(gridRow)
        tr.append(gridTD)
    
        return tr;
    }

    /**
     * Create grid column div Element to append to child row
     * @param {el} el
     * @returns 
     */
    gridCol(el) {
        let gridCol = document.createElement('div');
        gridCol.classList.add('child-grid-col');
    
        let dataColName = document.createElement('div');
        let dataColDesc = document.createElement('div');
        dataColName.innerHTML = el.dataset.gridColname;
        dataColDesc.innerHTML = el.innerHTML;
    
        gridCol.append(dataColName)
        gridCol.append(dataColDesc);
        
        return gridCol;
    }

    /**
     * Toggle single child row and calculate hidden element for the row 
     * @param {*} target event 
     */
    toggle(e) {
        let parent = e.target.parentElement;

        if(parent.classList.contains('has-child')) {
            parent.classList.remove('has-child');
            parent.nextElementSibling.remove();
        } else {
            parent.classList.add('has-child');
            let isHidden = [];
            for (let el in parent.children) {
                if(typeof parent.children[el].classList !== 'undefined' && parent.children[el].classList.contains('hidden')) {
                    isHidden.push(this.gridCol(parent.children[el]))
                }
            }

            parent.after(this.childRow(isHidden))
        }
    }

    /**
     * Handles toggle all child rows event by checking which rows 
     * has child to close and which rows has no child to open
     * @param {event} 
     */
    toggleAll(e) {
        let toggleEls = document.querySelectorAll('.toggle');
        let toggler = e.currentTarget;

        if(toggler.classList.contains('expanded')) {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement;
                if (togsParent.classList.contains('has-child')) {
                    toggleEls[i].click();
                }
            }
            toggler.classList.remove('expanded');
        } else {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement;
                if (! togsParent.classList.contains('has-child')) {
                    toggleEls[i].click();
                }
            }
            toggler.classList.add('expanded');
        }
    }

    /**
     * Adds clck Event listener to rows with .has-child css classList
     * so as to toggle child rows
     */
    addToggleListener () {
        let togElements = document.querySelectorAll('.toggle');
        for (let i = 0; i < togElements.length; i++) {
            togElements[i].addEventListener('click', (e) => {
                this.toggle(e)
            });
        }

        let mainToggle = document.querySelector('.main-toggle');
        mainToggle.addEventListener('click', (e) => {
            this.toggleAll(e)
        });
    }

    /**
     * Check if there are hidden elements ands determine when to show
     * child row toggle button and also clean up unused css class.
     */
    doTogglerScreen () {
        if(this.hiddenCells.length > 0) {
            this.table.classList.add('show-toggle')
        } else {
            document.querySelectorAll('.has-child').forEach(el => {
                el.classList.remove('has-child');
            })

            this.table.classList.remove('show-toggle')
            document.querySelector('.main-toggle').classList.remove('expanded');
        }
    }

    /**
     * Check for open child rows to enable reactivity as window resizes
     * apply changes, item are remove and added and every time window resize
     * hidden elements are redrawn on each toggle
     */
    childRowListener () {
        let openChildRow = document.querySelectorAll('.child');
        
        if(openChildRow.length > 0) {
            let openChildParent = [];

            for (let i = 0; i < openChildRow.length; i++) {
                openChildParent.push(openChildRow[i].previousElementSibling)
            }

            // Iterete from parents elements down to child elements
            for (let ix = 0; ix < openChildParent.length; ix++) {
                let isHidden = [];
                
                for (let el in openChildParent[ix].children) {
                    if(typeof openChildParent[ix].children[el].classList !== 'undefined' && openChildParent[ix].children[el].classList.contains('hidden')) {
                        isHidden.push(this.gridCol(openChildParent[ix].children[el]))
                    }
                }

                // we will remove the existing child row and put another one with new data
                // we also check if the hidden cells length > 0 so as to avoid empty child rows
                openChildParent[ix].nextElementSibling.remove();
                
                if(this.hiddenCells.length > 0) {
                    openChildParent[ix].after(this.childRow(isHidden))
                }

                this.doTogglerScreen()
            }
        }
    }

    /**
     * Check if the window resize increases or decreases and determine
     * which column to show base on the maximum squishitude of cell rows
     * and call necessary listeners to enable reactivity
     */
    resize() {
        let newWindowWidth = window.innerWidth;
        
        if (newWindowWidth < this.oldWindowWidth) {

            for (let i = 0; i < this.constIndex.length; i++) {

                if (this.firstBodyRow.clientWidth > this.tableContainer.clientWidth) {
                    if(! this.hiddenCells.includes(this.constIndex[i])) {
                        if( ! this.keepCell.includes(this.constIndex[i])) {
                            this.breakPointOffset[`breakOffset${this.constIndex[i]}`] = newWindowWidth - this.tableContainer.clientWidth -1;
                            this.breakPoint[`bp${this.constIndex[i]}`] = this.firstBodyRow.clientWidth;
                            this.hiddenCells.push(this.constIndex[i]);
                            
                            document.querySelectorAll(`[data-cell-index="${this.constIndex[i]}"]`).forEach(el => {
                                el.classList.add('hidden');
                            })

                            this.childRowListener()
                        }
                    }
                }
            } 

            this.doTogglerScreen()
        } else if(newWindowWidth > this.oldWindowWidth) {

            if (this.hiddenCells.length > 0) {
                let len = this.hiddenCells.length; 

                for (let i = 0; i < len; i++) {
                    let lastCellIndex = this.hiddenCells.slice(-1)[0];

                    if(newWindowWidth - this.breakPointOffset[`breakOffset${lastCellIndex}`] >  this.breakPoint[`bp${lastCellIndex}`]) {
                        document.querySelectorAll(`[data-cell-index="${lastCellIndex}"]`).forEach(el => {
                            el.classList.remove('hidden');
                        })
                        
                        delete this.breakPoint[`bp${lastCellIndex}`];
                        delete this.breakPointOffset[`breakOffset${lastCellIndex}`];
                        this.hiddenCells.pop();

                        this.childRowListener()
                    }
                }
                this.doTogglerScreen()
            }
        }    
        this.oldWindowWidth = newWindowWidth;           
    }

    /**
     * Dom mounted calc cells visiibility and do listeners
     */
    mount() {
        this.hiddenCells = [];
        let newWindowWidth = window.innerWidth;
        let ilength = this.constIndex.length;
        
        for (let i = 0; i < ilength; i++) {

            if (this.firstBodyRow.clientWidth > this.tableContainer.clientWidth) {
                if(! this.hiddenCells.includes(this.constIndex[i])) {
                    if (!this.keepCell.includes(this.constIndex[i])) {
                        this.breakPointOffset[`breakOffset${this.constIndex[i]}`] = newWindowWidth - this.tableContainer.clientWidth -1;
                        this.breakPoint[`bp${this.constIndex[i]}`] = this.firstBodyRow.clientWidth ;
                        this.hiddenCells.push(this.constIndex[i]);

                        document.querySelectorAll(`[data-cell-index="${this.constIndex[i]}"]`).forEach(el => {
                            el.classList.add('hidden');
                        })
                    } 
                }
            }
            this.oldWindowWidth = newWindowWidth; 
        }
        this.doTogglerScreen()
    }


    /**
     * Initialize table process
     */
    render() {
        this.mount()
        this.addToggleListener()
        window.addEventListener('resize',  () => this.resize());
    }

    /**
     * On dynamic node replace:patch essential row attributes will be lost
     * hence the need to reset attriubtes and attach necessary events listeners
     * @param {*} tableEl 
     */
    ayncRedraw(tableEl) {
        let bodyNode = document.querySelector(`${tableEl} tbody`);
        let _this = this;

        function doAttributes(node) {
            node.lastElementChild.classList.add('toggle')
            node.lastElementChild.addEventListener('click', (e) => _this.toggle(e));

            for (let i = 0; i < node.children.length; i++) {
                node.children[i].setAttribute('data-cell-index', node.children[i].cellIndex);
            }
        }

        function hideCells() {
            for (let i = 0; i < _this.hiddenCells.length; i++) {
                document.querySelectorAll(`[data-cell-index="${_this.hiddenCells[i]}"]`).forEach(el => {
                    el.classList.add('hidden');
                })
            }
        }

        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length === 1) {
                    if (mutation.addedNodes[0].tagName == 'TR' && !mutation.addedNodes[0].classList.contains('child')) {
                        doAttributes(mutation.addedNodes[0])
                    }
                } else if (mutation.type === 'childList' && mutation.removedNodes.length === 1) {
                    if (mutation.removedNodes[0].tagName == 'TR' &&
                        !mutation.removedNodes[0].classList.contains('child') &&
                        mutation.removedNodes[0].classList.contains('has-child')) {
                            mutation.nextSibling.remove()
                    }
                }
            }

            hideCells()
            _this.firstBodyRow = document.querySelector(`${_this.table.id} tbody tr`);
        }

        const observer = new MutationObserver(callback)
        observer.observe(bodyNode, {childList: true })
    }
}