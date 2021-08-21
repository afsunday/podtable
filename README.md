# Podtablejs
A simple lightweight responsive table library to fit large table dataset into small screen by hiding them and placing them in child rows with control toggles to show and hide them

![podtablejs](https://github.com/inlogicstudio/podtable/tree/dev/examples/podtablejs.png)

## Installation:

there are basically two ways to install podtablejs via npm or download and include via script tag

Install via npm `npm install inlogicstudio/podtablejs`.

you can import podtablejs into your app by using the es import  `import` then you can includes the css as well

Or you can can simply add a reference to the .js file at the end of the body of your html and the .css file in the head of your html page. 

**Basic usage**

data-grid-colname value will be used as the name of the child row column and its should included
the empty  column of the last cell of the thead and tbody will be used as the control column and its important this column display isn't set to none or absolute position to push off screen

```html
<!-- head -->
<!-- <link rel="stylesheet" type="text/css" href="podtable/dist/podtable.css"> -->

<table id="table" class="table" width="100%">
    <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Salary</th>
            <th>Education</th>
            <th>Disability</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-grid-colname="Firstname">Mark</td>
            <td data-grid-colname="Lastname">Spencer</td>
            <td data-grid-colname="Gender">Male</td>
            <td data-grid-colname="Occupation">Robotics Engineer</td>
            <td data-grid-colname="Salary">$50,000</td>
            <td data-grid-colname="Education">MSc Robotics</td>
            <td data-grid-colname="Disability">Non</td>
            <td data-grid-colname="Mail">spencer@gmail.com</td>
            <td data-grid-colname="Phone">+2348451254781</td>
            <td data-grid-colname="Status">ACtive</td>
            <td></td>
        </tr>
    </tbody>
</table>

<!-- End of the body tag -->
<!-- <script src="podtable/dist/umd/podtable.js"></script> -->
```

```js
// script.js or script tag in your html

window.addEventListener('DOMContentLoaded', () => {
    let podtable = new Podtable.Podtable('#table');
})
```
Using ES import

```js
import Podtable from './dist/podtable';

let podtable = new Podtable('#table');
```

The podtable instance receive config object such as which cells to keep; by default the first column will not be hidden whose index is 0;
likewiase the control column you can then define which other cells to keep by defining their index in the `keepCell` array

```js
let podtable = new Podtable('#table', {
    keepCell: [1, 6]
});
```

**Contributing**

Simply fork the project then send in your pull requests.

**License**

Podtablejs is open source software released under the MIT license. See [LICENSE](LICENSE) for more information.