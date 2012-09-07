describe('Happen', function(){
  describe('mouse shortcuts', function() {
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

  describe('keyboard events', function() {
      it('.keyup()', function() {
          var gotkey = false;
          document.onkeyup = function() {
              gotkey = true;
          };
          happen.keyup(document);
          expect(gotkey).to.be(true);
      });
      it('.keyup() custom code', function() {
          var keycode = -1;
          document.onkeyup = function(e) {
              keycode = e.keyCode;
          };
          happen.keyup(document, { keyCode: 30 });
          expect(keycode).to.be(30);
      });
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
