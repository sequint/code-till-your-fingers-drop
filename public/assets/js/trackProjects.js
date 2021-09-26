document.addEventListener('click', event => {

  if (event.target.classList.contains('getDetails')) {

    // Set variable for project id clicked on.
    let projectId = event.target.dataset.projectid
    let trackId = event.target.dataset.trackid
    localStorage.setItem('trackProject', projectId)
    localStorage.setItem('trackId', trackId)

    // Go to individual tracked project window.
    window.location.href = './exTrackPro.html'

  }

})

document.getElementById('logOutBtn').addEventListener('click', event => {

  window.location.href = './auth.html'

})

// Delete a project from user tracked projects.
document.addEventListener('click', event => {
  if (event.target.classList.contains('removeProject')) {
    console.log(event.target.dataset.trackid)
    let id = event.target.dataset.trackid

    axios.delete(`/api/tracks/${id}`)
      .then(() => {
        document.getElementById('displayUserProjects').innerHTML = ''
        window.location.href = './trackProjects.html'
      })
      .catch(err => console.log(err))
  }
})

// Function that gets projects of user and displays them in the DOM as cards.
const displayProjects = _ => {

  // Get all projects for a user.
  axios.get('/api/tracks', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {

      // Loop through user tracks and find the joined project, then append project to the page.
      payload.tracks.forEach(track => {
        console.log(track.projectId)

        axios.get(`/api/projects/searchProjectId/${track.projectId}`)
          .then(({ data: payload}) => {
            // Assign the joined project to a project variable.
            let project = payload.project[0]

            axios.get('/api/categories')
              .then(({ data: payload }) => {

                let matchedCategory = payload.categories.filter(category => category.id === project.categoryId)

                // Append project information to the page in a card.
                let projectCard = document.createElement('div')
                projectCard.className = 'col-sm-3 mb-3'
                projectCard.innerHTML = `
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-2">

                      <!-- project title, took the same code from myProjects.js -->
                      <h5 class="card-title">${project.projectName}</h5>

                      <!-- project category -->
                      <h6 class="card-subtitle mb-2 text-muted">${matchedCategory[0].title}</h6>

                      <!-- project description, took the same code from myProjects.js  -->
                      <p class="card-text">${project.description}</p>

                    </div>

                    <!-- user's project link btn and remove btn -->
                    <button class="btn btn-outline-primary getDetails" data-projectid="${project.id}" data-trackid="${track.id}">Details</button>
                    <button type="button" class="btn btn-outline-danger removeProject" data-trackid="${track.id}" id="removeProject">Remove Project</button>
                  </div>
                </div>
                `
                document.getElementById('displayUserProjects').append(projectCard)

              })
              .catch(err => console.log(err))

          })
          .catch(err => console.log(err))

      })

    })
    .catch(err => console.log(err))

}

// On page load display all current project cards.
displayProjects()