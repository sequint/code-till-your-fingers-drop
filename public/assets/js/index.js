// Function to update progress bar.
const updateProgressBar = projectId => {

  axios.get(`/api/tasks/${projectId}`)
  .then(({ data: payload }) => {

    // Create array of tasks filter to which ones are complete.
    let completeTasks = payload.task.filter(tsk => tsk.isComplete === true)
    // Create numberator and denominator based on task lengths.
    let numerator = completeTasks.length
    let denominator = payload.task.length

    let percentComplete = (numerator / denominator) * 100

    axios.put(`/api/projects/${projectId}`, {
      percentComplete: percentComplete
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

  })
  .catch(err => console.log(err))

}
