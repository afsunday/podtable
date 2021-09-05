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
    <a href="https://github.com/inlogicstudio/podtable">
        <img src="https://img.shields.io/github/issues/inlogicstudio/podtable" alt="Issues">
    </a>
    
</p>

# Podtablejs

Podtable is a no dependency table library to fit large table dataset into smaller device screens with various options on achieving a responsive datatable.

- [**Preview**](#preview)
- [**Installation**](#installation)
- [**Usage**](#usage)
    - [**Html Markup**](#html-markup)
    - [**Javascript**](#javascript)
- [**V1.0.3, V1.0.4**](#v103-v104)
- [**V1.1.0**](#v110)
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


**By importing**
```js
import { Podtable } from 'podtable';
```

**Or by reference**
```html
<!-- In your page head add stylesheet -->
<head>
    ...

    <link rel="stylesheet" type="text/css" href="podtable/dist/podtable.css">
</head>

<!-- At the end of your body tag reference the js script -->
<body>
    ...

    <script src="podtable/dist/podtable.js"></script>
</body>
```

# Usage

### Html markup

Your html markup needs to include few things for podtable to work well and the markup should be structure with perceived standard.

* A dataset data-grid-colname attributes which value will be the name of the column.
* An empty th, td for head and body element which will serve as control column
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

### Javascript

```js
// script.js or script tag in your html

window.addEventListener('DOMContentLoaded', () => {
    new Podtable.Podtable('#table');
})

```
Using import statement

```js

import { Podtable } from 'podtable';

new Podtable('#table');

```

The Podtable instance receive config object with a number of available options to use in making your table responsive.

# V1.0.3, V1.0.4

* `keepCell` which is used to specify an array of cells to keep
and also note the first cell for the table with an index of `0` will not be hidden by default

```js

new Podtable('#table', {
    keepCell: [1, 6]
});

```

* The `event` option which receive a boolean inorder for podtable to emit an event for cells that will hidden
* The `method` option which takes in the function to  be executed for each cell event and its used in conjuction with the event option.
* The function passed to the `method` option receives an event parameter to access the event.

* `event.current` which is the next cell index to hidden or that will be shown and it returns a numeric value.

* `event.isCurrentShown` which is a boolean and it indicates if the `event.current` cell index is visible or hidden.

* The function pass to the method option should not be error prone and not be a long running activity.

### Available Options
* `KeepCell`
* `event`
* `forCell`
* `method`


```js

new Podtable('#table', {
    keepCell: [1, 6],
    event: true,
    forCell: [5],
    method: (event) => {
        let el = document.querySelector('#demo');
        
        if (event.current <= 5 && event.isCurrentShown === false) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    }
});

```

# V1.1.0

* The `event.isCurrentShown` has been removed.

* The `forCell` option has been removed as event will be dispatched for every cell hidden only if `event` is set to true

* `event.current` which now returns the index of the cell that was last hidden

* Added `priority` config option which is an array of priority of how cells will be hidden and if only few cell index are passed to the `priority` config object this will take precedence over the other cell index.

* The `priority` config option be can use together with other availables options

* podtable is now availabe via the `Podtable` global either by  reference via script tag or by using the import statement

### Available Options
* `KeepCell`
* `priority`
* `event`
* `method`

Now if you pull podtable by reference via script tag or by using the import statement podtable instance is now available via the `Podtable` global


```js
// import Podtable from 'podtable';
// <script src="podtable/dist/podtable.js"></script> 

new Podtable('#table', {
    // config options
})

```

Using the import statement should now be done like this

```js

import Podtable from 'podtable';

```

The `priority` config object
```js

new Podtable('#table', {
    priority: [2,4,5]
    // ... other config options
})

```

# Contributing

Thank you for considering to contribute to Podtablejs below is a quick guide

* clone this repo locally
* run `npm install` to dependencies

* Include the `podtable/dist/podtable.js` file from a `<script>` tag on a webpage
* Include the  `podtable/dist/podtable.css` from `<link>` tag on a webpage
* run `npm run build` or `npm run watch` to start seeing changes made to the code

* Pull requests, is recommend not just bug reports 
* And you're set to go &#128079;


# Miscellaneous

## Examples

* See examples folder [here](examples/index.html) on this repo
* View it live on [Codepen](https://codepen.io/inlogicstudio/pen/BaZyyGZ) and this example is base on `V1.0.*`

## Roadmap
* Columns sorting
* Server side rendering
* Pagination

## License

Podtablejs is open-sourced software licensed under the [MIT license](LICENSE.md).