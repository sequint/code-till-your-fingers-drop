document.addEventListener('click', event => {

  if (event.target.classList.contains('getDetails')) {

    // Set variable for project id clicked on.
    console.log(event.target.dataset.projectid)
    let projectId = event.target.dataset.projectid
    localStorage.setItem('trackProject', projectId)

    // Go to individual tracked project window.
    window.location.href = './exTrackPro.html'

  }

})

// Delete a project from user tracked projects.
document.addEventListener('click', event => {
  if (event.target.classList.contains('removeProject')) {
    console.log(event.target.dataset.trackid)
    let id = event.target.dataset.trackid

    axios.delete(`/api/tracks/${id}`)
      .then(() => {
        document.getElementById('displayUserProjects').innerHTML = ''
        displayProjects()
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

        axios.get(`/api/projects/${track.projectId}`)
          .then(({ data: payload}) => {
            // Assign the joined project to a project variable.
            let project = payload.project[0]

            // Append project information to the page in a card.
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

                    <!-- user's project link btn and remove btn -->
                    <button class="btn btn-primary getDetails" data-projectid="${project.id}">Details</button>
                    <button type="button" class="btn btn-danger removeProject" data-trackid="${track.id}" id="removeProject">Remove Project</button>
                  </div>
                </div>
              </div>
            `
            document.getElementById('displayUserProjects').append(projectCard)
          })
          .catch(err => console.log(err))

      })

    })
    .catch(err => console.log(err))

}

// On page load display all current project cards.
displayProjects()