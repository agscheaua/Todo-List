import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createProject};
export {projectsContainer};

// object that contains all the object dynamically created;

const projectsContainer = (function() {
  return {};
}) ();

// class to create instances of ProjectCreator

class ProjectsCreator {
  constructor(projectName) {
    this.projectName = projectName;
  }
  #todoNr = 0;
  createTodo() {
    this[`todo` + `${this.#todoNr}`] = new TodosCreator;
    this.#todoNr++;
  }
};

class TodosCreator {
  constructor(){}
  task;
  description; 
  startDate;
  endDate;
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
    else{
      console.log("no child"); 
    };
  });
};