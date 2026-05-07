import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createProject};
export {projectsContainer};
export {createProjLocStor};
export {initializeObj};
export {createDummyProject};
export {keyIndicator};

// object that contains all the object dynamically created;

const projectsContainer = (function() {
  return {};
}) ();

// class to create instances of ProjectCreator

class ProjectsCreator {
  constructor(projectName) {
    this.projectName = projectName;
  }
  todoNr = 0;
  createTodo() {
    this[`todo` + `${this.todoNr}`] = new TodosCreator;
    this.todoNr++;
  }
};

class TodosCreator {
  constructor(){}
  task;
  description; 
  startDate;
  endDate;
}; 

// create an object for each proj button saved inside the local storage;

function createProjLocStor() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem("projectButton" + i)) {
      const project = new ProjectsCreator(localStorage.getItem("projectButton" + i));
      projectsContainer[localStorage.getItem("projectButton" + i)] = project;
    }
    else {};
  };
  console.log(projectsContainer);
};

// function to create an object for each project button created;

function createProject() {
  getStaticElements.submitModal.addEventListener("click", () => {
    if (getStaticElements.projectsContainer.lastElementChild) {
      const lastChildElem = getStaticElements.projectsContainer.lastElementChild;
      const project = new ProjectsCreator(lastChildElem.textContent);
      projectsContainer[`${lastChildElem.textContent}`] = project;
      console.log(projectsContainer);
    }
    else{};
  });
};

// initialize the obj with their respective values saved in the local storage;

function initializeObj() {
  const getAllProjButtons = document.querySelectorAll(".projButton");
  
  for (let i = 0; i < getAllProjButtons.length; i++) {
    if (localStorage.getItem(getAllProjButtons[i].textContent)) {
      const objSavedInLocalStorage = JSON.parse(localStorage.getItem(getAllProjButtons[i].textContent));

      const objDynamicaliCreated = projectsContainer[getAllProjButtons[i].textContent];
      console.log(objDynamicaliCreated);

      Object.assign(objDynamicaliCreated, objSavedInLocalStorage);
    }
    else {}; 
  };
};

// sets a key in the local storage to idicate if this is the first time the webpage
// was ever open;

function keyIndicator() {
  if (localStorage.getItem("firstTimeOpened")) {
    localStorage.removeItem("firstTimeOpened");
    
    localStorage.setItem("firstTimeOpened", false) 
  }
  else {
    localStorage.setItem("firstTimeOpened", true);
  };
};

// creates a dummy project when we open the page for the first time; 

function createDummyProject() {
  if ( (localStorage.getItem("firstTimeOpened")) === "true") {
    const projectButton = document.createElement("button");
    projectButton.classList.add("projectButton" + 0, "projButton", "hidden");
    getStaticElements.projectsContainer.appendChild(projectButton);
    projectButton.textContent = localStorage.getItem("projectButton"+0);
    projectButton.textContent = "Default Project";
  }
  else {};
}