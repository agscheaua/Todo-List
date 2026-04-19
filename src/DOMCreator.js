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
  createProject();
  projectsContainer;
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

// object that contains all the object dynamically created;

const projectsContainer = (function() {
  return {};
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
      projectButton.classList.add("projectButton" + projectsNr, "projButton");
      projectsNr++;
      getStaticElements.projectsContainer.appendChild(projectButton);
      projectButton.textContent = getStaticElements.inputSpace.value;
    };
  });
};

// function to create an object for each project button created;

function createProject() {
  getStaticElements.submitModal.addEventListener("click", () => {
    if (getStaticElements.projectsContainer.lastElementChild) {
      const lastChildElem = getStaticElements.projectsContainer.lastElementChild;
      const project = new ProjectsCreator(lastChildElem.textContent);
      projectsContainer[`${lastChildElem.textContent}`] = project;
      projectsContainer[`${lastChildElem.textContent}`].createTodo();
      console.log(projectsContainer);
    }
    else{
      console.log("no child"); 
    };
  });
};

// function to create a board that contains the todos for each project button;

function createProjectBoard() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("hasBoard") || eve.target.nodeName != "BUTTON") {
      console.log("a board alredy exist");
    }
    else {
      eve.target.classList.add("hasBoard");

      const projectBoard = document.createElement("div");
      getStaticElements.projectBoardContainer.appendChild(projectBoard);
      projectBoard.classList.add(`board${eve.target.textContent}`, "projectBoard");
     
      const projectBoardTitle = document.createElement("div");
      projectBoard.appendChild(projectBoardTitle);
      projectBoardTitle.classList.add(`projectBoardTitle${eve.target.textContent}`);
      projectBoardTitle.textContent = eve.target.textContent;

      const addTodoToBoard = document.createElement("button");
      projectBoard.appendChild(addTodoToBoard);
      addTodoToBoard.classList.add(`addTodo${eve.target.textContent}`);
      addTodoToBoard.textContent = "Add a new todo.";
    }; 
  });
};






createWebpage(); 