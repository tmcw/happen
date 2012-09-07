var test = require('testling'),
    happen = require('../src/happen.js');

test('click event', function (t) {
    var w = t.createWindow('', { t : t });
    w.next(function (win, $) {
        var clicked = false;
        var elem = document.createElement('a');
        elem.onclick = function() {
            clicked = true;
        };
        happen.click(elem);
        t.same(clicked, true);
        t.end();
    });
});
