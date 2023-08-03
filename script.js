const inputBox = document.getElementById('add-task-textbox');
const todoListContainer = document.getElementById('todo-list');
const taskCountDisplaySpan = document.getElementById('task-count');
const completedtaskCount = document.getElementById('completed-task-count');
const clearAllTasks = document.getElementById('clear-tasks');
const emptyListDisplay = document.getElementById('empty-list');

let zeroTask = 0;
completedtaskCount.innerHTML = zeroTask; // initially setting up completed task as 0 before completing/adding any tasks to the list.

// addTask() function triggers when a user clicks on the "Add Task" button, add that todo task to the list.
function addTask() {

    
    var timestamp = Date.now()/1000;  
    //current timestamp  
    var datetime = new Date(timestamp * 1000); 

    // Empty inputBox check
    if(inputBox.value === '') {
        alert("Kindly enter a TODO task..!")
    }else{         
        const div = document.createElement("div");
        div.classList.add('li-div');
        todoListContainer.appendChild(div);
        
        
        let li = document.createElement("li"); // Creating a new 'li' tag for new list item
        li.innerHTML = inputBox.value; // inserting inputBox value to new list item
        todoListContainer.appendChild(li); // appending it into list container
        
        let delTaskIcon = document.createElement("span"); // Creating a new span for delete icon
        let delIcon = "\u00d7"; // '\u00d7' is a unicode for '×', here used as Delete Icon
        delTaskIcon.innerHTML = delIcon;
        li.appendChild(delTaskIcon); // appending it into the list item

        div.appendChild(li);

        // time of task created
        let taskTime = document.createElement('h6');
        taskTime.innerHTML = datetime.toLocaleDateString();
        div.appendChild(taskTime);
    }

    // Inserting the count of total number of tasks which are available inside TODO list container. Using 'split' func to segregate list items.
    taskCountDisplaySpan.innerHTML = todoListContainer.textContent.split('delIcon').length - 1;

    
    inputBox.value = ""; // Emptying input textbox once adding of task is completed
    inputBox.focus(); // Moving the focus of the cursor back to the input textbox
    
    saveData(); // calling saveData() function to save the TODO list container items to local storage
}


// Event listener to check/uncheck an task and to remove an task from local storage
todoListContainer.addEventListener("click", (e) => {
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked"); // when clicked on <li>, toggling 'checked' class
        saveData(); // saving TODO list container items to localstorage after check/uncheck toggle
    } 
    else if(e.target.tagName == "SPAN") {
        e.target.closest("div").remove();   // when clicked on <span> of li, removing it's list items div permanently.
        saveData(); // saving TODO list container items to localstorage after removing the task
    }
}, false);


// Event listener to clear the data from local storage
clearAllTasks.addEventListener('click', (e) => {
    localStorage.clear();
    completedtaskCount.innerHTML = zeroTask;
    showList();
}, false);


function saveData() {
    // saving the TODO list container items to local storage as "data", to be able to access the added tasks even after page refresh
    localStorage.setItem("data", todoListContainer.innerHTML);
    showList();
}


function showList() {

    // handling of tasks that are completed when we have data stored in localStorage
    if(localStorage.length != 0) {
        let dataString = localStorage.getItem("data");
        let competedTaskCount = dataString.split("checked").length - 1;
        completedtaskCount.innerHTML = competedTaskCount;
    }

    // getting the data from localstorage and inserting it into TODO list container
    todoListContainer.innerHTML = localStorage.getItem("data");

    // Taking the count of total number of tasks which are available inside TODO list container. Using 'split' func to segregate list items.
    let taskCount = todoListContainer.textContent.split('\u00d7').length - 1;

    // If no task found displaying an text to notify users
    if(taskCount === 0) {
        emptyListDisplay.innerHTML = "No tasks added yet..!";
    }else{
        emptyListDisplay.innerHTML = "";
    }

    // Inserting total task count and completed task count to the HTML
    taskCountDisplaySpan.innerHTML = taskCount;
    
}


showList();



