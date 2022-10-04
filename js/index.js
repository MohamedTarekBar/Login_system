var toggleAuthModeBtn = outlet ('#toggleAuthMode');
var userNameTextField = outlet ('#userNameTF');
var emailTextField = outlet ('#emailTF');
var passwordTextField = outlet ('#passwordTF');
var formHeaderIcon = outlet ('#formHeaderIcon');
var formHeaderText = outlet ('#formHeaderText');
var askingUserisExisit = outlet ('#askingUserisExisit');
var submitBtn = outlet ('#submitFormBtn');

var isExisit = true;

function toggleAuthMode () {
  if (isExisit) {
    // appear sign in
    handleSignInDesign ();
  } else {
    // appear sign up
    handleRegisterDesign ();
  }
  isExisit = !isExisit;
}

(function () {
  toggleAuthMode ();
  toggleAuthModeBtn.addEventListener (commonEvents.onClick, toggleAuthMode);
  toggleAuthModeBtn.addEventListener (commonEvents.keyDown, event => {
    event.preventDefault ();
  });
  toggleAuthModeBtn.addEventListener (commonEvents.keyUp, event => {
    event.preventDefault ();
  });

  document.addEventListener (commonEvents.keyDown, function (event) {
    if (event.code == 'Enter') {
      if (isExisit) {
        var user = {
          name: userNameTextField.value,
          email: emailTextField.value,
          password: passwordTextField.value,
        };
        validate (user);
      } else {
        var user = {
          email: emailTextField.value,
          password: passwordTextField.value,
        };
        validate (user);
      }
    }
  });
}) ();

function handleSignInDesign () {
  toggleAuthModeBtn.innerText = 'Sign Up';
  askingUserisExisit.innerText = 'Don’t have an account?';
  userNameTextField.style.display = 'none';
  formHeaderText.innerText = 'Login';
  formHeaderIcon.classList.replace (
    'bi-person-circle',
    'bi-box-arrow-in-right'
  );
  submitBtn.innerText = 'Log in';
  submitBtn.removeEventListener (commonEvents.onClick, createUser);
  submitBtn.addEventListener (commonEvents.onClick, logUser);
  clearAllInputs ();
}

function handleRegisterDesign () {
  toggleAuthModeBtn.innerText = 'Sign In';
  askingUserisExisit.innerText = 'You have an account?';
  userNameTextField.style.display = 'block';
  formHeaderText.innerText = 'Create account!';
  formHeaderIcon.classList.replace (
    'bi-box-arrow-in-right',
    'bi-person-circle'
  );
  submitBtn.innerText = 'Create';
  submitBtn.removeEventListener (commonEvents.onClick, logUser);
  submitBtn.addEventListener (commonEvents.onClick, createUser);
  clearAllInputs ();
}

function createUser () {
  var user = {
    name: userNameTextField.value,
    email: emailTextField.value,
    password: passwordTextField.value,
  };
  validate (user);
}

function logUser () {
  var user = {
    email: emailTextField.value,
    password: passwordTextField.value,
  };
  validate (user);
}

function createUserFB (user) {
  firebase
    .auth ()
    .createUserWithEmailAndPassword (user.email, user.password)
    .then (userCredential => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch (error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  console.log ('done signup');
}

function loginUserFB (user) {
  firebase
    .auth ()
    .signInWithEmailAndPassword (user.email, user.password)
    .then (userCredential => {
      // Signed in
      var user = userCredential.user;
      console.log (user);
      // ...
    })
    .catch (error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log (errorMessage);
    });

  console.log ('done login');
}

function validate (user) {
  if (user.name == undefined) {
    // log
    if (validateEmailAddress (user.email)) {
      if (validatePassword (user.password)) {
        // login Function
        loginUserFB (user);
        return true;
      } else {
        addErrAnimation (passwordTextField);
        return false;
      }
    } else {
      addErrAnimation (emailTextField);
      return false;
    }
  } else {
    // sign up
    if (user.name.length >= 3) {
      if (validateEmailAddress (user.email)) {
        if (validatePassword (user.password)) {
          createUserFB (user);
          return true;
        } else {
          addErrAnimation (passwordTextField);
          return false;
        }
      } else {
        addErrAnimation (emailTextField);
        return false;
      }
    } else {
      addErrAnimation (userNameTextField);
      return false;
    }
  }
}
