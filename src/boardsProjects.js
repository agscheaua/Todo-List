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
  changeClassNameTodoEle()
  changePropNameTodoObj();
  deleteProject();
  changeClassNameProjButton();
  updateTheObjInLocalStorage();
  deleteProjAndObjFromLocStor();
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
    
    if (eve.target.nodeName === "BUTTON") {
      const currentObj = JSON.parse(localStorage.getItem(eve.target.textContent));
      if (currentObj) {
        let currentTodoNr = currentObj.todoNr - 1;

        for (let i = 0; i < (currentObj.todoNr); i++) {
    
          const currentTodo = currentObj["todo"+i];

          const createStructure = createTodoContainer();

          createStructure.todoContainer.classList.add("todo"+i);
          createStructure.todoTitleBoard.textContent = currentTodo.task;
          createStructure.todoDescriptionBoard.textContent = currentTodo.description;
          createStructure.startDateBoard.textContent = currentTodo.startDate;
          createStructure.endDateBoard.textContent = currentTodo.endDate;         
        };  
      }
      else {};
    }
    else {};
  });
};

// function to dynamicaly create the todo container when we press submit

function writeInTodoContainer() {
  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    eve.preventDefault();

    const currentObjName = getStaticElements.projectTitle.textContent; 

    if (editOpen === true) {
      return;
    }
    else if ( !(JSON.parse(localStorage.getItem(currentObjName) ) ) ) {
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

      const objStoredInLocStor = JSON.stringify(projectsContainer[currentObjName]);
      localStorage.setItem(currentObjName, objStoredInLocStor);
    }
    else if ( (JSON.parse(localStorage.getItem(currentObjName) ) ) ) {
      const currentObjNameSavedInLocStor = JSON.parse(localStorage.getItem(currentObjName));  
      Object.assign(projectsContainer[currentObjName], currentObjNameSavedInLocStor);
      console.log(projectsContainer[currentObjName]);
      
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
      
      const objStoredInLocStor = JSON.stringify(projectsContainer[currentObjName]);
      localStorage.setItem(currentObjName, objStoredInLocStor);    
    }
    else {};

    getStaticElements.modalTodo.close();

    console.log(projectsContainer[currentObjName]);
  });
};

// function to create the structure of the todo and returns its elements;

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
      const getEditedObj = getStaticElements.projectTitle.textContent;

      const getTodoEdited = document.querySelector(`.${currentEditedTodo}`);

      const titleChild = document.querySelector(`.${currentEditedTodo}` + " .todoTitleBoard");
      const descriptionChild = document.querySelector(`.${currentEditedTodo}` + " .todoDescriptionBoard");
      const startDateChild = document.querySelector(`.${currentEditedTodo}` + " .startDateBoard");
      const endDateChild = document.querySelector(`.${currentEditedTodo}` + " .endDateBoard");

      titleChild.textContent = getStaticElements.todoTitleInput.value;
      descriptionChild.textContent = getStaticElements.todoDescriptionInput.value;
      startDateChild.textContent = getStaticElements.startTodo.value;
      endDateChild.textContent = getStaticElements.endTodo.value;

      const currentObjNameSavedInLocStor = JSON.parse(localStorage.getItem(getEditedObj));  
      Object.assign(projectsContainer[getEditedObj], currentObjNameSavedInLocStor);
      
      let getEditedTodoInObj = projectsContainer[getEditedObj][currentEditedTodo];

      getEditedTodoInObj.task = titleChild.textContent;
      getEditedTodoInObj.description = descriptionChild.textContent;
      getEditedTodoInObj.startDate = startDateChild.textContent;
      getEditedTodoInObj.endDate = endDateChild.textContent;

      console.log(projectsContainer[getEditedObj]);

      const objStoredInLocStor = JSON.stringify(projectsContainer[getEditedObj]);
      localStorage.setItem(getEditedObj, objStoredInLocStor); 

      getStaticElements.modalTodo.close();
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
      
      delete projectsContainer[getCurrentlyObjName][parentElementTodo.classList[1]];
      parentElementTodo.remove();

      projectsContainer[getCurrentlyObjName].todoNr -= 1;

      console.log(projectsContainer[getCurrentlyObjName]); 
    }
    else{};
  });
};

// change the class name of all the elements remaining after one its deleted;

function changeClassNameTodoEle() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("deleteTodo")) {
      const getAllTodos = document.querySelectorAll(".todoContainer");
      
      for (let i = 0; i < getAllTodos.length; i++) {
        getAllTodos[i].classList.replace(`${getAllTodos[i].classList[1]}`, "todo"+i);
      };
    }
    else {};
    
  });
};


// change property names of the objects after each todo deletion;

function changePropNameTodoObj() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("deleteTodo")) {
      const parentElementTodo = eve.target.parentElement.parentElement;
      const getCurrentlyObjName = getStaticElements.projectTitle.textContent;

      const TodoNrExistingIndex = (projectsContainer[getCurrentlyObjName].todoNr) - 1;

      const containerTodos = [];

      const getAllKeysInObj = Object.keys(projectsContainer[getCurrentlyObjName]); 
        getAllKeysInObj.forEach( (item) => {
          if (Object.hasOwn(projectsContainer[getCurrentlyObjName][item], "task")) {
            containerTodos.push(item);
          }
          else {};
        });

      const temporaryObjTodosContainer = {};

      if (containerTodos.length === 0) {}
      else if (containerTodos.length !== 0) {
        for (let i = 0; i < containerTodos.length; i++) {
          temporaryObjTodosContainer["todo" + i] = projectsContainer[getCurrentlyObjName][containerTodos[i]];
        }
      }
      else {};

      for (let i = 0; i < containerTodos.length; i++) {
        delete projectsContainer[getCurrentlyObjName][containerTodos[i]];
        projectsContainer[getCurrentlyObjName].todoNr = 0;
      };

      for (let i = 0; i < containerTodos.length; i++) {
        projectsContainer[getCurrentlyObjName]["todo"+i] = temporaryObjTodosContainer["todo"+i];
        projectsContainer[getCurrentlyObjName].todoNr = containerTodos.length;
      };

      console.log(projectsContainer);
    }
    else {};
  });
};

// after a todo is deleted update the object in the local storage;

function updateTheObjInLocalStorage() {
  getStaticElements.projectBoard.addEventListener("click", (eve) => {
    if (eve.target.classList.contains("deleteTodo")) { 
      const currentObjUpdated = projectsContainer[getStaticElements.projectTitle.textContent];
      const getCurrentlyObjName = getStaticElements.projectTitle.textContent;

      const objStoredInLocStor = JSON.stringify(currentObjUpdated);
      localStorage.setItem(getCurrentlyObjName, objStoredInLocStor); 
    }
    else {};
  });
};

function deleteProject() {
  getStaticElements.deleteProject.addEventListener("click", (eve) => {
    const projectName = getStaticElements.projectTitle.textContent;

    const getAllProjButtons = document.querySelectorAll(".projButton");

    for (const elem of getAllProjButtons) {
      if (elem.textContent === projectName) {
        elem.remove();
        delete projectsContainer[elem.textContent];
      }
      else {};
    };

    const getAllTodoContainer = document.querySelectorAll(".todoContainer");

    for (const elem of getAllTodoContainer) {
      elem.remove();
    };

    getStaticElements.projectBoard.classList.remove("open");
    getStaticElements.projectBoard.classList.add("closed");

    getStaticElements.projectTitle.textContent = "";
  });
};

// rename the first class name of the proj buttons after one of them is deleted;

function changeClassNameProjButton() {
  getStaticElements.deleteProject.addEventListener("click", (eve) => {
    const getAllProjButtons = document.querySelectorAll(".projButton");
    
    for (let i = 0; i < getAllProjButtons.length; i++) {
      getAllProjButtons[i].classList.replace(`${getAllProjButtons[i].classList[0]}`, "projectButton" + i);
    };
  });
};

// delete the obj and obj button from the local storage;

function deleteProjAndObjFromLocStor() {
  getStaticElements.deleteProject.addEventListener("click", (eve) => {
    const projectName = getStaticElements.projectTitle.textContent;
    
    const getAllProjButtons = document.querySelectorAll(".projButton");
    console.log(getAllProjButtons);
  
    for (let elem of getAllProjButtons) {
      if (elem.textContent === projectName) {
        localStorage.removeItem(elem.classList[0]);
      }
      else {
        console.log("noo");
      };
    };
  });
};