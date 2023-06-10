const loginButton = document.getElementById("loginButton");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const signupErrorElement = document.getElementById("loginErrorNotidy");

async function loginEvent(event) {
  event.preventDefault();

  const loginData = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  const response = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if(responseData.errorEmail==true){
    signupErrorElement.textContent='The mail is not exist...'
    signupErrorElement.style.display='block'
  }
  else if(responseData.errorPassword==true){
    signupErrorElement.textContent='Invalid password for the mail id...'
    signupErrorElement.style.display='block'
  }
  else{
    window.location.href='http://localhost:3000/home'
  }
}

loginButton.addEventListener("click", loginEvent);
