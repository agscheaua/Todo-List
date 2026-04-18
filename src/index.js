import "./styles.css";
import {ProjectsCreator} from "./projectsCreator.js";
import {createWebpage} from "./DOMCreator.js";
import {getStaticElements} from "./DOMCreator.js";

const project1 = new ProjectsCreator("Project1");

project1.createTodo();
project1.createTodo();
console.log(project1); 
