
// Load all project content to the page
const loadProjectContent = _ => {
  // Grab project id clicked on from local storage and store into a variable.
  let projectId = localStorage.getItem('trackProject')

  // Get project with the id.
  axios.get(`/api/projects/${projectId}`)
    .then(({ data: payload }) => {
      // Set project variable.
      let project = payload.project[0]
      console.log(project)

      document.getElementById('myProTitle').textContent = project.projectName
      document.getElementById('description').textContent = project.description
      document.getElementById('startDate').textContent = project.startDate
      
      let progressBar = document.createElement('div')
      progressBar.className = 'col'
      progressBar.innerHTML = `
      <p class="card-text mb-0" >Progress:</p>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${project.percentComplete}%" aria-valuenow="${project.percentComplete}" aria-valuemin="0" aria-valuemax="100">${project.percentComplete}%</div>
      </div>
      `
      document.getElementById('progressArea').append(progressBar)

    })

}

loadProjectContent()
