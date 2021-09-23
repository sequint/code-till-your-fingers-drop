const { bootstrap } = window

// UI Functions //

var left_cover = document.getElementById("left-cover");
var left_form = document.getElementById("left-form");

var right_cover = document.getElementById("right-cover");
var right_form = document.getElementById("right-form");

function switchSignup() {
  right_form.classList.add("fade-in-element");
  left_cover.classList.add("fade-in-element");

  left_form.classList.add("form-hide");
  left_cover.classList.remove("cover-hide");
  right_form.classList.remove("form-hide");
  right_cover.classList.add("cover-hide");
}


// Authentication Functions //

document.getElementById('signUp').addEventListener('click', event => {
  event.preventDefault()
  console.log('In event')

  axios.post('/api/users/register', {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value,
    password: document.getElementById('password').value
  })
    .then(() => alert('User registered! Log in.'))
    .catch(err => console.error(err))
})

document.getElementById('lButton').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    username: document.getElementById('lUsername').value,
    password: document.getElementById('lPassword').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        window.location = '/'
      } else {
        alert('Invalid username or password.')
      }
    })
    .catch(err => console.error(err))
})