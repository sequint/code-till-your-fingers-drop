
// Function that set all data recieved from the user.
const setData = (userMatch, categoryMatch, projectName, description, startDate) => {

  // Create a post axios request to send new project information to the database.
  axios.post('/api/projects', {
    projectName: projectName,
    description: description,
    startDate: startDate,
    categoryId: categoryId,
    userId: userId
  })
    .then(({ data: project }) => {
      console.log(`${project.project.projectName} project created!`)
    })
    .catch(err => console.log(err))

}

// Function that tries to find a title match of user input to categories table.
// If match is not found a new category is created and the function runs again.
// If found, the function sends user and category data to the set data function.
const findCategory = (categoryName, projectData) => {

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
            // Recursivly call findCategory with category title of new category made.
            findCategory(payload.category.title, projectData)
          })
          .catch(err => console.log(err))
      }
      else {
        // Return an array with the match category and user to the next then.
        return categoryMatch
      }

    })
    .then(([ categoryMatch ]) => {
      // Add the matched category's id to the project data object.
      projectData.categoryId = categoryMatch.id
      console.log(projectData)

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

      findCategory(categoryName, projectData)
      
      // // Check if category typed in already exists.
      // axios.get('/api/categories')
      //   .then(({ data: payload }) => {
      //     let categoryMatch = payload.categories.filter(category => category.title === categoryName)
      //     if (!categoryMatch.length) {
      //       // Post new category
      //       axios.post('/api/categories',  {
      //         title: categoryName
      //       })
      //         .then(({ data: payload }) => {
      //           // Return new category created.
      //           let newCategory = payload.category
      //           return [newCategory, userMatch]
      //         })
      //         .catch(err => console.log(err))
            
      //       console.log({newCategory})
            
      //     }
      //     else {
      //       // Return an array with the match category and user to the next then.
      //       return [categoryMatch, userMatch]
      //     }

      //   })
      //   .then(([ categoryMatch, userMatch ]) => {
      //     console.log(categoryMatch)
      //     console.log(userMatch)
      //   })
      //   .catch(err => console.log(err))

      // // Create data variable using values from form inputs.
      // projectName = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value

      // description = event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value

      // startDate = event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value

      // userId = userMatch[0].id

      // // Create a post axios request to send new project information to the database.
      // axios.post('/api/projects', {
      //   projectName: projectName,
      //   description: description,
      //   startDate: startDate,
      //   categoryId: categoryId,
      //   userId: userId
      // })
      //   .then(({ data: project }) => {
      //     console.log(`${project.project.projectName} project created!`)
      //   })
      //   .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})