// On add comment click, post to the server and display.
document.addEventListener('click', event => {

  if (event.target.classList.contains('addComment')) {

    // Define variables based on user input.
    let content = event.target.parentNode.parentNode.children[1].children[0].children[0].children[1].value
    let projectId = JSON.parse(localStorage.getItem('trackProject'))
    console.log(projectId)
    console.log(content)
    
    // Post comment to database with the project id and use passport to post with user's id.
    axios.post('api/comments', {
      content: content,
      projectId: projectId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: payload }) => {
        // Create comment variable to hold the object.
        let comment = payload.comment

        axios.get(`/api/users/${comment.commentorId}`)
          .then(({ data: payload }) => {
            // Assign user data a variable.
            let user = payload.user[0]

            // Append comment to the page.
            let commentCard = document.createElement('div')
            commentCard.className = 'card'
            commentCard.innerHTML = `
            <div class="card-body">
              <h6 class="card-title">${user.username}</h6>
              <p class="card-text">${comment.content}</p>
            </div>
            `
            document.getElementById('comments').append(commentCard)
          })

        document.getElementById('userComment').value = ''

      })

  }

})

document.getElementById('logOutBtn').addEventListener('click', event => {

  window.location.href = './auth.html'

})

// Delete a project from user tracked projects.
document.addEventListener('click', event => {
  if (event.target.classList.contains('removeProject')) {
    
    // Get track id from local storage
    let id = JSON.parse(localStorage.getItem('trackId'))

    axios.delete(`/api/tracks/${id}`)
      .then(() => {
        window.location.href = './trackProjects.html'
      })
      .catch(err => console.log(err))
  }
})

// Load all project content to the page
const loadProjectContent = _ => {
  // Grab project id clicked on from local storage and store into a variable.
  let projectId = JSON.parse(localStorage.getItem('trackProject'))

  // Get project with the id.
  axios.get(`/api/projects/searchProjectId/${projectId}`)
    .then(({ data: payload }) => {
      // Set project variable.
      let project = payload.project[0]

      document.getElementById('myProTitle').textContent = project.projectName

      axios.get('/api/categories')
        .then(({ data: payload }) => {

          let matchedCategory = payload.categories.filter(category => category.id === project.categoryId)

          document.getElementById('indTrackCategory').textContent = matchedCategory[0].title

        })
        .catch(err => console.log(err))

      document.getElementById('description').textContent = project.description
      document.getElementById('startDate').textContent = `Start Date: ${project.startDate}`
      
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
          // Loop through tasks array and append each task to the page.
          tasks.forEach(task => {
            
            let taskItem = document.createElement('li')
            taskItem.className = 'm-1'
            taskItem.textContent = task.taskDescription
            
            // Append new task to the task list.
            document.getElementById('tasksLi').append(taskItem)

          })
        })
        .catch(err => console.log(err))

      axios.get(`/api/comments/${projectId}`)
        .then(({ data: payload }) => {
          // Set returned array to a comments variable.
          let comments = payload.comment

          // Append comments to the page.
          comments.forEach(comment => {
            
            axios.get(`/api/users/${comment.commentorId}`)
              .then(({ data: payload }) => {
                // Assign user data a variable.
                let user = payload.user[0]

                // Append comment to the page.
                let commentCard = document.createElement('div')
                commentCard.className = 'card'
                commentCard.innerHTML = `
            <div class="card-body">
              <h6 class="card-title">${user.username}</h6>
              <p class="card-text">${comment.content}</p>
            </div>
            `
                document.getElementById('comments').append(commentCard)
              })

          })

        })
        .catch(err => console.log(err))

    })

}

loadProjectContent()
