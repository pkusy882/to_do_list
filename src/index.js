import '/src/style.css';
import ToDoListItem from './toDoLists';
import {addSection, dialogBoxAddListitem, ModalRefresh } from './createDOMObjects';


const TDL = (function(){

    //dom related searches
    //main Sections
    const TDLcontainer = document.querySelector(".TDLcontainer");
    const topBar = document.querySelector(".topBar");
    const mainContent = document.querySelector(".checkList");
    //Dialog items
    //btns
    const addWorkSectionBtn = document.querySelector(".addWorkSection");
    const addItemToListBtn = document.querySelector(".addTask");
    const addProject = document.querySelector(".addSection");
    //elements
    const addWorkDialog = document.querySelector(".addSectionDialog");
    const ProjListCont = document.querySelector(".projectListContainer");
    //Input selectors
    const dropDownselector = document.querySelector(".DropDownSelector");
    const projectNameInput = document.querySelector(".ProjectInput")
    const TaskInput = document.querySelector(".TaskInput")
  


    //setting up arrays for TDL and Sections
    let secArr = [];
    let TestArr = [];
    //array for adding project list
    let newListArr = [];
    //Test Data
    let TestItem1 = ToDoListItem("Create Power Point","work",["Research data","Make Slides", "Put pictures"],[true,false,false],"20/03/2025",secArr);
    TestArr.push(TestItem1);
    let TestItem2 = ToDoListItem("Create Spreadsheet","work",["Research data","input data", "make Graphs"],[true,true,false],"22/03/2025",secArr);
    TestArr.push(TestItem2);
    let TestItem3 = ToDoListItem("knitting","Hobby",["Get more Wool","Knitt Jumper"],[false,false],"30/03/2025",secArr);
    TestArr.push(TestItem3);

    console.log(TestArr);
    console.log(secArr);
    
    //Events
    addWorkSectionBtn.addEventListener("click", ()=>{
        newListArr = [];
        ModalRefresh(dropDownselector,secArr,ProjListCont);
        addWorkDialog.showModal();
    })

    addItemToListBtn.addEventListener("click",()=>{
        dialogListAdd();
    });

    addProject.addEventListener("click",()=>{
        TestArr.push(ToDoListItem(projectNameInput.value,dropDownselector.value,newListArr,[false,false,false],"26/03/2025",secArr));
        _render();
    });

    //renders the page
    _render();

    function _render(){
        //cleans all items in the sidebar
        TDLcontainer.innerHTML = "";
        //adding the sidebar to DOM/ mainsection choice
        for (let secChoice=0;secChoice<secArr.length;secChoice++){
            TDLcontainer.appendChild(addSection(secArr[secChoice],TestArr,true,mainContent))
        };
    };
    function dialogListAdd(){
        newListArr.push(TaskInput.value)
        console.log(newListArr);
        dialogBoxAddListitem(TaskInput.value,ProjListCont)
    };

    function GTA(){
        return console.log(TestArr);
    }

    return{  
        GTA: GTA
    };
})();








// TDL array example setup
//TDL_arr = ["obj1","obj2"....etc]
// obj1 = ["ProjectName","TypeofWork",dueDate,[list of tasks array],[compleated or not array],[each task due date array]]