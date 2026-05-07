import "./styles.css";

import {getStaticElements} from "./getAllTheStaticElementsDOM.js";
import {createSideBar} from "./sideBarDOM.js";
import {createBoard} from "./boardsProjects.js";
import {createProject} from "./projectsCreator.js"; 
import {createProjLocStor} from "./projectsCreator.js";
import {initializeObj} from "./projectsCreator.js";
import {createDummyProject} from "./projectsCreator.js";
import {keyIndicator} from "./projectsCreator.js";

createSideBar();
createBoard();
createProject();
createProjLocStor();
initializeObj();
keyIndicator();
createDummyProject();