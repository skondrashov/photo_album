import data from "/data.js";

const pathname = window.location.pathname
const BASE_PATH = pathname.slice(0, pathname.lastIndexOf("/")) + '/';

const elements = {};
for (const id of ["home", "navigation", "description", "images"]) {
  elements[id] = document.getElementById(id)
}

const init = () => {
  elements.navigation.innerHTML = "";
  for (const [id, subject] of Object.entries(data)) {
    const element = document.createElement("a");
    element.setAttribute("href", id);
    element.innerHTML = subject.name;
    element.onclick = (event) => {
      event.preventDefault();
      navigate(id);
    };
    elements.navigation.appendChild(element);
  }

  const pathname = window.location.pathname
  if (pathname === BASE_PATH) {
    elements.description.innerHTML =
      "Select a subject from the navigation pane!";
    return;
  }

  const path_parts = pathname.split('/');
  const id = path_parts[path_parts.length - 1];
  const subject = data[id]
  if (!subject) {
    navigate(BASE_PATH, false);
    return;
  }

  elements.description.innerHTML = subject.description;

  elements.images.innerHTML = "";
  for (const src of subject.images) {
    const element = document.createElement("img");
    element.setAttribute("src", `${BASE_PATH}img/${src}`);
    elements.images.appendChild(element);
  }
};

const navigate = (url, shouldInit = true) => {
  history.pushState({}, "", url);
  if (shouldInit) init();
};

init();
