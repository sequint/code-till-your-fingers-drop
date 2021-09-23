// Function that adds the tasks for the project into the tasks table with it's project id.
const addTasksToDB = (projectId, task) => {

  // Create a post request to add the new tasks.
  axios.post('/api/tasks', {
    taskDescription: task,
    isComplete: false,
    projectId: projectId
  })

}

// Function assigns the categoryId to the project based on category title.
const addCategoryId = (categoryName, projectData) => {

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
            axios.put(`/api/projects/${projectData.id}`, { categoryId: payload.category.id})

          })
          .catch(err => console.log(err))
      }
      else {
        // Update the specific project with the matched category id.
        axios.put(`/api/projects/${projectData.id}`, { categoryId: categoryMatch.id })
      }

    })
    .catch(err => console.log(err))

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
        startDate: event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(({ data: payload }) => {
          addCategoryId(categoryName, payload.project)
          return payload.project
        })
        .then(project => addTasksToDB(project.id, tasks))
        .catch(err => console.log(err))

})

// Function that gets projects of user and displays them in the DOM as cards.
const displayProjects = _ => {

  // Get all projects for a user.
  axios.get('api/projects')

}

// On page load display all current project cards.
