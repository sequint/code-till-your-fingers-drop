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

    // Create a suggestions variable.
  let suggestions = predictionary.predict(event.target.value)
  
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

    // Assign dataset of suggestion name to a variable.
    let suggName = event.target.dataset.suggName

    // Get the category id associated with the clicked value.
    axios.get('/api/categories')
      .then(({ data: payload }) => {

        // Filter categories array to the matching category title.
        let suggCategory = payload.categories.filter(category => category.title === suggName)
        // Assign the matches id to a variable.
        let suggCategoryId = suggCategory[0].id
        
        // Request projects from database who's projecId matches the clicked suggestion.
        axios.get(`/api/projects/${suggCategoryId}`)
          .then(({ data: payload }) => {
            console.log(payload.project)
            // Assign variable for the matching projects array.
            let project = payload.project

            // Iterate through each project and display on page.
            project.forEach(project => {
              let projectCard = document.createElement('div')
              projectCard.className = 'row'
              projectCard.innerHTML = `
              <div class="col-sm-12 mt-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-2">

                      <!-- project title & description-->
                      <div class="col">
                        <h5 class="card-title">${project.projectName}</h5>
                        <p class="card-text">${project.description}</p>
                      </div>

                      <!-- calendar icon and project start & end dates-->
                      <div class="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                          class="bi bi-calendar-week" viewBox="0 0 16 16">
                          <path
                            d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                          <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <p class="card-text mb-0">Start Date: ${project.startDate}</p>
                        <p class="card-text mt-0">End Date: December 1, 2021</p>
                      </div>

                    </div>

                    <!-- project progress and progress bar -->
                    <div class="row mb-4">
                      <div class="col">
                        <p class="card-text mb-0">Progress:</p>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: ${project.percentComplete}%" aria-valuenow="${project.percentComplete}"
                            aria-valuemin="0" aria-valuemax="100">${project.percentComplete}%</div>
                        </div>
                      </div>
                    </div>

                    <!-- project link btn and delete btn -->
                    <a href="./exProjectPg.html" class="btn btn-primary">See Project</a>
                    <button type="button" class="btn btn-danger delete" data-projectId="${project.id}" id="deleteProject">Delete Project</button>

                  </div>
                </div>
              </div>
              `
              document.getElementById('searchResults').append(projectCard)
            })

          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))

  }

})