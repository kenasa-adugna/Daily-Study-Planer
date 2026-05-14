document.addEventListener("DOMContentLoaded", () => {

    // Load tasks from storage or start empty
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");

    // ADD TASK
    addBtn.addEventListener("click", () => {
        const value = taskInput.value.trim();

        if (!value) {
            alert("Please enter a task");
            return;
        }

        tasks.push({
            text: value,
            done: false
        });

        taskInput.value = "";

        save();
        render();
    });

    // RENDER TASKS
    function render() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.done) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        // ✔ COMPLETE BUTTON
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.done ? "↩ Undo" : "✔ Done";

        completeBtn.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            save();
            render();
        });

        // ❌ DELETE BUTTON
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";

        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            save();
            render();
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });

    updateProgress();
}
    function updateProgress() {
        const total = tasks.length;
        const done = tasks.filter(t => t.done).length;

        progressText.textContent = `${done} / ${total} completed`;

        const percent = total === 0 ? 0 : (done / total) * 100;

        progressBar.style.width = percent + "%";
    }

    // SAVE TO LOCAL STORAGE
    function save() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // INITIAL LOAD
    render();
});