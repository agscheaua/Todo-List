import { optimize } from "webpack";
import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {projectsContainer} from"./projectsCreator.js"

export {createBoard};


// function that runs all the code inside the boardsProjects;

function createBoard() {
  showModalTodo();
  prepeareBoard();
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


// function to dynamicaly create the todo container when we press submit

/*

   "css-loader": "^7.1.4",
    "date-fns": "^4.1.0",
    "html-loader": "^5.1.0",
    "html-webpack-plugin": "^5.6.6",
    "style-loader": "^4.0.0",
    "webpack": "^5.106.2",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.3",
    "webpack-merge": "^6.0.1"

*/