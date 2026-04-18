import {compareAsc, format} from "date-fns";
export {createWebpage};
export {getStaticElements};
import { ProjectsCreator } from "./projectsCreator.js";


// function that runs all the functions created;

function createWebpage() {
  getStaticElements;
  createModalProject();
  createButtonProject(); 
  createProjectBoard();
  createProjects();
};
 
// gets all the elements created in the html template documnent;

const getStaticElements = (function() {
  const createButton = document.querySelector(".createButton");
  const modalContainer = document.querySelector(".modalContainer");
  const inputSpace = document.querySelector("#inputSpace");
  const submitModal = document.querySelector(".submitModal");
  const cancelModal = document.querySelector(".cancelModal");
  const sideBar = document.querySelector(".sideBar");
  const projectsContainer = document.querySelector(".projectsContainer");
  const projectBoardContainer = document.querySelector(".projectBoardContainer");

  return {createButton, modalContainer, inputSpace,
    submitModal, cancelModal, sideBar, projectsContainer,
    projectBoardContainer,};
}) ();

// modal creation and buttons functionality; 

function createModalProject() {
  getStaticElements.createButton.addEventListener("click", (eve) => {
    getStaticElements.modalContainer.showModal();
    getStaticElements.inputSpace.value = "";
  }); 

  getStaticElements.submitModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    if (getStaticElements.inputSpace.value === "") {}
    else{
      getStaticElements.modalContainer.close();
    };
  }); 

  getStaticElements.cancelModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    getStaticElements.modalContainer.close();
  }); 
};

// creats the buttons for each project and give them a text content;

let projectsNr = 0;
function createButtonProject() {
  getStaticElements.submitModal.addEventListener("click", (eve) => {
    if (getStaticElements.inputSpace.value === "") {
      console.log("empty");
    } 
    else {
      const projectButton = document.createElement("button");
      projectButton.classList.add("projectButton" + projectsNr);
      projectsNr++;
      getStaticElements.projectsContainer.appendChild(projectButton);
      projectButton.textContent = getStaticElements.inputSpace.value;
    };
  });
};

//

function createProjectBoard() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    if (eve.target.classList.containes("hasBoard")) {
      console.log("no");
    }
    else {
    const projectBoard = document.createElement("div");
    projectBoard.textContent = "Project board of" + eve.target.textContent;
    getStaticElements.projectBoardContainer.appendChild(projectBoard);
    eve.target.classList.add("hasBoard");
    };
  });
};




function createProjects() {
  getStaticElements.submitModal.addEventListener("click", () => {
    if (getStaticElements.projectsContainer.lastElementChild) {
      let lastChildElem = getStaticElements.projectsContainer.lastElementChild;
      const project = new ProjectsCreator(lastChildElem.textContent);
      console.log(project);
    }
    else{
      console.log("no child"); 
    }
  });
};



createWebpage(); 