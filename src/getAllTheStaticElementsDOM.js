export {getStaticElements};


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
  const projectBoard = document.querySelector(".projectBoard");
  const projectTitle = document.querySelector(".projectBoard");
  const addTodo = document.querySelector(".addTodo");
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
    projectBoardContainer, projectBoard, projectTitle,
    addTodo, modalTodo, submitTodo, cancelTodo, todoTitleInput,
    todoDescriptionInput, startTodo, endTodo, priorityTodoInput, todoModalControl,
  };
}) ();