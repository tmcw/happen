**happen** wraps the `createEvent` DOM API to make real
event mocking in-browser palatable.

## Installation

Raw:

    wget https://raw.github.com/tmcw/happen/master/src/happen.js

With [component](https://github.com/component/component)

    component install tmcw/happen

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
or [Mocha](http://visionmedia.github.com/mocha/).

[![](http://ci.testling.com/tmcw/happen.png)](http://ci.testling.com/tmcw/happen)

(IE tests failing due to Chai)

## See Also

* [trigger-event](https://github.com/adamsanderson/trigger-event)
