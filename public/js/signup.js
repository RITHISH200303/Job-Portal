const signupEmail = document.getElementById("email");
const signupPassword = document.getElementById("password");
const signupConfirmPassword = document.getElementById("confirm-password");
const signupUserType = document.getElementById("user-type");
const signupOrganisation = document.getElementById("organisation");
const signupButton = document.getElementById("signupBtn");
const signupErrorElement = document.getElementById("signupErrorNotidy");

async function signupEvent(event) {
  event.preventDefault();
  const updateUser = {
    email: signupEmail.value,
    signupPassword: signupPassword.value,
    confirmPassword:signupConfirmPassword.value,
    userType: signupUserType.value,
    organisation: signupOrganisation.value,
  };
  if(updateUser.signupPassword==updateUser.confirmPassword){
    const response = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify(updateUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const responseData = await response.json();
    
      if (responseData == true) {
        signupErrorElement.textContent = "The User Id already exist!!!";
        signupErrorElement.style.display = "block";
      }
      else{
        window.location.href='http://localhost:3000/login'
      }
  }
  else{
    signupErrorElement.textContent = "Check the Confirmation password or re-enter the password";
    signupErrorElement.style.display = "block";
  }
}

signupButton.addEventListener("click", signupEvent);
