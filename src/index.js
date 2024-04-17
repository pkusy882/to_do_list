import '/src/style.css';
import ToDoListItem from './toDoLists';
import {dialogBoxAddListitem, ModalRefresh } from './createDOMObjects';


const TDL = (function(){

    //dom related searches
    //main Sections
    const TDLcontainer = document.querySelector(".TDLcontainer");
    const topBar = document.querySelector(".topBar");
    const mainContent = document.querySelector(".checkList");
    //Dialog items
    //btns
    const createNewProjectBtn = document.querySelector(".addNewProject");
    const addItemToListBtn = document.querySelector(".addTask");
    const addNewProject = document.querySelector(".addSection");
    const createNewWorkSectionBtn = document.querySelector(".addNewWorkSection")
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
    createNewProjectBtn.addEventListener("click", ()=>{
        newListArr = [];
        ModalRefresh(dropDownselector,secArr,ProjListCont);
        addWorkDialog.showModal();
    })

    addItemToListBtn.addEventListener("click",()=>{
        dialogListAdd();
    });

    addNewProject.addEventListener("click",()=>{
        TestArr.push(ToDoListItem(projectNameInput.value,dropDownselector.value,newListArr,[false,false,false],"26/03/2025",secArr));
        _render();
    });

    createNewWorkSectionBtn.addEventListener("click",()=>{
        alert("hi");
    })

    //renders the page
    _render();

    function _render(){
        //cleans all items in the sidebar
        TDLcontainer.innerHTML = "";
        mainContent.innerHTML = "";
        //adding the sidebar to DOM/ mainsection choice
        for (let secChoice=0;secChoice<secArr.length;secChoice++){
            TDLcontainer.appendChild(addSection(secArr[secChoice],TestArr,true,mainContent))
        };
    };


    //creates the section for the sidebar
    function addSection(secChoice,toDoArr,isSideBar,mainContent){
        let section = document.createElement("div");
        section.innerHTML = secChoice;
        //loop to add each project to this element
        for (let projChoice = 0; projChoice<toDoArr.length;projChoice++){
            //checks to see if item should be in that section
            if (toDoArr[projChoice].workSection == secChoice){
                section.appendChild(addProject(projChoice,isSideBar,toDoArr,mainContent))
            };
        };
        return section;
    };

    //creates the Project element
    function addProject(projChoice,isSideBar,toDoArr,mainContent){

        let delBtn = document.createElement("button");
        delBtn.addEventListener("click",()=>{  
            isSideBar = false;   
            Project.remove();
            toDoArr.splice(projChoice,1);
            _render();
        });
        delBtn.innerHTML = "Delete"

        let Project = document.createElement("div");
        Project.innerHTML = toDoArr[projChoice].ProjectName;
        //check to see if it is an element on the side bar so it can attach a click event to it
        if (isSideBar == true){
            //event that when something on the sidebar is clicked it will render it on the main section
            Project.addEventListener("click",function(){       
                mainContent.innerHTML = "";
                //calls itself with the isSideBar set to false
                mainContent.appendChild(addProject(projChoice,false,toDoArr,mainContent));
            });
        };
        //loop to add the list Items to the element
        for (let listItem=0; listItem<toDoArr[projChoice].toDoItems.length;listItem++){
            Project.appendChild(addList(toDoArr,projChoice,listItem,isSideBar));
        };
        Project.append(delBtn);


    

        return Project
    };
            
    //function responsible for creating the list elements
    function addList(toDoArr,projChoice,listItem,isSideBar){
        let list = document.createElement("div");
        list.innerHTML = toDoArr[projChoice].toDoItems[listItem];
        //checks if its np sidebar so it can add other necessary components
        if (isSideBar==false){
            let check = document.createElement("input");
            check.setAttribute("type","checkbox");
            // console.log(toDoArr[projChoice].toDoItems[listItem]);
            // console.log(toDoArr[projChoice].toDoItems);
            if (toDoArr[projChoice].compleated[listItem] == true){
                check.checked = true;
            };
            //adds event to save when a task has been compleated or not
            check.onchange = function(){
                toDoArr[projChoice].compleated[listItem] = check.checked;
            }
            list.appendChild(check);
        };
    
        return list;
    };



    function dialogListAdd(){
        newListArr.push(TaskInput.value)
        console.log(newListArr);
        dialogBoxAddListitem(TaskInput.value,ProjListCont)
        TaskInput.value = "";
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