
import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {projectsContainer} from"./projectsCreator.js"

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  giveBoardTitle();
  writeInTodoContainer();
  displayTodo();
  editTodoFunc();
};
 
//show the todo modal with all the inputs that can be writen for the todo item
//variable editOpen is made to check from what button the todo modal was open so 
//that the functionality of the events will not get intertwine;

let editOpen;
function showModalTodo() { 
  getStaticElements.projectBoardContainer.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("addTodo")) {
      getStaticElements.modalTodo.showModal();
      editOpen = false;
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

    if (editOpen === true) {
      return;
    }
    else {
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
      console.log(editOpen);
    };
  });
};

// function to display the todos that are linked to the project selected

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

// function to create the structure of the todo and returns its elements

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

// function to edit the todos and submit the changes, i chose to place it here so that
// the event will fire before the one one that subit NEW todos and to stop it from 
// propagation;

function editTodoFunc() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    eve.preventDefault();
    if (eve.target.classList.contains("editTodo")) {

      const parentTodoContainer = eve.target.parentElement.parentElement.classList[1];

      const titleChild = document.querySelector(`.${parentTodoContainer}` + " .todoTitleBoard");
      const descriptionChild = document.querySelector(`.${parentTodoContainer}` + " .todoDescriptionBoard");
      const startDateChild = document.querySelector(`.${parentTodoContainer}` + " .startDateBoard");
      const endDateChild = document.querySelector(`.${parentTodoContainer}` + " .endDateBoard");
      
      getStaticElements.todoTitleInput.value = titleChild.textContent;
      getStaticElements.todoDescriptionInput.value = descriptionChild.textContent;
      getStaticElements.startTodo.value = startDateChild.textContent;
      getStaticElements.endTodo.value = endDateChild.textContent;

      getStaticElements.modalTodo.showModal();

      editOpen = true;

       getStaticElements.todoModalControl.addEventListener("click", (eve) => {
        if (eve.target.classList.contains("submitTodo") &&
        editOpen === true) {

          titleChild.textContent = getStaticElements.todoTitleInput.value;
          descriptionChild.textContent = getStaticElements.todoDescriptionInput.value;
          startDateChild.textContent = getStaticElements.startTodo.value;
          endDateChild.textContent = getStaticElements.endTodo.value;

          const currentProjObjName = getStaticElements.projectTitle.textContent;
          
          projectsContainer[currentProjObjName][parentTodoContainer].task =  titleChild.textContent;
          projectsContainer[currentProjObjName][parentTodoContainer].description = descriptionChild.textContent;
          projectsContainer[currentProjObjName][parentTodoContainer].startDate = startDateChild.textContent;
          projectsContainer[currentProjObjName][parentTodoContainer].endDate = endDateChild.textContent;


          console.log(titleChild, descriptionChild, startDateChild, endDateChild);
        }
    else {};
  });

    }
    else{};
  });
};

