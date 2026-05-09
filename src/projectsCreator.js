import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {createTodoContainer} from "./boardsProjects.js";

export {createProject};
export {projectsContainer};
export {createProjLocStor};
export {initializeObj};
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
// was ever open and control the functionality of the default (dummy project);

function keyIndicator() {
  if (localStorage.getItem("firstTimeOpened")) {    
    localStorage.setItem("firstTimeOpened", false); 

    const getAllProjButtons = document.querySelectorAll(".projButton");
    
    for (let i = 0; i < getAllProjButtons.length; i++) {
      getAllProjButtons[i].classList.replace(`${getAllProjButtons[i].classList[0]}`, "projectButton" + i);
    };
  
    if (localStorage.getItem("Default Project"))  {
      localStorage.removeItem("Default Project");
    }
    else {};
  }
  else {
    localStorage.setItem("firstTimeOpened", true);

    createDummyProject();
    createObjForDummyProj();
    createTodoDummyProj();
    displayDummyTodo();
  };
};

// creates a dummy project when we open the page for the first time; 

function createDummyProject() {
  if ( (localStorage.getItem("firstTimeOpened")) === "true") {
    const projectButton = document.createElement("button");
    projectButton.classList.add("projectButton" + 0, "projButton", "hidden");
    getStaticElements.projectsContainer.appendChild(projectButton);
    projectButton.textContent = "Default Project";
  }
  else {};
};

// create a obj with the name of the dummy project inside projectsContainer

function createObjForDummyProj() {
  const project = new ProjectsCreator(document.querySelector(".projectButton0").textContent);
  projectsContainer[document.querySelector(".projectButton0").textContent] = project;
};

// create todos for the dummy project when you load the webpage forthe first time;

function createTodoDummyProj() {
  const dummyProj = projectsContainer[document.querySelector(".projectButton0").textContent];
  dummyProj.createTodo();

  dummyProj.todo0.task = "Dummy Text";
  dummyProj.todo0.description = "This text will disappear when you will reload the page";
  dummyProj.todo0.startDate = "Only this time";
  dummyProj.todo0.endDate = "Ends when you refresh the page";
};

// create a todo to display the dummyTods created;

function displayDummyTodo() {
  const dummyProj = projectsContainer[document.querySelector(".projectButton0").textContent];
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    if (eve.target.textContent === "Default Project") {

      const createStructure = createTodoContainer();

      console.log(dummyProj.todo0);

      createStructure.todoContainer.classList.add("todo0");
      createStructure.todoTitleBoard.textContent = dummyProj.todo0.task;
      createStructure.todoDescriptionBoard.textContent = dummyProj.todo0.description;
      createStructure.startDateBoard.textContent = dummyProj.todo0.startDate;
      createStructure.endDateBoard.textContent = dummyProj.todo0.endDate; 
    }
    else {};
  });
};