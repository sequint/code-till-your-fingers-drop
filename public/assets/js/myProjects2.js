const projects = []
// const tasks = []

// function to render projects onto the page
const renderProjects = () => {
  document.getElementById('displayProjects').innerHTML = ''

  projects.forEach((project, i) => {
    const projectEl = document.createElement('div')
    projectEl.className = 'col-sm-12 mt-3'
    projectEl.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
          
            <div class="col">
              <h5 class="card-title">${project.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${project.cat}</h6>
              <p class="card-text">${project.des}</p>
            </div>

            <div class="col">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16">
                <path
                  d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              <p class="card-text mb-0">Start Date: ${project.startDate}</p>
              <p class="card-text mt-0">End Date: ${project.endDate}</p>           

            </div>

          </div>

          <div class="row mb-4">

            <div class="col">
              <p class="card-text mb-0">Progress:</p>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>               
            </div>

          </div>

          <a href="#" class="btn btn-primary">Details</a>
          <button type="button" class="btn btn-danger delete" data-index="${i}" id="deleteProject">Delete Project</button>

        </div>
      </div>
    `

    document.getElementById('displayProjects').append(projectEl)
  })
}

// function to render tasks in create project modal (WIP)
// const renderTasks = () => {
//   document.getElementById('disTasks').innerHTML = ''

//   tasks.forEach((task, i) => {
//     const taskEl = document.createElement('li')
//     taskEl.innerHTML = `
//       <p>${task}<button type="button" class="btn btn-danger delete btn-sm">X</button></p>
//     `
//   })
// }

// click event to create project 
document.getElementById('createProject').addEventListener('click', event => {

  const title = document.getElementById('projectTitle').value
  const des = document.getElementById('projectDes').value
  const cat = document.getElementById('projectCat').value
  // idk about tasks
  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value

  projects.push({ title, des, cat, startDate, endDate })

  renderProjects()

  document.getElementById('projectTitle').value = ''
  document.getElementById('projectDes').value = ''
  document.getElementById('projectCat').value = ''
  document.getElementById('startDate').value = ''
  document.getElementById('endDate').value = ''
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    const index = parseInt(event.target.dataset.index)
    projects.splice(index, 1)

    renderProjects()
  }
})

renderProjects()