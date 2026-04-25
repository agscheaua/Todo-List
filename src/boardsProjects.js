import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  createTodoInBoard();
  addTodoToBoard();
};
 
//show the todo modal with all the inputs that can be writen for the todo item 

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
  if (document.querySelector(".open")) {    
    const projectBoard = document.querySelector(".open");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer", "todo");
    projectBoard.appendChild(todoContainer);

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
   
      const priorityBoard = document.createElement("div");
      priorityBoard.classList.add("priorityBoard");
      todoContainer.appendChild(priorityBoard);
      
      const todoControlButtons = document.createElement("div");
      todoControlButtons.classList.add("todoControlButtons");
      todoContainer.appendChild(todoControlButtons);

        const editTodo = document.createElement("button");
        editTodo.classList.add("editTodo");
        todoControlButtons.appendChild(editTodo);

        const deleteTodo = document.createElement("button");
        deleteTodo.classList.add("deleteTodo");
        todoControlButtons.appendChild(deleteTodo);

        const doneUndoneTodo = document.createElement("button");
        doneUndoneTodo.classList.add("doneUndoneTodo");
        todoControlButtons.appendChild(doneUndoneTodo);
  }
  else {
    console.log("no board yet");
  };
  
  if (document.querySelector(".open")) {
  return {
    todoContainer, todoTitleBoard, todoDescriptionBoard, todoTimeBoard,
    startDateBoard, endDateBoard, priorityBoard, todoControlButtons,
    editTodo, deleteTodo, doneUndoneTodo,
  };
  }
  else {
    console.log("no return");
  }
};

function addTodoToBoard() {
  getStaticElements.submitTodo.addEventListener("click", (eve) => {
    eve.preventDefault();
    createTodoInBoard();
  });
};