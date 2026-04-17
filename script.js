// Dynamic Project Data
const projects = [
    {
        title: "Auto-Shift Arrangement System",
        description: "A backend system for automated scheduling and shift management.",
        tech: "Python, Data Structures",
        link: "https://github.com/arslanrejepov"
    },
    {
        title: "E-commerce Analytics Tool",
        description: "Data-driven insights for Ozon and TikTok shop optimization.",
        tech: "Pandas, Scikit-Learn",
        link: "#"
    }
];

const projectList = document.getElementById('project-list');

function loadProjects() {
    projects.forEach(proj => {
        const card = `
            <div class="project-card">
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <small>Built with: ${proj.tech}</small>
                <br><br>
                <a href="${proj.link}" style="color: #58a6ff;">View Project →</a>
            </div>
        `;
        projectList.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);
