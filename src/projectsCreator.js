import {compareAsc, format} from "date-fns";
export {ProjectsCreator};
import {getStaticElements} from "./DOMCreator.js";

class ProjectsCreator {
  constructor(projectName) {
    this.projectName = projectName;
  }
  #todoNr = 0;
  createTodo() {
    this[`todo` + `${this.#todoNr}`] = new TodosCreator;
    this.#todoNr++;
  }
};

class TodosCreator {
  constructor(){}
  task;
  description; 
  startDate;
  endDate;
  priority;
}; 
