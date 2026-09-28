// Default sample data
const DEFAULT_DATA = {
  fullName: "Sarah Chen",
  title: "Product Designer",
  email: "sarah.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "Results-driven Product Designer with 5+ years of experience creating user-centered digital experiences. Skilled in UI/UX design, prototyping, and cross-functional collaboration. Passionate about solving complex problems and delivering delightful user experiences.",
  education: [
    {
      school: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      year: "2018"
    }
  ],
  experience: [
    {
      title: "Senior Product Designer",
      company: "TechCorp Inc",
      start: "2021",
      end: "Present",
      description: "Led design of 3 major product features impacting 500K+ users. Established design systems and accessibility standards for the entire organization."
    },
    {
      title: "UX Designer",
      company: "Creative Studio LLC",
      start: "2019",
      end: "2021",
      description: "Designed mobile and web interfaces for fintech products. Conducted user research and usability testing to inform design decisions."
    }
  ],
  skills: "UI Design, Prototyping, Figma, User Research, Wireframing, Information Architecture, Design Systems, Accessibility (WCAG)",
  certifications: [
    {
      name: "Certified UX Designer",
      org: "Nielsen Norman Group",
      date: "2022"
    }
  ],
  languages: "English (Native), Mandarin Chinese (Fluent), Spanish (Intermediate)",
  template: "classic"
};

// Get DOM elements
const landingPage = document.getElementById("landing");
const builderPage = document.getElementById("builder");
const createCVBtn = document.getElementById("createCVBtn");
const downloadBtn = document.getElementById("downloadBtn");
const downloadBtnSmall = document.getElementById("downloadBtnSmall");
const startOverBtn = document.getElementById("startOverBtn");
const previewDiv = document.getElementById("preview");

// Form inputs
const fullNameInput = document.getElementById("fullName");
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const summaryInput = document.getElementById("summary");
const skillsInput = document.getElementById("skills");
const languagesInput = document.getElementById("languages");

// Container elements
const educationContainer = document.getElementById("educationContainer");
const experienceContainer = document.getElementById("experienceContainer");
const certificationContainer = document.getElementById("certificationContainer");

// Buttons
const addEducationBtn = document.getElementById("addEducationBtn");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addCertificationBtn = document.getElementById("addCertificationBtn");

// Template selector
const templateRadios = document.querySelectorAll('input[name="template"]');

// State management
let cvData = {};

// Initialize app
function init() {
  loadDataFromStorage();
  if (cvData && cvData.fullName) {
    showBuilder();
  } else {
    cvData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  renderPreview();
  attachEventListeners();
}

// Load data from localStorage
function loadDataFromStorage() {
  const stored = localStorage.getItem("cvData");
  if (stored) {
    try {
      cvData = JSON.parse(stored);
    } catch (e) {
      cvData = {};
    }
  }
}

// Save data to localStorage
function saveDataToStorage() {
  localStorage.setItem("cvData", JSON.stringify(cvData));
}

// Attach event listeners
function attachEventListeners() {
  // Navigation
  createCVBtn.addEventListener("click", showBuilder);
  downloadBtn.addEventListener("click", downloadPDF);
  downloadBtnSmall.addEventListener("click", downloadPDF);
  startOverBtn.addEventListener("click", startOver);

  // Form inputs
  fullNameInput.addEventListener("input", updateData);
  titleInput.addEventListener("input", updateData);
  emailInput.addEventListener("input", updateData);
  phoneInput.addEventListener("input", updateData);
  locationInput.addEventListener("input", updateData);
  summaryInput.addEventListener("input", updateData);
  skillsInput.addEventListener("input", updateData);
  languagesInput.addEventListener("input", updateData);

  // Template selection
  templateRadios.forEach(radio => {
    radio.addEventListener("change", handleTemplateChange);
  });

  // Add more buttons
  addEducationBtn.addEventListener("click", addEducation);
  addExperienceBtn.addEventListener("click", addExperience);
  addCertificationBtn.addEventListener("click", addCertification);

  // Load initial values
  populateForm();
}

// Update CV data from form inputs
function updateData(e) {
  const field = e.target.id;
  const value = e.target.value;

  if (field === "fullName") cvData.fullName = value;
  else if (field === "title") cvData.title = value;
  else if (field === "email") cvData.email = value;
  else if (field === "phone") cvData.phone = value;
  else if (field === "location") cvData.location = value;
  else if (field === "summary") cvData.summary = value;
  else if (field === "skills") cvData.skills = value;
  else if (field === "languages") cvData.languages = value;

  saveDataToStorage();
  renderPreview();
}

// Populate form with current data
function populateForm() {
  fullNameInput.value = cvData.fullName || "";
  titleInput.value = cvData.title || "";
  emailInput.value = cvData.email || "";
  phoneInput.value = cvData.phone || "";
  locationInput.value = cvData.location || "";
  summaryInput.value = cvData.summary || "";
  skillsInput.value = cvData.skills || "";
  languagesInput.value = cvData.languages || "";

  // Populate education
  if (cvData.education && cvData.education.length > 0) {
    educationContainer.innerHTML = "";
    cvData.education.forEach((edu, index) => {
      addEducationField(index, edu);
    });
  }

  // Populate experience
  if (cvData.experience && cvData.experience.length > 0) {
    experienceContainer.innerHTML = "";
    cvData.experience.forEach((exp, index) => {
      addExperienceField(index, exp);
    });
  }

  // Populate certifications
  if (cvData.certifications && cvData.certifications.length > 0) {
    certificationContainer.innerHTML = "";
    cvData.certifications.forEach((cert, index) => {
      addCertificationField(index, cert);
    });
  }

  // Set template
  const template = cvData.template || "classic";
  document.querySelector(`input[value="${template}"]`).checked = true;
  updateTemplateUI();
}

// Add education entry
function addEducation() {
  if (!cvData.education) cvData.education = [];
  cvData.education.push({
    school: "",
    degree: "",
    field: "",
    year: ""
  });
  addEducationField(cvData.education.length - 1, cvData.education[cvData.education.length - 1]);
  saveDataToStorage();
}

// Add education field to form
function addEducationField(index, data) {
  const div = document.createElement("div");
  div.className = "education-item";
  div.innerHTML = `
    <button class="remove-btn" type="button" data-index="${index}">×</button>
    <div class="form-row">
      <div class="form-group">
        <label>School/University</label>
        <input type="text" class="education-school" placeholder="University of Technology" value="${data.school || ""}">
      </div>
      <div class="form-group">
        <label>Degree</label>
        <input type="text" class="education-degree" placeholder="Bachelor of Science" value="${data.degree || ""}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Field of Study</label>
        <input type="text" class="education-field" placeholder="Computer Science" value="${data.field || ""}">
      </div>
      <div class="form-group">
        <label>Graduation Year</label>
        <input type="text" class="education-year" placeholder="2022" value="${data.year || ""}">
      </div>
    </div>
  `;

  const inputs = div.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", (e) => {
      if (e.target.classList.contains("education-school")) cvData.education[index].school = e.target.value;
      else if (e.target.classList.contains("education-degree")) cvData.education[index].degree = e.target.value;
      else if (e.target.classList.contains("education-field")) cvData.education[index].field = e.target.value;
      else if (e.target.classList.contains("education-year")) cvData.education[index].year = e.target.value;
      saveDataToStorage();
      renderPreview();
    });
  });

  const removeBtn = div.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    cvData.education.splice(index, 1);
    div.remove();
    saveDataToStorage();
    renderPreview();
  });

  educationContainer.appendChild(div);
}

// Add experience entry
function addExperience() {
  if (!cvData.experience) cvData.experience = [];
  cvData.experience.push({
    title: "",
    company: "",
    start: "",
    end: "",
    description: ""
  });
  addExperienceField(cvData.experience.length - 1, cvData.experience[cvData.experience.length - 1]);
  saveDataToStorage();
}

// Add experience field to form
function addExperienceField(index, data) {
  const div = document.createElement("div");
  div.className = "experience-item";
  div.innerHTML = `
    <button class="remove-btn" type="button" data-index="${index}">×</button>
    <div class="form-group">
      <label>Job Title</label>
      <input type="text" class="experience-title" placeholder="Senior Product Designer" value="${data.title || ""}">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" class="experience-company" placeholder="TechCorp Inc" value="${data.company || ""}">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Year</label>
        <input type="text" class="experience-start" placeholder="2021" value="${data.start || ""}">
      </div>
      <div class="form-group">
        <label>End Year (or "Present")</label>
        <input type="text" class="experience-end" placeholder="Present" value="${data.end || ""}">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="experience-description" placeholder="Describe your key responsibilities and achievements..." rows="3">${data.description || ""}</textarea>
    </div>
  `;

  const inputs = div.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", (e) => {
      if (e.target.classList.contains("experience-title")) cvData.experience[index].title = e.target.value;
      else if (e.target.classList.contains("experience-company")) cvData.experience[index].company = e.target.value;
      else if (e.target.classList.contains("experience-start")) cvData.experience[index].start = e.target.value;
      else if (e.target.classList.contains("experience-end")) cvData.experience[index].end = e.target.value;
      else if (e.target.classList.contains("experience-description")) cvData.experience[index].description = e.target.value;
      saveDataToStorage();
      renderPreview();
    });
  });

  const removeBtn = div.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    cvData.experience.splice(index, 1);
    div.remove();
    saveDataToStorage();
    renderPreview();
  });

  experienceContainer.appendChild(div);
}

// Add certification entry
function addCertification() {
  if (!cvData.certifications) cvData.certifications = [];
  cvData.certifications.push({
    name: "",
    org: "",
    date: ""
  });
  addCertificationField(cvData.certifications.length - 1, cvData.certifications[cvData.certifications.length - 1]);
  saveDataToStorage();
}

// Add certification field to form
function addCertificationField(index, data) {
  const div = document.createElement("div");
  div.className = "certification-item";
  div.innerHTML = `
    <button class="remove-btn" type="button" data-index="${index}">×</button>
    <div class="form-row">
      <div class="form-group">
        <label>Certification Name</label>
        <input type="text" class="certification-name" placeholder="Certified UX Designer" value="${data.name || ""}">
      </div>
      <div class="form-group">
        <label>Issuing Organization</label>
        <input type="text" class="certification-org" placeholder="Nielsen Norman Group" value="${data.org || ""}">
      </div>
    </div>
    <div class="form-group">
      <label>Date Issued</label>
      <input type="text" class="certification-date" placeholder="2023" value="${data.date || ""}">
    </div>
  `;

  const inputs = div.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", (e) => {
      if (e.target.classList.contains("certification-name")) cvData.certifications[index].name = e.target.value;
      else if (e.target.classList.contains("certification-org")) cvData.certifications[index].org = e.target.value;
      else if (e.target.classList.contains("certification-date")) cvData.certifications[index].date = e.target.value;
      saveDataToStorage();
      renderPreview();
    });
  });

  const removeBtn = div.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    cvData.certifications.splice(index, 1);
    div.remove();
    saveDataToStorage();
    renderPreview();
  });

  certificationContainer.appendChild(div);
}

// Handle template change
function handleTemplateChange(e) {
  cvData.template = e.target.value;
  updateTemplateUI();
  saveDataToStorage();
  renderPreview();
}

// Update template UI
function updateTemplateUI() {
  const labels = document.querySelectorAll(".template-option");
  labels.forEach(label => {
    label.classList.remove("active");
    const radio = label.querySelector("input[type='radio']");
    if (radio && radio.checked) {
      label.classList.add("active");
    }
  });
}

// Render CV preview
function renderPreview() {
  const template = cvData.template || "classic";
  let html = "";

  if (template === "classic") {
    html = renderClassicTemplate();
  } else if (template === "modern") {
    html = renderModernTemplate();
  } else if (template === "minimal") {
    html = renderMinimalTemplate();
  }

  previewDiv.innerHTML = html;
}

// Render classic template
function renderClassicTemplate() {
  return `
    <div class="cv-document cv-template-classic">
      <div class="cv-header">
        <div class="cv-name">${cvData.fullName || "Your Name"}</div>
        <div class="cv-title">${cvData.title || "Professional Title"}</div>
        <div class="cv-contact">
          ${cvData.email ? `<span class="cv-contact-item">${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item">${cvData.phone}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item">${cvData.location}</span>` : ""}
        </div>
      </div>

      ${cvData.summary ? `
        <div class="cv-section">
          <div class="cv-section-title">Professional Summary</div>
          <div class="cv-summary">${cvData.summary}</div>
        </div>
      ` : ""}

      ${cvData.experience && cvData.experience.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Work Experience</div>
          ${cvData.experience.map(exp => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${exp.title || "Job Title"}</span>
                <span class="cv-entry-meta">${exp.start || "2020"} – ${exp.end || "Present"}</span>
              </div>
              <div class="cv-entry-subtitle">${exp.company || "Company"}</div>
              <div class="cv-entry-description">${exp.description || ""}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.education && cvData.education.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Education</div>
          ${cvData.education.map(edu => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${edu.school || "School/University"}</span>
                <span class="cv-entry-meta">${edu.year || "2020"}</span>
              </div>
              <div class="cv-entry-subtitle">${edu.degree || "Degree"} in ${edu.field || "Field"}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.skills ? `
        <div class="cv-section">
          <div class="cv-section-title">Skills</div>
          <div class="cv-skills">
            ${cvData.skills.split(",").map(skill => `
              <span class="cv-skill-item">${skill.trim()}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${cvData.certifications && cvData.certifications.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Certifications</div>
          ${cvData.certifications.map(cert => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${cert.name || "Certification"}</span>
                <span class="cv-entry-meta">${cert.date || "2023"}</span>
              </div>
              <div class="cv-entry-subtitle">${cert.org || "Organization"}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.languages ? `
        <div class="cv-section">
          <div class="cv-section-title">Languages</div>
          <div class="cv-skills">
            ${cvData.languages.split(",").map(lang => `
              <span class="cv-skill-item">${lang.trim()}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

// Render modern template
function renderModernTemplate() {
  return `
    <div class="cv-document cv-template-modern">
      <div class="cv-header">
        <div class="cv-name">${cvData.fullName || "Your Name"}</div>
        <div class="cv-title">${cvData.title || "Professional Title"}</div>
        <div class="cv-contact">
          ${cvData.email ? `<span class="cv-contact-item">${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item">${cvData.phone}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item">${cvData.location}</span>` : ""}
        </div>
      </div>

      <div style="padding: 0 1.25rem;">
        ${cvData.summary ? `
          <div class="cv-section">
            <div class="cv-section-title">Professional Summary</div>
            <div class="cv-summary">${cvData.summary}</div>
          </div>
        ` : ""}

        ${cvData.experience && cvData.experience.length > 0 ? `
          <div class="cv-section">
            <div class="cv-section-title">Work Experience</div>
            ${cvData.experience.map(exp => `
              <div class="cv-entry">
                <div class="cv-entry-header">
                  <span class="cv-entry-title">${exp.title || "Job Title"}</span>
                  <span class="cv-entry-meta">${exp.start || "2020"} – ${exp.end || "Present"}</span>
                </div>
                <div class="cv-entry-subtitle">${exp.company || "Company"}</div>
                <div class="cv-entry-description">${exp.description || ""}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        ${cvData.education && cvData.education.length > 0 ? `
          <div class="cv-section">
            <div class="cv-section-title">Education</div>
            ${cvData.education.map(edu => `
              <div class="cv-entry">
                <div class="cv-entry-header">
                  <span class="cv-entry-title">${edu.school || "School/University"}</span>
                  <span class="cv-entry-meta">${edu.year || "2020"}</span>
                </div>
                <div class="cv-entry-subtitle">${edu.degree || "Degree"} in ${edu.field || "Field"}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        ${cvData.skills ? `
          <div class="cv-section">
            <div class="cv-section-title">Skills</div>
            <div class="cv-skills">
              ${cvData.skills.split(",").map(skill => `
                <span class="cv-skill-item">${skill.trim()}</span>
              `).join("")}
            </div>
          </div>
        ` : ""}

        ${cvData.certifications && cvData.certifications.length > 0 ? `
          <div class="cv-section">
            <div class="cv-section-title">Certifications</div>
            ${cvData.certifications.map(cert => `
              <div class="cv-entry">
                <div class="cv-entry-header">
                  <span class="cv-entry-title">${cert.name || "Certification"}</span>
                  <span class="cv-entry-meta">${cert.date || "2023"}</span>
                </div>
                <div class="cv-entry-subtitle">${cert.org || "Organization"}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        ${cvData.languages ? `
          <div class="cv-section">
            <div class="cv-section-title">Languages</div>
            <div class="cv-skills">
              ${cvData.languages.split(",").map(lang => `
                <span class="cv-skill-item">${lang.trim()}</span>
              `).join("")}
            </div>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

// Render minimal template
function renderMinimalTemplate() {
  return `
    <div class="cv-document cv-template-minimal">
      <div class="cv-header">
        <div class="cv-name">${cvData.fullName || "Your Name"}</div>
        <div class="cv-title">${cvData.title || "Professional Title"}</div>
        <div class="cv-contact">
          ${cvData.email ? `<span class="cv-contact-item">${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item">${cvData.phone}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item">${cvData.location}</span>` : ""}
        </div>
      </div>

      ${cvData.summary ? `
        <div class="cv-section">
          <div class="cv-section-title">Professional Summary</div>
          <div class="cv-summary">${cvData.summary}</div>
        </div>
      ` : ""}

      ${cvData.experience && cvData.experience.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Work Experience</div>
          ${cvData.experience.map(exp => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${exp.title || "Job Title"}</span>
                <span class="cv-entry-meta">${exp.start || "2020"} – ${exp.end || "Present"}</span>
              </div>
              <div class="cv-entry-subtitle">${exp.company || "Company"}</div>
              <div class="cv-entry-description">${exp.description || ""}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.education && cvData.education.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Education</div>
          ${cvData.education.map(edu => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${edu.school || "School/University"}</span>
                <span class="cv-entry-meta">${edu.year || "2020"}</span>
              </div>
              <div class="cv-entry-subtitle">${edu.degree || "Degree"} in ${edu.field || "Field"}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.skills ? `
        <div class="cv-section">
          <div class="cv-section-title">Skills</div>
          <div class="cv-skills">
            ${cvData.skills.split(",").map(skill => `
              <span class="cv-skill-item">${skill.trim()}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${cvData.certifications && cvData.certifications.length > 0 ? `
        <div class="cv-section">
          <div class="cv-section-title">Certifications</div>
          ${cvData.certifications.map(cert => `
            <div class="cv-entry">
              <div class="cv-entry-header">
                <span class="cv-entry-title">${cert.name || "Certification"}</span>
                <span class="cv-entry-meta">${cert.date || "2023"}</span>
              </div>
              <div class="cv-entry-subtitle">${cert.org || "Organization"}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${cvData.languages ? `
        <div class="cv-section">
          <div class="cv-section-title">Languages</div>
          <div class="cv-skills">
            ${cvData.languages.split(",").map(lang => `
              <span class="cv-skill-item">${lang.trim()}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

// Show builder page
function showBuilder() {
  landingPage.classList.add("hidden");
  builderPage.classList.remove("hidden");
  window.scrollTo(0, 0);
}

// Start over
function startOver() {
  if (confirm("Are you sure you want to start over? This will clear all your data.")) {
    localStorage.removeItem("cvData");
    cvData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    populateForm();
    renderPreview();
  }
}

// Download PDF
function downloadPDF() {
  const name = cvData.fullName || "CV";
  const filename = `${name.replace(/\s+/g, "_")}_CV.pdf`;

  const opt = {
    margin: 10,
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  // Check if html2pdf library is available
  if (typeof html2pdf === "undefined") {
    // Fallback: Use browser's print functionality
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(previewDiv.innerHTML);
    printWindow.document.close();
    printWindow.print();
    return;
  }

  const element = previewDiv.querySelector(".cv-document");
  html2pdf().set(opt).from(element).save();
}

// Load html2pdf library
function loadHtml2Pdf() {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  document.head.appendChild(script);
}

// Initialize app on page load
document.addEventListener("DOMContentLoaded", () => {
  loadHtml2Pdf();
  init();
});
