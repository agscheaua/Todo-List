
import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {projectsContainer} from"./projectsCreator.js"

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  giveBoardTitle();
  writeInTodoContainer();
};
 
//show the todo modal with all the inputs that can be writen for the todo item 

function showModalTodo() { 
  getStaticElements.projectBoardContainer.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("addTodo")) {
      getStaticElements.modalTodo.showModal();
      const getAllInputs = document.querySelectorAll(".todoInput");
      for (const elem of getAllInputs) {
        elem.value = "";
      };
    }
    else {};
  });

  getStaticElements.cancelTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    getStaticElements.modalTodo.close();
  });
};

//give the board title based on with project is currently open;

function giveBoardTitle() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    if (eve.target.nodeName === "BUTTON" &&
      eve.target.classList.contains("show")
    ) {
      getStaticElements.projectTitle.textContent = eve.target.textContent;
    }
    else {
      console.log("something went wrong at giveBoardTitle()");
    };
  });
};

// function to dynamicaly create the todo container when we press submit

function writeInTodoContainer() {
  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    const currentObjName = getStaticElements.projectTitle.textContent;
    projectsContainer[currentObjName].createTodo();
    console.log(projectsContainer[currentObjName]);
    createTodoContainer();
  });
};

const createTodoContainer = function() {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todoContainer");
  getStaticElements.projectBoard.appendChild(todoContainer);

    const todoTitleBoard = document.createElement("div");
    todoTitleBoard.classList.add("todoTitleBoard");
    todoContainer.appendChild(todoTitleBoard);

    const todoDescriptionBoard = document.createElement("div");
    todoDescriptionBoard.classList.add("todoDescriptionBoard");
    todoContainer.appendChild(todoDescriptionBoard);

    const todoTimeBoard = document.createElement("div");
    todoTimeBoard.classList.add("todoTimeBoard");
    todoContainer.appendChild(todoTimeBoard);

      const startDateBoard = document.createElement("span");
      startDateBoard.classList.add("startDateBoard");
      todoTimeBoard.appendChild(startDateBoard);

      const endDateBoard = document.createElement("span");
      endDateBoard.classList.add("endDateBoard");
      todoTimeBoard.appendChild(endDateBoard);
    
    const todoControlButtons = document.createElement("div");
    todoControlButtons.classList.add("todoControlButtons");
    todoContainer.appendChild(todoControlButtons);

      const editTodo = document.createElement("button");
      editTodo.classList.add("editTodo");
      todoControlButtons.appendChild(editTodo);

      const deleteTodo = document.createElement("button");
      deleteTodo.classList.add("deleteTodo");
      todoControlButtons.appendChild(deleteTodo);

  return {
    todoContainer, todoTimeBoard, todoDescriptionBoard, todoTimeBoard, startDateBoard,
    endDateBoard, todoControlButtons, editTodo, deleteTodo,
  };
};