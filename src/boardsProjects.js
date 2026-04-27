
import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {projectsContainer} from"./projectsCreator.js"

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  giveBoardTitle();
  writeInTodoContainer();
  displayTodo();
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
    
    const currentTodoNr = (projectsContainer[currentObjName].todoNr) - 1;
    
    const currentTodo = projectsContainer[currentObjName]["todo" + currentTodoNr];

    currentTodo.task = getStaticElements.todoTitleInput.value;
    currentTodo.description = getStaticElements.todoDescriptionInput.value;
    currentTodo.startDate = getStaticElements.startTodo.value;
    currentTodo.endDate = getStaticElements.endTodo.value;    

    const createStructure = createTodoContainer();

    createStructure.todoContainer.classList.add("todo"+currentTodoNr);
    createStructure.todoTitleBoard.textContent = currentTodo.task;
    createStructure.todoDescriptionBoard.textContent = currentTodo.description;
    createStructure.startDateBoard.textContent = currentTodo.startDate;
    createStructure.endDateBoard.textContent = currentTodo.endDate; 
  });
};

function displayTodo() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    if (eve.target.nodeName === "BUTTON") {
      const todoContainer = document.querySelectorAll(".todoContainer");
      for (const elem of todoContainer) {
        elem.remove();
      };
    }
    else {};

    let currentObj;
    if (eve.target.nodeName === "BUTTON") {
      currentObj = eve.target.textContent;

      let currentTodoNr = 0;
      for (let i = 0; i < (projectsContainer[currentObj].todoNr); i++) {
    
      const currentTodo = projectsContainer[currentObj]["todo" + currentTodoNr];

      const createStructure = createTodoContainer();

      createStructure.todoContainer.classList.add("todo"+currentTodoNr);
      createStructure.todoTitleBoard.textContent = currentTodo.task;
      createStructure.todoDescriptionBoard.textContent = currentTodo.description;
      createStructure.startDateBoard.textContent = currentTodo.startDate;
      createStructure.endDateBoard.textContent = currentTodo.endDate; 

      currentTodoNr++;
      };
    }
    else {};
  });
};

function createTodoContainer() {
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
      editTodo.textContent = "Edit";
      todoControlButtons.appendChild(editTodo);

      const deleteTodo = document.createElement("button");
      deleteTodo.classList.add("deleteTodo");
      deleteTodo.textContent = "Delete";
      todoControlButtons.appendChild(deleteTodo);

  return {
    todoContainer, todoTimeBoard, todoDescriptionBoard, todoTimeBoard, startDateBoard,
    endDateBoard, todoControlButtons, editTodo, deleteTodo, todoTitleBoard,
  };
};