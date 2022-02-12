<p align="center"><img src="/art/code.png" alt="podtable code"></p>

<p align="center">
    <a href="https://github.com/inlogicstudio/podtable">
        <img src="https://badgen.net/github/license/inlogicstudio/podtable?color=green" alt="License">
    </a>
    <a href="https://www.npmjs.com/package/podtable">
        <img src="https://badgen.net/npm/v/podtable?color=red" alt="Version">
    </a>
    <a href="https://www.npmjs.com/package/podtable">
        <img src="https://badgen.net/npm/dt/podtable" alt="Downloads">
    </a>
</p>

## Podtablejs

Podtable is a no dependency table library to fit large table dataset into smaller device screens base on the maximum squishability with various options on achieving a responsive datatable.

- [**Preview**](#preview)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Contributing**](#contributing)
- [**Examples**](#examples)
- [**Roadmap**](#roadmap)


## Preview

<p align="center">
    <img src="art/podtablejs.png" alt="podtablejs">
</p>

## Installation

* Install via npm `npm install podtable` OR via CDN
* `https://unpkg.com/podtable@<VERSION>/dist/podtable.css`
* `https://unpkg.com/podtable@<VERSION>/dist/podtable.js`



## Usage

* Podtable will use the last cell of every row including the head as control column.

* Or you can define an empty cell for podtable to use as control column.

* Its really important to include the podtable stylesheet because podtable relies on it.

* Also podtable css doesn't include general table styling only css which it needs so you can style your table as you want.

* if you are using vuejs always provide a [Unique key for your v-for](https://stackoverflow.com/questions/56726147/why-does-vue-use-its-in-place-patch-though-im-binding-a-key-in-v-for-loop) because of vue's [In-place-patch](https://v3.vuejs.org/guide/list.html#maintaining-state) strategy




```html

<table id="table" class="table" width="100%">
    <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            ...
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mark</td>
            <td>Spencer</td>
            ...
            <td></td>
        </tr>
    </tbody>
</table>

```

```js

import Podtable from 'podtable';

new Podtable('#table')

```

The podtable instance receives two params the first parameter is an element selector OR a table element and also the second parameter is a config object which receives a key value pairs in achieving a responsive table which can be use together or as your use case demands.

```js

new Podtable('#table', {
    // config options
})

// OR pass the table element directly
new Podtable(document.querySelector('#table'), {
    // config options
})

```

#### Config Options

* `KeepCell`
* `priority`
* `method`
* `rowGroup`

The `keepCell` which is an array of cells index that wont be hidden.
Also note the first cell for the table rows with an index of `0` will not be hidden by default.

```js
new Podtable('#table', {
    keepCell: [1, 6],
});
```

The `priority` config option which is an array of index of cells, which determines how cells will be hidden and if only few cell index are passed to the `priority` config object this will take precedence over the other cell index.

```js
new Podtable('#table', {
    priority: [2, 4, 5]
})
```
The config option `method` option which takes in a function to be executed for the hidden cells. and the function receives a parameter to acess the index of the cell that was last hidden.

```js
new Podtable('#table', {
    method: (state) => {
        if(state.current == 5) {
            // do something
        }
    }
});
```

The config option `rowGroup` which takes in a boolean in order to use the row group feature, so for this to work 

* Data Iteration needs to be done via the body tag that is rows should be grouped together via the body tag

* podtable assumes every first row of each body tag is the row group header hence there is need to let podtable know it should ignore it using a dataset `data-ptr-ignore`

* Content in your ignored rows should be wrapable and should not have a fixed width

* Your ignored row td cells should have colspan that will correspond to the number of cells in other rows.

```html
<table id="table" class="table" width="100%">
    <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            ...
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr data-ptr-ignore="">
            <td colspan="3"></td>
        </tr>
        <tr>
            <td>Mark</td>
            <td>Spencer</td>
            ...
            <td></td>
        </tr>
    </tbody>
    ...
    <!-- more body tags here grouping rows together -->
</table>
```

```js
new Podtable('#table', {
    rowGroup: true
});
```

In fact for every row group you can define an extra row in order to show empty row group message.

```html
<table id="table" class="table" width="100%">
    <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            ...
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr data-ptr-ignore="">
            <td colspan="3">This is the Heading</td>
        </tr>

        <!-- other rows if there is data to show -->

        <tr data-ptr-ignore="">
            <td colspan="3">
                Sorry no record to show
            </td>
        </tr>
    </tbody>
</table>
```


### Hide Control column until its needed

you can apply the css below if you need to hide the control cell untill its needed.

```css
#podtable-container table tr td:last-of-type,
#podtable-container table tr th:last-of-type {
    display: none;
}

#podtable-container table.show-toggle tr td:last-of-type,
#podtable-container table.show-toggle tr th:last-of-type {
    display: revert;
}
```

## Contributing

Thank you for considering to contribute to Podtablejs, pull requests, is highly recommended not just bug reports.


## Examples
you can view it live on codepen

* V1.1.4 [https://codepen.io/inlogicstudio/pen/wvqLEXP](https://codepen.io/inlogicstudio/pen/wvqLEXP) 

## Roadmap
* Custom control toggle to show hidden cells in child row.

* More awesomeness in achieving a responsive datatable. &#128522;

## License

Podtablejs is open-sourced software licensed under the [MIT license](LICENSE.md).