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
  displayProjectBoard();
  showModalTodo();
  createTodoInBoard();
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
  const modalTodo = document.querySelector(".modalTodo");
  const submitTodo = document.querySelector(".submitTodo");
  const cancelTodo = document.querySelector(".cancelTodo");
  const todoTitleInput = document.querySelector("#todoTitleInput");
  const todoDescriptionInput = document.querySelector("#todoDescriptionInput");
  const startTodo = document.querySelector("#startTodo");
  const endTodo = document.querySelector("#endTodo");
  const priorityTodoInput = document.querySelector("#priorityTodoInput");
  const todoModalControl = document.querySelector(".todoModalControl");

  return {createButton, modalContainer, inputSpace,
    submitModal, cancelModal, sideBar, projectsContainer,
    projectBoardContainer, modalTodo, submitTodo,
    cancelTodo, todoTitleInput, todoDescriptionInput,
    startTodo, endTodo, priorityTodoInput, todoModalControl};
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
    if (eve.target.classList.contains("hasBoard") || eve.target.nodeName !== "BUTTON") {
      console.log("SOMETHING IS WRONG");
    }
    else if (!(eve.target.classList.contains("hasBoard")) && eve.target.nodeName === "BUTTON") {
      eve.target.classList.add("hasBoard");

      const projectBoard = document.createElement("div");
      getStaticElements.projectBoardContainer.appendChild(projectBoard);
      projectBoard.classList.add(`board${eve.target.textContent}`, "projectBoard", "closed");
     
      const projectBoardTitle = document.createElement("div");
      projectBoard.appendChild(projectBoardTitle);
      projectBoardTitle.classList.add(`projectBoardTitle${eve.target.textContent}`);
      projectBoardTitle.textContent = eve.target.textContent;

      const addTodoToBoard = document.createElement("button");
      projectBoard.appendChild(addTodoToBoard);
      addTodoToBoard.classList.add(`addTodo${eve.target.textContent}`, `addTodoButton`);
      addTodoToBoard.textContent = "Add a todo";
    }
    else {
      console.log("SOMETHING IS WRONG");
    }; 
  });
};

// function that handles the logic of the board for each project button, to display
// it or hide it;

function displayProjectBoard() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    const getAllProjectBoards = document.querySelectorAll(".projectBoard");
    const dynamicProjectBoard = document.querySelector(`.board` +`${eve.target.textContent}`);
    
    if (eve.target.classList.contains("hasBoard") &&
      eve.target.nodeName === "BUTTON" &&
      dynamicProjectBoard.classList.contains("closed")) {

      dynamicProjectBoard.classList.remove("closed");
      dynamicProjectBoard.classList.add("open");
      closeAllBoards();
    }
    else if (eve.target.classList.contains("hasBoard") &&
      eve.target.nodeName === "BUTTON" &&
      dynamicProjectBoard.classList.contains("open")) {

      dynamicProjectBoard.classList.remove("open");
      dynamicProjectBoard.classList.add("closed");
      closeAllBoards();
    }
    else {
    };
    console.log(getAllProjectBoards);

    function closeAllBoards() {
      getAllProjectBoards.forEach( (elem) => {
        if (elem === dynamicProjectBoard) {
          console.log("no");
        }
        else {
          elem.classList.remove("open");
          elem.classList.add("closed");
        };
      });
    };
  });
};

//show the modal with all the inputs that can be writen for the todo item 

function showModalTodo() { 
  getStaticElements.projectBoardContainer.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("addTodoButton")) {
      getStaticElements.modalTodo.showModal();

      const getAllInputs = document.querySelectorAll(".todoInput");
      getStaticElements.priorityTodoInput.selectedIndex = 0;

      for (const elem of getAllInputs) {
        elem.value = "";
      };
    }
    else {};
  });

  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    if (getStaticElements.todoTitleInput.value === "") {}
    else {
      getStaticElements.modalTodo.close();
    };
  });

  getStaticElements.cancelTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    getStaticElements.modalTodo.close();
  });
};

// function to dynamicaly create the todo container when we press submit

function createTodoInBoard() {
  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    
    const projectBoard = document.querySelector(".open");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");
    projectBoard.appendChild(todoContainer);

      const todoTitleBoard = document.createElement("div");
      todoTitleBoard.classList.add("todoTitleBoard");
      todoContainer.appendChild(todoTitleBoard); 
      todoTitleBoard.textContent = getStaticElements.todoTitleInput.value;

      const todoDescriptionBoard = document.createElement("div");
      todoDescriptionBoard.classList.add("todoDescriptionBoard");
      todoContainer.appendChild(todoDescriptionBoard);
      todoDescriptionBoard.textContent = getStaticElements.todoDescriptionInput.value;

      const todoTimeBoard = document.createElement("div");
      todoTimeBoard.classList.add("todoTimeBoard");
      todoContainer.appendChild(todoTimeBoard);

        const startDateBoard = document.createElement("span");
        startDateBoard.classList.add("startDateBoard");
        todoTimeBoard.appendChild(startDateBoard);
        if (getStaticElements.startTodo.value === "") {
          startDateBoard.textContent = "";
        }
        else {
          startDateBoard.textContent = "Start: " + getStaticElements.startTodo.value;
        };

        const endDateBoard = document.createElement("span");
        endDateBoard.classList.add("endDateBoard");
        todoTimeBoard.appendChild(endDateBoard);
        if (getStaticElements.endTodo.value === "") {
          endDateBoard.textContent = "";
        }
        else {
          endDateBoard.textContent = "End: " + getStaticElements.endTodo.value;
        };

      const priorityBoard = document.createElement("div");
      priorityBoard.classList.add("priorityBoard");
      todoContainer.appendChild(priorityBoard);
      if (getStaticElements.priorityTodoInput.options[getStaticElements.priorityTodoInput.selectedIndex].text === "Priority level") {
        priorityBoard.textContent = "";
      }
      else {
        priorityBoard.textContent = getStaticElements.priorityTodoInput.options[getStaticElements.priorityTodoInput.selectedIndex].text;
      };
      
      const todoControlButtons = document.createElement("div");
      todoControlButtons.classList.add("todoControlButtons");
      todoContainer.appendChild(todoControlButtons);

        const editTodo = document.createElement("button");
        editTodo.classList.add("editTodo");
        todoControlButtons.appendChild(editTodo);
        editTodo.textContent = "Edit todo";

        const deleteTodo = document.createElement("button");
        deleteTodo.classList.add("deleteTodo");
        todoControlButtons.appendChild(deleteTodo);
        deleteTodo.textContent = "Delete todo";

        const doneUndoneTodo = document.createElement("button");
        doneUndoneTodo.classList.add("doneUndoneTodo");
        todoControlButtons.appendChild(doneUndoneTodo);
        doneUndoneTodo.textContent = "Done"; 
  });
};



createWebpage(); 