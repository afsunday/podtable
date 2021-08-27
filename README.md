<p align="center"><img src="/art/code.png" alt="podtable code"></p>

<p align="center">
    <a href="https://github.com/inlogicstudio/podtable">
        <img src="https://img.shields.io/github/license/inlogicstudio/podtable" alt="License">
    </a>
    <a href="https://github.com/inlogicstudio/podtable">
        <img src="https://img.shields.io/badge/npm-v1.0.3-blue" alt="Version">
    </a>
    <a href="https://github.com/inlogicstudio/podtable">
        <img src="https://img.shields.io/github/issues/inlogicstudio/podtable" alt="Issues">
    </a>
    
</p>

## Podtablejs

Podtable is a no dependency table library to fit large table dataset into smalller device screens with various options on achieving a responsive datatable

## Preview

![podtablejs](art/podtablejs.png)

## Installation

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
    <!-- <link rel="stylesheet" type="text/css" href="podtable/dist/podtable.css"> -->
</head>

<!-- At the end of your body tag reference the js script -->
<body>
    ...

    <!-- <script src="podtable/dist/podtable.js"></script> -->
</body>
```

## Usage

**Html markup**

Your html markup needs to include few things for podtable to work well and the markup should be structure with perceived standard 

* A dataset data-grid-colname attributes which value will be the name of the column
* An empty th, td for head and body element which will serve as control column
* The control cell must not be hidden with css or push off screen with absolute positioning

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

**Javascript**

```js
// script.js or script tag in your html

window.addEventListener('DOMContentLoaded', () => {
    new Podtable.Podtable('#table');
})

```
Using ES import

```js

import { Podtable } from 'podtable';

new Podtable('#table');

```

The Podtable instance receive config object with a number of available options to use

* The `keepCell` option which is used to specify an array of cells to keep
Note the first cell for the table with an index of `0` will not be hidden by default

```js

new Podtable('#table', {
    keepCell: [1, 6]
});

```

* The `event` option which receive a boolean inorder for podtable to emit an event for cells that will hidden
* The `method` option which takes in the function to  be executed for each cell event and its used in conjuction with the event option.
* The function passed to the method option receives an event parameter to access the event 
* `event.current` which is the next cell index to hidden or that will be shown; an integer value
* `event.isCurrentShown` which is boolean that indicate if the `event.current` is visible or hidden

Note the function pass to the method option should not be error prone and it must be something fast

```js

new Podtable('#table', {
    keepCell: [1, 6],
    event: true,
    forCell: [5],
    method: (event) => {
        let el = document.querySelector('#demo');
        
        if (state.current <= 5 && state.isCurrentShown === false) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    }
});

```

**Examples**
See examples folder [here](examples/index.html) or view it live on [Codepen](https://codepen.io/inlogicstudio/pen/BaZyyGZ)

## Roadmap

* Modal to show hidden cells
* Column sorting
* Ajax row rendering
* Pagination

## Contributing

Thank you for considering contributing to Podtablejs You can read the contribution guide [here](.github/CONTRIBUTING.md)

## License

Podtablejs is open-sourced software licensed under the [MIT license](LICENSE.md).