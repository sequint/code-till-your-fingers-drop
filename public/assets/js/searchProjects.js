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

document.getElementById('logOutBtn').addEventListener('click', event => {

  window.location.href = './auth.html'

})

document.addEventListener('click', event => {

  if (event.target.classList.contains('suggestion')) {

    // Clear search bar, suggestions, and results.
    document.getElementById('searchBar').value = ''
    document.getElementById('suggestions').innerHTML = ''
    document.getElementById('searchResults').innerHTML = ''

    // Assign dataset of suggestion name to a variable.
    let suggName = event.target.dataset.suggName

    // Get the category id associated with the clicked value.
    axios.get('/api/categories')
      .then(({ data: payload }) => {

        // Filter categories array to the matching category title.
        let suggCategory = payload.categories.filter(category => category.title === suggName)

        // Assign the matches id to a variable.
        let suggCategoryId = suggCategory[0].id
        
        axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: payload }) => {
            // Assign userId variable to the current user id.
            let userId = payload.users[0].id

            axios.get(`/api/projects/searchCategoryId/${suggCategoryId}`)
              .then(({ data: payload }) => {
                console.log(payload)

                // Filter for matched projects that are not the current user's.
                let project = payload.project.filter(proj => proj.userId !== userId)

                // If the user is already tracking a project, exlude it from the project array.
                axios.get('/api/tracks', {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                })
                  .then(({ data: payload }) => {
                    // Loop through return tracks to filter projects array.
                    payload.tracks.forEach(track => {
                      project = project.filter(proj => proj.id !== track.projectId)
                    })

                    console.log(suggCategory)
                    // Iterate through each project and display on page.
                    project.forEach(project => {
                      let projectCard = document.createElement('div')
                      projectCard.className = 'col-sm-3 mb-3 mt-3'
                      projectCard.innerHTML = `
                        <div class="card">
                          <div class="card-body">
                            <div class="row mb-2">

                              <!-- project title, it should be "username's project title", took the same code from searchProjects.js -->
                              <h5 class="card-title">${project.projectName}</h5>

                              <!-- project category -->
                              <h6 class="card-subtitle mb-2 text-muted">${suggCategory[0].title}</h6>

                              <!-- project description, took the same code from searchProjects.js  -->
                              <p class="card-text">${project.description}</p>

                            </div>

                            <!-- project link btn and delete btn -->
                            <div id="${project.id}-trackAdded">
                              <button type="button" class="btn btn-primary trackProject" data-projectid="${project.id}" id="trackProject">Track Project</button>
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

          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))

  }

})

// Handle track project click by updating track table with user and project information.
document.addEventListener('click', event => {

  if (event.target.classList.contains('trackProject')) {
    
    // Assign project id variable to the dataset value.
    let projectId = event.target.dataset.projectid

    axios.post(`/api/tracks/`, {
      projectId: projectId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: payload }) => {

        // Display track added message.
        document.getElementById(`${projectId}-trackAdded`).innerHTML = `
        <p>You are now tracking this project!</p>
        `

      })
      .catch(err => console.log(err))

  }

})