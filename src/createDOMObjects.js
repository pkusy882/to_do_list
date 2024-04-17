

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