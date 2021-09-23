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
      // Create data variable using values from form inputs.
      projectName = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value

      description = event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value

      startDate = event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value

      // Create a post axios request to send new project information to the database.
      axios.post('/api/projects', {
        projectName: projectName,
        description: description,
        startDate: startDate,
        userId: userMatch[0].id
      })
        .then(({ data: project }) => {
          console.log(`${project.project.projectName} project created!`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})