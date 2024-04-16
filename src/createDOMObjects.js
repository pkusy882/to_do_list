
//creates the section for the sidebar
export function addSection(secChoice,toDoArr,isSideBar,mainContent){
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
    delBtn.addEventListener("click",()=>{        
        Project.remove();
        toDoArr.splice(projChoice,1);
    });
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

//Section for Dialog box dynamicaly changing
export function dialogBoxAddListitem(newListItem,NewListCont){
    let list = document.createElement("li");
    list.innerHTML = newListItem;
    NewListCont.appendChild(list);
}

export function ModalRefresh(selecter,sectionArray,projContList){
    //clears the selectors incase a new one has been added
    selecter.innerHTML = "";
    //adds the options to the selector
    for (let i = 0;i<sectionArray.length;i++){
        let option = document.createElement("option");
        option.innerHTML = sectionArray[i];
        option.value = sectionArray[i];
        selecter.appendChild(option);
    };
    //clears the project tdl if there is one on the dialog
    projContList.innerHTML = "";
};