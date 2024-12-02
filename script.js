let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let clearAllTodoButton = document.getElementById("clearAllTodoButton");

let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
}
clearAllTodoButton.onclick = function(){
  localStorage.removeItem("todoList");
  while(todoItemsContainer.firstChild){
    todoItemsContainer.removeChild(todoItemsContainer.firstChild);
  }
}
function getTodoListFromLocalStorage() {
  let strigifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(strigifiedTodoList);
  if(parsedTodoList === null){
    return [];
  }else{
    return parsedTodoList;
  }
}

addTodoButton.onclick = function(){
    onAddTodo();
}

function onAddTodo(){
    let todosCount = todoList.length;
    todosCount = todosCount + 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if(userInputValue.trim() === ""){
        alert("Enter Valid Text");
        return;
    }
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    }
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" +todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function(){
    onTodoStatusChange(checkboxId, labelId, todoId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);
  if(todo.isChecked === true){
    labelElement.classList.add("checked");
  }

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    onTodoDelete(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}



function onTodoStatusChange(checkboxId, labelId, todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    /* if(checkboxElement.checked === true){
        labelElement.classList.add("checked");
    }else{
        labelElement.classList.remove("checked");
    } */ 
   // (or)
   labelElement.classList.toggle("checked");

   let todoObjectIndex = todoList.findIndex(function(eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }else{
        return false;
      }
   });
   let todoObject = todoList[todoObjectIndex];
   if(todoObject.isChecked === true){
    todoObject.isChecked = false;
   }else{
    todoObject.isChecked = true;
   }
}

function onTodoDelete(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex = todoList.findIndex(function(eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }else{
        return false;
      }
    });
    todoList.splice(deleteIndex,1);
    console.log(todoList);
}
