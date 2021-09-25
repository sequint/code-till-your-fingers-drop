let btn = document.querySelector('#toggleBtn')
let sideNavbar = document.querySelector('.sideNavbar')

btn.onclick = function () {
  sideNavbar.classList.toggle('active')
}