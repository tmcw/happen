if (typeof require !== 'undefined') {
    var happen = require('../');
    var expect = require('chai').expect;
}

describe('Happen', function(){
  describe('mouse shortcuts', function() {
      var shortcuts = ['click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'keyup', 'keypress'];
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

  describe('jquery plugin', function() {
      it('should inhabit $.happen', function() {
          var d = $('<div></div>');
          expect(typeof d.happen).to.be('function');
          expect(d.happen('click')).to.be(d);
      });
      it('should click an element and trigger the jquery event', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d.click(function() {
              clicked = true;
          });
          expect(d.happen({ type: 'click' })).to.be(d);
          expect(clicked).to.be(true);
      });
      it('supports a string shortcut for type', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d.click(function() {
              clicked = true;
          });
          expect(d.happen('click')).to.be(d);
          expect(clicked).to.be(true);
      });
      it('triggers native events as well', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d[0].onclick = function() {
              clicked = true;
          };
          expect(d.happen('click')).to.be(d);
          expect(clicked).to.be(true);
      });
      it('works on the document element', function() {
          var keyed = false;
          document.onkeyup = function() {
              keyed = true;
          };
          $(document).happen('keyup');
          expect(keyed).to.be(true);
      });
      it('works on multiple elements', function() {
          var a = false, b = false;
          $('<div class="a"></div>').click(function() {
              a = true;
          }).appendTo('body');
          $('<div class="b"></div>').click(function() {
              b = true;
          }).appendTo('body');
          $('.a, .b').happen('click');
          expect(a).to.be(true);
          expect(b).to.be(true);
      });
  });
});
