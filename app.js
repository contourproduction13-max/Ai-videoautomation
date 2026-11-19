
let selectedFormat = "Shorts";

const niche = document.getElementById("niche");
const customNiche = document.getElementById("customNiche");
const topic = document.getElementById("topic");
const generateBtn = document.getElementById("generateBtn");
const projectsArea = document.getElementById("projects");

let projects = [];

try {
  projects = JSON.parse(localStorage.getItem("aivideo_projects")) || [];
} catch (error) {
  projects = [];
}

function saveProjects() {
  localStorage.setItem("aivideo_projects", JSON.stringify(projects));
}

function updateStats() {
  document.getElementById("projectCount").textContent =
    projects.length;

  document.getElementById("videoCount").textContent =
    projects.length;
}

function renderProjects() {
  if (projects.length === 0) {
    projectsArea.innerHTML = `
      <div class="empty">
        <div class="empty-icon">▤</div>
        <p>No projects yet</p>
        <small>Your generated video plans will appear here.</small>
      </div>
    `;
    updateStats();
    return;
  }

  projectsArea.innerHTML = projects.map((project, index) => `
    <div class="project-item">
      <h3>${escapeHTML(project.topic)}</h3>
      <p>
        ${escapeHTML(project.niche)} ·
        ${escapeHTML(project.format)}
      </p>
      <p>Created: ${escapeHTML(project.date)}</p>
      <button onclick="viewProject(${index})"
        style="margin-top:12px;padding:9px 14px;border:0;
        border-radius:7px;background:#9c82ff;color:#111;">
        View project
      </button>
      <button onclick="deleteProject(${index})"
        style="margin-top:12px;margin-left:6px;padding:9px 14px;
        border:1px solid #45465b;border-radius:7px;
        background:transparent;color:white;">
        Delete
      </button>
    </div>
  `).join("");

  updateStats();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

document.querySelectorAll(".format").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".format").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedFormat = button.dataset.format;
  });
});

generateBtn.addEventListener("click", () => {
  const selectedNiche = customNiche.value.trim() ||
    niche.value;

  const selectedTopic = topic.value.trim();

  if (!selectedTopic) {
    alert("Please enter a video topic first.");
    topic.focus();
    return;
  }

  const project = {
    id: Date.now(),
    niche: selectedNiche,
    topic: selectedTopic,
    format: selectedFormat,
    date: new Date().toLocaleDateString(),
    status: "Draft"
  };

  projects.unshift(project);
  saveProjects();
  renderProjects();

  topic.value = "";
  customNiche.value = "";

  alert("Your video project has been created!");
});

function viewProject(index) {
  const project = projects[index];

  alert(
    "VIDEO PROJECT\n\n" +
    "Topic: " + project.topic + "\n" +
    "Niche: " + project.niche + "\n" +
    "Format: " + project.format + "\n" +
    "Status: " + project.status +
    "\n\nAI production engine coming next!"
  );
}

function deleteProject(index) {
  if (confirm("Delete this project?")) {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
  }
}

renderProjects();
