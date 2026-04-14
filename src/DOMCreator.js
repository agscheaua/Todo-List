import {compareAsc, format} from "date-fns";
export {createSideBar};
export {eventSideBar};

const createSideBar = function() { 
  const button1 = document.createElement("button");
  button1.textContent = "create project";
  
  return {button1};
};

function eventSideBar() {
  (createSideBar.button1).addEventListener("click", () => {
    console.log("hello");
  })
}