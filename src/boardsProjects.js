
import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {projectsContainer} from"./projectsCreator.js"

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  giveBoardTitle();
  writeInTodoContainer();
  displayTodo();
  openEditModal();
  submitEditsTodo();
  deleteTodoFunc();
  reAssignTodoNamesOBJ();
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

      getStaticElements.modalTodo.close();

      console.log(projectsContainer[currentObjName]);
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

// function to open the modal and edit the content of the specific todo that you 
// have press the edit button in;

let currentEditedTodo;

function openEditModal() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    eve.preventDefault();
    if (eve.target.classList.contains("editTodo")) {
      const parentTodoContainer = eve.target.parentElement.parentElement.classList[1];

      currentEditedTodo = parentTodoContainer;

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
    }
    else{};
  });
};

// check to see if the edit button was pressed and submit the changes to the displayed
// todo;

function submitEditsTodo() {
  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    if (editOpen === true) {
      const getTodoEdited = document.querySelector(`.${currentEditedTodo}`);

      const titleChild = document.querySelector(`.${currentEditedTodo}` + " .todoTitleBoard");
      const descriptionChild = document.querySelector(`.${currentEditedTodo}` + " .todoDescriptionBoard");
      const startDateChild = document.querySelector(`.${currentEditedTodo}` + " .startDateBoard");
      const endDateChild = document.querySelector(`.${currentEditedTodo}` + " .endDateBoard");

      titleChild.textContent = getStaticElements.todoTitleInput.value;
      descriptionChild.textContent = getStaticElements.todoDescriptionInput.value;
      startDateChild.textContent = getStaticElements.startTodo.value;
      endDateChild.textContent = getStaticElements.endTodo.value;

      const getEditedObj = getStaticElements.projectTitle.textContent;

      const getEditedTodoInObj = projectsContainer[getEditedObj][currentEditedTodo];
      getEditedTodoInObj.task = titleChild.textContent
      getEditedTodoInObj.description = descriptionChild.textContent;
      getEditedTodoInObj.startDate = startDateChild.textContent;
      getEditedTodoInObj.endDate = endDateChild.textContent;

      console.log(projectsContainer[getEditedObj]);
    }
    else {};
  });
};

// deletes a todo from the DOM and from the object;

function deleteTodoFunc() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    eve.preventDefault();

    if (eve.target.classList.contains("deleteTodo")) {
      const parentElementTodo = eve.target.parentElement.parentElement;
      const getCurrentlyObjName = getStaticElements.projectTitle.textContent;

      parentElementTodo.remove();
      delete projectsContainer[getCurrentlyObjName][parentElementTodo.classList[1]];

      projectsContainer[getCurrentlyObjName]["todoNr"] -= 1;

      console.log(projectsContainer);
    }
    else{};
  });
};

// reassign the class name to the DOM elements and property names to the objects;

function reAssignTodoNamesOBJ() {
getStaticElements.projectBoard.addEventListener("click", (eve) => {
  if (eve.target.classList.contains("deleteTodo")) {
    const parentElementTodo = eve.target.parentElement.parentElement;
    const getCurrentlyObjName = getStaticElements.projectTitle.textContent;

    const initialTodoNrExisting = (projectsContainer[getCurrentlyObjName].todoNr) - 1;
    console.log(initialTodoNrExisting);

    const containerTodos = [];

    const getAllKeysInObj = Object.keys(projectsContainer[getCurrentlyObjName]); 
    getAllKeysInObj.forEach( (item) => {
      if (Object.hasOwn(projectsContainer[getCurrentlyObjName][item], "task")) {
        containerTodos.push(item);
      }
      else {};
    });
    console.log(containerTodos);
    console.log(projectsContainer[getCurrentlyObjName][containerTodos[0]]);

    for (let i = 0; i <= containerTodos.length - 1; i++) {
      projectsContainer[getCurrentlyObjName]["todo" + `${i}`] = projectsContainer[getCurrentlyObjName][containerTodos[`${i}`]];
      delete projectsContainer[getCurrentlyObjName][containerTodos[`${i}`]];
    };
    console.log(projectsContainer);
    
    /*if (nrOfdeletedTodo === initialTodoNr) {
        for (let i = 0; i <= initialTodoNrExisting; i++) {
          projectsContainer[getCurrentlyObj]["todo" + `${nrOfdeletedTodo}`] = projectsContainer[getCurrentlyObj]["todo" + `${i}`]
          delete projectsContainer[getCurrentlyObj]["todo" + `${i}`];
          nrOfdeletedTodo++
          console.log("del one")
        };
    }
    else {
      console.log("something wrong")
    };*/

  }
  else {};
});
  




      /*
      if (nrOfdeletedTodo === initialTodoNr) {
        console.log("lest elem deleted");
      }
      else if (nrOfdeletedTodo !== initialTodoNr) { 
        for (let i = nrOfdeletedTodo+1; i <= initialTodoNr; i++) {
          projectsContainer[getCurrentlyObj]["todo" + `${nrOfdeletedTodo}`] = projectsContainer[getCurrentlyObj]["todo" + `${i}`]
          delete projectsContainer[getCurrentlyObj]["todo" + `${i}`];
          nrOfdeletedTodo++
          console.log("del one")
        };
      }
      else {
        console.log("something wrong")
      };

      const initialTodoNr = (projectsContainer[getCurrentlyObj].todoNr) -1 ;

      const deletedTodoObj = projectsContainer[getCurrentlyObj][parentElementTodo.classList[1]];
      console.log(deletedTodoObj);
      
      let deletedTodoNr; //deletedTodoObj.slice(-1);

      let nrOfdeletedTodo = deletedTodoNr;

      if (nrOfdeletedTodo === initialTodoNr) {
        console.log("lest elem deleted");
      }
      else if (nrOfdeletedTodo !== initialTodoNr) { 
        for (let i = nrOfdeletedTodo+1; i <= initialTodoNr; i++) {
          projectsContainer[getCurrentlyObj]["todo" + `${nrOfdeletedTodo}`] = projectsContainer[getCurrentlyObj]["todo" + `${i}`]
          delete projectsContainer[getCurrentlyObj]["todo" + `${i}`];
          nrOfdeletedTodo++
          console.log("del one")
        };
      }
      else {
        console.log("something wrong")
      };   */
};