!(function(context) {
    var h = {};

    // Make inheritance bearable: clone one level of properties
    function extend(child, parent) {
        for (var property in parent) {
            if (typeof child[property] == 'undefined') {
                child[property] = parent[property];
            }
        }
        return child;
    }

    h.once = function(x, o) {
        var evt;

        if (o.type.slice(0,3) === 'key') {
            evt = document.createEvent('KeyboardEvent');
            var initEvent;
            
            if (evt.initKeyEvent) {
                // https://developer.mozilla.org/en/DOM/event.initKeyEvent
                initEvent = evt.initKeyEvent
            } else {
                // https://developer.mozilla.org/en/DOM/KeyboardEvent
                initEvent = evt.initKeyboardEvent
            }

            evt.initEvent(
                o.type, //  in DOMString typeArg,
                true,   //  in boolean canBubbleArg,
                true,   //  in boolean cancelableArg,
                null,   //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
                false,  //  in boolean ctrlKeyArg,
                false,  //  in boolean altKeyArg,
                false,  //  in boolean shiftKeyArg,
                false,  //  in boolean metaKeyArg,
                72,     //  in unsigned long keyCodeArg,
                0       //  in unsigned long charCodeArg);
            )
        } else {

            evt = document.createEvent('MouseEvents');
            // https://developer.mozilla.org/en/DOM/event.initMouseEvent
            evt.initMouseEvent(o.type,
                true, // canBubble
                true, // cancelable
                window, // 'AbstractView'
                o.clicks || 0, // click count
                o.screenX || 0, // screenX
                o.screenY || 0, // screenY
                o.clientX || 0, // clientX
                o.clientY || 0, // clientY
                o.ctrl || 0, // ctrl
                o.alt || false, // alt
                o.shift || false, // shift
                o.meta || false, // meta
                o.button || false, // mouse button
                null // relatedTarget
            );
        }

        x.dispatchEvent(evt);
    };

    var shortcuts = ['click', 'mousedown', 'mouseup', 'mousemove', 'keydown', 'keyup', 'keypress'],
        s, i = 0;

    while (s = shortcuts[i++]) {
        h[s] = (function(s) {
            return function(x, o) {
                h.once(x, extend(o || {}, { type: s }));
            };
        })(s);
    }

    h.dblclick = function(x, o) {
        h.once(x, extend(o || {}, {
            type: 'dblclick',
            clicks: 2
        }));
    };

    this.happen = h;
})(this);