document.addEventListener("DOMContentLoaded", () => {

    const todosList = document.querySelector("section.todos");
    const input = document.querySelector(".todo-add");

    const createTodo = (val) => {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        todo.dataset.id = val.id;
        todo.dataset.completed = Boolean(val.completed);

        let h2 = document.createElement("p");
        h2.classList.add("todo-name");
        h2.appendChild(document.createTextNode(val.name.replace(/[']/g, "")));

        let deleteBtn = document.createElement("a");
        deleteBtn.classList.add("todo-delete");
        deleteBtn.setAttribute("href", "javascript:");
        deleteBtn.appendChild(document.createTextNode("X"));

        todo.appendChild(h2);
        todo.appendChild(deleteBtn);

        return todo;
    }

    const getTodos = (data) => {
        data.forEach((val, ind) => {
            let todo = createTodo(val);
            todosList.appendChild(todo);
        });
    }

    const addTodo = (todo) => {
        let newTodo = createTodo(todo);
        todosList.appendChild(newTodo);
    }
    
    // get todos
    axios
        .get('/api/todos')
        .then(res => res.data)
        .then(getTodos);

    // create todo
    input.addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {
            axios
                .post('/api/todos', {
                    name: input.value
                })
                .then(res => res.data[0])
                .then(addTodo);

            input.value = "";
        }
    });

    // delete todo
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains('todo-delete')) {
            let id = event.target.parentNode.dataset.id;
            axios
                .delete(`/api/todos/${id}`)
                .then(res => res.data)
                .then((data) => {
                    if (data.success) {
                        event.target.parentNode.style.animation = "fadeOut 0.5s ease forwards";
                        setTimeout(() => {
                            event.target.parentNode.remove();
                        }, 500);
                    }
                });
        }
    });

    // update todo
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains('todo')) {

            let completed = event.target.dataset.completed !== "true";
            let id = event.target.dataset.id;

            axios
                .put(`/api/todos/${id}`, {id, completed})
                .then(res => res.data)
                .then((data) => {
                    if (data.success) event.target.dataset.completed = completed;
                });
        }
    })

});
