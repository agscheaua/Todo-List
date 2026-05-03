import {getStaticElements} from "./getAllTheStaticElementsDOM.js";

export {createSideBar};


// the function that runs all the code inside the sideBarDOM.js;

function createSideBar() {
  showModalProject();
  createButtonProject();
  displayProjButtonsLocStor();
  showHideProjectBoard();
};  

// shows the modal where you will input the name of your project; 

function showModalProject() {
  getStaticElements.createButton.addEventListener("click", (eve) => {
    getStaticElements.modalContainer.showModal();
    getStaticElements.inputSpace.value = "";
  }); 

  getStaticElements.cancelModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    getStaticElements.modalContainer.close();
  }); 
};

// creats the buttons for each project and give them a text content;

function createButtonProject() {
  getStaticElements.submitModal.addEventListener("click", (eve) => {
    eve.preventDefault();

    let nameRepeat = false;
    const allProjButtons = document.querySelectorAll(".projButton");
    for (const elem of allProjButtons) {
      if (elem.textContent === getStaticElements.inputSpace.value) {
        nameRepeat = true;
      }
      else{};
    }

    if (getStaticElements.inputSpace.value === "" || !(nameRepeat === false)) {
      console.log("empty input or the name is alredy used");
    } 
    else {
      const projectButton = document.createElement("button");
      projectButton.classList.add("projectButton" + allProjButtons.length, "projButton", "hidden");
      getStaticElements.projectsContainer.appendChild(projectButton);
      projectButton.textContent = getStaticElements.inputSpace.value;

      localStorage.setItem("projectButton" + allProjButtons.length, projectButton.textContent);
    };

    getStaticElements.modalContainer.close();
  });
};

// check to see if any proj buttons are saved in the localStorage and display them;

function displayProjButtonsLocStor() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem("projectButton"+i)) {

      const projectButton = document.createElement("button");
      projectButton.classList.add("projectButton" + i, "projButton", "hidden");
      getStaticElements.projectsContainer.appendChild(projectButton);
      projectButton.textContent = localStorage.getItem("projectButton"+i);
    }
    else{};
  };
};

// hide or show the board of each project button when you press click on it;

function showHideProjectBoard() {
  getStaticElements.projectsContainer.addEventListener("click", (eve) => {
    const allButtonsProj = document.querySelectorAll(".projButton");
    const currentButtonProj = eve.target;

    function hideAllButtons() {
      for (const elem of allButtonsProj) {
        if (elem === currentButtonProj) {}
        else {
          elem.classList.add("hidden");
          elem.classList.remove("show");
        };
      };
    };

    if (eve.target.nodeName === "BUTTON" &&
      eve.target.classList.contains("hidden")
    ) {
      eve.target.classList.add("show");
      eve.target.classList.remove("hidden")
      getStaticElements.projectBoard.classList.add("open");
      getStaticElements.projectBoard.classList.remove("closed");
      hideAllButtons();
    }
    else if (eve.target.nodeName === "BUTTON" &&
      eve.target.classList.contains("show")
    ) {
      eve.target.classList.add("hidden");
      eve.target.classList.remove("show");
      getStaticElements.projectBoard.classList.add("closed");
      getStaticElements.projectBoard.classList.remove("open");   
      hideAllButtons();
    }
    else{};
  });
};
