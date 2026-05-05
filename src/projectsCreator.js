import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createProject};
export {projectsContainer};
export {createProjLocStor};
export {initializeObj};

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