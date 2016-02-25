function getA() {
    return document.body.appendChild(document.createElement('a'));
}

function addDomEvent(obj, type, handler) {
  if ('addEventListener' in obj) {
      obj.addEventListener(type, handler, false);
  } else if ('attachEvent' in obj) {
      obj.attachEvent('on' + type, handler);
  }
}

describe('Happen', function(){
  describe('shortcuts', function() {
      var shortcuts = ['click', 'mousedown', 'mouseup', 'mousemove',
          'mouseover', 'mouseout', 'keydown', 'keyup', 'keypress'];
      for (var i = 0; i < shortcuts.length; i++) {
          (function(i) {
          describe('.' + shortcuts[i] + '()', function() {
            it('should trigger the ' + shortcuts[i] + ' event', function(){
                var a = getA();
                var triggered = false;
                a['on' + shortcuts[i]] = function() {
                    triggered = true;
                };
                happen[shortcuts[i]](a);
                expect(triggered).to.eql(true);
            });

            var modifiers = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
            for (var j = 0; j < modifiers.length; j++) {
                (function(j) {
                it('supports the ' + modifiers[j] + ' modifier', function(){
                    var a = getA();
                    var triggered = false;
                    a['on' + shortcuts[i]] = function(e) {
                        triggered = e[modifiers[j]];
                    };
                    var props = {};
                    props[modifiers[j]] = true;
                    happen[shortcuts[i]](a, props);
                    expect(triggered).to.eql(true);
                });
              })(j);
            }
          });
        })(i);
      }
  });

  describe('keyboard events', function() {
      it('.keyup()', function(done) {
          document.onkeyup = function() {
              done();
          };
          happen.keyup(document);
      });
      it('.keyup() custom code', function(done) {
          var keycode = -1;
          document.onkeyup = function(e) {
              expect(e.keyCode).to.eql(30);
              done();
          };
          happen.keyup(document, { keyCode: 30 });
      });
  });

  describe('touch events', function() {
      it('touchstart', function(done) {
          addDomEvent(document, 'touchstart', function(param) {
              expect(param.type).to.be.eql('touchstart');
              expect(param.touches).to.have.length(2);
              done();
          });
          happen.once(document, {
              'type':'touchstart',
              'touches' : [{
                            pageX : 100,
                            pageY : 100,
                        },
                        {
                            pageX : 105,
                            pageY : 105,
                        }]
          });
      });
      it('touchmove', function(done) {
          addDomEvent(document, 'touchmove', function(param) {
              expect(param.type).to.be.eql('touchmove');
              expect(param.touches).to.have.length(2);
              done();
          });
          happen.once(document, {
              'type':'touchmove',
              'touches' : [{
                            pageX : 100,
                            pageY : 100,
                        },
                        {
                            pageX : 105,
                            pageY : 105,
                        }]
          });
      });
      it('touchend', function(done) {
          addDomEvent(document, 'touchend', function(param) {
              expect(param.type).to.be.eql('touchend');
              done();
          });
          happen.once(document, {
              'type':'touchend'
          });
      });
  });

  describe('options', function() {
      it('should .click() with options', function(done) {
        var a = getA();
        a.onclick = function(e) {
            expect(e.shiftKey).to.eql(true);
            done();
        };
        happen.click(a, { shiftKey: true });
      });

      it('has a dblclick shortcut', function(done) {
        var a = getA();
        var detail = -1;
        a.ondblclick = function(e) {
            expect(e.detail).to.eql(2);
            done();
        };
        happen.dblclick(a);
      });

      it('honours relatedTarget option', function(done) {
        var a = getA();
        var a2 = getA();
        a.onmouseover = function(e) {
            expect(e.relatedTarget).to.eql(a2);
            done();
        };
        happen.mouseover(a, { relatedTarget: a2 });
      });
  });

  describe('jquery plugin', function() {
      it('should inhabit $.happen', function() {
          var d = $('<div></div>');
          expect(typeof d.happen).to.eql('function');
          expect(d.happen('click')).to.eql(d);
      });
      it('should click an element and trigger the jquery event', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d.click(function() {
              clicked = true;
          });
          expect(d.happen({ type: 'click' })).to.eql(d);
          expect(clicked).to.eql(true);
      });
      it('supports a string shortcut for type', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d.click(function() {
              clicked = true;
          });
          expect(d.happen('click')).to.eql(d);
          expect(clicked).to.eql(true);
      });
      it('triggers native events as well', function() {
          var d = $('<div></div>').appendTo('body'),
              clicked = false;
          d[0].onclick = function() {
              clicked = true;
          };
          expect(d.happen('click')).to.eql(d);
          expect(clicked).to.eql(true);
      });
      it('works on the document element', function() {
          var keyed = false;
          document.onkeyup = function() {
              keyed = true;
          };
          $(document).happen('keyup');
          expect(keyed).to.eql(true);
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
          expect(a).to.eql(true);
          expect(b).to.eql(true);
      });
  });
});
