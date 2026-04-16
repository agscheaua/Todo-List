import {compareAsc, format} from "date-fns";
export {createProject};

function createProject() {
  createModal();
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
      inputSpaceText = inputSpace.value;
      console.log(inputSpaceText);
      modalContainer.close();
    };
  }); 

  const cancelModal = document.querySelector(".cancelModal");
  cancelModal.addEventListener("click", (eve) => {
    eve.preventDefault();
    modalContainer.close();
  }); 

  let inputSpaceText;

  return {
    inputSpaceText
  };
}

let test1 = createModal();
console.log(test1.inputSpaceText);

function createOneProject() {
  const submitModal = document.querySelector(".submitModal");
  submitModal.addEventListener("click", (eve) => {
    eve.preventDefault();
  });
};