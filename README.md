**happen** wraps the `createEvent` DOM API to make real
event mocking in-browser palatable.

```javascript
var element = document.getElementById('map');

// click shortcut
happen.click(element);

// dblclick shortcut
happen.dblclick(element);

// custom options
happen.dblclick(element, { shift: true });
```

Use it with a testing framework, like [Jasmine](http://pivotal.github.com/jasmine/).

Licensed BSD.
