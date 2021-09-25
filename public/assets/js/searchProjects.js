// Define predictionary data set.
let predictionary = Predictionary.instance()

// Create an array that will hold category titles.
let categoryTitles = []

// Get categories from database and add them to the predictionary.
axios.get('/api/categories')
  .then(({ data: payload}) => {

    // Re-assign category titles to the category titles from the database.
    categoryTitles = payload.categories.map(category => category.title)

    // Add category titles to the predictionary as an array.
    predictionary.addWords(categoryTitles)

  })
  .catch(err => console.log(err))


searchBar.addEventListener('keyup', event => {
  event.preventDefault()

  // Clear past suggestions.
  document.getElementById('suggestions').innerHTML = ''

  console.log(categoryTitles)
  console.log(event.target.value)

    // Create a suggestions variable.
  let suggestions = predictionary.predict(event.target.value)
  console.log(suggestions)
  
  // If there is a keystroke in the search bar, display suggestions.
  if (event.target.value) {
    // Display each suggestion in a list below search box.
    suggestions.forEach(suggestion => {

      let suggestItem = document.createElement('li')
      suggestItem.className = `list-group-item suggestion`
      suggestItem.dataset.suggName = `${suggestion}`
      suggestItem.textContent = suggestion

      // Append suggested category to the page.
      document.getElementById('suggestions').append(suggestItem)

    })
  }

})

document.addEventListener('click', event => {

  if (event.target.classList.contains('suggestion')) {
    console.log(event.target.dataset.suggName)
  }

})