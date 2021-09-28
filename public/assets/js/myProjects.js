// Function assigns the categoryId to the project based on category title.
const addCategoryId = (categoryName, projectData) => {

  // Check if category typed in already exists.
  axios.get('/api/categories')
    .then(({ data: payload }) => {
      let categoryMatch = payload.categories.filter(category => category.title === categoryName)
      console.log(payload)
      if (categoryMatch.length === 0) {

        // Post new category
        axios.post('/api/categories', {
          title: categoryName
        })
          .then(({ data: payload }) => {

            let categoryId = payload.category.id
            console.log(categoryId)
            console.log(projectData.id)

            // Update the specific project with the new category id.
            axios.put(`/api/projects/${projectData.id}`, {
              categoryId: categoryId
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(({ data: payload }) => console.log(payload))
              .catch(err => console.log(err))

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

  updateProgressBar(projectData.id)

}

document.getElementById('logOutBtn').addEventListener('click', event => {

  window.location.href = './auth.html'

})

// Handle create project click.
document.getElementById('createProject').addEventListener('click', event => {
  event.preventDefault()

  // Create a post axios request to send new project information to the database.
  axios.post('/api/projects', {
    categoryTitle: event.target.parentNode.parentNode.children[1].children[0].children[2].children[1].value,
    projectName: event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value,
    description: event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value,
    startDate: event.target.parentNode.parentNode.children[1].children[0].children[5].children[0].value,
    tasks: tasks
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {
      console.log('Create success!')
      // window.location.href = './myProjects.html' 
    })
    .catch(err => console.log(err))

})

document.getElementById('add-task-button').addEventListener('click', event => {
  event.preventDefault()

  // Element to hold the task value entered.
  let task = event.target.parentNode.children[1].value

  // Push new task value into the tasks array.
  tasks.push({ taskDescription: task })

  // Create element to hold task html and append to the task list.
  let nextTask = document.createElement('li')
  nextTask.innerHTML = `
  <p class="taskDescription">${task}</p>
  `
  document.getElementById('task-list').append(nextTask)
  document.getElementById('projectTasks').value = ''

})

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {

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

  axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {
      document.getElementById('userProjTitle').textContent = `My Projects - ${payload.users[0].username}`
    })

  // Get all projects for a user.
  axios.get('/api/projects', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: payload }) => {

      // Loop through projects array returned and append each project to the DOM.
      payload.project.forEach(project => {

        axios.get('/api/categories')
          .then(({ data: payload }) => {

            let matchedCategory = payload.categories.filter(category => category.id === project.categoryId)

            let projectCard = document.createElement('div')
            projectCard.className = 'col-sm-3 mb-3'
            projectCard.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="row mb-2">

                  <!-- project title, took the same code from myProjects.js -->
                  <h5 class="card-title">${project.projectName}</h5>

                  <!-- project category -->
                  <h6 class="card-subtitle mb-2 text-muted" id="categoryTitle">${matchedCategory[0].title}</h6>

                  <!-- project description, took the same code from myProjects.js  -->
                  <p class="card-text">${project.description}</p>

                </div>

                <!-- project link btn and delete btn -->
                <!-- took the same code from myProjects.js for the project link btn and delete btn and added "outline" class to the btns to change the way it looks -->
                <a href="./exProjectPg.html" class="btn btn-outline-primary seeProject" data-projectid="${project.id}">Details</a>
                <button type="button" class="btn btn-outline-danger delete" data-projectId="${project.id}"
                  id="deleteProject">Delete
                  Project</button>

              </div>
            </div>
            `

            document.getElementById('displayProjects').append(projectCard)

          })
          .catch(err => console.log(err))

      })
      
    })
    .catch(err => console.log(err))

}

// On page load display all current project cards.
displayProjects()