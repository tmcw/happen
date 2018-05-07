[![Circle CI](https://circleci.com/gh/tmcw/happen.svg?style=shield)](https://circleci.com/gh/tmcw/happen)
[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/happen.svg)](https://greenkeeper.io/)

**happen** wraps the `createEvent` DOM API to make real
event mocking in-browser palatable.

## Installation

### Raw:

    wget https://raw.github.com/tmcw/happen/master/happen.js

### With [component](https://github.com/component/component)

    component install tmcw/happen

### With Browserify

    npm install happen

    var happen = require('happen');

### With [bower](https://github.com/bower/bower)

    bower install tmcw/happen

## Native API

### once()

`happen.once(element, options)` fires an event once. The `element` must
be a DOM element. `options` must have a `type` for event type, then can
have options:

#### Keyboard Events

* keyCode
* charCode
* shiftKey
* metaKey
* ctrlKey
* altKey

#### Mouse Events

* detail
* screenX
* screenY
* clientX
* clientY
* ctrlKey
* altKey
* shiftKey
* metaKey
* button

#### Touch Events

* touchstart
* touchmove
* touchend

```javascript
var element = document.getElementById('map');

// click shortcut
happen.click(element);

// dblclick shortcut
happen.dblclick(element);

// custom options
happen.dblclick(element, { shift: true });

// any other event type under MouseEvents
happen.once(element, {
    type: 'mousewheel',
    detail: -100
});

// The once api takes
happen.once(
    // element
    element, {
        // event type (e.type)
        type: 'mousewheel',
        // any other options
        detail: -100
    });

// touch events
happen.once(element, {
        type : 'touchstart',
        touches : [{
                pageX : 800,
                pageY : 800
            },
            {
                pageX : 400,
                pageY : 400
            }]
    });
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
or [Mocha](http://mochajs.org/).

[![](http://ci.testling.com/tmcw/happen.png)](http://ci.testling.com/tmcw/happen)

(IE tests failing due to Chai)

## See Also

* [simulant](https://github.com/Rich-Harris/simulant)
* [trigger-event](https://github.com/adamsanderson/trigger-event)
* [dom-event](https://github.com/jkroso/dom-event)
* [synthetic-dom-events](https://github.com/shtylman/synthetic-dom-events)
