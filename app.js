let form = document.querySelector('#task-form');
let taskL = document.querySelector('.collection');
let clearBtn = document.querySelector('.clear-tasks');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');

loadAddEventListeners();

function loadAddEventListeners(){
    //To add any task
    form.addEventListener('submit',addTask); 

    taskL.addEventListener('click',removeTask);

    clearBtn.addEventListener('click',clearTasks);

    filter.addEventListener('keyup',filterTask);

    document.addEventListener('DOMContentLoaded',getTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item grey lighten-3';
        li.appendChild(document.createTextNode(task));
        let link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        console.log(li);
        taskL.appendChild(li);
    })
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!');
    }
    else{
        const li = document.createElement('li');
        li.className = 'collection-item grey lighten-3';
        li.appendChild(document.createTextNode(taskInput.value));
        let link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        console.log(li);
        taskL.appendChild(li);
    }
    storeTaskInLocalStorage(taskInput.value);
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

function removeTaskFromLocalStorage(taskName){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskName.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(e){
    if(confirm('Do you really want to delete all the Tasks?')){
        while(taskL.firstChild){
           taskL.removeChild(taskL.firstChild);
        }
    }
    localStorage.clear();
    e.preventDefault();
}
function filterTask(e){
    let text = e.target.value.toLowerCase();
    var ll = document.querySelectorAll('.collection-item');
    // console.log(ll[0].firstChild.textContent);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const cont = task.firstChild.textContent;
        // console.log(cont);
        if(cont.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
            task.style.background = 'white';
        }
    });
}
