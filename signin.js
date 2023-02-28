const signInForm = document.querySelector('#signin-form')
const firstnameInput = document.querySelector('#firstname-input')
const lastnameInput = document.querySelector('#lastname-input')
const phoneInput = document.querySelector('#phone-input')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const formButton = document.querySelector('#signin-form button')

formButton.abled = true

function validate(input) {
    let errorSpan = document.createElement('span');
    errorSpan.style.color = 'red'
    errorSpan.style.fontSize = '8px'
    errorSpan.innerHTML = 'this field is required'
    errorSpan.className = 'error'
    if (!input.value.trim()) {
        // setTimeout(() => {
        //     error.forEach(err => err.remove)
        // }, 3000)
    
        input.insertAdjacentElement('afterend', errorSpan)
        return false
    } else {
        return true
    }
}

function createUser(firstname, lastname, phone, email, password) {
    if (!localStorage.getItem('user')) {
        localStorage.setItem('users', JSON.stringify([]))
    } 

    //Fetching a list of saved user
    let users = JSON.parse(localStorage.getItem('users'))
    let userExists = users.find(user => user.email === email)
    
    // craete a new  if the user doesn'y exit
    if(!userExists) {
        let newUser = {firstname,lastname,phone,email,password}
        users.push(newUser)
        localStorage.clear
        localStorage.setItem('users', JSON.stringify())
    }

}

signInForm.onsubmit = (evt) => {
    evt.preventDefault()
    let isValidFirstname = validate(firstnameInput)
    let isValidLastname = validate(lastnameInput)
    let isValidPhone = validate(phoneInput)
    let isValidEmail = validate(emailInput)
    let isValidPassword = validate(passwordInput)

   if (isValidFirstname && isValidLastname && isValidPhone && isValidEmail && isValidPassword) {
      createUser(firstnameInput.value, lastnameInput.value ,phoneInput.value, emailInput.value, passwordInput.value)
      if (!localStorage.getItem('isAuthenticated')) {
        localStorage.setItem('isAuthenticated', JSON.stringify(true))
      }
      document.querySelector('#signin').style.display = 'none'
   } else {
       alert ('login Failed')

   }
   let error =  document.querySelectorAll('.error')
   setTimeout(() => {
        error.forEach(err => err.remove())
    }, 1000)
} 