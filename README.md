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

# Podtablejs

Podtable is a no dependency table library to fit large table dataset into smaller device screens with various options on achieving a responsive datatable.

- [**Preview**](#preview)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**V1.1.0**](#v110)
- [**V1.0.***](#v10)
- [**Contributing**](#contributing)
- [**Miscellaneous**](#miscellaneous)
    - [**Examples**](#examples)
    - [**Roadmap**](#roadmap)


# Preview

![podtablejs](art/podtablejs.png)

# Installation

There are basically two ways to install podtablejs via npm or download and include via script tag

* Install via npm `npm install podtable` and add stylesheet.
* CDN stylsheet `https://unpkg.com/podtable@<VERSION>/dist/podtable.css` 
* CDN javascript `https://unpkg.com/podtable@<VERSION>/dist/podtable.js`
* Or Download and reference in your page


# Usage

### HTML markup

Your html markup needs to include few things for podtable to work well and the markup should be structure with perceived standard.

* A data attribute `data-grid-colname` which value will be the name of the column.

* All table body rows should have the `data-grid-colname` attributes.

* An empty th, td at the end of the table row element which will serve as control column.

* The control cell must not be hidden with css or push off screen with absolute positioning.

* Its really important to include the stylesheet because podtable relies on it.


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
            <td data-grid-colname="Firstname">Mark</td>
            <td data-grid-colname="Lastname">Spencer</td>
            ...
            <td></td>
        </tr>
    </tbody>
</table>

```

# V1.1.0

Reference via the script tag
```js
<script src="podtable/dist/podtable.js"></script> 

new Podtable('#table', {
    keepCell: [1, 6]
    // ... other config options
})

```

Using the import statement 

```js

import Podtable from 'podtable';

new Podtable('#table', {
    keepCell: [1, 6]
    // ... other config options
})

```

The podtable instance receives a number of config option in achieving a responsive table which can be use together or as your use case demands.

#### Available Options

* `KeepCell`
* `priority`
* `event`
* `method`

The `keepCell` which is used to specify an array of cells to keep
and also note the first cell for the table with an index of `0` will not be hidden by default.

```js
new Podtable('#table', {
    keepCell: [1, 6],
});
```

The `priority` config option which is an array of priority of how cells will be hidden and if only few cell index are passed to the `priority` config object this will take precedence over the other cell index.

```js
new Podtable('#table', {
    priority: [2, 4, 5]
})
```
The `event` and `method` config option which is meant to be used together, the `event` option accepts a boolean inorder for podtable to emit an event and `method` option which takes in a function to be executed for the hidden cells. and the function receives a parameter to acess the index of the cell that was last hidden.

```js
new Podtable('#table', {
    event: true,
    method: (state) => {
        let el = document.querySelectorAll('.demo')

        if(state.current == 5) {
            el.forEach((n) => {
                n.style.display = 'block'
            }) 
        } else {
            el.forEach((n) => {
                n.style.display = 'none'
            })
        }
    }
});
```

# V1.0.*

### Available Options
* `KeepCell`
* `event`
* `forCell`
* `method`


# Contributing

Thank you for considering to contribute to Podtablejs below is a quick guide

* clone this repo locally

* Include the `podtable/dist/podtable.js` file from a `<script>` tag on a webpage
* Include the  `podtable/dist/podtable.css` from `<link>` tag on a webpage

* Pull requests, is recommend not just bug reports 
* And you're set to go &#128079;


# Miscellaneous

### Examples

* See examples folder [here](examples/index.html) on this repo
* View it live on [Codepen](https://codepen.io/inlogicstudio/pen/BaZyyGZ) and this example is base on `V1.0.*`

### Roadmap
More awesomeness in achieving a responsive datatable. &#128522;

### License

Podtablejs is open-sourced software licensed under the [MIT license](LICENSE.md).