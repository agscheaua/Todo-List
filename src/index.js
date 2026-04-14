import "./styles.css";
import {ProjectsCreator} from "./projectsCreator.js";
import {createSideBar} from "./DOMCreator.js";

const project1 = new ProjectsCreator("Project1");

project1.createTodo();
project1.createTodo();
console.log(project1);

 createSideBar();