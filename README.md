**happen** wraps the `createEvent` DOM API to make real
event mocking in-browser palatable.

## Native API

```javascript
var element = document.getElementById('map');

// click shortcut
happen.click(element);

// dblclick shortcut
happen.dblclick(element);

// custom options
happen.dblclick(element, { shift: true });
```

## jQuery Plugin

```javascript
// Shortcut - 'click' is shorthand for { type: 'click' }
$('.foo').happen('click');

// Longhand - specify any sort of properties
$('.foo').happen({ type: 'keyup', keyCode: 50 });

// Works on any jQuery selection
$('.foo, .bar').happen('dblclick');
```

Shortcuts:

* `happen.click`
* `happen.dblclick`
* `happen.mousedown`
* `happen.mouseup`
* `happen.mousemove`
* `happen.keydown`
* `happen.keyup`
* `happen.keypress`

Use it with a testing framework, like [Jasmine](http://pivotal.github.com/jasmine/)
or Mocha.

Licensed BSD.
