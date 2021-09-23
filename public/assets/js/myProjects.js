const addTasksToDB = projectData => {

  console.log(projectData)

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

  let userName = 'Sleepy Neko'

  // Find the matching current user in the user database, and get user information.
  axios.get(`/api/users`,)
    .then(({ data: payload }) => {
      let users = payload.users
      let userMatch = users.filter(user => user.username === userName)

      return userMatch

    })
    .then(userMatch => {

      // Create an object of new project data input from user.
      let projectData = {
        projectName: event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value,
        description: event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value,
        startDate: event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value,
        userId: userMatch[0].id
      }

      // Create data variable using values from form inputs.
      let categoryName = event.target.parentNode.parentNode.children[1].children[0].children[2].children[1].value

      // Create a post axios request to send new project information to the database.
      axios.post('/api/projects', projectData)
        .then(({ data: payload }) => {
          addCategoryId(categoryName, payload.project)
          return payload.project
        })
        .then(project => console.log(project))
        .catch(err => console.log(err))
      
    })
    .catch(err => console.log(err))

})