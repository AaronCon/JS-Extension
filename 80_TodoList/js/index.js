init();

function init() {
  initTodoList;
}

var initTodoList = (function() {
  var showInput = document.getElementsByClassName('j-show-input')[0],
      inputWrap = document.getElementsByClassName('input-wrap')[0],
      addItem = document.getElementsByClassName('j-add-item')[0],
      textInput = document.getElementById('textInput'),
      oList = document.getElementsByClassName('j-list')[0],
      inputShow = false;

  addEvent(showInput, 'click', function() {
    if(!inputShow) {
      inputWrap.style.display = "block";
      inputShow = true;
    } else {
      inputWrap.style.display = "none";
      inputShow = false;
    }
  })

  addEvent(addItem, 'click', function() {
    var val = textInput.value,
        len = val.length;

    if(len === 0) {
      return;
    }

    var oli = document.createElement('li');
    oli.className = 'item';
    oli.innerText = val;
    oList.appendChild(oli);
  })
})();