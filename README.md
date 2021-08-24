## Podtablejs
A lightweight no dependency responsive table library to fit large table dataset into small screen by making look sweet on mobile

![podtablejs](https://github.com/inlogicstudio/podtable/blob/dev/examples/podtablejs.png)

**Installation**

there are basically two ways to install podtablejs via npm or download and include via script tag

Install via npm `npm install podtable` and add stylesheet.

```js
import { Podtable } from 'podtable';
```

Or Download on github and reference in your page

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

**Html Markup**

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

**Usage**

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
let el = document.querySelector('#someElement')

new Podtable('#table', {
    keepCell: [1, 6],
    event: true,
    forCell: [3],
    method: (event) => {
        if(event.current === 3 && ! event.isCurrentShown) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    }
});

```
**Examples**
See examples in the example folder to get more inspired

**Roadmap**
* Modal as to show hidden cells content
* Vertical column sorting 
* Ajax row rendering

**Contributing**

Simply fork the project then send in your pull requests.

**License**

Podtablejs is an open source and released under the MIT license.