const desc = document.getElementById("desc");

const btn = document.getElementById("btn");

const listItems = document.getElementById("list-items");

let id = localStorage.length;

function display() {
    listItems.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let task = localStorage.getItem(i);
        listItems.insertAdjacentHTML("afterbegin", `<li data-key="${i}"><i class="fa fa-check task-complete"></i> <span class="todo">${task}</span><i class="fa fa-pencil editTask"></i> <i class="fa fa-times removeBtn"></i></li>`);
    }
}
display();

btn.addEventListener("click", function () {
    if (desc.value == "") {
        desc.setAttribute("placeholder", "Description should not be empty");
        desc.classList.add("red_placeholder");
    }
    else {
        localStorage.setItem(id++, desc.value);
        desc.value = "";
        desc.setAttribute("placeholder", "Enter your to do");
        desc.classList.remove("red_placeholder");
        display();
        removeElements();
        taskComplete();
        updateTodo();
    }
});

function removeElements() {
    const removeBtn = document.querySelectorAll(".removeBtn");
    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click", function (e) {
            const liElement = e.target.parentElement;
            let key = liElement.getAttribute("data-key");
            localStorage.clear(key);
            liElement.remove();
        });
    }
}
removeElements();

function taskComplete(){
    const taskDone = document.querySelectorAll(".task-complete");
    for (let i = 0; i < taskDone.length; i++) {
        taskDone[i].addEventListener("click",function(e){
            const textElement = e.target.nextElementSibling;
            textElement.classList.add("line-through");
        })

        taskDone[i].addEventListener("dblclick",function(e){
            const textElement = e.target.nextElementSibling;
            textElement.classList.remove("line-through");
        })
    }
}
taskComplete();


function updateTodo(){
    const editTask = document.querySelectorAll(".editTask");
    for(let i = 0; i < editTask.length; i++){
        editTask[i].addEventListener("click",function(e){
         const targetText = e.target.previousElementSibling;
         targetText.remove();
         e.target.insertAdjacentHTML("beforebegin",`<input type="text" class="updatedTodo" >`)
         const updatedTodo = document.querySelector(".updatedTodo");
         updatedTodo.addEventListener("change",function(){
            const inputValue = updatedTodo.value;
            const liElement = e.target.parentElement;
            let key = liElement.getAttribute("data-key");
            localStorage.setItem(key, inputValue);

            let task = localStorage.getItem(key);
            e.target.insertAdjacentHTML("beforebegin",`<span class="todo">${task}</span>`)
            updatedTodo.remove();
         })

        })
    }

}
updateTodo();