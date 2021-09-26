
// Function to update progress bar.
const updateProgressBar = projectId => {

  axios.get(`/api/tasks/${projectId}`)
  .then(({ data: payload }) => {
    console.log(payload.task)
  })
  .catch(err => console.log(err))

      // Create array of tasks filter to which ones are complete.
      let completeTasks = task.filter(tsk => tsk.isComplete === true)
      // Create numberator and denominator based on task lengths.
      let numerator = completeTasks.length()
      let denominator = task.length()

      let percentComplete = (numerator / denominator) * 100

}
