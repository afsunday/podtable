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

Podtable is a no dependency table library to fit large table dataset into smaller device screens base on the maximum squishability with various options on achieving a responsive datatable.

- [**Preview**](#preview)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Contributing**](#contributing)
- [**Examples**](#examples)
- [**Roadmap**](#roadmap)


# Preview

<p align="center">
    <img src="art/podtablejs.png" alt="podtablejs">
</p>

# Installation

* Install via npm `npm install podtable` and add stylesheet.
* OR via CDN 
*  `https://unpkg.com/podtable@<VERSION>/dist/podtable.css`
*  `https://unpkg.com/podtable@<VERSION>/dist/podtable.js`
* OR Download and reference in your page


# Usage

### HTML markup

Your html markup needs to include few things for podtable to work well.

* Podtable will use the last cell of every row including the head as control column.

* Or you can define an empty cell for podtable to use as control column.

* the control cell must not be hidden with css or push off screen with absolute positioning.

* Its really important to include the podtable stylesheet because podtable relies on it.

* Also podtable css doesnt include general table styling only css which it needs so you can style your table as you want.


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

Reference via the script tag

```js
<script src="podtable/dist/podtable.js"></script> 

new Podtable('#table', {
    keepCell: [1, 6]
    // ... other config options
})

```

OR Using the import statement 

```js

import Podtable from 'podtable';

new Podtable('#table', {
    keepCell: [1, 6]
    // ... other config options
})

```

The podtable instance receives two params the first parameter an element selector OR a table element and also the second parameter is a config object which receives a key value pairs in achieving a responsive table which can be use together or as your use case demands.

The podtable instance

```js

import Podtable from 'podtable';

new Podtable('#table', {
    keepCell: [1, 6]
    // ... other config options
})

// OR pass the table element directly
new Podtable(document.querySelector('#table'), {
    keepCell: [1, 6]
    // ... other config options
})

```

#### Config Options

* `KeepCell`
* `priority`
* `method`

The `keepCell` which is used to specify an array of cells to keep
and also note the first cell for the table rows with an index of `0` will not be hidden by default.

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
The config option `method` option which takes in a function to be executed for the hidden cells. and the function receives a parameter to acess the index of the cell that was last hidden also there wont be need for the `event` option in other for the function to be called.

```js
new Podtable('#table', {
    method: (state) => {
        let el = document.querySelectorAll('.demo')

        if(state.current == 5) {
            // do something
        }
    }
});
```


# Contributing

Thank you for considering to contribute to Podtablejs below is a quick guide

* clone this repo locally

* Include the `podtable/dist/podtable.js` file from a `<script>` tag on a webpage
* Include the  `podtable/dist/podtable.css` from `<link>` tag on a webpage

* Run  `npm run watch` to build src files

* Pull requests, is recommend not just bug reports 
* And you're set to go &#128079;


# Examples
you can view it live on codepen

* V1.1.4 [https://codepen.io/inlogicstudio/pen/wvqLEXP](https://codepen.io/inlogicstudio/pen/wvqLEXP)

* V1.0.* [https://codepen.io/inlogicstudio/pen/BaZyyGZ](https://codepen.io/inlogicstudio/pen/BaZyyGZ) 

# Roadmap
* Allow podtable to ignore rows from hiding it cells.

* Custom control toggle to show hidden cells in child row unlike podtable current way of enforcing last cell of every row for control toggle.

* More awesomeness in achieving a responsive datatable. &#128522;

# License

Podtablejs is open-sourced software licensed under the [MIT license](LICENSE.md).