const AddTaskBtn = document.getElementById('add-task-btn');
const DescTaskInput = document.getElementById('description-task');
const TodosWrapper = document.querySelector('.todos-wrapper');

let tasks;

function Task(description) {
    this.description = description;
    this.completed = false;
}

const init = () => {
    tasks.push(new Task (DescTaskInput.value));
    updateLocalStorage();
    fillList();
    DescTaskInput.value = '';
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : '' }" id="${index}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
                <button class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const fillList = () => {
    TodosWrapper.innerHTML = '';
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks.length >0) {
        tasks.forEach((elem, index) => {
            TodosWrapper.innerHTML += createTemplate(elem, index);            
        });
    }
}

fillList();

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

AddTaskBtn.addEventListener('click', () => {
    init();
})

DescTaskInput.addEventListener('keydown', (evt) => {
    if(evt.code === 'Enter') init();
})

document.querySelector('.todos-wrapper').addEventListener('click', evt => {
    let itemIndex = evt.path[2].id;
    if (evt.target.tagName != 'BUTTON') return;
    tasks.splice(itemIndex, 1);
    updateLocalStorage();
    fillList();
})

document.querySelector('.todos-wrapper').addEventListener('click', evt => {
    let checkedItems = evt.path[2].id;
    if (evt.target.tagName !== 'INPUT') return;
    tasks[checkedItems].completed = !tasks[checkedItems].completed;
    let active = [];
    let completed = [];
    tasks.forEach(elem => {
        if(elem.completed) {
            completed.push(elem);
        } else {
            active.push(elem);
        }
    })
    tasks = [...active, ...completed];
    updateLocalStorage(tasks);
    fillList(tasks);
})

