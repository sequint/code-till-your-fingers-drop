
document.addEventListener('click', event => {

  if (event.target.classList.contains('addComment')) {

    // Define variables based on user input.
    let comment = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value
    
    

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

      axios.get(`/api/tasks/${project.id}`)
        .then(({ data: payload }) => {
          // Set array variable for tasks returned.
          let tasks = payload.task
          console.log(tasks)
          // Loop through tasks array and append each task to the page.
          tasks.forEach(task => {
            
            let taskItem = document.createElement('li')
            taskItem.className = 'm-1'
            taskItem.textContent = task.taskDescription
            
            // Append new task to the task list.
            document.getElementById('tasksLi').append(taskItem)

          })
        })

    })

}

loadProjectContent()
