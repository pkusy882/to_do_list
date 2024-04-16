//creates TDL object
function ToDoListItem(pName, wSection, ToDoList, compleationCheck,compleationDate,secArr){
    const ProjectName = pName;
    const workSection = wSection;
    const toDoItems = ToDoList;
    const compleated = compleationCheck;
    const dueDate = compleationDate;
    let sectionNumber = HowManySections(secArr,workSection);
    return {
        ProjectName,workSection,toDoItems,compleated,dueDate,sectionNumber
    };
}
//creates array of different work sections and assigns each object a  number
function HowManySections(secArr,workSection){      //correlating to the section
    let inList = false;
    let howManySec = secArr.length;
    if (howManySec == 0){
        secArr.push(workSection);
        return 0;
    };
    for (let i=0; i<howManySec;i++){
        if (secArr[i] == workSection){
            inList = true;
            return i;
        };
    };
    if (inList == false){
        secArr.push(workSection);
        return howManySec;
    };
};

export default ToDoListItem;