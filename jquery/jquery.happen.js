(function($) {
    $.fn.happen = function(o) {
        if (typeof o === 'string') {
            o = { type: o };
        }
        for (var i = 0; i < this.length; i++) {
            happen.once(this[i], o);
        }
        return this;
    };
})(jQuery);
