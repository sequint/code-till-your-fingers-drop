// Handle create project click.
document.getElementById('createProject').addEventListener('click', event => {
  event.preventDefault()
  console.log('in')

  // Create data variable using values from form inputs.
  projectName = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value
  console.log(projectName)

  description = event.target.parentNode.parentNode.children[1].children[0].children[1].children[1].value
  console.log(description)

  startDate = event.target.parentNode.parentNode.children[1].children[0].children[7].children[0].value
  console.log(startDate)

  // Create a post axios request to send new project information to the database.
  axios.post('/api/projects', {
    projectName: projectName,
    description: description,
    startDate: startDate
  })
    .then(({ data: projectName, description, startDate }) => {
      console.log('in then')
      alert(`${projectName} project created!`)
    })
    .catch(err = console.log('in error'))

})