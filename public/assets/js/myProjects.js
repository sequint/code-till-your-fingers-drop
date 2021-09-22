// Handle create project click.
document.getElementById('createProject').addEventListener('click', event => {
  event.preventDefault()

  let userName = 'Sleepy Neko'

  // Find the matching current user in the user database, and get user information.
  return axios.get(`/api/users`,)
    .then(({ data: payload }) => {
      let users = payload.users
      let userMatch = users.filter(user => user.username === userName)

      return userMatch

    })
    .then(userMatch => console.log(userMatch))
    .catch(err => console.log(err))

  // // Create data variable using values from form inputs.
  // projectName = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value
  // console.log(projectName)

  // description = event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value
  // console.log(description)

  // startDate = event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value
  // console.log(startDate)

  // // Create a post axios request to send new project information to the database.
  // axios.post('/api/projects', {
  //   projectName: projectName,
  //   description: description,
  //   startDate: startDate,
  //   userId: 1
  // })
  //   .then(({data: project}) => {
  //     console.log(`${project.project.projectName} project created!`)
  //   })
  //   .catch(err => console.log(err))

})