;(function() {
  var wHeight = getViewportSize().height,
      sHeight = getScrollSize().height,
      playing = false,
      t = null

  var AutoReader = function(opt) {
    this.playBtn = opt.playBtn;
    this.sTopBtn = opt.sTopBtn;
    this.playImg = opt.playImg,
    this.pauseImg = opt.pauseImg

    if(!this.playBtn || !this.sTopBtn || !this.playImg || !this.pauseImg) {
      console.log('对不起,四个配置项必须全部完成')
    }

    var _self = this;

    addEvent(this.sTopBtn, 'click', function() {
      clearInterval(t);
      playing = false;
      _self.playBtn.style.backgroundImage = 'url('+ _self.playImg +')';
      window.scrollTo(0, 0);
    })

    addEvent(window, 'scroll', function() {
      _self.sTopBtnShow.call(_self);
    })

    addEvent(this.playBtn, 'click', function() {
      _self.setAutoPlay();
    })
  }

  AutoReader.prototype = {
    setAutoPlay: function() {
      var sTop = getScrollOffset().top,
          _self = this;
      if(sHeight === sTop + wHeight) {
        return;
      }

      if(!playing) {
        t = setInterval(function() {
          var sTop = getScrollOffset().top;
          if(sHeight <= sTop + wHeight) {
            clearInterval(t);
            _self.playBtn.style.backgroundImage = 'url('+ _self.playImg +')';
            playing = false;
            return;
          }else {
            window.scrollBy(0, 1);
            _self.playBtn.style.backgroundImage = 'url('+ _self.pauseImg +')';
          }
        }, 1);
        playing = true;
      }else {
        clearInterval(t);
        _self.style.backgroundImage = 'url('+ _self.playImg +')';
        playing = flase;
      }
    },

    sTopBtnShow: function() {
      var sTop = getScrollOffset().top;
          sTopBtn = this.sTopBtn;

      sTopBtn.style.display = sTop ? 'block' : 'none';
    }
  }

  window.AutoReader = AutoReader;
})();