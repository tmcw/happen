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

Licensed BSD.
