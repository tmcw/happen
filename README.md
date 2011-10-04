**hallucination** wraps the `createEvent` DOM API to make real
event mocking in-browser palatable.

API:

    var element = document.getElementById('map');

    // click shortcut
    hallucination.click(element);

    // dblclick shortcut
    hallucination.dblclick(element);

    // custom options
    hallucination.dblclick(element, { shift: true });

Licensed BSD.
