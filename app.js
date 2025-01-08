const form = document.querySelector("#toDoForm");
const taskValue = document.querySelector("#editTask");
const wrapper = document.querySelector("#taskList");

function validate(taskValue) {
  if (taskValue.value.trim().length > 1) {
    return true;
  }
  return false;
}

function createCard(task) {
  return `<div class="taskCard">
            <div class="taskText">${task.taskValue}</div>
            <button data-id="${task.id}" class="btn-delete">
              <img src="./images/delete-btn.png" alt="delete button" />
            </button>
          </div>`;
}

form &&
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isValid = validate(taskValue);
    if (!isValid) {
      return;
    }
    const task = {
      taskValue: taskValue.value,
      id: Date.now(),
    };
    const card = createCard(task);
    wrapper.innerHTML += card;

    let data = [];
    if (localStorage.getItem("task")) {
      data = JSON.parse(localStorage.getItem("task"));
    }
    data.push(task);
    localStorage.setItem("task", JSON.stringify(data));
    form.reset();
  });

wrapper.addEventListener("click", function (event) {
  if (event.target.closest(".btn-delete")) {
    const deleteBtn = event.target.closest(".btn-delete");
    const taskId = deleteBtn.getAttribute("data-id");

    deleteBtn.closest(".taskCard").remove();

    let tasks = [];
    if (localStorage.getItem("task")) {
      tasks = JSON.parse(localStorage.getItem("task"));
    }
    tasks = tasks.filter((task) => task.id != taskId);
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("task")) {
    data = JSON.parse(localStorage.getItem("task"));
  }

  data.length > 0 &&
    data.forEach((value) => {
      let card = createCard(value);
      wrapper.innerHTML += card;
    });

  const removeBtns = document.querySelectorAll(".btn-delete");
  removeBtns.length > 0 &&
    removeBtns.forEach((btn) => {
      btn &&
        btn.addEventListener("click", function () {
          let conf = confirm("Rostdan ham o'chirmoqchimisiz?");
          if (!conf) {
            return;
          }

          let tasks = [];
          if (localStorage.getItem("task")) {
            tasks = JSON.parse(localStorage.getItem("task"));
          }
          let id = this.getAttribute("data-id");
          if (id) {
            tasks = tasks.filter((task) => {
              return task.id != id;
            });
          }
          localStorage.setItem("task", JSON.stringify(tasks));
          this.parentNode.remove();
        });
    });
});
