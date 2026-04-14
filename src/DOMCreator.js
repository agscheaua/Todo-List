import {compareAsc, format} from "date-fns";
export {createSideBar};

function createSideBar() { 
  const button1 = document.createElement("button");
  button1.textContent = "create project";
  document.body.appendChild(button1);
}