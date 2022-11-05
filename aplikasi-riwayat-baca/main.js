const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist(){
    if(typeof (Storage) === 'undefined'){
        alert('Browser Kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

document.addEventListener(RENDER_EVENT, function () {
    const incompletedTODOList = document.getElementById('incompleteBookshelfList');
    incompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completeBookshelfList');
    completedTODOList.innerHTML = '';

    for(const todoItem of todos){
        const todoElement = makeToDo(todoItem);

        if(todoItem.isComplete){
            completedTODOList.append(todoElement);
        } else {
            incompletedTODOList.append(todoElement);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const submitFormInputBook = document.getElementById('inputBook');

    submitFormInputBook.addEventListener('submit', function (event) {
        event.preventDefault();
        addToDo();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const submitFormSearchBook = document.getElementById('searchBook');
    
    submitFormSearchBook.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBook();
    });
});

function searchBook(){
    const valueSearch = document.getElementById('searchBookTitle').value;

    const incompletedTODOList = document.getElementById('incompleteBookshelfList');
    incompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completeBookshelfList');
    completedTODOList.innerHTML = '';

    for(var i = 0 ; i < todos.length ; i++){
        const titleBook = todos[i].title;

        if(titleBook.toLowerCase().includes(valueSearch.toLowerCase())){
            const todoElement = makeToDo(todos[i]);

            if(todos[i].isComplete){
                completedTODOList.append(todoElement);
            } else {
                incompletedTODOList.append(todoElement);
            }
        }
    }
}

function addToDo(){
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const todoID = generateId();
    const todoObject = generateToDoObject(todoID, bookTitle, bookAuthor, bookYear, bookIsComplete);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId(){
    return +new Date();
}

function generateToDoObject(id, title, author, year, isComplete){
    return{
        id, title, author, year, isComplete
    };
}

function makeToDo(todoObject){
    const textBookTitle = document.createElement('h3');
    textBookTitle.innerHTML = todoObject.title;

    const textBookAuthor = document.createElement('p');
    textBookAuthor.innerHTML = todoObject.author;

    const textBookYear = document.createElement('p');
    textBookYear.innerHTML = todoObject.year;

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textBookTitle, textBookAuthor, textBookYear);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if(todoObject.isComplete){
        const unfinishedReadButton = document.createElement('button');
        unfinishedReadButton.classList.add('green');
        unfinishedReadButton.innerText = 'Belum selesai dibaca';

        unfinishedReadButton.addEventListener('click', function(){
            undoTaskFromCompleted(todoObject.id);
        });

        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add('red');
        deleteBookButton.innerText = 'Hapus buku';

        deleteBookButton.addEventListener('click', function(){
            removeTaskFromCompleted(todoObject.id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');
        buttonContainer.append(unfinishedReadButton, deleteBookButton);

        container.append(buttonContainer);
    } else {
        const finishedReadButton = document.createElement('button');
        finishedReadButton.classList.add('green');
        finishedReadButton.innerText = 'Selesai dibaca';

        finishedReadButton.addEventListener('click', function(){
            addTaskToCompleted(todoObject.id);
        });

        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add('red');
        deleteBookButton.innerText = 'Hapus buku';

        deleteBookButton.addEventListener('click', function(){
            removeTaskFromCompleted(todoObject.id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');
        buttonContainer.append(finishedReadButton, deleteBookButton);

        container.append(buttonContainer);
    }

    return container;
}

function addTaskToCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if(todoId == null){
        return;
    }

    todoTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeTaskFromCompleted(todoId){
    const todoTarget = findTodoIndex(todoId);

    if(todoTarget === -1){
        return;
    }

    toastMessage(todoId);

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function toastMessage(todoId){
    const toast = document.getElementById('toast-message');
    var title;

    for(const todoItem of todos){
        if(todoItem.id === todoId){
            title = todoItem.title;
        }
    }
    toast.innerHTML = `<p>Buku <b>${title}</b> telah dihapus</p>`;
    toast.className = "show";
    setTimeout(function(){
        toast.className = toast.className.replace("show", "hide");
    }, 2000);
}

function undoTaskFromCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if(todoTarget == null){
        return;
    }

    todoTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTodo(todoId){
    for(const todoItem of todos){
        if(todoItem.id === todoId){
            return todoItem;
        }
    }
    return null;
}

function findTodoIndex(todoId){
    for(const index in todos){
        if(todos[index].id === todoId){
            return index;
        }
    }
    return -1;
}

function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null){
        for(const todo of data){
            todos.push(todo);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}