const form = document.getElementById("form");
const btnDone = document.getElementById("btnDone");
const btnAll = document.getElementById("btnAll");
const boxTasks = document.getElementById("tasks");
const input = document.getElementById("task");

form.addEventListener("submit", event =>{
    event.preventDefault();

    let task = input.value;
    let tasks = getTasks();

    if(!tasks){
        tasks = [];
    }

    if(!tasks.length){
        boxTasks.innerHTML = "";
    }

    tasks.push(task);

    setTasks(tasks);

    let content = `<input type="checkbox">
                    <p>${task}</p>`;
    
    let divTask = document.createElement("div");
    divTask.setAttribute("class","task");
    divTask.innerHTML = content;

    boxTasks.appendChild(divTask);
})

btnAll.addEventListener("click",()=>{
    let allTasks = Array.from(document.querySelectorAll('.tasks input[type="checkbox"]'));

    allTasks.forEach(task=>{
        task.checked = true;
    })
})

btnDone.addEventListener("click",()=>{
    let doneTasks = Array.from(document.querySelectorAll('.tasks input[type="checkbox"]:checked'));
    let taskText = Array.from(document.querySelectorAll('.tasks input[type="checkbox"]:checked ~ p'));
    let tasks = getTasks();
    
    doneTasks.forEach(task=>{
        let parentDiv = task.parentElement;

        boxTasks.removeChild(parentDiv);
    })

    console.log(tasks);

    taskText.forEach(text => {
        tasks = tasks.filter(task => task != text.textContent);
    })

    console.log(tasks);

    setTasks(tasks);

    if(!getTasks().length){
        drawTasks();
    }
})

function getTasks(){
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    return tasks;
}

function setTasks(tasks){
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function drawTasks(){
    let tasks = getTasks();

    if(!tasks){
        tasks = [];
    }

    if(tasks.length){
        tasks.forEach(task=>{
            let content = `<input type="checkbox">
                            <p>${task}</p>`;
            
            let divTask = document.createElement("div");
            divTask.setAttribute("class","task");
            divTask.innerHTML = content;

            boxTasks.appendChild(divTask);
        })
    }
    else{
        boxTasks.innerHTML = `<div class="noTask">
                                    <img src="./noTask.png">
                                    <h3>No tasks</h3>
                                    <p>When you have tasks, you'll see them here.</p>
                                </div>`;
    }
}

drawTasks();