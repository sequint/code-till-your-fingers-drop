// Function to render newly created project card to the page.
const renderProjects = project => {

  const projectEl = document.createElement('div')
  projectEl.className = 'col-sm-6 mb-3'
  projectEl.innerHTML = `
    <div class="card">
      <div class="card-body">
        <div class="row mb-2">
        
          <div class="col">
            <h5 class="card-title">${project.projectName}</h5>
            <p class="card-text">${project.description}</p>
          </div>

          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16">
              <path
                d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
            <p class="card-text mb-0">Start Date: ${project.startDate}</p>
            <p class="card-text mt-0">End Date: Not Yet Defined</p>           

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
        <button type="button" class="btn btn-danger delete" data-projectId="${project.id}" id="deleteProject">Delete Project</button>

      </div>
    </div>
  `

  document.getElementById('displayProjects').append(projectEl)
  document.getElementById('projectTitle').value = ''
  document.getElementById('projectDes').value = ''
  document.getElementById('projectCat').value = ''
  document.getElementById('startDate').value = ''

}

// Function assigns the categoryId to the project based on category title.
const addCategoryId = (categoryName, projectData) => {
  console.log(categoryName)

  // Check if category typed in already exists.
  axios.get('/api/categories')
    .then(({ data: payload }) => {
      let categoryMatch = payload.categories.filter(category => category.title === categoryName)
      if (!categoryMatch.length) {
        // Post new category
        axios.post('/api/categories', {
          title: categoryName
        })
          .then(({ data: payload }) => {
            // Update the specific project with the new category id.
            axios.put(`/api/projects/${projectData.id}`, {
              categoryId: payload.category.id
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })

          })
          .catch(err => console.log(err))
      }
      else {
        // Update the specific project with the matched category id.
        axios.put(`/api/projects/${projectData.id}`, {
          categoryId: categoryMatch[0].id
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      }

    })
    .catch(err => console.log(err))

}

// Create an array to hold the tasks entered.
let tasks = []

// Create a function to post the tasks into the array to tasks table with the project id attached.
const addTasks = projectData => {

  // Iterate through tasks list and post each task to the tasks model with current project id.
  tasks.forEach(task => {
    axios.post('/api/tasks', {
      taskDescription: task,
      isComplete: false,
      projectId: projectData.id
    })
  })

}

// Handle create project click.
document.getElementById('createProject').addEventListener('click', event => {
  event.preventDefault()

  // Create data variable using values from form inputs.
  let categoryName = event.target.parentNode.parentNode.children[1].children[0].children[2].children[1].value
  let tasks = event.target.parentNode.parentNode.children[1].children[0].children[3].children[1].value
  // Create a post axios request to send new project information to the database.
  axios.post('/api/projects', {
    projectName: event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value,
    description: event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value,
    startDate: event.target.parentNode.parentNode.children[1].children[0].children[5].children[0].value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {
      addTasks(payload.project)
      addCategoryId(categoryName, payload.project)
      renderProjects(payload.project)
    })
    .catch(err => console.log(err))

})



document.getElementById('add-task-button').addEventListener('click', event => {
  event.preventDefault()

  console.log(event.target.parentNode.children[1].value)

  // Element to hold the task value entered.
  let task = event.target.parentNode.children[1].value

  // Push new task value into the tasks array.
  tasks.push(task)

  // Create element to hold task html and append to the task list.
  let nextTask = document.createElement('li')
  nextTask.innerHTML = `
  <p>${task}<button type="button" class="btn btn-danger btn-sm">X</button></p>
  `
  document.getElementById('task-list').append(nextTask)
  document.getElementById('projectTasks').value = ''

})

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    console.log(event.target.dataset.projectid)
    let id = event.target.dataset.projectid
    
    axios.delete(`/api/projects/${id}`)
      .then(() => {
        document.getElementById('displayProjects').innerHTML = ''
        displayProjects()
      })
      .catch(err => console.log(err))
  }
})

document.addEventListener('click', event => {

  if (event.target.classList.contains('seeProject')) {

    // Set variable for project id clicked on.
    console.log(event.target.dataset.projectid)
    let projectId = event.target.dataset.projectid

    localStorage.setItem('myProject', projectId)

    // Go to individual tracked project window.
    window.location.href = './exprojectPg.html'

  }

})

// Function that gets projects of user and displays them in the DOM as cards.
const displayProjects = _ => {

  // Get all projects for a user.
  axios.get('/api/projects', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {

      // Loop through projects array returned and append each project to the DOM.
      payload.project.forEach(project => {

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
              <a href="./exProjectPg.html" class="btn btn-primary seeProject" data-projectid="${project.id}">See Project</a>
              <button type="button" class="btn btn-danger delete" data-projectId="${project.id}" id="deleteProject">Delete Project</button>

            </div>
          </div>
        </div>
        `

        document.getElementById('displayProjects').append(projectCard)

      })
      
    })
    .catch(err => console.log(err))

}

// On page load display all current project cards.
displayProjects()