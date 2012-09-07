describe('Happen', function(){
  describe('shortcuts', function() {
      var shortcuts = ['click', 'mousedown', 'mouseup', 'mousemove'];
      for (var i = 0; i < shortcuts.length; i++) {
          (function(i) {
          describe('.' + shortcuts[i] + '()', function() {
            it('should trigger the ' + shortcuts[i] + ' event', function(){
                var a = document.createElement('a');
                var triggered = false;
                a['on' + shortcuts[i]] = function() {
                    triggered = true;
                };
                happen[shortcuts[i]](a);
                expect(triggered).to.be(true);
            });
          });
        })(i);
      }
  });

  describe('custom things', function() {
      it('should .click() with options', function() {
        var a = document.createElement('a');
        var shift = false;
        a.onclick = function(e) {
            shift = e.shiftKey;
        };
        happen.click(a, { shift: true });
        expect(shift).to.be(true);
      });

      it('has a dblclick shortcut', function() {
        var a = document.createElement('a');
        var clicks = -1;
        a.ondblclick = function(e) {
            clicks = e.detail;
        };
        happen.dblclick(a);
        expect(clicks).to.be(2);
      });

  });
});
