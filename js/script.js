{
  let tasks = [];
  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  }

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
        done: false,
      }
    ];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map(task => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    if (hideDoneTasks && tasks.every(({ done }) => !done)) {
      hideDoneTasks = false;
    };
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtonsElements = document.querySelectorAll(".js-section__button--remove");
    removeButtonsElements.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleButtonsDone = document.querySelectorAll(".js-done");

    toggleButtonsDone.forEach((toggleButtonDone, taskIndex) => {
      toggleButtonDone.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = task => `
        <li class="
          section__listItem ${task.done && hideDoneTasks ? "section__listItem--hidden" : ""}
          ">
          <button class="section__button section__button--done js-done">
            ${task.done ? "&#10004;" : ""}
          </button> 
            <span class="section__listItemText ${task.done ? "section__listItemText--done" : ""}">
              ${task.content}
            </span>
            <button class="section__button section__button--remove js-section__button--remove">
                &#10006;
            </button>
        </li>
      `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
    <button  class="buttons__button js-toggleHideDoneTasks">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button
      class="buttons__button js-markAllTasksDone"
      ${tasks.every(({ done }) => done) ? " disabled" : ""}
    >
    Ukończ wszystkie
    </button>
    `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllTasksDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks")

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    if (!newTaskElement) {
      return;
    }

    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    addNewTask("Przykładowe zadanie 1");
    addNewTask("Przykładowe zadanie 1");

    render();

    const formElement = document.querySelector(".js-form");
    if (formElement) {
      formElement.addEventListener("submit", onFormSubmit);
    }

    const taskInput = document.querySelector(".js-newTask");
    if (taskInput) {
      taskInput.focus();
    }
  };

  init();
}