const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
let editIndex = null;


function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message, color = "red") {
    todoAlert.innerText = message;
    todoAlert.style.color = color;
    setTimeout(() => {
        todoAlert.innerText = "";
    }, 2000);
}

function loadTodoItems() {
    listItems.innerHTML = "";
    todo.forEach((element, index) => {
        let li = document.createElement("li");

        const itemClass = element.status ? 'completed' : '';
        const todoItems = `
            <div title="Double Click to Mark Complete" ondblclick="CompletedToDoItems(${index})" class="${itemClass}">
                ${element.item}
            </div>
            <div>
                <img class="edit todo-controls" onclick="UpdateToDoItems(${index})" src="./images/pencil.png"  width="20" />
                <img class="delete todo-controls" onclick="DeleteToDoItems(${index})" src="./images/bin.png" width="20" />
            </div>`;

        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

function CreateToDoItem() {
    const value = todoValue.value.trim();
    if (value === "") {
        setAlertMessage("Please enter your todo text!");
        todoValue.focus();
        return;
    }

    // Check if editing
    if (editIndex !== null) {
        todo[editIndex].item = value;
        editIndex = null;
        setAlertMessage("Item updated successfully!", "green");
    } else {
        // Check for duplicates
        const exists = todo.some(item => item.item === value);
        if (exists) {
            setAlertMessage("This item already exists!");
            return;
        }

        todo.push({ item: value, status: false });
        setAlertMessage("Todo item created successfully!", "green");
    }

    todoValue.value = "";
    setLocalStorage();
    loadTodoItems();
}

function CompletedToDoItems(index) {
    todo[index].status = !todo[index].status;
    setLocalStorage();
    loadTodoItems();
}

function UpdateToDoItems(index) {
    todoValue.value = todo[index].item;
    editIndex = index;
    todoValue.focus();
}

function DeleteToDoItems(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        todo.splice(index, 1);
        setLocalStorage();
        loadTodoItems();
        setAlertMessage("Item deleted.", "green");
    }
}

