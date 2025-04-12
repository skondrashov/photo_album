import data from "/data.js";

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

  if (window.location.pathname === "/") {
    elements.description.innerHTML =
      "Select a subject from the navigation pane!";
    return;
  }

  const id = window.location.pathname.substring(1);
  const subject = data[id];
  console.log("window.location.pathname", window.location.pathname);
  console.log("subject", subject);
  if (!subject) {
    navigate("/");
    return;
  }

  elements.description.innerHTML = subject.description;

  elements.images.innerHTML = "";
  for (const src of subject.images) {
    const element = document.createElement("img");
    element.setAttribute("src", `img/${src}`);
    elements.images.appendChild(element);
  }
};

const navigate = (url) => {
  history.pushState({}, "", url);
  init();
};

init();
