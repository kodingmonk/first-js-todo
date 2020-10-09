// Defining UI Variables Via Const

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


// Load All Event Listeners

loadEventListeners();

// Load All Event Listeners (Function)

function loadEventListeners (){

    // DOM Event Listener
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task Event
    form.addEventListener('submit', addTask);

    // Remove Task Event
    taskList.addEventListener('click', removeTask);

    // Clear Task Event Listener
    clearBtn.addEventListener('click', clearTasks);

    // Filter Tasks Event Listener
    filter.addEventListener('keyup', filterTasks);

}

// Get Tasks for LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';

        // Create Text Node and Append to the li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');

        // Add Class
        
        link.className = 'delete-item secondary-content';

        // Add attributes for href "#"
        link.setAttribute('href', '#');

        // Add Icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to li

        li.appendChild(link);

        // Append the li to Ul
        taskList.appendChild(li);

    });
}

// Add Task

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task bro!');
        taskInput.clear();
        
    }

    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';

    // Create Text Node and Append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

        // Add Class
        
        link.className = 'delete-item secondary-content';

        // Add attributes for href "#"
        link.setAttribute('href', '#');

        // Add Icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to li

        li.appendChild(link);

        // Append the li to Ul
        taskList.appendChild(li);

        // // Store in Local Storage
        storeTLS(taskInput.value);

        // Clear Input
        taskInput.value = '';

    e.preventDefault();
    console.log(li);
}

// Store Task

function storeTLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove Task Function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }

}

// Remove from LS Function
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);

        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));


}


// Clear Tasks

function clearTasks(){

    // First Method
    //  taskList.innerHTML = '';

    // Faster Method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }

    // Clear Task from Local Storage
    clearTasksFromLocalStorage();

}

// Clear Task from Local Storage Function
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function (task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';

        } else {
            task.style.display = 'none'; 
        }

    });

}