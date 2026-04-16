import {compareAsc, format} from "date-fns";
export {createProject};

function createProject() {
  createModal();
  returnModalText();
};

function createModal() {
  const createButton = document.querySelector(".createButton");
  const modalContainer = document.querySelector(".modalContainer");
  const inputSpace = document.querySelector("#inputSpace");
  
  createButton.addEventListener("click", (eve) => {
    modalContainer.showModal();
    inputSpace.value = "";
  });

  const submitModal = document.querySelector(".submitModal");
  submitModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    if (inputSpace.value === "") {
      console.log("empty");
    }
    else{
      modalContainer.close();
    };
  }); 

  const cancelModal = document.querySelector(".cancelModal");
  cancelModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    modalContainer.close();
  }); 
};

function returnModalText() {
  const inputSpace = document.querySelector("#inputSpace");
  const submitModal = document.querySelector(".submitModal");

  let inputSpaceText;

  submitModal.addEventListener("click", (eve) => {
    inputSpaceText = inputSpace.value;
    localStorage.setItem("inputSpaceText", inputSpaceText);
    console.log(localStorage.getItem("inputSpaceText"));
  });

  
};

const getElements = (function() {
  const createButton = document.querySelector(".createButton");
  const modalContainer = document.querySelector(".modalContainer");
  const inputSpace = document.querySelector("#inputSpace");
  const submitModal = document.querySelector(".submitModal");
  const cancelModal = document.querySelector(".cancelModal");

  return {createButton, modalContainer, inputSpace,
    submitModal, cancelModal};
}) ();


createProject(); 