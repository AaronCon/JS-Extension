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
      inputShow = false,
      isEdit = false,
      curIdx = null;

  addEvent(showInput, 'click', function() {
    if(!inputShow) {
      inputSwitch('open');
    } else {
      inputSwitch('close');
      restStaus();
    }
  })

  addEvent(addItem, 'click', function() {
    var val = textInput.value,
        len = val.length,
        oItems = document.getElementsByClassName('item'),
        itemLen = oItems.length;

    if(len === 0) {
      return;
    }

    if(itemLen > 0) {
      for(var i = 0; i < itemLen; i++) {
        itemText = elemChildren(oItems[i])[0].innerText;

        if(itemText === val) {
          alert('已存在该项目');
          return;
        }
      }
    }

    if(isEdit) {
      var oitem = elemChildren(oItems[curIdx])[0];
      oitem.innerHTML = val;
      oItems[curIdx].className = 'item';
    } else {
      var oli = document.createElement('li');
      oli.className = 'item';
      oli.innerHTML = itemTpl(textInput.value);
      oList.appendChild(oli);
    }
    restStaus();
  })

  addEvent(oList, 'click', function(e) {
    var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className,
        oItems = document.getElementsByClassName('item'),
        item,
        oParent = elemParent(tar, 2),
        tarIdx = Array.prototype.indexOf.call(oItems, oParent);

    if(className === 'edit-btn fa fa-edit') {
      var itemLen = oItems.length;

      textInput.value = oParent.getElementsByTagName('p')[0].innerHTML;
      inputSwitch('open');

      for(var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = ' item';
      }
      curIdx = tarIdx;
      oParent.className += ' active';
      addItem.innerText = '编辑第'+ (curIdx + 1) + '项';
      isEdit = true;
    } else if(className === 'remove-btn fa fa-times') {
      restStaus();
      oParent.remove();
    }
  })

  function restStaus() {
    isEdit = false;
    curIdx = null;
    textInput.value = '';
    addItem.innerText = '增加项目';
    inputSwitch('close');
  }

  function inputSwitch(status) {
    if(status === 'open') {
      inputWrap.style.display = "block";
      inputShow = true;
    } else if (status === 'close') {
      inputWrap.style.display = "none";
      inputShow = false;
    }
  }

  function itemTpl(text) {
    return (
      '<p class="item-content">' + text + '</p>' +
      '<div class="btn-group">'+
        '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
        '<a href="javascript:;" class="remove-btn fa fa-times"></a>'+
      '</div>'
    )
  }
})();