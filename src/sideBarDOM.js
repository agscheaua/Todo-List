import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createSideBar};


// the function that runs all the code inside the sideBarDOM.js;

function createSideBar() {
  showModalProject();
  createButtonProject();
  createProjectBoard();
  displayProjectBoard();
};

// shows the modal where you will input the name of your project; 

function showModalProject() {
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

// function to create a board that will contain all information about
// the project;

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

// hide or show the board of each project button when you press click on it;

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