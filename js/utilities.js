function outlet (id) {
  var linkType = id[0];
  var elName = id.substring(1);

  switch (linkType) {
    case '#':
      return document.getElementById (elName);
      break;
    case '.':
      return document.getElementsByClassName (elName);
      break;
    default:
      return document.getElementsByTagName (id);
      break;
  }
}


var commonEvents = {
  onClick: 'click',
  onChange: 'change',
  mouseOn: 'mouseover',
  mouseOut: 'mouseout',
  keyDown: 'keydown',
  keyUp: 'keyUp',
  onload: 'onload',
};

function validateEmailAddress(email) {
  return constants.emailRegex.test(email)
}

function validatePassword(password) {
  return constants.passwordRegex.test(password)
}

function clearAllInputs() {
 document.querySelectorAll('input').forEach(element => {
    element.value = ''
 }); 
}

function addErrAnimation(el) {
  el.classList.add ('error');
  focusEl(el)
  setTimeout (() => {
      el.classList.remove ('error');
  }, 100);
}

function focusEl(el) {
  el.focus()
}