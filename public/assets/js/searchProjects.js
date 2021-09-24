const projectCards = document.getElementById('projectCardDB');
const searchBar = document.getElementById('searchBar');
let projectCavas = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredProjects = hpCharacters.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchString) ||
      project.progress.toLowerCase().includes(searchString) ||
      project.comments.toLowerCase().includes(searchString) ||
      project.date.toLowerCase().includes(searchString) 
    );
  });
  displayProjects(filteredProjects);
});

const loadProjects = async () => {
  try {
    const res = await fetch('/api/projects');
    projectCanvas = await res.json();
    displayProjects(projectCanvas);
  } catch (err) {
    console.error(err);
  }
};

const displayProjects = (projects) => {
  const htmlString = projects 
    .map((project) => {
      return `
          <div class="results">
        `;
    })
    .join('');
  projectsList.innerHTML = htmlString;
};

loadProjects();