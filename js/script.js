{
  const tasks = [
    {
      content: "Przykładowe nie zrobione zadanie",
      done: false,
    },
    {
      content: "Przykładowe zrobione zadanie",
      done: true,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
      done: false,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeButtonsElements = document.querySelectorAll(".js-section__button--remove");

    removeButtonsElements.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleButtonsDone = document.querySelectorAll(".js-done");

    toggleButtonsDone.forEach((toggleButtonDone, index) => {
      toggleButtonDone.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
                  <li
                    class="section__listItem ${task.done ? "section__listItem--done" : ""}"
                  >
                    <button
                      class="section__button section__button--done js-done">${task.done ? "&#10004;" : ""}</button
                    > 
                      <span
                        class="section__listItemText ${task.done ? "section__listItemText--done" : ""}">${task.content}</span
                      >
                        <button
                          class="section__button section__button--remove js-section__button--remove">&#10006;</button
                          >
          </li>
      `;
    }

    const tasksElement = document.querySelector(".js-tasks");
    if (!tasksElement) {
      return;
    }

    tasksElement.innerHTML = htmlString;

    bindEvents();
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