const  addBtns = document.querySelector('#addBtn');
const taskInput = document.querySelector('#taskInput');
const list = document.querySelector('#list');
let tasks = [];


//addBtns.addEventListener('click', function() {
//    addTask();
//    taskInput.value = "";
//});
//doneTask();
//deleteTask();

if (localStorage.getItem('tasksLS')) {
    tasks = JSON.parse(localStorage.getItem('tasksLS'));
}

tasks.forEach(task => {
    const cssClass = task.complete ? "item done" : "item";
    list.insertAdjacentHTML ("beforeend",
    `<li class="${cssClass}" id ="${task.id}">${task.text}
    <div class="btns"> 
    <i class= "fa-regular fa-square-check" data-action = "complete"></i>
    <i class= "fa-regular fa-trash-can" data-action = "delete"></i>
    </div>
    </li>`
    )
});
list.addEventListener('click', function(event) {
    target = event.target
    if (target.dataset.action == 'complete') {
        completeBtn();
    }
    if (target.dataset.action == 'delete') {
        removeTask(target);
    }

    console.log(tasks);
    writeLS;
})

addBtns.addEventListener('click', function() {
    const newItem = document.createElement('li');
    addTask(newItem);
    list.append(newItem);
    taskInput.value = '';
})

function addTask () {
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    newItem.textContent = taskInput.value;
    list.append(newItem);


   const itemBtns = document.createElement('div');
    newItem.append(itemBtns);
    itemBtns.classNam = 'item__btns';


    const doneBtns = document.createElement('i');
    doneBtns.className = "fa-regular fa-square-check"
    itemBtns.append(doneBtns);


    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa-regular fa-trash-can';
    itemBtns.append(deleteButton);

}

let newTask = {
    id: Date.now(),
    text: taskInput.value,
    complete: false
}

tasks.push(newTask);
newItem.setAttribute('id', newTask.id);

function completeBtn(target) {
    target.closest('li').classList.toggle('done');
    let currentId = target.closest('li').id;
    const index = tasks.finIndex((task) => {
        return task.id ==currentId;
    });

    if (tasks[index].complete == false) {
        tasks[index].complete = true;
    } else {
        tasks[index].complete = false;
    }
}


function removeTask(target) {
    target.closest('li').remove();
    taskInput.value = '';
    const index = tasks.finIndex((task) => {
        return task.id == target.closest('li').id
    });
    tasks.splice(index, 1);
}


function writeLS () {
    localStorage.setItem('tasksLS', JSON.stringify(tasks));
}

